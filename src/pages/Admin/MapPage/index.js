import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const GoogleMapsPage = () => {
    const [location, setLocation] = useState(null);
  
    useEffect(() => {
      // Request location permission and retrieve current location
      (async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          // Handle permission denied
          return;
        }
        
        const location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      })();
    }, []);
  
    return (
      <View style={styles.container}>
        {location && (
          <MapView
            style={styles.map}
            showsUserLocation={true}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              title="My Location"
            />
          </MapView>
        )}
      </View>
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
  