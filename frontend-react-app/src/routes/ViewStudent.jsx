import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HistoryPage from "../pages/HistoryPage";
import HomePage from "../pages/HomePage";

const ViewStudent = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="*" element={<Navigate to="/"  replace />} />
      </Routes>
    </>
  );
};

export default ViewStudent;
