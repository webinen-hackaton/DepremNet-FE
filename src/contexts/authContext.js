import * as React from "react";
import * as SecureStore from "expo-secure-store";

const AuthContext = React.createContext();

export const authContext = React.useMemo(
  () => ({
    signIn: async (data) => {
      // In a production app, we need to send some data (usually username, password) to server and get a token
      // We will also need to handle errors if sign in failed
      // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
      // In the example, we'll use a dummy token
      let token = await SecureStore.getItemAsync("token");

      dispatch({ type: "SIGN_IN", token: token });
    },
    signOut: () => dispatch({ type: "SIGN_OUT" }),
    signUp: async (data) => {
      // In a production app, we need to send user data to server and get a token
      // We will also need to handle errors if sign up failed
      // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
      // In the example, we'll use a dummy token

      dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
    },
  }),
  []
);

export default AuthContext;
