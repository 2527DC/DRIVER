import React, { useState, useEffect, useRef } from 'react';
import { Alert, Switch, Text, View, PermissionsAndroid, Platform, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapRedirect from '../components/MapRedirect';

const GoogleMapScreen = () => {
 
  
  return (
    <View style={{ flex: 1, backgroundColor: '#f7f7f7' }}>

      <MapRedirect></MapRedirect>
     
    </View>
  );
};

export default GoogleMapScreen;
