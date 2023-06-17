import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function EditProfile() {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profileImage, setProfileImage] = useState(null);

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

  const handleSaveProfile = () => {
    // Save profile changes
    // You can implement the logic to save the changes to the backend or storage here
    console.log("Profile saved:", { username, firstName, lastName, phoneNumber, profileImage });
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
