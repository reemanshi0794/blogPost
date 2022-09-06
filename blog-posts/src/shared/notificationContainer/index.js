import { toast, ToastContainer } from "react-toastify";
import "../../../node_modules/react-toastify/dist/ReactToastify.css";
// toast.configure();
export default (status, message) => {
  const options = {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 2000,
    hideProgressBar: false,
  };
  if (status === 200) {
    toast.success(message, options);
  } else {
    toast.error(message, options);
  }
  return <ToastContainer hideProgressBar={true} />;
};
