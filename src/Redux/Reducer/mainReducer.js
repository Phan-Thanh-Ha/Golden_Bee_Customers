import mainTypes from "../Action/mainTypes";
console.log("-----> 👿👿👿 <-----  mainTypes:", mainTypes);

const initialState = {
  error: false,
  loading: false,
  language: "vn",
  locationTime: [],
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
    default:
      return state;
  }
}
