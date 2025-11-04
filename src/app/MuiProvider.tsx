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
              // FIXED: Start at the edge of the drawer
              left: `${drawerWidth}px`, 
              // FIXED: Go all the way to the right edge
              right: 0, 
              // REMOVED: This width calculation was causing the gap
              // width: `calc(100% - ${drawerWidth}px)`, 
              zIndex: 1201, // above sidebar
            }}
          >
            {/* The NavBar component in your Canvas is correct */}
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

