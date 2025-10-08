"use client";
import Drawer from "@mui/material/Drawer";
import Link from "next/link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from '@mui/material/ListItemButton';
import Box from '@mui/material/Box';
import AdbIcon from '@mui/icons-material/Adb';
import Typography from '@mui/material/Typography';




import { usePathname } from "next/navigation";

export default function Sidebar() {
    const pathname = usePathname();

    const navItems = [
        { text: "Home", href: "/" },
        { text: "Employees", href: "/employees" },
        { text: "Leave-Requests", href: "/leaveRequests" },
        { text: "Calendar", href: "/calendar" },
    ];

    return (
        <Drawer
            variant="permanent"
            anchor="left"
            sx={{
                width: 240,
                flexShrink: 0,
                "& .MuiDrawer-paper": { width: 240, boxSizing: "border-box" },
            }}
        >
            <Box
                sx={{ display: "flex",
                     justifyContent: "center",
                    p:2
                 }}
            >
                <AdbIcon sx={{ mr: 1 }} />
                <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="#app-bar-with-responsive-menu"
                    sx={{
                        mr: 2,
                        display: { xs: 'none', md: 'flex' },
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                >
                    LOGO
                </Typography>
            </Box>
            <Box
                sx={{
                    height: "100%",
                    background: "linear-gradient(to bottom, #1976d2, #42a5f5)",
                    color: "white",
                    p: 0.5,
                }}
            >
                <List>
                    {navItems.map((item) => (
                        <ListItem key={item.text} disablePadding>
                            <ListItemButton
                                component={Link}
                                href={item.href}
                                selected={pathname === item.href}
                                sx={{
                                    borderRadius: "8px",         // 🔹 Rounded corners
                                    "&.Mui-selected": {
                                        backgroundColor: "#1976d2", // 🔹 Highlight selected
                                        color: "white",
                                        "&:hover": {
                                            backgroundColor: "#1565c0", // Slightly darker on hover
                                        },
                                    },
                                    "&:hover": {
                                        backgroundColor: "#e3f2fd",  // 🔹 Light hover effect
                                    },
                                }}
                            >
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Drawer >

    );
}
