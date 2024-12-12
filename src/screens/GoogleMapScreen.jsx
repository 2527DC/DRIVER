import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

const GoogleMapScreen = () => {
  const [sourceLatitude, setSourceLatitude] = useState(null);
  const [sourceLongitude, setSourceLongitude] = useState(null);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (info) => {
        setSourceLatitude(info.coords.latitude);
        setSourceLongitude(info.coords.longitude);
      },
      (error) => console.error(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }, []);

  return (
    <View className="flex-1">
      {/* MapView */}
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: sourceLatitude || 37.78825,
          longitude: sourceLongitude || -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {sourceLatitude && sourceLongitude && (
          <Marker
            coordinate={{
              latitude: sourceLatitude,
              longitude: sourceLongitude,
            }}
            title="Current Location"
          />
        )}
      </MapView>
    </View>
  );
};

export default GoogleMapScreen;
