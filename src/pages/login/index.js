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

function SignInScreen() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { navigate } = useNavigation();
  const { signIn } = React.useContext(AuthContext);

  const handleLogin = () => {
    login({
      email: "a@a.com",
      password: "12345",
    })
      .then((res) => {
        console.log("res", res);
      })
      .catch((err) => {
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
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
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

            <Touchable onClick={handleLogin} text="Giriş Yap" />
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
