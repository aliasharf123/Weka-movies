"use client";
import React from "react";
import Skeleton from "@mui/material/Skeleton";

export default function Loading() {
  return (
    <div className="flex gap-3">
      <Skeleton
        sx={{ bgcolor: "grey.900" }}
        variant="rounded"
        width="12rem"
        height="288px"
      />
      <Skeleton
        sx={{ bgcolor: "grey.900" }}
        variant="rounded"
        width="12rem"
        height="288px"
      />
      <Skeleton
        sx={{ bgcolor: "grey.900" }}
        variant="rounded"
        width="12rem"
        height="288px"
      />
      <Skeleton
        sx={{ bgcolor: "grey.900" }}
        variant="rounded"
        width="12rem"
        height="288px"
      />
      <Skeleton
        sx={{ bgcolor: "grey.900" }}
        variant="rounded"
        width="12rem"
        height="288px"
      />
      <Skeleton
        sx={{ bgcolor: "grey.900" }}
        variant="rounded"
        width="12rem"
        height="288px"
      />
    </div>
  );
}
