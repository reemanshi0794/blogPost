import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import { PageNotFound, Home, BlogDetails } from "../pages";
// import Layout from "../components/layout";

const NotFound = () => {
  return <Route component={PageNotFound} />;
};
const AppRoutes = (props) => {
  return (
    <BrowserRouter>
      {/* <Layout> */}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {/* </Layout> */}
    </BrowserRouter>
  );
};

export default AppRoutes;
