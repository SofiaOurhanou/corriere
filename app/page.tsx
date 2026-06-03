"use client";

import { Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (


<Box sx={{ mt: 3, display: "flex", gap: 2 }}>
          <Button variant="contained" onClick={() => router.push("/login")}>
          Login
        </Button>

        <Button variant="outlined" onClick={() => router.push("/register")}>
          Register
        </Button>

        <Button onClick={() => router.push("/tracking")}>
          Tracking
        </Button>
      </Box>
  );
}