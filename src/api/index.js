import axios from "axios";
import { Keyboard, Platform } from "react-native";
import * as RootNavigation from "../navigation/rootNavigation";
import { store } from "../redux/store";
import * as _ from "lodash";
import { SERVER_URL } from "../config";

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
    if (config.method !== "GET" && config.method !== "get") Keyboard.dismiss();
    // await AsyncStorage.removeItem('token')
    const token = store.getState().auth.token;
    if (token) {
      config.headers.Authorization = token;
    } else {
      config.headers.Authorization = "";
    }
    // console.log('token' + JSON.stringify(config.headers.Authorization))

    return config;
  },
  async (error) => {
    // _interceptorsResponseError(error);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    console.log("response", response.config.url);
    if (response.status === 222) {
      const currentRoute =
        RootNavigation.navigationRef.current.getCurrentRoute().name;
      if (currentRoute == "OTP") {
        RootNavigation.navigationRef.current.goBack();
      }
    } else if (response.status === 223) console.log("223");

    return response;
  },
  (error) => {
    console.log("error", JSON.stringify(error.response));
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

const loginv1 = (req) => axios.post(BASE_URL + "/consumers/check", req);

const login = (req) =>
  axios.post(BASE_URL + "/consumers/check", req, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36",
    },
  });

const validatePhone = (req) =>
  axios.post(BASE_URL + "/consumers/verify-otp", req);
const getProfile = () => axios.get(BASE_URL + "/consumers/profile");

export { login, validatePhone, getProfile, loginv1 };
