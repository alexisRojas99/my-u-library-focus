import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const ViewLibrarian = () => {
  return (
    <Routes>
      <Route exact path="/" />
      <Route path="" element={""} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default ViewLibrarian;
