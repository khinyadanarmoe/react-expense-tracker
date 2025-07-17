import React from "react";
import { createTheme } from "@mui/material/styles";

const CustomTheme = createTheme({
  palette: {
    primary: {
      main: "#a1b5c7ff",
      light: "#E0EBF3",
      dark: "#8BB5D1",
      contrastText: "#2B2B2B",
    },
    secondary: {
      main: "#DBE9F6",
      light: "#E8F1F8",
      dark: "#C4D8ED",
      contrastText: "#2B2B2B",
    },
    background: {
      default: "#e6f1fcff",
      paper: "#FFFFFF",
      secondary: "#DBE9F6",
    },
    text: {
      primary: "#2B2B2B",
      secondary: "#4B4B4B",
      disabled: "#888888",
    },
    expense: {
      food: "#FF6B6B",
      transport: "#4ECDC4",
      shopping: "#45B7D1",
      entertainment: "#FFEAA7",
      health: "#00D2FF",
      utilities: "#ff9800",
      education: "#9c27b0",
      others: "#96CEB4",
    },
    custom: {
      background: "#fdf9edff",
      button: "#BAD0E3",
      box: "#DBE9F6",
      textPrimary: "#2B2B2B",
      textSecondary: "#987c02ff",
      textMuted: "#888888",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontSize: "2.5rem", fontWeight: 700, lineHeight: 1.2 },
    h2: { fontSize: "2rem", fontWeight: 600, lineHeight: 1.3 },
    h3: { fontSize: "1.75rem", fontWeight: 600, lineHeight: 1.3 },
    h4: { fontSize: "1.5rem", fontWeight: 600, lineHeight: 1.4 },
    h5: { fontSize: "1.25rem", fontWeight: 600, lineHeight: 1.4 },
    h6: { fontSize: "1.125rem", fontWeight: 600, lineHeight: 1.4 },
    body1: { fontSize: "1rem", lineHeight: 1.6 },
    body2: { fontSize: "0.875rem", lineHeight: 1.6 },
  },
  shape: {
    borderRadius: 3,
  },
  spacing: 8,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 3,
          fontWeight: 600,
        },
        contained: ({ theme }) => ({
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.text.primary,
          boxShadow: "0 4px 12px rgba(186, 208, 227, 0.3)",
          "&:hover": {
            backgroundColor: theme.palette.primary.dark,
            boxShadow: "0 6px 16px rgba(186, 208, 227, 0.4)",
            transform: "translateY(-1px)",
          },
        }),
        outlined: ({ theme }) => ({
          borderColor: theme.palette.primary.main,
          color: theme.palette.text.primary,
          "&:hover": {
            backgroundColor: "rgba(186, 208, 227, 0.1)",
            borderColor: theme.palette.primary.dark,
          },
        }),
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.custom.background,
          boxShadow: "0 4px 20px rgba(219, 233, 246, 0.3)",
          borderRadius: 3,
        }),
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: ({ theme }) => ({
          borderRadius: 3,
          backgroundColor: theme.palette.background.paper,
        }),
      },
    },
  },
});

export default CustomTheme;
