import * as React from "react";
import { Button, Text, TextInput, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../pages/home";
import SplashScreen from "../pages/splash";
import SignInScreen from "../pages/login";
import SignUpScreen from "../pages/signUp";
import ProfileScreen from "../pages/profile";
import AddPost from "../pages/addPost";
import EditTeam from "../pages/Admin/EditTeam";
import AddTeam from "../pages/Admin/AddTeam";
import MyTeams from "../pages/Admin/MyTeams";
import EditProfile from "../pages/EditProfile";
import * as SecureStore from "expo-secure-store";
import GoogleMapsPage from "../pages/Admin/MapPage";
import { TeamContext, TeamProvider } from "../contexts/teamContext";

export const AuthContext = React.createContext(null);

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const CreatePostStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="CreatePost"
        component={AddPost}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="profilim"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="editProfile"
        component={EditProfile}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const MyTeamsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, tabBarVisible: false }}
    >
      <Stack.Screen
        name="MyTeams"
        component={MyTeams}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="editTeam"
        component={EditTeam}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="addTeam"
        component={AddTeam}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default function App({ navigation }) {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;
      try {
        // Restore token stored in `SecureStore` or any other encrypted storage
        console.log("usertoken");
        userToken = await SecureStore.getItemAsync("userToken");
        console.log(userToken);
        dispatch({ type: "RESTORE_TOKEN", token: userToken });
      } catch (e) {
        console.err(e);
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
        // In the example, we'll use a dummy token

        dispatch({ type: "SIGN_IN", token: data });
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

  return (
    <AuthContext.Provider value={authContext}>
      <TeamProvider value={TeamContext}>
      <NavigationContainer>
        {state.isLoading ? (
          // We haven't finished checking for the token yet
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Splash" component={SplashScreen} />
          </Stack.Navigator>
        ) : state.userToken == null ? (
          // No token found, user isn't signed in
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
          </Stack.Navigator>
        ) : (
          // User is signed in
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                let iconStyle = {};
                size = 32;

                if (route.name === "Home") {
                  iconName = focused ? "home" : "home-outline";
                } else if (route.name === "Paylaş") {
                  iconName = focused ? "add" : "add-outline";
                  iconStyle = {
                    borderWidth: 2,
                    borderColor: color,
                    borderRadius: 21,
                    paddingVertical: 2,
                    paddingHorizontal: 4,
                    paddingRight: 1,
                    marginTop: -48,
                    backgroundColor: "white",
                    overflow: "hidden",
                    elevation: 10,
                  };
                } else if (route.name === "Profile") {
                  iconName = focused ? "person" : "person-outline";
                } else if (route.name === "MyTeam") {
                  iconName = focused ? "people" : "people-outline";
                } else if (route.name === "Map") {
                  iconName = focused ? "map" : "map-outline";
                }

                return (
                  <Ionicons
                    name={iconName}
                    size={size}
                    color={color}
                    style={iconStyle}
                  />
                );
              },
              tabBarLabel: () => null,
              headerShown: false,
            })}
          >
            <Tab.Screen name="Home" component={HomeStack} />
            <Tab.Screen name="Map" component={GoogleMapsPage} />
            <Tab.Screen name="Paylaş" component={CreatePostStack} />
            <Tab.Screen name="MyTeam" component={MyTeamsStack} />
            <Tab.Screen name="Profile" component={ProfileStack} />
          </Tab.Navigator>
        )}
      </NavigationContainer>
      </TeamProvider>
    </AuthContext.Provider>
  );
}
