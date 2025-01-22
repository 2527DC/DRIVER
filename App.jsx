import React, { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/screens/LoginScreen';
import SplashScreen from 'react-native-splash-screen';
import { firebase } from '@react-native-firebase/messaging';
import DrawerNavigation from './src/MyDrawer';
import { useAppContext } from './src/Store/AppContext';
import backgroundServer from 'react-native-background-actions';


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
