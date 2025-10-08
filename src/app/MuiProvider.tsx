"use client";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Sidebar from "./components/LayoutComp/Sidebar";
import NavBar from "./components/LayoutComp/Navbar";

const theme = createTheme();
const drawerWidth = 240; // adjust to your sidebar width

export default function MuiProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        {/* Sidebar */}
        <Sidebar />

        {/* Main section (navbar + content) */}
        <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
          {/* Navbar */}
          <Box
            sx={{
              position: "fixed",
              top: 0,
              left: `${drawerWidth - 1}px`,
              width: `calc(100% - ${drawerWidth}px)`,
              zIndex: 1201, // above sidebar
            }}
          >
            <NavBar />
          </Box>

          {/* Main content */}
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              mt: "64px", // offset navbar height
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
