import React from "react";
import AssessmentIcon from "@mui/icons-material/Assessment";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard.jsx";
import Journal from "./pages/Journal.jsx";
import Navbar from "./components/Navbar.jsx";

const NAVIGATION = [
  {
    path: "/dashboard",
    title: "Dashboard",
    icon: <AssessmentIcon />,
  },
  {
    path: "/journal",
    title: "Journal",
    icon: <EditNoteIcon />,
  },
];

const App = () => {
  return (
    <BrowserRouter>
      <Navbar navigation={NAVIGATION}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/journal" element={<Journal />} />
        </Routes>
      </Navbar>
    </BrowserRouter>
  );
};

export default App;
