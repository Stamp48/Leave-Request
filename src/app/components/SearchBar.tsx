"use client";

import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";

interface SearchBarProps {
    value?: string;
    placeholder?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit?: (value: string) => void;
    color?: string; // optional custom color
    sx?: object; // allow inline style override
}

// --- Styled Components ---
const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
    },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: "20ch",
        },
    },
}));

// --- Component ---
export default function SearchBar({
    value = "",
    placeholder = "Search…",
    onChange,
    onSubmit,
    color = "rgba(255,255,255,0.15)",
    sx = {},
}: SearchBarProps) {
    const [text, setText] = React.useState(value);

    // Keep external value in sync (controlled mode)
    React.useEffect(() => {
        setText(value);
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
        if (onChange) onChange(e);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && onSubmit) {
            onSubmit(text);
        }
    };

    return (
        <Box
            sx={{
                ...sx,
            }}
        >
            <Search
                sx={{
                    backgroundColor: color,
                    "&:hover": {
                        backgroundColor: alpha(color, 0.8),
                    },
                }}
            >
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder={placeholder}
                    value={text}
                    inputProps={{ "aria-label": "search" }}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                />
            </Search>
        </Box>
    );
}
