import { Box, Typography, Button } from "@mui/material";

type Props = {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
};

export default function PageHeader({
  title,
  actionLabel,
  onAction,
}: Props) {
  return (
    <Box
  component="div"
  sx={{
    p: 2,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 2,
  }}
>
      <Typography variant="h5">{title}</Typography>

      {actionLabel && onAction && (
        <Button variant="contained" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </Box>
  );
}