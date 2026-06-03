import { Box } from "@mui/material";

export default function BrutalCard({ children }: any) {
  return (
    <Box
      sx={{
        border: "3px solid #fff",
        background: "#111",
        padding: 2,
        marginBottom: 2,
        fontWeight: "bold",
      }}
    >
      {children}
    </Box>
  );
}