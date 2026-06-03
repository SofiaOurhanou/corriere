"use client";

import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";

import { axiosInstance } from "@/lib/utils/axios";
import PageHeader from "@/lib/components/PageHeader";
import DataTable from "@/lib/components/DataTable";

export default function ConsegnePage() {
  const router = useRouter();
  const [consegne, setConsegne] = useState([]);

  useEffect(() => {
    axiosInstance.get("/api/consegne").then((res) => {
      setConsegne(res.data);
    });
  }, []);

  return (
    <Box sx={{p:4}}>
      <PageHeader
        title="Consegne"
        actionLabel="Nuova"
        onAction={() => router.push("/dashboard/consegne/new")}
      />

      <DataTable
        columns={[
          { key: "trackingKey", label: "Tracking" },
          { key: "stato", label: "Stato" },
          { key: "dataRitiro", label: "Ritiro" },
        ]}
        data={consegne}
      />
    </Box>
  );
}