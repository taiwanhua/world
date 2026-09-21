import type { ThemeOptions } from "@mui/material/styles";

export const defaultThemeOptions: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: { main: "#75e1ed" },
    secondary: { main: "#9bafff" },
    background: { default: "#080d14", paper: "#0e1620" },
    text: { primary: "#e7eff6", secondary: "#91a3b5" },
    divider: "#22313f",
    success: { main: "#87deb9" },
    error: { main: "#ff9a9a" },
  },
  typography: {
    fontFamily: 'var(--font-inter), "Noto Sans TC", sans-serif',
    fontSize: 14,
    h5: { fontWeight: 600, letterSpacing: "-0.025em" },
    h6: { fontWeight: 500 },
    body1: { lineHeight: 1.85 },
  },
  shape: { borderRadius: 5 },
  components: {
    MuiCssBaseline: {
      styleOverrides: { body: { backgroundColor: "#080d14" } },
    },
    MuiPaper: {
      styleOverrides: { root: { backgroundImage: "none", boxShadow: "none" } },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: { root: { textTransform: "none" } },
    },
    MuiIconButton: { defaultProps: { size: "small" } },
    MuiTextField: { defaultProps: { variant: "outlined", size: "small" } },
    MuiListItem: { styleOverrides: { root: { color: "#b5c3d0" } } },
  },
};
