import { Card, CardContent, Typography } from "@mui/material";

type Props = {
  label: string;
  value: string | number;
};

export default function StatCard({ label, value }: Props) {
  return (
    <Card>
      <CardContent>
        <Typography color="text.secondary">
          {label}
        </Typography>

        <Typography variant="h5">
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}