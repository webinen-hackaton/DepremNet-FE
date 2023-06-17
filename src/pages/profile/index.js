import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert
} from "react-native";
import StandartButton from "../../components/button";
import helpIcon from "../../../assets/emergency.png";
import logoutIcon from "../../../assets/logout.png";
import Post from "../../components/post";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../routes";
import * as SecureStore from "expo-secure-store";

export default ProfileScreen = () => {
  const { navigate } = useNavigation();
  const [ amISafe, setAmISafe ] = React.useState(true);
  const headerImage =
    "https://assets.api.uizard.io/api/cdn/stream/7c1ed95c-35bf-47d5-9257-f0f74117b9dd.png%22";
  const profileImagePlaceholder =
    "https://app.uizard.io/placeholders/avatars/avatar-4.png";
  const { signOut } = React.useContext(AuthContext);
  const emergencyCall = () => {
    Alert.alert(
      "Acil durum talebiniz ekiplere iletilmiştir.",
      "Ekiplerin size daha kolay ulaşması için konum bilginizi güncellemek ister misiniz?",
      [
        {
          text: "Hayır",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Evet", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );
  };


  return (
    <View style={styles.container}>
      <ScrollView>
        <Image style={styles.headerImage} source={{ uri: headerImage }} />
        <View style={styles.profileContainer}>
          <Image
            style={styles.profileImage}
            source={{ uri: profileImagePlaceholder }}
          />
          <Text style={styles.userNameText}>Furkan Pınar</Text>
          <Text style={styles.nicknameText}>@rsazotype</Text>
          <View style={styles.buttonContainer}>
          <TouchableOpacity
              style={[styles.helpButton, {backgroundColor: amISafe ? "transparent" : "#ff0000"}]}
              onPress={() => {
                emergencyCall()
              }}
            >
              <Image style={styles.helpIcon2} source={helpIcon} />
            </TouchableOpacity>
            <StandartButton
              text="Profilimi Düzenle"
              buttonStyle={styles.editProfileButton}
              textStyle={styles.editprofileStyle}
              onClick={() => {
                navigate("editProfile");
              }}
            />
            
            <TouchableOpacity
              style={styles.helpButton}
              onPress={() => {
                console.log("sign out");
                SecureStore.deleteItemAsync("userToken");
                signOut();
              }}
            >
              <Image style={styles.helpIcon} source={logoutIcon} />
            </TouchableOpacity>
          </View>
        </View>

        <Post
          username="Furkan Pınar"
          profileImage={profileImagePlaceholder}
          imageLink="https://pbs.twimg.com/media/FywG4J-XsAEw-p4?format=jpg"
          passTimeText="19 saat"
          postText="Beğendiğiniz alt coinleri yazar mısınız? Ekip olarak inceleyeceğiz."
          status="rescued"
          locationLink="https://goo.gl/maps/1D1Afb8gYLSqM4bL8"
        />
        <Post
          username="Furkan Pınar"
          profileImage={profileImagePlaceholder}
          imageLink="https://pbs.twimg.com/media/FywG4J-XsAEw-p4?format=jpg"
          passTimeText="19 saat"
          postText="Beğendiğiniz alt coinleri yazar mısınız? Ekip olarak inceleyeceğiz."
          status="rescued"
          locationLink="https://goo.gl/maps/1D1Afb8gYLSqM4bL8"
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerImage: {
    height: 200,
  },
  profileContainer: {
    alignItems: "center",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginTop: -40,
    overflow: "hidden",
    borderColor: "#000",
  },
  userNameText: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  nicknameText: {
    fontSize: 16,
    color: "#000",
    marginTop: 5,
  },
  buttonContainer: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 20,
    marginTop: 30,
    marginBottom: 20,
  },
  editProfileButton: {
    backgroundColor: "transparent",
    padding: 6,
    marginHorizontal: 2,
    width: "60%",
  },
  helpIcon: {
    width: 20,
    height: 20,
  },
  helpIcon2: {
    width: 20,
    height: 20,
    tintColor: "#000"
  },
  editprofileStyle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    height: 20,
  },
  helpButton: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderRadius: "100%",
    borderColor: "#000",
    padding: 6,
    width: 35,
    marginHorizontal: 2,
  },
});
