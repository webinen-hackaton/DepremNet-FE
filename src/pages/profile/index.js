import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import StandartButton from "../../components/button";
import helpIcon from "../../../assets/emergency.png";
import logoutIcon from "../../../assets/logout.png";
import Post from "../../components/post";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../routes";
import * as SecureStore from "expo-secure-store";
import jwt_decode from "jwt-decode";
import { getProfile } from "../../api";
import * as Location from 'expo-location';
import { useFocusEffect } from "@react-navigation/native";

export default ProfileScreen = () => {
  const { navigate } = useNavigation();

  const [data, setData] = useState(null);

  const [amISafe, setAmISafe] = React.useState(true);

  const headerImage =
    "https://toursce.com/blog/wp-content/uploads/2019/01/Bursa.jpg";
  const profileImagePlaceholder =
    "https://app.uizard.io/placeholders/avatars/avatar-4.png";
  const { signOut } = React.useContext(AuthContext);
  const emergencyCall = () => {
    setAmISafe(!amISafe);
    if(!amISafe){
      return;
    }
    Alert.alert(
      "Acil durum talebiniz ekiplere iletilmiştir.",
      "Ekiplerin size daha kolay ulaşması için konum bilginizi güncellemek ister misiniz?",
      [
        {
          text: "Hayır",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Evet", onPress: () => updateLocation() }
      ],
      { cancelable: false }
    );
  };

  handleProfile = async () => {
    const token = await SecureStore.getItemAsync("userToken");
    const decoded = jwt_decode(token);

    getProfile(decoded.id)
      .then((res) => {
        console.log("res", res.data);
        setData(res.data);
      })
      .catch((e) => {
        console.log(e);
      });

    console.log(decoded);
  };

  useFocusEffect(React.useCallback(() => {
    handleProfile();

    return () => {};
  }, []));

  const updateLocation = async () => {
    try {
      await Location.requestForegroundPermissionsAsync();
      const location = await Location.getCurrentPositionAsync();
      console.log(location);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <View style={styles.container}>
      <ScrollView>
        <Image style={styles.headerImage} source={{ uri: headerImage }} />
        <View style={styles.profileContainer}>
          <Image
            style={styles.profileImage}
            source={{ uri: (data?.profile_photo ? data.profile_photo:`https://i.pravatar.cc/150?img=${data?.id}`) }}
          />
          <Text style={styles.userNameText}>{data?.first_name+ " " + data?.last_name}</Text>
          {/* <Text style={styles.nicknameText}>@rsazotype</Text> */}
          <View style={styles.buttonContainer}>

          {amISafe ?
            <TouchableOpacity
              style={styles.helpButton}
              onPress={() => {
                emergencyCall()
              }}
            >
              <Image style={styles.helpIcon} source={helpIcon} />
            </TouchableOpacity>:
            <TouchableOpacity
              style={styles.helpButton2}
              onPress={() => {
                emergencyCall();
              }}
            >
              <Image style={styles.helpIcon2} source={helpIcon} />
            </TouchableOpacity>
          }

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
          username={data?.first_name+ " " + data?.last_name}
          profileImage={`https://i.pravatar.cc/150?img=${data?.id}`}
          imageLink="https://static.euronews.com/articles/stories/07/38/88/82/1440x810_cmsv2_75962034-2ff3-59b2-922c-538693617480-7388882.jpg"
          passTimeText="19 saat"
          postText="Uludağ üniversitesi mühendislik fakültesi m2 sınıfında mahsur kaldım kapılar açılmıyor."
          status="rescued"
          locationLink="https://goo.gl/maps/1D1Afb8gYLSqM4bL8"
        />
        <Post
          username={data?.first_name+ " " + data?.last_name}
          profileImage={`https://i.pravatar.cc/150?img=${data?.id}`}
          imageLink="https://static.birgun.net/resim/haber-detay-resim/2023/04/03/afad-duyurdu-6-il-afet-bolgesi-ilan-edildi-1146221-5.jpg"
          passTimeText="23 saat"
          postText="Nilüfer yakınlarında acil yemeğe ihtiyacım var."
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
    tintColor: "#000",
    height: 20
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
  helpButton2: {
    backgroundColor: "red",
    borderWidth: 2,
    borderRadius: "100%",
    borderColor: "#000",  
    padding: 6,
    width: 35,
    marginHorizontal: 2,
  },
});
