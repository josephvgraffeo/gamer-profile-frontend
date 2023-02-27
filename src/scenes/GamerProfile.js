import { Grid, Box } from "@mui/material";
import GamerCard from "../components/GamerCard.js";
import GamerLibrary from "../components/GamerLibrary.js";
import "../styles/gamerprofile.css";

export default function GamerProfile() {
    return (
        <Box className="prof-main-box">
            <Grid className="prof-main-grid" container>
                <Grid className="prof-card-grid" item xs={12} md={2.75}>
                    <Box className="prof-card-box">
                        <GamerCard />
                    </Box>
                </Grid>
                <Grid className="prof-lib-grid" item xs={12} md={9.25}>
                    <Box className="prof-lib-box">
                        <GamerLibrary />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}