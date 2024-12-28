import React, { useState, useEffect, useRef } from 'react';
import { Alert, Switch, Text, View, PermissionsAndroid, Platform, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import MapViewDirections from 'react-native-maps-directions';
import API_ENDPOINTS, { CHANGE_AVAILABILITY } from '../constant/Constants';
import axiosClient from '../Store/API_CLIENT';

const GoogleMapScreen = () => {
  const [sourceCoords, setSourceCoords] = useState({
    latitude: 13.133999,
    longitude: 77.478801,
  });
  const [isOnline, setIsOnline] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(0.0922); // Initial zoom level
  const [isMoving, setIsMoving] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  // Static pickup points
  const pickupPoints = [
    { latitude: 13.13041, longitude: 77.484896, title: 'Pickup 1' },
    { latitude: 13.134344, longitude: 77.514645, title: 'Pickup 2' },
    { latitude: 13.111536, longitude: 77.525396, title: 'Pickup 3' },
  ];

  const mapRef = useRef(null);

  // Request location permission for Android
  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
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
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert('Permission Denied', 'Location permission is required to use the map.');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      requestLocationPermission();
    }

    Geolocation.getCurrentPosition(
      (info) => {
       
      },
      (error) => console.error(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );

    return () => {
      clearInterval(intervalId);
    };
  }, [intervalId]);

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

  const zoomIn = () => {
    setZoomLevel((prevZoom) => Math.max(prevZoom / 2, 0.002));
  };

  const zoomOut = () => {
    setZoomLevel((prevZoom) => Math.min(prevZoom * 2, 1));
  };

  const startRouteMovement = () => {
    if (isMoving) return;

    setIsMoving(true);
    const id = setInterval(() => {
      setSourceCoords((prev) => ({
        latitude: prev.latitude + 0.0001,
        longitude: prev.longitude + 0.0001,
      }));
    }, 2000);

    setIntervalId(id);
  };

  const stopRouteMovement = () => {
    clearInterval(intervalId);
    setIsMoving(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f7f7f7' }}>
     
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 10,
          backgroundColor: isOnline ? '#4CAF50' : '#F44336',
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

      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        showsUserLocation
        region={{
          ...sourceCoords,
          latitudeDelta: zoomLevel,
          longitudeDelta: zoomLevel,
        }}
      >
        <Marker coordinate={sourceCoords} title="Current Location" description="Your location" />

        {pickupPoints.map((point, index) => (
          <Marker key={index} coordinate={point} title={point.title} />
        ))}

        {pickupPoints.map((point, index) => (
          <MapViewDirections
            key={index}
            origin={sourceCoords}
            destination={point}
            apikey={API_ENDPOINTS.GOOGLE_MAPS_API_KEY}
            strokeWidth={3}
            strokeColor="green"
            onError={(error) => console.error('Direction Error:', error)}
          />
        ))}
      </MapView>

      <View style={{ position: 'absolute', bottom: 40, right: 10 }}>
        <Button title="Zoom In" onPress={zoomIn} />
        <Button title="Zoom Out" onPress={zoomOut} />
      </View>

      <View style={{ position: 'absolute', bottom: 100, right: 10 }}>
        <Button
          title={isMoving ? 'Stop' : 'Start'}
          onPress={isMoving ? stopRouteMovement : startRouteMovement}
          color={isMoving ? 'red' : 'green'}
        />
      </View>
    </View>
  );
};

export default GoogleMapScreen;
