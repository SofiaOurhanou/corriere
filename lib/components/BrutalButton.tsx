import { Button } from "@mui/material";

export default function BrutalButton(props: any) {
  return (
    <Button
      {...props}
      sx={{
        border: "3px solid #ff2e93",
        background: "#000",
        color: "#fff",
        fontWeight: "900",
        padding: "12px 18px",
        "&:hover": {
          background: "#ff2e93",
          color: "#000",
          transform: "translateY(-2px)",
        },
      }}
    />
  );
}