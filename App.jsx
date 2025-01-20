import React, { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Login from './src/screens/LoginScreen';
import SplashScreen from 'react-native-splash-screen';
import { firebase } from '@react-native-firebase/messaging';
import DrawerNavigation from './src/MyDrawer';
import { useAppContext } from './src/Store/AppContext';
import DeviceInfo from 'react-native-device-info';
import { Alert, Platform } from 'react-native';
import database from '@react-native-firebase/database';

import Geolocation from '@react-native-community/geolocation';
const Stack = createNativeStackNavigator();

const App = () => {
  const [isAppInitialized, setIsAppInitialized ,] = useState(false);
   const [gps,setGps]=useState(false);
  const { isLoggedIn,hasPermissions,requestMultiplePermissions } = useAppContext();

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  // Check Firebase Initialization
  const checkAppInitialized = () => {
    try {
      const firebaseInitialized = firebase.apps.length > 0;
      if (firebaseInitialized) {
        const firebaseAppName = firebase.app().name;
        console.log('Firebase Initialized Name:', firebaseAppName);
      } else {
        console.log('Firebase is not initialized.');
      }
      setIsAppInitialized(firebaseInitialized);
    } catch (error) {
      console.error('Error checking initialization:', error);
      setIsAppInitialized(false);
    }
  };

  // Request Multiple Permissions (Location and Microphone)

  // const checkLocationServices = async () => {

  //    if (Platform.OS==='ios') {
  //     DeviceInfo.getAvailableLocationProviders()
  //     .then((providers) => {
  //     console.log(providers);
  
  //       const isGpsOn = providers.locationServicesEnabled; // Check if location services (including GPS) are enabled
  //       console.log(`GPS is ${isGpsOn ? 'ON' : 'OFF'}`);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching location providers:', error);
  //     });
    
      
  //    } else{
  //    DeviceInfo.getAvailableLocationProviders()
  //   .then((providers) => {  
  //     console.log('Location Providers:', providers);
    
  //   })
  //   .catch((error) => {
  //     console.error('Error fetching location providers:', error);
  //   });
  //    }
   
  //    if (!gps) {
  //     Alert.alert("Permission Denied", "Location permission is required to use this feature.");
  //    }
  
  
  
  // };
  useEffect(() => {
    const updateLocation = () => {
        Geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                console.log('Location:', latitude, longitude);
                
                // Update location in Firebase Realtime Database
                database()
                    .ref('/users/user123/location')
                    .set({
                        latitude,
                        longitude,
                        timestamp: new Date().toISOString()
                    })
                    .then(() => console.log('Location updated!'))
                    .catch((error) => console.error('Error updating location:', error));
            },
            (error) => console.error('Geolocation Error:', error),
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    };

    // Call updateLocation every 2 seconds
    const intervalId = setInterval(updateLocation, 2000);

    // Clear interval when component unmounts
    return () => clearInterval(intervalId);
}, []);

  useEffect(() => {
 
    checkAppInitialized();
    requestMultiplePermissions(); 
  }, [isAppInitialized]);


 
  
  
  return (
    <SafeAreaProvider>
      
        <NavigationContainer>
          <Stack.Navigator>
            {isLoggedIn ? (
              <Stack.Screen name="Main" component={DrawerNavigation} options={{ headerShown: false }} />
            ) : (
              <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            )}
          </Stack.Navigator>
        </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
