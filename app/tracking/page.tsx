"use client";

import { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { axiosInstance } from "@/lib/utils/axios";

export default function Tracking() {
  const [trackingKey, setTrackingKey] = useState("");
  const [dataRitiro, setDataRitiro] = useState("");
  const [result, setResult] = useState<any>(null);

  const handleSearch = async () => {
    try {
      const res = await axiosInstance.post("/api/tracking", {
        trackingKey,
        dataRitiro,
      });

      setResult(res.data);
    } catch {
      alert("Non trovato");
    }
  };

  return (
    <Box sx={{p:4}}>
      <Typography variant="h4">Tracking spedizione</Typography>

      <Box sx={{display:"flex", flexDirection:"column", gap:2, mt:2}}>
        <TextField label="Tracking Key" onChange={(e) => setTrackingKey(e.target.value)} />
        <TextField type="date" onChange={(e) => setDataRitiro(e.target.value)} />

        <Button variant="contained" onClick={handleSearch}>
          Cerca
        </Button>
      </Box>

      {result && (
        <Box sx={{mt:3}}>
          <Typography>Stato: {result.stato}</Typography>
          <Typography>Ritiro: {result.dataRitiro}</Typography>
          <Typography>Consegna: {result.dataConsegna || "-"}</Typography>
        </Box>
      )}
    </Box>
  );
}