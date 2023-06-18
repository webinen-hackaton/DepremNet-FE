import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { Linking } from "react-native";

const GoogleMapsPage = () => {
  const [location, setLocation] = useState(null);
  const [mapMarkers, setmarkers] = useState([]);
  const [teamMarkers, setTeamMarkers] = useState([]);
  useEffect(() => {
    // Request location permission and retrieve current location
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        // Handle permission denied
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      exportMarkersToJson(location.coords.latitude, location.coords.longitude);
      exportMarkersToJsonForTeams(
        location.coords.latitude,
        location.coords.longitude
      );
    })();
  }, []);

  const exportMarkersToJson = (latitude, longitude) => {
    const radius = 5000; // 5 km

    // Generate random markers within the specified radius
    const markers = [];
    const numMarkers = 10; // Number of markers to generate

    for (let i = 0; i < numMarkers; i++) {
      // Generate random latitude and longitude within the radius
      const latOffset = Math.random() * 2 * radius - radius;
      const lngOffset = Math.random() * 2 * radius - radius;
      const lat = latitude + latOffset / 111000; // 1 degree of latitude is approximately 111,000 meters
      const lng =
        longitude + lngOffset / (111000 * Math.cos((latitude * Math.PI) / 180)); // Adjust longitude for the latitude

      // Create the marker object
      const marker = {
        id: i + 1,
        latitude: lat,
        longitude: lng,
      };

      markers.push(marker);
    }
    setmarkers(markers);
  };
  const exportMarkersToJsonForTeams = (latitude, longitude) => {
    const radius = 5000; // 5 km

    // Generate random markers within the specified radius
    const markers = [];
    const numMarkers = 5; // Number of markers to generate

    for (let i = 0; i < numMarkers; i++) {
      // Generate random latitude and longitude within the radius
      const latOffset = Math.random() * 2 * radius - radius;
      const lngOffset = Math.random() * 2 * radius - radius;
      const lat = latitude + latOffset / 111000; // 1 degree of latitude is approximately 111,000 meters
      const lng =
        longitude + lngOffset / (111000 * Math.cos((latitude * Math.PI) / 180)); // Adjust longitude for the latitude

      // Create the marker object
      const marker = {
        id: i + 1,
        latitude: lat,
        longitude: lng,
      };

      markers.push(marker);
    }
    setTeamMarkers(markers);
  };

  return (
    <>
      <View style={styles.container}>
        {location && (
          <MapView
            provider="google"
            style={styles.map}
            showsUserLocation={true}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            {mapMarkers.map((marker) => (
              <Marker
                key={marker.id}
                coordinate={{
                  latitude: marker.latitude,
                  longitude: marker.longitude,
                }}
                title={marker.title}
                description={marker.description}
                pinColor="red"
                onPress={(e) => {
                  console.log(e.nativeEvent.coordinate.latitude);
                  Linking.openURL(
                    `https://maps.google.com/?q=${e.nativeEvent.coordinate.latitude},${e.nativeEvent.coordinate.longitude}`
                  );
                }}
              />
            ))}
            {teamMarkers.map((marker) => (
              <Marker
                key={marker.id}
                coordinate={{
                  latitude: marker.latitude,
                  longitude: marker.longitude,
                }}
                title={`Takım ${marker.id}`}
                description={marker.description}
                pinColor="blue"
              />
            ))}
          </MapView>
        )}
      </View>
      <View
        style={{
          backgroundColor: "#fff",
          borderTopStartRadius: 10,
          borderTopEndRadius: 10,
          padding: 5,
          paddingBottom: 30,
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <Text>
          <Text
            style={{
              color: "red",
              fontWeight: "bold",
              marginBottom: 10,
            }}
          >
            &#128308; Depremzedeler
          </Text>
          <Text style={{ color: "blue", fontWeight: "bold", marginBottom: 10 }}>
            {"\n\n"}&#128309; Takımlar
          </Text>
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default GoogleMapsPage;
