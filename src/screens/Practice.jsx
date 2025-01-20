import { View, Text } from 'react-native'
import React from 'react'
import AppleMapWithStops from '../components/AppleMapWithStops'

import { useEffect, useState } from 'react';
import {  StyleSheet, PermissionsAndroid, Platform, Alert } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

const Practice = () => {
  return (
   <AppleMapWithStops/>
  )
}

export default Practice

 export const LocationUpdater = () => {
  const [currentLocation, setCurrentLocation] = useState(null);

  // Request location permissions
  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app needs access to your location to track it in real-time.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can access location');
        return true;
      } else {
        console.log('Location permission denied');
        Alert.alert('Permission Denied', 'Location permission is required.');
        return false;
      }
    }
    return true; // iOS permissions are handled differently
  };

  // Start location updates every 3 seconds
  const startLocationUpdates = async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) return;

    const watchId = Geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ latitude, longitude });
        console.log(`Updated Location: ${latitude}, ${longitude}`);
      },
      (error) => {
        console.error('Error fetching location:', error);
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 0,
        interval: 3000, // 3 seconds
        fastestInterval: 3000, // 3 seconds
      }
    );

    return watchId;
  };

  useEffect(() => {
    let watchId;

    (async () => {
      watchId = await startLocationUpdates();
    })();

    // Cleanup on unmount
    return () => {
      if (watchId !== undefined) {
        Geolocation.clearWatch(watchId);
      }
      Geolocation.stopObserving();
    };
  }, );

  return (
    <View style={styles.container}>
      {currentLocation ? (
        <Text style={styles.locationText}>
          Current Location: {currentLocation.latitude}, {currentLocation.longitude}
        </Text>
      ) : (
        <Text style={styles.locationText}>Fetching location...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

