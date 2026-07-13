[![Managed with npmctl](https://img.shields.io/badge/managed%20with-npmctl-2f6f4e.svg)](https://npmctl.com)

# swarmauri.com

Standalone Vite/React portfolio website for [swarmauri.com](https://swarmauri.com).

The app includes Swarmauri platform, package portfolio, architecture, composer,
guides, claims, updates, careers, community, and legal routes. Sitemap files are
generated from the local app data before development and production builds.

## Commands

- `npm ci`
- `npm run check`
- `npm run build`
- `npm run dev`
- `npm run docker:build`
- `npm run dns:plan` (uses PyPI `npmctl>=0.3.10` plus `npmctl-namecheap>=0.3.10`)
- `npm run proxy:plan` (uses PyPI `npmctl`)

The GitHub workflows install `npmctl>=0.3.10` and `npmctl-namecheap>=0.3.10` from PyPI, then use `npmctl validate`, `npmctl plan`, and `npmctl apply` against `desired-state/`.

## Deployment

This repo deploys as the `swarmauri-com` self-hosted Docker service. DNS is managed through the PyPI `npmctl-namecheap>=0.3.10` provider for the `swarmauri.com` zone and is declared in `desired-state/dns.yaml`.
