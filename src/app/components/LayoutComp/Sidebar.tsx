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
import ListItemIcon from '@mui/material/ListItemIcon';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import EventNoteIcon from '@mui/icons-material/EventNote';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import { usePathname } from "next/navigation";

export default function Sidebar() {
    const pathname = usePathname();

    const navItems = [
        { text: "Home", href: "/", icon: <HomeIcon /> },
        { text: "Employees", href: "/employees", icon: <PeopleIcon /> },
        { text: "Leave-Requests", href: "/leaveRequests", icon: <EventNoteIcon /> },
        { text: "Calendar", href: "/calendar", icon: <CalendarMonthIcon /> },
    ];

    return (
        <Drawer
            variant="permanent"
            anchor="left"
            sx={{
                width: 240,
                flexShrink: 0,
                "& .MuiDrawer-paper": { 
                    width: 240, 
                    boxSizing: "border-box",
                },
            }}
        >
            <Box
                sx={{ 
                    display: "flex",
                     justifyContent: "center",
                    p: 2 
                 }}
            >
                <Typography
                    variant="h6"
                    noWrap
                    component="a"
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
                    LEAVE
                </Typography>
            </Box>
            
            <Box
                sx={{
                    height: "100%",
                    background: "linear-gradient(to top, #1976d2, #42a5f5)",
                    color: "white",
                    pt: 0, 
                    px: 0.5, 
                    pb: 0.5
                }}
            >

                <List disablePadding>
                    {navItems.map((item) => (
                        <ListItem key={item.text} disablePadding>
                            <ListItemButton
                                component={Link}
                                href={item.href}
                                selected={pathname === item.href}
                                sx={{
                                    borderRadius: "8px",
                                    py: 2, // Your padding to make buttons bigger
                                    "&.Mui-selected": {
                                        backgroundColor: "#1976d2", 
                                        color: "white",
                                        "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
                                            color: "white", 
                                        },
                                        "&:hover": {
                                            backgroundColor: "#1565c0", 
                                        },
                                    },
                                    "&:hover": {
                                        backgroundColor: "rgba(255, 255, 255, 0.1)",  
                                        "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
                                            color: "white", 
                                        },
                                    },
                                    "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
                                        color: "white",
                                    },
                                }}
                            >
                                <ListItemIcon sx={{ minWidth: '40px' }}>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Drawer >

    );
}

