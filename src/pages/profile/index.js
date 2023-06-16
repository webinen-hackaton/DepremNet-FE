import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { AuthContext } from "../../routes/index";
import StandartButton from "../../components/button";
import helpIcon from "../../../assets/help.png";
import Post from "../../components/post";

export default function ProfileScreen() {
  const { signOut } = React.useContext(AuthContext);
  const headerImage = "https://assets.api.uizard.io/api/cdn/stream/7c1ed95c-35bf-47d5-9257-f0f74117b9dd.png%22";
  const profileImagePlaceholder = "https://app.uizard.io/placeholders/avatars/avatar-4.png";

  return (
    <View style={styles.container}>
      <Image style={styles.headerImage} source={{ uri: headerImage }} />
      <View style={styles.profileContainer}>
        <Image style={styles.profileImage} source={{ uri: profileImagePlaceholder }} />
        <Text style={styles.userNameText}>Furkan Pınar</Text>
        <Text style={styles.nicknameText}>@razotype</Text>
        <View style={styles.buttonContainer}>
          <StandartButton text="Profilimi Düzenle" buttonStyle={styles.editProfileButton} textStyle={styles.editprofileStyle} />
          <TouchableOpacity style={styles.helpButton}>
            <Image style={styles.helpIcon} source={helpIcon} />
          </TouchableOpacity>
        </View>
      </View>
      <Post  username="Furkan Pınar" profileImage={profileImagePlaceholder} imageLink="https://pbs.twimg.com/media/FywG4J-XsAEw-p4?format=jpg" passTimeText="19 saat" postText="Beğendiğiniz alt coinleri yazar mısınız? Ekip olarak inceleyeceğiz." emergencyLevel={7} status="rescued" locationLink="https://goo.gl/maps/1D1Afb8gYLSqM4bL8" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerImage: {
    height: 136,
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
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 10,
    marginTop: 30,
  },
  editProfileButton: {
    backgroundColor: "transparent",
    padding: 6,
    marginHorizontal: 2,
  },
  helpIcon: {
    width: 20,
    height: 20,
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
