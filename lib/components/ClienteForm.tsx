"use client";

import { useState } from "react";
import { Box, TextField, Button } from "@mui/material";

type Props = {
  initialData?: any;
  onSubmit: (data: any) => void;
};

export default function ClienteForm({ initialData, onSubmit }: Props) {
  const [form, setForm] = useState({
    nominativo: initialData?.nominativo || "",
    via: initialData?.via || "",
    comune: initialData?.comune || "",
    provincia: initialData?.provincia || "",
    telefono: initialData?.telefono || "",
    email: initialData?.email || "",
    note: initialData?.note || "",
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
      <TextField name="nominativo" label="Nominativo" value={form.nominativo} onChange={handleChange} />
      <TextField name="via" label="Via" value={form.via} onChange={handleChange} />
      <TextField name="comune" label="Comune" value={form.comune} onChange={handleChange} />
      <TextField name="provincia" label="Provincia" value={form.provincia} onChange={handleChange} />
      <TextField name="telefono" label="Telefono" value={form.telefono} onChange={handleChange} />
      <TextField name="email" label="Email" value={form.email} onChange={handleChange} />
      <TextField name="note" label="Note" value={form.note} onChange={handleChange} multiline rows={3} />

      <Button variant="contained" onClick={() => onSubmit(form)}>
        Salva
      </Button>
    </Box>
  );
}