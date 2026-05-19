#!/usr/bin/env python3
"""Remove legacy NPM proxy hosts that block the desired domain set."""

from __future__ import annotations

import os
import sys
from pathlib import Path

import yaml
from npmctl.client.base import NpmClient
from npmctl.models import ResourceKind, canonical_domain_set


def require_env(name: str) -> str:
    value = os.environ.get(name)
    if not value:
        raise SystemExit(f"missing required environment variable: {name}")
    return value


def main() -> int:
    path = Path(sys.argv[1] if len(sys.argv) > 1 else "desired-state/proxy.yaml")
    doc = yaml.safe_load(path.read_text(encoding="utf-8"))
    hosts = doc.get("proxy_hosts") or []
    if len(hosts) != 1:
        raise SystemExit("expected exactly one desired proxy host")

    desired = hosts[0]
    meta = desired.get("meta") or {}
    owner = str(meta.get("owner") or "")
    resource_id = str(meta.get("resource_id") or "")
    desired_domains = canonical_domain_set(desired.get("domain_names") or [], path="proxy_hosts[0].domain_names")

    client = NpmClient(
        base_url=require_env("NPM_BASE_URL"),
        identity=require_env("NPM_IDENTITY"),
        secret=require_env("NPM_SECRET"),
        timeout_s=float(os.environ.get("NPM_TIMEOUT_S") or "30"),
    )
    removed = 0
    for host in client.list_resource(ResourceKind.PROXY_HOST):
        live_domains = tuple(host.domain_names)
        if not set(live_domains).intersection(desired_domains):
            continue
        if live_domains == desired_domains:
            continue
        if host.identity is not None and (host.identity.owner != owner or host.identity.resource_id != resource_id):
            raise SystemExit(
                "refusing to delete foreign npmctl-owned proxy host "
                f"id={host.id} owner={host.identity.owner} resource_id={host.identity.resource_id}"
            )
        client.delete_resource(ResourceKind.PROXY_HOST, host.id)
        print(f"removed legacy conflicting proxy host id={host.id} domains={','.join(live_domains)}")
        removed += 1

    print(f"removed {removed} legacy conflicting proxy host(s)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
