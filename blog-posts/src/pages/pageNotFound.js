import React from "react";
import { useNavigate } from "react-router-dom";

const PageNotFound = (props) => {
  let navigate = useNavigate();
  const handleOnClick = () => {
    navigate("./");
  };
  return (
    <div
      className={"text-center d-flex align-items-center justify-content-center"}
      style={{
        minHeight: "100vh",
      }}
    >
      <div>
        <h2 className="mb-4">Sorry, requested page not found!!</h2>
        <button color="primary" className="px-4 py-2" onClick={handleOnClick}>
          Go To Home
        </button>
      </div>
    </div>
  );
};
export default PageNotFound;
