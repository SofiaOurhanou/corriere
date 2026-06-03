"use client";

import { Box, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  return (
    <Box sx={{p:4}}>
      <Typography variant="h4">Dashboard</Typography>

      <Box sx={{mt:3, display:"flex", gap:2}}>
        <Button onClick={() => router.push("/dashboard/clienti")}>
          Clienti
        </Button>

        <Button onClick={() => router.push("/dashboard/consegne")}>
          Consegne
        </Button>

        <Button onClick={() => router.push("/dashboard/statistiche")}>
          Statistiche
        </Button>
      </Box>
    </Box>
  );
}