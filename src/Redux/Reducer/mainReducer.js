import mainTypes from "../Action/mainTypes";

const initialState = {
  error: false,
  loading: false,
  language: "vn",
  locationTime: [],
  userLogin: {},
  menuService: [],
  SERVICELIST: [],
  acceptedOrder: [],
  myOrdersAccepted: [],
  serviceConfirm: {},
};
export default function (state = initialState, action = {}) {
  switch (action.type) {
    case mainTypes.LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case mainTypes.LOCATION_TIME:
      return {
        ...state,
        locationTime: action.payload,
      };
    case mainTypes.USER_PROFILE:
      return {
        ...state,
        userLogin: action.payload,
      };
    case mainTypes.MENU_SERVICE:
      return {
        ...state,
        menuService: action.payload,
      };
    case mainTypes.SERVICE_LIST: // Danh sách dịch vụ của khách hàng
      return {
        ...state,
        SERVICELIST: action.payload,
      };
    case mainTypes.ACCEPTED_ORDER:
      {
        console.log("oder accepted in redux", action.payload);
      }
      return {
        ...state,
        acceptedOrder: action.payload,
      };
    case mainTypes.MY_ORDER_ACCEPTED:
      {
        console.log("my oder accepted in redux", action.payload);
      }
      return {
        ...state,
        myOrdersAccepted: action.payload,
      };
    default:
      return state;
  }
}
