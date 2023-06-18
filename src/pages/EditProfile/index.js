import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as SecureStore from "expo-secure-store";
import { useNavigation } from "@react-navigation/native";
import jwt_decode from "jwt-decode";
import { getProfile, updateProfile } from "../../api";


export default function EditProfile() {
  const { navigate } = useNavigation();
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [data, setData] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [nationalityId, setNationalityId] = useState(null);
  const [email, setEmail] = useState(null);

  const getUserProfile = async() => {
    const token = await SecureStore.getItemAsync("userToken");
    const decoded = jwt_decode(token);

    getProfile(decoded.id)
      .then((res) => {
        console.log("res", res.data);
        setData(res.data);
        setFirstName(res.data.first_name);
        setLastName(res.data.last_name);
        setPhoneNumber(res.data.phone_number);
        setProfileImage(res.data.profile_photo);
        setNationalityId(res.data.nationality_id)
        setEmail(res.data.email)
      })
      .catch((e) => {
        console.log(e);
      });

    console.log(decoded);
  };

  useEffect(() => {
    getUserProfile();

    return () => {};
  }, []);
    

  const handleChooseProfileImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const imagePickerResult = await ImagePicker.launchImageLibraryAsync();

    if (!imagePickerResult.cancelled) {
      setProfileImage(imagePickerResult.uri);
    }
  };

  const handleSaveProfile = async() => {
    // Save profile changes
    // You can implement the logic to save the changes to the backend or storage here
    console.log("Profile saved:", { username, firstName, lastName, phoneNumber, profileImage });
    const token = await SecureStore.getItemAsync("userToken");
    const decoded = jwt_decode(token);
    updateProfile(decoded.id, { id: decoded.id , first_name: firstName, last_name: lastName, phone_number: phoneNumber, profile_photo: profileImage, nationality_id: nationalityId, email: email })
      .then((res) => {
        console.log("res", res.data);
        navigate("Profile");
      }
      )
      .catch((e) => {
        console.log(e);
      }
      );
      navigate("Profile");
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <TouchableOpacity style={styles.profileImageContainer} onPress={handleChooseProfileImage}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <Text style={styles.profileImageText}>Resim Seç</Text>
          )}
        </TouchableOpacity>
        <Text style={styles.userNameText}>@razotype</Text>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Adınız</Text>
        <TextInput
          style={styles.input}
          placeholder="Adınızı giriniz"
          value={firstName}
          onChangeText={setFirstName}
        />
        <Text style={styles.label}>Soyadınız</Text>
        <TextInput
          style={styles.input}
          placeholder="Soyadınızı giriniz"
          value={lastName}
          onChangeText={setLastName}
        />
        <Text style={styles.label}>Telefon numarası</Text>
        <TextInput
          style={styles.input}
          placeholder="Telefon numaranızı giriniz"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
        <Text style={styles.buttonText}>Kaydet</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#ccc",
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileImageText: {
    fontSize: 16,
    fontWeight: "bold",
    justifyContent: "center",
    textAlign: "center",
    color: "#000",
  },
  userNameText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
