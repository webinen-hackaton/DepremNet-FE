import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  Text,
  Button,
  ScrollView,
  RefreshControl,
  StyleSheet,
  Alert,
} from "react-native";
import Post from "../../components/post";
import { useFocusEffect } from "@react-navigation/native";



function HomeScreen() {
  Alert.alert("Tehlikeli Bölgedesiniz",
    "Güvenliğiniz amacıyla konum bilgileriniz düzenli olarak yetkililere gönderilecektir.",
    [
      {
        text: "Tamam",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
    ],
    { cancelable: false }
  );
  const [posts, setPosts] = useState([
    {
      imageLink:
        "https://www.middleeasteye.net/sites/default/files/styles/article_page/public/images-story/AP23037551812233.jpg?itok=JLdRh6M7",
      passTimeText: "3 saat",
      postText: "Bina tamamen yıkıldı, yardıma ihtiyacımız var.",
      status: "help_needed",
      locationLink: "https://www.google.com/maps?q=41.0082°+N,+28.9784°+E",
      profileImage: "https://i.pravatar.cc/150?",
      username: "Ayşe Karaca",
    },
    {
      imageLink:
        "https://www.aljazeera.com/wp-content/uploads/2023/02/339C3LT-highres.jpg?resize=1920%2C1440",
      passTimeText: "15 dakika",
      postText: "Ailemle birlikte güvendeyiz, suya ihtiyacımız var.",
      status: "rescued",
      locationLink: "https://www.google.com/maps?q=38.4192°+N,+27.1287°+E",
      profileImage: "https://i.pravatar.cc/150?",
      username: "Mehmet Özcan",
    },
    {
      imageLink:
        "https://media.cnn.com/api/v1/images/stellar/prod/230213132643-01-earthquake-mesut-hancer-020723.jpg?c=original",
      passTimeText: "5 saat",
      postText: "Evimiz ağır hasar aldı, barınacak bir yere ihtiyacımız var.",
      status: "help_needed",
      locationLink: "https://www.google.com/maps?q=39.9334°+N,+32.8597°+E",
      profileImage: "https://i.pravatar.cc/150?",
      username: "Elif Öztürk",
    },
    {
      imageLink:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS23hH6F5TPgxQYZ3Ev48mAJpq4mZVfiqe_EQ&usqp=CAU",
      passTimeText: "1 saat",
      postText: "Yardıma ihtiyacımız var, enkaz altında kaldık.",
      status: "in_danger",
      locationLink: "https://www.google.com/maps?q=37.8715°+N,+32.4847°+E",
      profileImage: "https://i.pravatar.cc/150?",
      username: "Ali Yıldız",
    },
    {
      imageLink:
        "https://media.cnn.com/api/v1/images/stellar/prod/230206131141-29-earthquake-020623-jandaris-syria.jpg?c=original",
      passTimeText: "20 dakika",
      postText: "Güvendeyiz ama gıda ve suya ihtiyacımız var.",
      status: "rescued",
      locationLink: "https://www.google.com/maps?q=37.9838°+N,+41.6211°+E",
      profileImage: "https://i.pravatar.cc/150?",
      username: "Zeynep Kaya",
    },
    {
      imageLink: "https://images.wsj.net/im-719534?width=620",
      passTimeText: "30 dakika",
      postText: "Kurtarıldık ancak tıbbi yardıma ihtiyacımız var.",
      status: "rescued",
      locationLink: "https://www.google.com/maps?q=38.7369°+N,+35.4875°+E",
      profileImage: "https://i.pravatar.cc/150?",
      username: "Burak Deniz",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // useEffect(() => {
  //   fetchPosts();
  // }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchPosts();
    }, [])
  );

  const fetchPosts = () => {
    // Simulated API call to fetch posts
    setLoading(true);
    const newPosts = [
      {
        imageLink:
          "https://static01.nyt.com/images/2023/02/11/multimedia/11QUAKE-LEDEALL-COVERsub-fqjh/11QUAKE-LEDEALL-COVERsub-fqjh-videoSixteenByNine1050.jpg",
        passTimeText: "10 saat",
        postText: "Bina tamamen çöktü, yardıma ihtiyacımız var.",
        status: "help_needed",
        locationLink: "https://www.google.com/maps?q=41.0151°+N,+28.9792°+E",
        profileImage: "https://i.pravatar.cc/150?",
        username: "Oğuzhan Türk",
      },
      {
        imageLink:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-PoboiQLN5tiOElu72iDZAmkeHv6zDxuWWg&usqp=CAU",
        passTimeText: "7 saat",
        postText:
          "Birkaç kişiyle birlikte mahsur kaldık, kurtarılmayı bekliyoruz.",
        status: "in_danger",
        locationLink: "https://www.google.com/maps?q=41.0138°+N,+28.9497°+E",
        profileImage: "https://i.pravatar.cc/150?",
        username: "Buse Arslan",
      },
      {
        imageLink:
          "https://static.israel21c.org/www/uploads/2016/08/earthquake_nepal.jpg",
        passTimeText: "4 saat",
        postText:
          "Kurtarıldık fakat yaralıyız, acil tıbbi yardıma ihtiyacımız var.",
        status: "rescued",
        locationLink: "https://www.google.com/maps?q=37.2227°+N,+28.3623°+E",
        profileImage: "https://i.pravatar.cc/150?",
        username: "Caner Aksu",
      },
      {
        imageLink:
          "https://www.government.se/globalassets/government/bilder/forsvarsdepartementet/temasida-jordbavningskatastrofen-i-turkiet-och-syrien/search-and-rescue-teams-on-site-in-affected-areas_3/?width=712&rmode=crop&heightratio=0.667&quality=85",
        passTimeText: "2 saat",
        postText: "Enkaz altında kaldık, yardıma ihtiyacımız var.",
        status: "in_danger",
        locationLink: "https://www.google.com/maps?q=37.8716°+N,+32.4848°+E",
        profileImage: "https://i.pravatar.cc/150?",
        username: "Deniz Uzun",
      },
      {
        imageLink:
          "https://media-cldnry.s-nbcnews.com/image/upload/t_fit-760w,f_auto,q_auto:best/rockcms/2023-02/230207-turkey-earthquake-liveblog-mn-1155-0f2224.jpg",
        passTimeText: "30 dakika",
        postText: "Gıda ve içme suyuna ihtiyacımız var.",
        status: "rescued",
        locationLink: "https://www.google.com/maps?q=36.8841°+N,+30.7056°+E",
        profileImage: "https://i.pravatar.cc/150?",
        username: "Ece Korkmaz",
      },

      {
        imageLink:
          "https://static.toiimg.com/thumb/msid-97710234,width-1070,height-580,imgsize-1386283,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg",
        passTimeText: "16 saat",
        postText: "Evimiz ağır hasar aldı, barınacak bir yere ihtiyacımız var.",
        status: "help_needed",
        locationLink: "https://www.google.com/maps?q=37.7914°+N,+29.0864°+E",
        profileImage: "https://i.pravatar.cc/150?",
        username: "Yusuf Demir",
      },
      {
        imageLink:
          "https://i.guim.co.uk/img/media/a01ca69e65f339d7f3ce7f75f9c42e091ed6fb82/0_244_4040_2424/master/4040.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=8133eb594d7a1d4fdc8cbcde49329e54",
        passTimeText: "1 gün",
        postText: "Kurtarıldık, tıbbi yardıma ve gıdaya ihtiyacımız var.",
        status: "rescued",
        locationLink: "https://www.google.com/maps?q=37.0379°+N,+35.3213°+E",
        profileImage: "https://i.pravatar.cc/150?",
        username: "Zehra Yılmaz",
      },
    ];
    const shuffled = newPosts.sort(() => 0.5 - Math.random());
    let selected = shuffled.slice(0, 3);

    setPosts([...selected, ...posts]);
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
    <SafeAreaView style={styles.container}>
      {/* <StandartButton text="Send Post" textStyle={styles.sendPostText} onClick={sendPost} /> */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
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
  },
});

export default HomeScreen;
