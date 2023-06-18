import axios from "axios";
import { Keyboard, Platform } from "react-native";
// import * as RootNavigation from "../navigation/rootNavigation";
// import { store } from "../redux/store";
import * as _ from "lodash";
import { SERVER_URL } from "../config";
import * as SecureStore from "expo-secure-store";

// const hookStore = (which, error) => {
//   const _paymentError = useSelector(paymentErrorStatus)
//   const dispatch = useDispatch()

//   if (which === 'LOGOUT') dispatch({ type: 'LOGOUT' })
//   if (which === 'paymentError') {
//     console.log('paymenterror', _paymentError.paymentError())
//   }

//   return
// }

const BASE_URL = SERVER_URL;

const _handleCommonError = (errorResponse) => {
  // TODO: Handle Error
  if (errorResponse.message) {
  }
};

axios.interceptors.request.use(
  async (config) => {
    // if (config.method !== "GET" && config.method !== "get") Keyboard.dismiss();
    // await AsyncStorage.removeItem('token')
    const token = await SecureStore.getItemAsync("userToken");
    if (token) {
      config.headers.Authorization = token;
    } else {
      config.headers.Authorization = "";
    }
    // console.log('token' + JSON.stringify(config.headers.Authorization))

    return config;
  },
  async (error) => {
    console.log("Errosr", error);
    // _interceptorsResponseError(error);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    console.log("response", response.config.url);
    // if (response.status === 222) {
    //   const currentRoute =
    //     RootNavigation.navigationRef.current.getCurrentRoute().name;
    //   if (currentRoute == "OTP") {
    //     RootNavigation.navigationRef.current.goBack();
    //   }
    // } else if (response.status === 223) console.log("223");

    return response;
  },
  (error) => {
    console.log("error", JSON.stringify(error));
    if (error && error.response && error.response.status)
      switch (error.response.status) {
        case 401:
          store.dispatch({ type: "LOGOUT" });

        default:
          _handleCommonError(error);
          break;
      }

    // console.log(error)
    return Promise.reject(error?.response?.data?.error || error);
  }
);

const register = (req) =>
  axios.post(BASE_URL + "/api/auth/register/?format=json", req);

const login = (req) =>
  axios.post(BASE_URL + "/api/auth/login/?format=json", req);

const getProfile = (id) => axios.get(BASE_URL + `/api/user/${id}/?format=json`);

const updateProfile = (id, req) =>
  axios.put(BASE_URL + `/api/user/${id}/?format=json`, req);


const validatePhone = (req) =>
  axios.post(BASE_URL + "/consumers/verify-otp", req);

export { login, validatePhone, getProfile, register, updateProfile };
