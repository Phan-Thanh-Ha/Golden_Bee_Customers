import mainTypes from "../Action/mainTypes";

const initialState = {
  error: false,
  loading: false,
  language: "vn",
  locationTime: [],
  userLogin: {},
  menuService: [],
  SERVICELIST: [],
};
export default function (state = initialState, action = {}) {
  console.log("-----> 💀💀💀💀💀💀💀💀💀 <-----  initialState:", initialState);
  console.log("-----> 💀💀💀💀💀💀💀💀💀 <-----  action:", action);
  console.log("-----> 💀💀💀💀💀💀💀💀💀 <-----  state:", state);
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
    default:
      return state;
  }
}
