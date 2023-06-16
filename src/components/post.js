import { TouchableOpacity, StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import { Linking } from 'react-native';
import React from 'react';

const Post = ({ username = "", profileImage="", imageLink = "", passTimeText = "", postText = "", status = "rescued", locationLink = "" }) => {
  const urgencyColors = ["#00FF00", "#33FF00", "#66FF00", "#99FF00", "#CCFF00", "#FFFF00", "#FFCC00", "#FF9900", "#FF6600", "#FF3300", "#FF0000"];
  
  const getStatusColor = (status) => {
    if (status === "rescued") {
      return "#00FF00"; // Yeşil
    } else if (status === "help_on_the_way") {
      return "#FFCC00"; // Turuncu
    } else if (status === "awaiting_rescue") {
      return "#FF3300"; // Kırmızı
    }
  };

  const openGoogleMaps = (locationLink) => {
    if (locationLink !== "") {
      Linking.openURL(locationLink);
    }
  };


  return (
    <View style={styles.container}>
      <Image style={styles.profileImage} source={{ uri: profileImage }} />
      <View style={styles.postInfo}>
        <View style={styles.postTop}>
        <Text style={styles.username}>{username}</Text>
        <Text style={styles.passTime}>{passTimeText} önce</Text>
        </View>
        <Text style={styles.postText}>{postText}</Text>
        <View style={styles.postContainer}>
        {imageLink !== "" && <ImageBackground style={styles.postImage} source={{ uri: imageLink }} />}</View>
        <View style={styles.postBottom}>
          <TouchableOpacity onPress={() => openGoogleMaps(locationLink)}>
            <Image style={styles.locationIcon} source={require('../../assets/location.png')} />
          </TouchableOpacity>
          {/* <View style={[styles.urgencyIndicator, { backgroundColor: urgencyColors[emergencyLevel] }]} >
          </View> */}
          {status === "rescued" ? (
            <Text style={[styles.status]}>Kurtarıldı</Text>
          ) : ( status=="On Way" ?
            <TouchableOpacity onPress={() => handleRescue()}>
              <Text style={[styles.status]}>Yolda</Text>
            </TouchableOpacity>
          :
          (
            <TouchableOpacity onPress={() => handleRescue()}>
              <Text style={[styles.status]}>Kurtarılmayı Bekliyor</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    dropShadowColor: "#000",
    dropShadowOffset: {
      width: 0,
      height: 2,
    },
    dropShadowOpacity: 0.25,
    dropShadowRadius: 3.84,
    elevation: 5,

  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  postInfo: {
    flex: 1,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  passTime: {
    fontSize: 12,
    color: '#888',
    marginBottom: 5,
    paddingRight: 10,
  },
  postText: {
    marginBottom: 5,
  },
  postImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  postBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    width: '100%',
  },
  locationIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  urgencyIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',

  },
  status: {
    fontWeight: 'bold',
    borderWidth:2,
    borderRadius: 10,
    padding: 5,
  },
  postTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  postContainer: {
    borderRadius: 15,
    marginVertical: 10,
    width: '98%',
    height: 200,
    overflow: 'hidden',
  }

});
