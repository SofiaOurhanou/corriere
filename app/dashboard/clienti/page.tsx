"use client";

import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/lib/components/axios";

import PageHeader from "@/lib/components/PageHeader";
import DataTable from "@/lib/components/DataTable";

export default function ClientiPage() {
  const router = useRouter();
  const [clienti, setClienti] = useState([]);

  useEffect(() => {
    axiosInstance.get("/api/clienti").then((res) => {
      setClienti(res.data);
    });
  }, []);

  return (
    <Box sx={{p:4}}>
      <PageHeader
        title="Clienti"
        actionLabel="Nuovo"
        onAction={() => router.push("/dashboard/clienti/new")}
      />

      <DataTable
        columns={[
          { key: "id", label: "ID" },
          { key: "nominativo", label: "Nome" },
          { key: "comune", label: "Comune" },
        ]}
        data={clienti}
      />
    </Box>
  );
}