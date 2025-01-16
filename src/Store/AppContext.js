import React, { createContext, useContext, useState, useEffect } from 'react';
import Geolocation from '@react-native-community/geolocation';

import { requestMultiple, PERMISSIONS } from 'react-native-permissions';
import { Alert, Linking } from 'react-native';

// Create Context
const AppContext = createContext();


// Custom hook to use the context
export const useAppContext = () => {
  return useContext(AppContext);
};

// Create a provider component
export const AppProvider = ({ children }) => {

  //  state to store the officess 
  const [Offices, setOffices] = useState([
    {
      office: "STONEX_PUNE",
      address: "Pune, Maharashtra, India",
    },
    {
      office: "STONEX",
      address: " dodda byelakere bengaluru",
    },
  ]);
  




  // State to store user data
  const [userData, setUserData] = useState({
    api_token: '',
    emailid: '',
    user_name: '',
    phone: '',
    phone_code: '',
    gender: '',
    address: '',
    user_id: '',
  });

  
  

const configureGeolocation = () => {
  Geolocation.setRNConfiguration({
    skipPermissionRequests: false, // App will request permissions automatically
    authorizationLevel: 'whenInUse', // Location is accessed only when app is in use
    enableBackgroundLocationUpdates: true, // No updates when app is in the background
    locationProvider: 'gps', // Automatically selects the provider (Android)
  });
};
  

useEffect(() => {
  configureGeolocation()
  
}, []);

  //  method for gettibg the current location 
    

  // Request location permission when the app is loaded
  

  // Method to update specific user data field
  const updateUserData = (key, value) => {
    setUserData(prev => ({
      ...prev,
      [key]: value, // Update only the specified key
    }));
  };

  // Method to set all user data at once
  const setAllUserData = data => {
    setUserData(data);
  };

  // Method to get a specific field value from user data
  const getUserData = key => {
    return userData[key] || null; // Return the value or null if not found
  };




  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [hasPermissions, setHasPermissions] = useState(false); 

  const requestMultiplePermissions = async () => {
    try {
      const permissions = [
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION, 
        PERMISSIONS.ANDROID.RECORD_AUDIO, 
        PERMISSIONS.IOS.LOCATION_WHEN_IN_USE, 
        PERMISSIONS.IOS.MICROPHONE, 
      ];

      const result = await requestMultiple(permissions);

      const allPermissionsGranted = Object.values(result).every(
        (status) => status === 'granted'
      );

      if (allPermissionsGranted) {
        console.log('All permissions granted');
        setHasPermissions(true); 
      } else {
        console.warn('Some permissions denied');
        setHasPermissions(false);

        // Show the alert with the button linking to the settings
        Alert.alert(
          "Permissions Required",
          "All permissions must be given to use this app.",
          [
            {
              text: "Go to Settings",
              onPress: () => Linking.openSettings(), 
            },
          ],
          { cancelable: false } // Prevents the user from dismissing the alert
        );
      }

      return allPermissionsGranted;
    } catch (error) {
      console.error('Error requesting permissions:', error);
      setHasPermissions(false);
      return false;
    }
  };
    
  // Method to clear user data
  const clearUserData = () => {
    setUserData({
      api_token: '',
      emailid: '',
      user_name: '',
      phone: '',
      phone_code: '',
      gender: '',
      address: '',
      user_id: '',
    });
  };

  return (
    <AppContext.Provider
      value={{
        userData,
        updateUserData,
        setAllUserData,
        getUserData,
        clearUserData,
        Offices,
        isLoggedIn, setIsLoggedIn,
        hasPermissions, setHasPermissions,requestMultiplePermissions
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
