"use client";

import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import { useRouter } from "next/navigation";

type Props = {
  onLogout: () => void;
};

export default function Navbar({ onLogout }: Props) {
  const router = useRouter();

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Titolo */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Corriere Express
        </Typography>

        {/* Navigazione */}
        <Box>
          <Button color="inherit" onClick={() => router.push("/dashboard")}>
            Dashboard
          </Button>

          <Button color="inherit" onClick={() => router.push("/dashboard/clienti")}>
            Clienti
          </Button>

          <Button color="inherit" onClick={() => router.push("/dashboard/consegne")}>
            Consegne
          </Button>

          <Button color="inherit" onClick={() => router.push("/dashboard/statistiche")}>
            Statistiche
          </Button>

          <Button color="inherit" onClick={onLogout}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}