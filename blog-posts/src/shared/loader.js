import React from "react";
// import { Modal } from "reactstrap";
import { connect } from "react-redux";
import { useSelector } from "react-redux";

export const BasicLoader = () => (
  <div className="lds-roller">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
);
const Loader = () => {
  const isLoading = useSelector((state) => state.loaderDetails);
  if (isLoading) {
    return (
      <div className="m-loader">
        {/* <Modal isOpen={true} className="m-loader modal-dialog-centered"> */}
        <BasicLoader />
        {/* </Modal> */}
      </div>
    );
  }
  return <div />;
};

const mapStateToProps = (state) => ({
  loaderDetails: state.loaderDetails,
});
export default connect(mapStateToProps, null)(Loader);
