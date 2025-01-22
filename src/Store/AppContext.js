import React, { createContext, useContext, useState, useEffect } from 'react';
import Geolocation from '@react-native-community/geolocation';

import { requestMultiple, PERMISSIONS } from 'react-native-permissions';
import { Alert, Linking, Platform } from 'react-native';
import { updateLocationTask } from '../services/BackgroundLocationService';
import database from '@react-native-firebase/database';
import backgroundServer from 'react-native-background-actions';

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
      // Define the permissions to be requested
      const permissions = [
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION, 
        PERMISSIONS.ANDROID.RECORD_AUDIO, 
        PERMISSIONS.IOS.LOCATION_WHEN_IN_USE, 
        PERMISSIONS.IOS.MICROPHONE,
      ];
  
      // For Android, also request background location permission if it's Android 10 or higher
      if (Platform.OS === 'android' && Platform.Version >= 29) {
        permissions.push(PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION);

        
      }else{
        console.log(" an error accured when background ");
        
      }
  
      // Request the permissions
      const result = await requestMultiple(permissions);
  
      // Check if all permissions are granted
      const allPermissionsGranted = Object.values(result).every(
        (status) => status === 'granted'
      );
  
      if (allPermissionsGranted) {
        console.log('All permissions granted');
        setHasPermissions(true); 
      } else {
        console.warn('Some permissions denied');
        setHasPermissions(false);
  
        // Show the alert with a button linking to the settings
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


  //  method for updating the loaction 
  let watchId;
  const updateLocationInFirebase = (latitude, longitude) => {
    // Update the location in Firebase
    const userId = "user123"; // Replace with actual user id
    const locationRef = database().ref(`/usersloaction/${userId}/location`);
    
    locationRef.set({
      latitude,
      longitude,
   
    }).then(() => {
      console.log("Location updated in Firebase");
    }).catch((error) => {
      console.error("Error updating location in Firebase", error);
    });
  };
  

  const fetchLocation = async () => {
    watchId = Geolocation.watchPosition(
       (position) => {
        const { latitude, longitude } = position.coords;
        console.log("New position:", latitude, longitude);

        updateLocationInFirebase(latitude, longitude);
    
      },
      (error) => {
        console.error("Error getting location:", error);
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 10,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  };

  const stopWatchingLocation = () => {
    if (watchId) {
      Geolocation.clearWatch(watchId);
      console.log("Stopped watching location");
    } else {
      console.log("Couldn't stop watchPosition");
    }
  };

  const options = {
    taskName: 'LocationTracker',
    taskTitle: 'Tracking Location',
    taskDesc: 'Updating location in real-time',
    taskIcon: { name: 'ic_launcher', type: 'mipmap' },
    color: '#ff00ff',
    linkingURI: 'yourSchemeHere://chat/jane',
    parameters: { delay: 2000 },
  };

  const updateLocation = async (taskDataArguments) => {
    const { delay } = taskDataArguments;
    await new Promise(async (resolve) => {
      while (backgroundServer.isRunning()) {
        await fetchLocation();
        await sleep(delay);
      }
      resolve();
    });
  };

  const startBackgroundTask = async () => {
    console.log("Pressed the background start");
    await backgroundServer.start(updateLocation, options);
  };

  const stopBackgroundTask = async () => {
    console.log("Pressed the background stop");
    stopWatchingLocation();
    await backgroundServer.stop();
  };

  const sleep = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));

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
        hasPermissions, setHasPermissions,requestMultiplePermissions,
        startBackgroundTask,
        stopBackgroundTask
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
