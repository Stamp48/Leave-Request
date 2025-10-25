import { Typography } from "@mui/material"
import Box from "@mui/material/Box"
import DashCard from "./components/DashComp/DashCard"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { ChartBarHorizontal } from "@/components/chart-bar-horizontal"
import { ChartPieDonutText } from "@/components/chart-pie-donut-text"
import { ChartPieLabel } from "@/components/chart-pie-label"



export default function HomePage() {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100vh", marginBottom: "100px" }}>
            <Box sx={{ flex: 3, bgcolor: "primary.main", display: "flex", alignItems: "center", justifyContent: "center", gap: 5, paddingY:"5px" }}>
                <DashCard title="Total" value={20} />
                <DashCard title="Total" value={20} />
                <DashCard title="Total" value={20} />
                <DashCard title="Total" value={20} />
            </Box>



            <Box sx={{ flex: 6, bgcolor: "secondary.main", paddingX: "25px", paddingY:"10px" }}>
                <ChartAreaInteractive />
            </Box>

            <Box sx={{ flex: 3, bgcolor: "success.main", display: "flex", alignItems: "center", justifyContent: "center", gap: 5, paddingX:"30px", paddingY:"10px" }}>
                <ChartBarHorizontal />
                <ChartPieDonutText />
                <ChartPieLabel/>
            </Box>
        </Box>
    );
}
