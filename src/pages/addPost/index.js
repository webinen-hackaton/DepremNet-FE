import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Platform,
  Alert,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import { useNavigation } from "@react-navigation/native";

export default function AddPost() {
  const { navigate } = useNavigation();
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [cameraPermission, setCameraPermission] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    if (Platform.OS !== "web") {
      getPermissionsAsync();
    }
  }, []);

  const getPermissionsAsync = async () => {
    const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
    const { status: mediaLibraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (cameraStatus === "granted" && mediaLibraryStatus === "granted") {
      setCameraPermission(true);
    } else {
      Alert.alert(
        "İzin reddedildi",
        "Üzgünüz, kamera kullanmak ve fotoğraf seçmek için izin gerekiyor!"
      );
    }
  };

  const handleTextChange = (inputText) => {
    setText(inputText);
  };

  const handleChoosePhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const handleTakePhoto = async () => {
    if (cameraRef.current) {
      let photo = await cameraRef.current.takePictureAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (!photo.cancelled) {
        let savedPhoto = await MediaLibrary.createAssetAsync(photo.uri);
        setImage(savedPhoto.uri);
      }
    }
  };

  const openCamera = async () => {
    let permissionResult = await Camera.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("İzin reddedildi", "Kamera kullanmak için izin gerekiyor!");
      return;
    }
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const handleCancel = () => {
    setText("");
    setImage(null);
  };

  const handleShare = () => {
    console.log("Durum metni:", text);
    console.log("Seçilen fotoğraf:", image);

    // Paylaşma işlemini burada gerçekleştirin

    handleCancel();
  };

  if (cameraPermission === null) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.permissionText}>İzinler kontrol ediliyor...</Text>
      </SafeAreaView>
    );
  }

  if (cameraPermission === false) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.permissionText}>Kamera ve medya kitaplığına erişim izni gerekiyor!</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
       <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleCancel}>
          <Text style={styles.headerButton} onPress={()=>{navigate("Home")}}>İptal et</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleShare} disabled={!text && !image}>
          <Text style={[styles.headerButton2, !text && !image && { opacity: 1 }]}>
            Paylaş
          </Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.textInput}
        multiline
        maxLength={280}
        placeholder="Durumunuz Nedir?"
        value={text}
        onChangeText={handleTextChange}
      />
    <View style={styles.imageContainer}>
      <TouchableOpacity style={styles.imageButton} onPress={handleChoosePhoto}>
        <Ionicons name="image" size={24} color="black" />
        <Text style={styles.imageButtonText}>Fotoğraf Seç</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.imageButton} onPress={openCamera}>
        <Ionicons name="camera" size={24} color="black" />
        <Text style={styles.imageButtonText}>Fotoğraf Çek</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.imageContainer2}>
      {image && (
        <Image source={{ uri: image }} style={styles.imagePreview} />
      )}
    </View></View>
    </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 32,
    marginHorizontal: 16
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  headerButton: {
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontWeight: "bold",
    borderWidth: 1,
    borderRadius: 16,
    borderColor: "black",
  },
  headerButton2: {
    fontSize: 16,
    fontWeight: "bold",
    borderRadius: 16,
    paddingHorizontal: 21,
    paddingVertical: 8,
    backgroundColor: "#1DB954",
    overflow: "hidden",
    color: "white",
  },
  textInput: {
    height: 150,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
  },
  imageButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  imageButtonText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "bold",
  },
  imagePreview: {
    width: "100%",
    height: "100%",
  },
  cameraPreview: {
    flex: 1,
    marginBottom: 16,
    borderRadius: 12,
    overflow: "hidden",
  },
  permissionText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 200,
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  imageContainer2: {
    borderRadius: 12,
    height: 375,
    overflow: "hidden",
  },
});
