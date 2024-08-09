import mainTypes from "./mainTypes";

export function closeError(params, cb) {
  return {
    type: mainTypes.ERROR,
    params,
  };
}

export function API_spCallPostImage(params, dispatch) {
  return new Promise((resolve, reject) => {
    dispatch({
      type: mainTypes.PostImage,
      params,
      resolve,
      reject,
    });
  });
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

export function saveServiceConfirm(data, dispatch) {
  return dispatch({
    type: mainTypes.SERVICE_CONFIRM,
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
// SERVICE_LIST
export function serviceList(data, dispatch) {
  return dispatch({
    type: mainTypes.SERVICE_LIST,
    payload: data,
  });
}

export function setMyOrdersAccepted(orders, dispatch) {
  return dispatch({
    type: mainTypes.MY_ORDER_ACCEPTED,
    payload: orders,
  });
}

export function acceptedOrder(order, dispatch) {
  return dispatch({
    type: mainTypes.ACCEPTED_ORDER,
    payload: order,
  });
}

export function customerId(CustomerId, dispatch) {
  return dispatch({
    type: mainTypes.CUSTOMER_ID,
    payload: CustomerId,
  });
}
