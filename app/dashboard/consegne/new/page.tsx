"use client";

import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";

import { axiosInstance } from "@/lib/utils/axios";
import ConsegnaForm from "@/lib/components/ConsegnaForm";

export default function NewConsegna() {
  const router = useRouter();
  const [clienti, setClienti] = useState([]);

  useEffect(() => {
    axiosInstance.get("/api/clienti").then((res) => {
      setClienti(res.data);
    });
  }, []);

  const handleSubmit = async (data: any) => {
    await axiosInstance.post("/api/consegne", data);
    router.push("/dashboard/consegne");
  };

  return (
    <Box sx={{p:4}}>
      <ConsegnaForm clienti={clienti} onSubmit={handleSubmit} />
    </Box>
  );
}