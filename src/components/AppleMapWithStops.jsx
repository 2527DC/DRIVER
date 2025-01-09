import React from 'react';
import { View, Button, Linking, Alert } from 'react-native';

const AppleMapWithStops = () => {
  // Define the list of stops (latitude and longitude) or addresses
  const stops = [
    { name: 'Bangalore', latitude: 13.111536, longitude: 77.525396},
    { name: 'Maharashtra', latitude:13.081674, longitude:77.548312 },
    { name: 'Delhi', latitude: 28.7041, longitude: 77.1025 },
    { name: 'Jaipur', latitude: 26.9124, longitude: 75.7873 },
  ];

  // Function to open Apple Maps with dynamic stops
  const openAppleMaps = () => {
    // Start with the base URL
    let url = 'https://maps.apple.com/?dirflg=d';

    // Loop through the stops and add them to the URL
    stops.forEach((stop, index) => {
      const stopAddress = `${stop.latitude},${stop.longitude}`;
      if (index === 0) {
        url += `&saddr=${stopAddress}`; // Source address
      } else {
        url += `&daddr=${stopAddress}`; // Destination address
      }
    });

    // Open Apple Maps with the generated URL
    Linking.openURL(url).catch((err) => {
      Alert.alert('Error', 'Unable to open Apple Maps');
      console.error(err);
    });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Show Stops in Apple Maps" onPress={openAppleMaps} />
    </View>
  );
};

export default AppleMapWithStops;
