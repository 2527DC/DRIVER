import React, { useState, useEffect, useRef } from 'react';
import { Alert, Switch, Text, View, PermissionsAndroid, Platform, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { CHANGE_AVAILABILITY } from '../constant/Constants';
import axiosClient from '../Store/API_CLIENT';

const GoogleMapScreen = () => {
  const [sourceLatitude, setSourceLatitude] = useState(13.133999);
  const [sourceLongitude, setSourceLongitude] = useState(77.478801);
  const [isOnline, setIsOnline] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(0.0922); // Initial zoom level for the map

  // Static pickup points
  const pickupPoints = [
    { latitude: 13.130410, longitude: 77.484896, title: 'Pickup 1' },
    { latitude: 13.134344, longitude: 77.514645, title: 'Pickup 2' },
    { latitude: 13.111536, longitude: 77.525396, title: 'Pickup 3' },
  ];

  const mapRef = useRef(null);

  // Request location permission for Android
  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app needs access to your location.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location permission granted');
      } else {
        console.log('Location permission denied');
        Alert.alert('Permission Denied', 'Location permission is required to use the map.');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    // Request permission for Android
    if (Platform.OS === 'android') {
      requestLocationPermission();
    }

    // Get current position
    Geolocation.getCurrentPosition(
      (info) => {
       
      },
      (error) => console.error(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }, []);

  const toggleSwitch = async () => {
    try {
      setIsOnline((prev) => !prev);
      const loginData = {
        user_id: 177,
        availability: isOnline ? 1 : 0,
      };

      const response = await axiosClient.post(CHANGE_AVAILABILITY, loginData);

      if (response.data.success) {
        console.log('Online Status changed successfully:', response.data);
      } else {
        Alert.alert('Online Status Failed', response.data.message || 'An error occurred');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Online Status', 'An error occurred while changing the online status.');
    }
  };

  // Function to zoom in
  const zoomIn = () => {
    const newZoomLevel = zoomLevel / 2; // Reduce the delta to zoom in
    setZoomLevel(newZoomLevel);

    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: sourceLatitude,
        longitude: sourceLongitude,
        latitudeDelta: newZoomLevel,
        longitudeDelta: newZoomLevel,
      });
    }
  };

  // Function to zoom out
  const zoomOut = () => {
    const newZoomLevel = zoomLevel * 2; // Increase the delta to zoom out
    setZoomLevel(newZoomLevel);

    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: sourceLatitude,
        longitude: sourceLongitude,
        latitudeDelta: newZoomLevel,
        longitudeDelta: newZoomLevel,
      });
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f7f7f7' }}>
      {/* Header Section */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 10,
          backgroundColor: isOnline ? '#4CAF50' : '#F44336', // Green when online, red when offline
        }}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18, textAlign: 'center', flex: 1 }}>
          {isOnline ? 'You are Online' : 'You are Offline'}
        </Text>
        <Switch
          value={isOnline}
          onValueChange={toggleSwitch}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isOnline ? '#f5dd4b' : '#f4f3f4'}
        />
      </View>

      {/* Map Section */}
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        showsUserLocation={true}
        initialRegion={{
          latitude: sourceLatitude || 37.78825,
          longitude: sourceLongitude || -122.4324,
          latitudeDelta: zoomLevel,
          longitudeDelta: zoomLevel,
        }}
      >
        {/* Marker for current location */}
        {sourceLatitude && sourceLongitude && (
          <Marker
            coordinate={{
              latitude: sourceLatitude,
              longitude: sourceLongitude,
            }}
            title="Current Location"
            description="This is your current location"
          />
        )}

        {/* Markers for pickup points */}
        {pickupPoints.map((point, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: point.latitude, longitude: point.longitude }}
            title={point.title}
          />
        ))}
      </MapView>

      {/* Zoom controls */}
      <View style={{ position: 'absolute', bottom: 40, right: 10 }}>
        <Button title="Zoom In" onPress={zoomIn} />
        <Button title="Zoom Out" onPress={zoomOut} />
      </View>
    </View>
  );
};

export default GoogleMapScreen;
