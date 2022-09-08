import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import { PageNotFound, Home, BlogDetails } from "../pages";

const AppRoutes = (props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
