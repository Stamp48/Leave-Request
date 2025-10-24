import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box"


 export default function DashCard( {title, value}: {title: string, value: number} ){
    return (
        <Card >
            <Box sx={{flex:1, flexDirection:"column", padding:"1rem", height:"150px", width:"215px", marginX:"1rem", justifyContent:"center", justifyItems:"center"}}>
            <Typography variant="h4">{title}</Typography>
            <Typography variant="h2">{value}</Typography>
            </Box>
        </Card>
    );
 }