import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TextInputInput,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { AuthContext } from "../../routes/index";
import Touchable from "../../components/button";
import Input from "../../components/inputWithIcon";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { login } from "../../api";
import * as SecureStore from "expo-secure-store";

function SignInScreen() {
  const [email, setEmail] = React.useState("a@a1.com");
  const [password, setPassword] = React.useState("123456");
  const [error, setError] = React.useState(false);
  const { navigate } = useNavigation();
  const { signIn } = React.useContext(AuthContext);
  const handleLogin = async () => {
    setError(false);
    login({
      email: email,
      password: password,
      // email: "a@a.com",
      // password: "12345",
    })
      .then(async (res) => {
        console.log("res", res.headers);
        if (res?.headers?.authorization) {
          await SecureStore.setItemAsync(
            "userToken",
            res?.headers?.authorization
          );
          // alert(await SecureStore.getItemAsync("token"));
          signIn(res?.headers?.authorization);

          // navigate("Home");
        }
      })
      .catch((err) => {
        setError(true);
        console.log("err", err);
      });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView>
        <KeyboardAvoidingView style={{ flex: 1 }}>
          <View
            style={{
              flex: 1,
              width: "100%",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{ fontSize: 34, fontWeight: "bold", marginVertical: 10 }}
            >
              {" "}
              DepremNet
            </Text>
            <Text style={{ fontSize: 18, marginVertical: 15 }}>
              {" "}
              Depremdeki güvenceniz{" "}
            </Text>
          </View>
          <View style={{ paddingHorizontal: 15, paddingVertical: 30 }}>
            <View style={{ marginVertical: 15 }}>
              <Text style={{ fontWeight: "bold", marginBottom: 5 }}>
                Email *
              </Text>
              <TextInput
                onChangeText={(e) => setEmail(e.toLowerCase())}
                style={{
                  height: 40,
                  paddingHorizontal: 0,
                  borderWidth: 1,
                  borderRadius: 10,
                  fontSize: 20,
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                }}
                placeholder="Email adresinizi giriniz"
              />
            </View>
            <View style={{ marginVertical: 15 }}>
              <Text style={{ fontWeight: "bold", marginBottom: 5 }}>
                Şifre *
              </Text>
              <TextInput
                onChangeText={(e) => setPassword(e)}
                placeholder="Şifrenizi giriniz"
                secureTextEntry={true}
                style={{
                  height: 40,
                  paddingHorizontal: 0,
                  borderWidth: 1,
                  borderRadius: 10,
                  fontSize: 20,
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                }}
              />
            </View>

            <View style={{ width: "100%", alignItems: "center" }}>
              <Touchable onClick={handleLogin} text="Giriş Yap" />
            </View>
            {error && (
              <View style={{ width: "100%", alignItems: "center", padding: 5 }}>
                <Text
                  style={{ fontWeight: "bold", fontSize: 16, color: "#f00" }}
                >
                  Hatali Şifre !
                </Text>
              </View>
            )}
            <TouchableOpacity
              onPress={() => {
                navigate("SignUp");
              }}
              style={{ alignItems: "center", paddingVertical: 15 }}
            >
              <Text style={{ color: "#030303" }}>
                Hesabın yok mu ?{" "}
                <Text style={{ fontWeight: "bold" }}>Üye Ol.</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
      {/* <Button title="Sign in" onPress={() => signIn({ username, password })} /> */}
    </SafeAreaView>
  );
}

export default SignInScreen;

const styles = StyleSheet.create({});
