"use client";

import { useState } from "react";
import { Box, TextField, MenuItem, Button } from "@mui/material";

type Props = {
  clienti: any[];
  initialData?: any;
  onSubmit: (data: any) => void;
};

export default function ConsegnaForm({
  clienti,
  initialData,
  onSubmit,
}: Props) {
  const [form, setForm] = useState({
    clienteId: initialData?.clienteId || "",
    trackingKey: initialData?.trackingKey || "",
    dataRitiro: initialData?.dataRitiro || "",
  });

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Box     
    component="div"
    sx={{
      display: "flex",
      flexDirection: "column",
      gap: 2,
    }}
  >
      <TextField
        select
        name="clienteId"
        label="Cliente"
        value={form.clienteId}
        onChange={handleChange}
      >
        {clienti.map((c) => (
          <MenuItem key={c.id} value={c.id}>
            {c.nominativo}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        name="trackingKey"
        label="Tracking Key"
        value={form.trackingKey}
        onChange={handleChange}
      />

      <TextField
        type="date"
        name="dataRitiro"
        value={form.dataRitiro}
        onChange={handleChange}
      />

      <Button variant="contained" onClick={() => onSubmit(form)}>
        Salva
      </Button>
    </Box>
  );
}