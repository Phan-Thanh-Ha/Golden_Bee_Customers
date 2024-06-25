import mainTypes from "./mainTypes";

export function closeError(params, cb) {
  return {
    type: mainTypes.ERROR,
    params,
  };
}

export function API_spCallServer(params, dispatch) {
  return new Promise((resolve, reject) => {
    dispatch({
      type: mainTypes.CallServer,
      params,
      resolve,
      reject,
    });
  });
}

export function userLogin(user, dispatch) {
  return dispatch({
    type: mainTypes.USER_PROFILE,
    payload: user,
  });
}

export function userLogout(dispatch) {
  return dispatch({
    type: mainTypes.USER_PROFILE,
    payload: {},
  });
}

export function menuService(data, dispatch) {
  // Log để kiểm tra dữ liệu trước khi dispatch
  return dispatch({
    type: mainTypes.MENU_SERVICE,
    payload: data,
  });
}

export function checkPermission(params, dispatch) {
  return new Promise((resolve, reject) => {
    dispatch({
      type: mainTypes.CHECK_PERMISSION,
      params,
      resolve,
      reject,
    });
  });
}
