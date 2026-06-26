import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { findLegacyUpdateByPath } from "../data/legacyContent";

export default function LegacyUpdateRedirect() {
  const location = useLocation();
  const post = findLegacyUpdateByPath(location.pathname);

  return <Navigate to={post ? `/updates/${post.id}` : "/updates"} replace />;
}
