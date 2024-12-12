import React, { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/screens/LoginScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import MyDrawer from './src/MyDrawer';
import { AppProvider } from './src/Store/AppContext';
import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app';
import database from '@react-native-firebase/database';

const Stack = createNativeStackNavigator();

const App = () => {
  const [isAppInitialized, setIsAppInitialized] = useState(false);

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

  // Request FCM Permissions
  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    } else {
      console.warn('Notifications permission denied.');
    }
  };

  // Fetch FCM Token
  const getFcmToken = async () => {
    try {
      const token = await messaging().getToken();
      console.log('FCM Token:', token);
      // Send this token to your backend if needed
    } catch (error) {
      console.error('Error fetching FCM token:', error);
    }
  };

  // Listen for Foreground Notifications
  const listenForForegroundMessages = () => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('Message received in foreground:', remoteMessage);
      Alert.alert(
        remoteMessage.notification?.title || 'Notification',
        remoteMessage.notification?.body || 'You have a new message.'
      );
    });
    return unsubscribe;
  };

  // Handle Background Notifications
  const handleBackgroundMessages = () => {
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background:',
        remoteMessage
      );
      Alert.alert(
        remoteMessage.notification?.title || 'Notification',
        remoteMessage.notification?.body || 'You have a new message.'
      );
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from terminated state:',
            remoteMessage
          );
          Alert.alert(
            remoteMessage.notification?.title || 'Notification',
            remoteMessage.notification?.body || 'You have a new message.'
          );
        }
      });
  };

  // Write Data to Firebase Realtime Database
  const writeData = async () => {
    try {
      const dbRef = database().ref('/users/123');
      const data = {
        name: 'John Doe',
        age: 30,
      };
      await dbRef.set(data);
      console.log('Data written successfully:', data);
    } catch (error) {
      console.error('Error writing data:', error);
    }
  };

  useEffect(() => {
    checkAppInitialized();

    if (isAppInitialized) {
      requestUserPermission();
      getFcmToken();
      const unsubscribeForeground = listenForForegroundMessages();
      handleBackgroundMessages();
      writeData();

      // Cleanup
      return () => {
        unsubscribeForeground();
      };
    }
  }, [isAppInitialized]);

  return (
    <SafeAreaProvider>
      <AppProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
            <Stack.Screen
              name="Main"
              component={MyDrawer}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </AppProvider>
    </SafeAreaProvider>
  );
};

export default App;
