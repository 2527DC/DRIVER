import { View, Text, TouchableOpacity, Platform, ScrollView } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAppContext } from '../Store/AppContext';
import { Linking } from 'react-native';

const OfficeNavigation = () => {
  const { Offices } = useAppContext();

  // Handle the navigation action
  const handleNavigation = (address) => {
    // Assuming the source is the user's current location and address is the destination
    const source = "Mumbai, Maharashtra, India"; // This can be dynamically fetched from geolocation API
    const destination = address;
    console.log(address + " this is the address passed");

    // Encode the source and destination for URL compatibility
    const encodedSource = encodeURIComponent(source);
    const encodedDestination = encodeURIComponent(destination);

    // Platform-specific URL construction
    let mapUrl;

    if (Platform.OS === 'ios') {
      // For iOS, use Apple Maps
      mapUrl = `http://maps.apple.com/?daddr=${encodedDestination}&saddr=${encodedSource}&dirflg=d`;
    } else {
      // For Android, use Google Maps
      mapUrl = `https://www.google.com/maps/dir/?api=1&origin=${encodedSource}&destination=${encodedDestination}`;
    }

    // Open the URL in the browser or maps app
    Linking.openURL(mapUrl).catch(err => console.error("Failed to open URL:", err));
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      {Offices.map((item, i) => (
        <View
          key={i}
          style={{
            flexDirection: 'row',
            padding: 16,
            backgroundColor: '#90cdf4',
            margin: 12,
            borderRadius: 8,
            alignItems: 'center',
          }}
        >
          {/* Left Icon */}
          <Icon name="office-building-marker-outline" size={30} color="black" />

          {/* Middle Text */}
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              marginLeft: 16,
              flex: 1,
            }}
          >
            {item.office}
          </Text>

          {/* Right Icon */}
          <TouchableOpacity
            style={{ backgroundColor: 'white', padding: 1, borderRadius: 8 }}
            onPress={() => handleNavigation(item.address)} // Pass the office address to handleNavigation
          >
            <Icon name="directions" size={30} color="black" />
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

export default OfficeNavigation;
