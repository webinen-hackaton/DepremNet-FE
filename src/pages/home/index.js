import React, { useState, useEffect } from "react";
import { View,SafeAreaView, Text, Button, ScrollView, RefreshControl, StyleSheet } from "react-native";
import Post from "../../components/post";

function HomeScreen() {
  const [posts, setPosts] = useState([{
    imageLink: "https://pbs.twimg.com/media/FywG4J-XsAEw-p4?format=jpg",
    passTimeText: "19 saat",
    postText: "Beğendiğiniz alt coinleri yazar mısınız? Ekip olarak inceleyeceğiz.",
    status: "rescued",
    locationLink: "https://goo.gl/maps/1D1Afb8gYLSqM4bL8",
    profileImage: "https://app.uizard.io/placeholders/avatars/avatar-4.png",
    username: "Furkan Pınar"
  },
  {
    imageLink: "https://pbs.twimg.com/media/FywG4J-XsAEw-p4?format=jpg",
    passTimeText: "19 saat",
    postText: "Beğendiğiniz alt coinleri yazar mısınız? Ekip olarak inceleyeceğiz.",
    status: "",
    locationLink: "https://goo.gl/maps/1D1Afb8gYLSqM4bL8",
    profileImage: "https://app.uizard.io/placeholders/avatars/avatar-4.png",
    username: "Furkan Pınar",
  },
  {
    imageLink: "https://pbs.twimg.com/media/FywG4J-XsAEw-p4?format=jpg",
    passTimeText: "19 saat",
    postText: "Beğendiğiniz alt coinleri yazar mısınız? Ekip olarak inceleyeceğiz.",
    status: "",
    locationLink: "https://goo.gl/maps/1D1Afb8gYLSqM4bL8",
    profileImage: "https://app.uizard.io/placeholders/avatars/avatar-4.png",
    username: "Furkan Pınar", 
  }]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    // Simulated API call to fetch posts
    setLoading(true);
      const newPosts = [
        {
          imageLink: "https://trthaberstatic.cdn.wp.trt.com.tr/resimler/1608000/mehmet-aydin-ciftlik-bank-aa-trt-kolaj-1609872.jpg",
          passTimeText: "19 saat",
          postText: "1 yatır 10 al",
          status: "On Way",
          locationLink: "https://goo.gl/maps/1D1Afb8gYLSqM4bL8",
          profileImage: "https://pps.whatsapp.net/v/t61.24694-24/131870145_174819131048375_4331519892855621978_n.jpg?ccb=11-4&oh=01_AdRndxFNm3WFXvqbw9zTjtBrOWP0bdE3unDj0TO3RONMLw&oe=6499D259",
          username: "Murat Celik"
        },
        {
          imageLink: "https://i.ytimg.com/vi/KJMt_rUpalM/maxresdefault.jpg",
          passTimeText: "19 saat",
          postText: "Sözler köşkü vs Evrim Ağacı",
          status: "rescued",
          locationLink: "https://goo.gl/maps/1D1Afb8gYLSqM4bL8",
          profileImage: "https://lh3.googleusercontent.com/pxaqCDQ9z5YQ9aPHrO_oaga6X0DxNolGPIiJwOzfK8LWxh6ngxXRni8FskPDyEzbVXnCpMl4zjS1BFRSg8f6T9xZo3CSaYK33vdaoZpR",
          username: "Orkun Kurul",
        },
      ];
      setPosts([...newPosts, ...posts]);
      setLoading(false);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchPosts();
    setRefreshing(false);
  };

  const sendPost = () => {
    // Simulated API call to send post
    alert("Post sent!");
  };

  return (
    <SafeAreaView
     style={styles.container}>
      {/* <StandartButton text="Send Post" textStyle={styles.sendPostText} onClick={sendPost} /> */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
        removeClippedSubviews
      >
        {posts.map((post, index) => (
          <Post
            key={index}
            username={post.username}
            profileImage={post.profileImage}
            imageLink={post.imageLink}
            passTimeText={post.passTimeText}
            postText={post.postText}
            status={post.status}
            locationLink={post.locationLink}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingVertical: 10,
  },
  sendPostText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    height: 20,
    }
});

export default HomeScreen;
