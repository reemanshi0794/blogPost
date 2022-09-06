import React from "react";
const PageNotFound = (props) => {
  const handleOnClick = () => {
    props.history.replace("./home");
  };
  return (
    <div
      className={"text-center d-flex align-items-center justify-content-center"}
      style={{
        minHeight: "100vh",
      }}
    >
      <div>
        <img className="mb-4" style={{ height: 46 }}></img>
        <h2 className="mb-4">Sorry, requested page not found!!</h2>
        <button color="primary" className="px-4 py-2" onClick={handleOnClick}>
          Go To Home
        </button>
      </div>
    </div>
  );
};
export default PageNotFound;
