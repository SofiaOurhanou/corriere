"use client";

import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import ClienteForm from "@/lib/components/ClienteForm";
import { axiosInstance } from "@/lib/components/axios";

export default function NewCliente() {
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    await axiosInstance.post("/api/clienti", data);
    router.push("/dashboard/clienti");
  };

  return (
    <Box sx={{p:4}}>
      <ClienteForm onSubmit={handleSubmit} />
    </Box>
  );
}