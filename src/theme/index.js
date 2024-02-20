import { createTheme } from "@mui/material/styles";

export default createTheme({
  palette: {
    primary: {
      main: "#1795a6",
    },
    secondary: {
      main: "#FF8E3D",
    },
    text: {
      primary: "#72797f",
      disabled: "#C0C0C0",
    },
    info: {
      main: "#ffffff",
    },
    background: {
      default: "#e7eaed",
      paper: "#ffffff",
    },
    custom: {
      background: "#e7eaed",
    },
    components: {
      main: "#1795a6",
      secondary: ["#477DBA", "#975694", "#A9436D"],
    },
  },
  typography: {
    fontSize: 16,
    allVariants: {
      fontFamily: "'Manrope', sans-serif",
      color: "#72797f",
    },
    h3: {
      fontSize: 22,
      fontWeight: 500,
    },
  },
  components: {
    MuiInputBase: {
      defaultProps: {
        style: {
          borderRadius: 4,
        },
      },
    },
  },
  shape: {
    borderRadius: 4,
  },
  sizes: {
    header: 52,
  },
});
