"use client";

import { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { axiosInstance } from "@/lib/components/axios";

export default function Statistiche() {
  const [data, setData] = useState<any>(null);

  const [stato, setStato] = useState("");

  const load = async () => {
    const res = await axiosInstance.get(
      `/api/statistiche/consegne?stato=${stato}`
    );

    setData(res.data);
  };

  return (
    <Box sx={{p:4}}>
      <Typography variant="h4">Statistiche</Typography>

      <Box sx={{display:"flex", gap:2, mt:2}}>
        <TextField label="Stato" onChange={(e) => setStato(e.target.value)} />

        <Button variant="contained" onClick={load}>
          Calcola
        </Button>
      </Box>

      {data && (
        <Box sx={{mt:3}}>
          <Typography>Numero consegne: {data.numeroConsegne}</Typography>
          <Typography>
            Media: {data.tempoMedioConsegnaOre} ore
          </Typography>
        </Box>
      )}
    </Box>
  );
}