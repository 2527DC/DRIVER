import React from 'react';
import { Button, Linking, Platform, Alert } from 'react-native';

const MapRedirect = () => {
  const source = { latitude: 12.9716, longitude: 77.5946 }; // Example source coordinates (Bangalore)
  const destination = { latitude: 28.7041, longitude: 77.1025 }; // Example destination coordinates (Delhi)

  // Example waypoints
  const waypoints = [
    { latitude: 15.3173, longitude: 75.7139 }, // Example: Hubli
    { latitude: 19.0760, longitude: 72.8777 }, // Example: Mumbai
  ];

  const openMap = () => {
    // Format waypoints for Google Maps
    const waypointsString = waypoints
      .map((point) => `${point.latitude},${point.longitude}`)
      .join('|');

    const googleMapUrl = `https://www.google.com/maps/dir/?api=1&origin=${source.latitude},${source.longitude}&destination=${destination.latitude},${destination.longitude}&waypoints=${waypointsString}&travelmode=driving`;
    const appleMapUrl = `http://maps.apple.com/?saddr=${source.latitude},${source.longitude}&daddr=${waypoints
      .map((point) => `${point.latitude},${point.longitude}`)
      .join(',')}+to:${destination.latitude},${destination.longitude}&dirflg=d`;

    const url = Platform.OS === 'ios' ? appleMapUrl : googleMapUrl;

    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Alert.alert("Error", "Unable to open map application.");
        }
      })
      .catch((err) => console.error(err));
  };

  return <Button title="Open Map with Waypoints" onPress={openMap} />;
};

export default MapRedirect;
