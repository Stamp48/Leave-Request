
import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface DetailProps {
  label: string;
  text: string;
}

export default function Detail({ label, text }: DetailProps) {
  return (
    <Box sx={{  mb: 1 }}>
      <Typography variant="subtitle2" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body1">{text}</Typography>
    </Box>
  );
}
