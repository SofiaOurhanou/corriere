"use client";

import { Box } from "@mui/material";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        background: "#0d0d0d",
        color: "#fff",
      }}
    >
      {/* SIDEBAR */}
      <Box
        sx={{
          width: 260,
          position: "relative",
          borderRight: "4px solid #ff2e93",
          p: 2,
          fontWeight: 900,
          overflow: "hidden",

          // base background
          backgroundColor: "#0d0d0d",

          // soft pink pattern layer
          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle at 20px 20px, rgba(255,46,147,0.25) 2px, transparent 3px)",
            backgroundSize: "40px 40px",
            opacity: 0.6,
            pointerEvents: "none",
          },
        }}
      >
        {/* contenuto sopra il pattern */}
        <Box sx={{ position: "relative", zIndex: 1 }}>
          CORRIERE ESPRESSO

          <Box sx={{ mt: 4, display: "flex", flexDirection: "column", gap: 2 }}>
            {/* link futuri */}
          </Box>
        </Box>
      </Box>

      {/* CONTENT */}
      <Box sx={{ flex: 1, p: 3 }}>{children}</Box>
    </Box>
  );
}