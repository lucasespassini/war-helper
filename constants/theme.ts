import { createTheme } from "@rneui/themed";

export const theme = createTheme({
  lightColors: {
    primary: "#e7e7e8",
  },
  darkColors: {
    primary: "#000",
  },
  mode: "light",
  components: { Text: { style: { color: "#fff" } } },
});
