import React from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import HomeScreen from './screens/HomeScreen';

import axiosClient from './Store/API_CLIENT';
import { LOG_OUT } from './constant/Constants';

// Create Drawer Navigator
const Drawer = createDrawerNavigator();

// Custom Drawer Content
const CustomDrawerContent = (props) => {
  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Logout", 
          style: "destructive",
          onPress: async () => {
            // Perform logout actions here (e.g., clearing tokens, navigating to login)   
  
            try {
              const response = await axiosClient.post(LOG_OUT, { user_id: 177 });
  
              // Log only the relevant data from the response
              console.log('Logout response data:', response.data);
  
              if (response.data.success === 1) {
                props.navigation.reset({
                  index: 0,
                  routes: [{ name: 'Login' }], // Replace 'Login' with your actual login screen name
                });
              }
            } catch (error) {
              console.error('Error during logout:', error);
              Alert.alert("Error", "Something went wrong. Please try again later.");
            }
          }
        }
      ]
    );
  };
  
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <DrawerContentScrollView {...props}>
        {/* Custom Header */}
        <View style={{ backgroundColor: '#3b82f6', padding: 20, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#ccc', marginBottom: 10 }}>
          <Image
            source={require('./assets/image/images.jpg')}
            style={{ width: 80, height: 80, borderRadius: 40, marginBottom: 10 }}
          />
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>John Doe</Text>
          <Text style={{ fontSize: 14, color: '#f0f0f0' }}>johndoe@example.com</Text>
        </View>

        {/* Default Drawer Items */}
        <DrawerItemList {...props} />

        {/* Logout Button */}
        <View style={{ marginTop: 20, paddingHorizontal: 30 }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#f44336',
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 8,
              alignItems: 'center',
              marginVertical: 5,
            }}
            onPress={handleLogout}
          >
            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

// Drawer Navigator
const MyDrawer = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: true, // Hide header globally for all screens
        drawerItemStyle: {
          borderWidth: 1,
          borderColor: 'white',
          marginVertical: 5,
          borderRadius: 16,
        },
        drawerActiveTintColor: 'white',
        drawerInactiveTintColor: 'black',
        drawerActiveBackgroundColor: '#60a5fa',
        drawerLabelStyle: {
          fontSize: 16,
          fontWeight: 'bold',
        },
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
    
      
    </Drawer.Navigator>
  );
};

export default MyDrawer;
