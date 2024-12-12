import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import axios from 'axios';  // for making requests to your backend
import API_ENDPOINTS from '../constant/Constants';

const MapScreen = () => {
  const [coordinates, setCoordinates] = useState([]);
  const [route, setRoute] = useState(null);
  const [pickupPoints, setPickupPoints] = useState([

    { lat: 13.130410, lng: 77.484896, title: 'Pickup 1' },
    { lat: 13.134344, lng: 77.514645, title: 'Pickup 2' },
    { lat: 13.111536, lng: 77.525396, title: 'Pickup 3' },
  ]);
  const [destination, setDestination] = useState({ lat: 13.0827, lng: 80.2707 }); // Destination example

  // Fetch route data from the backend or Google Maps Directions API
  useEffect(() => {
    if (pickupPoints.length > 0 && destination) {
      const fetchDirections = async () => {
        try {
          // Call your backend or Google Maps API here to get the route
          // Call Google Directions API
const response = await axios.get('https://maps.googleapis.com/maps/api/directions/json', {
    params: {
      origin: `${pickupPoints[0].lat},${pickupPoints[0].lng}`,
      destination: `${destination.lat},${destination.lng}`,
      waypoints: pickupPoints.slice(1).map(point => `${point.lat},${point.lng}`).join('|'),
      key: API_ENDPOINTS.GOOGLE_MAPS_API_KEY,
    },
  });
  

          // Example response format for directions API
          const route = response.data.routes[0].legs[0].steps.map(step => ({
            latitude: step.end_location.lat,
            longitude: step.end_location.lng,
          }));
          
          setRoute(route);
        } catch (error) {
          console.error('Error fetching route data:', error);
        }
      };

      fetchDirections();
    }
  }, [pickupPoints, destination]);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }}
        initialRegion={{
          latitude: pickupPoints[0].lat,
          longitude: pickupPoints[0].lng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {pickupPoints.map((point, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: point.lat, longitude: point.lng }}
            title={`Pickup Point ${index + 1}`}
          />
        ))}

        {destination && (
          <Marker
            coordinate={destination}
            title="Destination"
            pinColor="red"
          />
        )}

        {route && route.length > 0 && (
          <Polyline
            coordinates={route}
            strokeColor="blue"
            strokeWidth={4}
          />
        )}
      </MapView>
    </View>
  );
};

export default MapScreen;
