import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import ButtonBase from '@mui/material/ButtonBase';

export default function UploadAvatars({ srcImg, width, height, handleAvatarChange }: { srcImg?: string, width: number, height: number, handleAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {

    return (
        <ButtonBase
            component="label"
            role={undefined}
            tabIndex={-1}
            aria-label="Avatar image"
            sx={{
                borderRadius: '50%', // Use 50% for a perfect circle regardless of size
                '&:has(:focus-visible)': {
                    outline: '2px solid',
                    outlineOffset: '2px',
                },
            }}
        >
            {/* ✅ Apply width and height here */}
            <Avatar 
                alt="Upload new avatar" 
                src={srcImg}
                sx={{ width: width, height: height }}
            />
            <input
                type="file"
                accept="image/*"
                style={{
                    // These styles are correct for hiding the input
                    border: 0,
                    clip: 'rect(0 0 0 0)',
                    height: '1px',
                    margin: '-1px',
                    overflow: 'hidden',
                    padding: 0,
                    position: 'absolute',
                    whiteSpace: 'nowrap',
                    width: '1px',
                }}
                onChange={handleAvatarChange}
            />
        </ButtonBase>
    );
}