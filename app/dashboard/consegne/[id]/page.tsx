"use client";

import { Box, Typography } from "@mui/material";
import StatCard from "@/lib/components/StatCard";

export default function Dashboard() {
  return (
    <Box sx={{p:4}}>
      <Typography variant="h4">Dashboard</Typography>

      <Box sx={{display:"flex", gap:2, mt:3}}>
        <StatCard label="Clienti" value="-" />
        <StatCard label="Consegne" value="-" />
        <StatCard label="Consegnate" value="-" />
        <StatCard label="In corso" value="-" />
      </Box>
    </Box>
  );
}