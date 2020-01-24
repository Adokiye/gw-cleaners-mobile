import {
  setToken,
  setId,
  setDropoffTime,
  setPickupTime,
  setDropoffDate,
  setPickupDate,
  setPreferences,
  setPrice,
  setDropboxAddress,
  setDropboxId
} from "../constants/action-types";
const initialState = {
  token: "",
  id: "",
  price: "",
  pickupTime: "",
  dropoffTime: "",
  dropoffDate: "",
  pickupDate: "",
  preferences: "",
  dropboxId: '',
  dropboxAddress: ''
};
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case setId:
      return {
        ...state,
        id: action.payload
      };
    case setToken:
      return {
        ...state,
        token: action.payload
      };
    case setDropoffTime:
      return {
        ...state,
        dropoffTime: action.payload
      };
    case setPickupTime: {
      return {
        ...state,
        pickupTime: action.payload
      };
    }
    case setDropoffDate:
      return {
        ...state,
        dropoffDate: action.payload
      };
    case setPickupDate: {
      return {
        ...state,
        pickupDate: action.payload
      };
    }
    case setPreferences: {
      return {
        ...state,
        preferences: action.payload
      };
    }
    case setPrice: {
      return {
        ...state,
        price: action.payload
      };
    }
    case setDropboxAddress: {
      return{
        ...state,
        dropboxAddress: action.payload
      };
    }
    case setDropboxId: {
      return{
        ...state,
        dropboxId: action.payload
      };
    }
    default:
      return state;
  }
};
export default rootReducer;
