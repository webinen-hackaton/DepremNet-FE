import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TextInputInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import React from "react";
import { AuthContext } from "../../routes/index";
import Touchable from "../../components/button";
import Input from "../../components/inputWithIcon";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

function SignInScreen() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { navigate } = useNavigation();

  const { signIn } = React.useContext(AuthContext);

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
              Üyelik Formu
            </Text>
          </View>
          <View style={{ paddingHorizontal: 15, paddingVertical: 30 }}>
            <View style={{ marginVertical: 15 }}>
              <Text style={{ fontWeight: "bold", marginBottom: 5 }}>
                Email *
              </Text>
              <TextInput
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
            <View style={{ marginVertical: 15 }}>
              <Text style={{ fontWeight: "bold", marginBottom: 5 }}>
                Şifre Tekrarı *
              </Text>
              <TextInput
                placeholder="Şifrenizi Tekrar giriniz"
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
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{ marginVertical: 15, flex: 1, marginHorizontal: 5 }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    marginBottom: 5,
                  }}
                >
                  İsim *
                </Text>
                <TextInput
                  placeholder="Isim giriniz"
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
              <View
                style={{ marginVertical: 15, flex: 1, marginHorizontal: 5 }}
              >
                <Text style={{ fontWeight: "bold", marginBottom: 5 }}>
                  Soyisim *
                </Text>
                <TextInput
                  placeholder="Soyisim giriniz"
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
            </View>
            <View style={{ marginVertical: 15 }}>
              <Text style={{ fontWeight: "bold", marginBottom: 5 }}>
                Telefon Numarası *
              </Text>
              <TextInput
                placeholder="5444332211"
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
            <View style={{ marginVertical: 15 }}>
              <Text style={{ fontWeight: "bold", marginBottom: 5 }}>
                Tc Kimlik No *
              </Text>
              <TextInput
                placeholder="11234567890"
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

            <Touchable text="Üye Ol" />
            <TouchableOpacity
              onPress={() => {
                navigate("SignIn");
              }}
              style={{ alignItems: "center", paddingVertical: 15 }}
            >
              <Text style={{ color: "#030303" }}>
                Zaten bir hesabın mı var ?{" "}
                <Text style={{ fontWeight: "bold" }}>Giriş Yap.</Text>
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
