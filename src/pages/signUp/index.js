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
import { register } from "../../api";

function SignInScreen() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordAgain, setPasswordAgain] = React.useState("");
  const [name, setName] = React.useState("");
  const [surname, setSurname] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [tckn, setTckn] = React.useState("");

  const [error, setError] = React.useState(false);
  const { navigate } = useNavigation();

  const { signIn } = React.useContext(AuthContext);

  const handleSignUp = () => {
    setError(false);
    if (password !== passwordAgain) {
      setError(true);
      return;
    }

    register({
      email,
      password,
      first_name: name,
      last_name: surname,
      phone_number: phone,
      nationality_id: tckn,
    })
      .then((res) => {
        console.log("res", res);
        if (res) {
          navigate("Home");
        }
      })
      .catch((err) => {
        setError(true);
        console.log("err", err);
      });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
        <ScrollView>
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
                onChangeText={(text) => setEmail(text)}
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
                onChangeText={(text) => setPassword(text)}
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
                onChangeText={(text) => setPasswordAgain(text)}
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
                  onChangeText={(text) => setName(text)}
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
                  onChangeText={(text) => setSurname(text)}
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
                onChangeText={(text) => setPhone(text)}
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
                onChangeText={(text) => setTckn(text)}
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

            <View style={{ width: "100%", alignItems: "center" }}>
              <Touchable onClick={handleSignUp} text="Üye Ol" />
            </View>
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
        </ScrollView>
      </KeyboardAvoidingView>
      {/* <Button title="Sign in" onPress={() => signIn({ username, password })} /> */}
    </SafeAreaView>
  );
}

export default SignInScreen;

const styles = StyleSheet.create({});
