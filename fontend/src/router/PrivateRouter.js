import * as React from "react";
import { Route, Redirect } from "react-router";
import { useSnackbar } from 'notistack';

const PrivateRouter = ({ component: Component, ...rest }) => {
  const localData = localStorage.getItem("Authorization");
  const { enqueueSnackbar } = useSnackbar();
  const showPopUp = (flag) => {
    if (flag) {
      let anchorOrigin = { horizontal: 'center', vertical: 'bottom' }
      let config = { variant: 'error', anchorOrigin: anchorOrigin }
      enqueueSnackbar('Bạn không có quyền truy cập vào trang này! Vui lòng đăng nhập', config);
    }
  }
  if (localData) {
    return (
      <Route {...rest} render={(props) => <Component {...props} />} />
    );
  } else {
    showPopUp(true);
    return (
      <Route
        {...rest}
        render={() => <Redirect to={{ pathname: "/login" }} />}
      />
    );
  }
};

export default PrivateRouter;
