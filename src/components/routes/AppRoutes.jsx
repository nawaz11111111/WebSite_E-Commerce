import React from "react";
import Home from "../../pages/home/Home";
import Category from "../../pages/category/Category";
import { Route, Routes } from "react-router-dom";
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Category />}></Route>
      <Route path="/:categoryId" element={<Category />}></Route>
    </Routes>
  );
}

export default AppRoutes;
