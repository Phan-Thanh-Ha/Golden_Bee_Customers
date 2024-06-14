import mainTypes from "../Action/mainTypes";

const initialState = {
  error: false,
  loading: false,
  language: "vn",
  locationTime: [],
  userLogin: {},
  menuService: [],
};
export default function (state = initialState, action = {}) {
  switch (action.type) {
    case mainTypes.LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case mainTypes.LOCATION_TIME:
      {
        console.log("action.payload", action.payload);
      }
      return {
        ...state,
        locationTime: action.payload,
      };
    case mainTypes.USER_PROFILE:
      {
        console.log("user in redux", action.payload);
      }
      return {
        ...state,
        userLogin: action.payload,
      };
    case mainTypes.MENU_SERVICE:
      console.log("menu in redux", action.payload);
      return {
        ...state,
        menuService: action.payload,
      };
    default:
      return state;
  }
}
