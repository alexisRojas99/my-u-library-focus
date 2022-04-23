import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import CreateUser from "../pages/librarian/CreateUser";
import ReceiveBook from "../pages/librarian/ReceiveBook";
import CreateBook from "../pages/librarian/CreateBook";

const ViewLibrarian = () => {
  return (
    <Routes>
      <Route path="/" element={<CreateUser />} />
      <Route path="/create-book" element={<CreateBook />} />
      <Route path="/receive-book" element={<ReceiveBook />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default ViewLibrarian;
