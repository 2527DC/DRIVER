import React from 'react';
import { Button, Linking, Platform, Alert } from 'react-native';

const MapRedirect = () => {
  const source = { latitude: 12.9716, longitude: 77.5946 }; // Bangalore (source)
  const destination = { latitude: 28.7041, longitude: 77.1025 }; // Delhi (destination)

  // Define Maharashtra and Jaipur as waypoints
  const waypoints = [
    { latitude: 19.7515, longitude: 75.7139 }, // Maharashtra (waypoint)
    { latitude: 26.9124, longitude: 75.7873 }, // Jaipur (waypoint)
  ];

  const openMap = () => {
    // Format waypoints for Google Maps
    const waypointsString = waypoints
      .map((point) => `${point.latitude},${point.longitude}`)
      .join('|');

    const googleMapUrl = `https://www.google.com/maps/dir/?api=1&origin=${source.latitude},${source.longitude}&destination=${destination.latitude},${destination.longitude}&waypoints=${waypointsString}&travelmode=driving`;

    // Apple Maps requires waypoints to be added in a specific order in the URL
    let appleMapUrl = `http://maps.apple.com/?saddr=${source.latitude},${source.longitude}&daddr=${destination.latitude},${destination.longitude}&dirflg=d`;

    // Add waypoints as a comma-separated list for Apple Maps
    waypoints.forEach((point) => {
      appleMapUrl += `&waypoints=${point.latitude},${point.longitude}`;
    });

    // Check platform and open the correct URL
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
