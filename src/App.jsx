import React from "react";
import AssessmentIcon from "@mui/icons-material/Assessment";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard.jsx";
import Journal from "./pages/Journal.jsx";
import Navbar from "./components/Navbar.jsx";
import { Box, ThemeProvider } from "@mui/material";
import theme from "../theme/CustomTheme.jsx";

const NAVIGATION = [
  {
    path: "/react-expense-tracker/dashboard",
    title: "Dashboard",
    icon: <AssessmentIcon />,
  },
  {
    path: "/react-expense-tracker/journal",
    title: "Journal",
    icon: <EditNoteIcon />,
  },
];

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Box
          sx={{
            justifyContent: "center",
            display: "flex",
            minHeight: "100vh",
            alignContent: "center",
          }}
        >
          <Navbar navigation={NAVIGATION}>
            <Routes>
              <Route path="/react-expense-tracker" element={<Dashboard />} />
              <Route
                path="/react-expense-tracker/dashboard"
                element={<Dashboard />}
              />
              <Route
                path="/react-expense-tracker/journal"
                element={<Journal />}
              />
            </Routes>
          </Navbar>
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
