// import React from 'react';
// import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
// import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
// import Icon from 'react-native-vector-icons/MaterialIcons'; // Import icon
// import MIcons from  'react-native-vector-icons/MaterialCommunityIcons'
// import HomeScreen from './screens/HomeScreen';
// import axiosClient from './Store/API_CLIENT';
// import { LOG_OUT } from './constant/Constants';
// import TripHistory from './screens/TripHistory';
// import SwitchOffce from './screens/SwitchOffce';
// import OfficeNavigation from './screens/OfficeNavigation';
// import Practice from './screens/Practice';

// // Create Drawer Navigator
// const Drawer = createDrawerNavigator();

// // Custom Drawer Content
// const CustomDrawerContent = (props) => {
//   const handleLogout = () => {
//     Alert.alert(
//       "Logout",
//       "Are you sure you want to log out?",
//       [
//         { text: "Cancel", style: "cancel" },
//         {
//           text: "Logout",
//           style: "destructive",
//           onPress: async () => {
//             try {
//               const response = await axiosClient.post(LOG_OUT, { user_id: 177 });
//               console.log('Logout response data:', response.data);
//               if (response.data.success === 1) {
//                 props.navigation.reset({
//                   index: 0,
//                   routes: [{ name: 'Login' }], // Replace 'Login' with your actual login screen name
//                 });
//               }
//             } catch (error) {
//               console.error('Error during logout:', error);
//               Alert.alert("Error", "Something went wrong. Please try again later.");
//             }
//           },
//         },
//       ]
//     );
//   };

//   return (
//     <View style={{ flex: 1, backgroundColor: 'white' }}>
//       <DrawerContentScrollView {...props}>
//         {/* Custom Header */}
//         <View
//         className='bg-blue-400 p-4  rounded-lg m-3'
         
//         >
        
//           <Text className='text-ld text-white font-bold'>
//             John Doe
//           </Text >
//           <Text className='text-ld text-white font-bold'>kK-04-AA-2198</Text>
//           <Text className='text-ld text-white font-bold'>Office</Text>
//         </View>

//         {/* Default Drawer Items */}
//         <DrawerItemList {...props} />

//         {/* Logout Button */}
//         <View style={{ marginTop: 20, paddingHorizontal: 30 }}>
//           <TouchableOpacity
//             style={{
//               backgroundColor: '#f44336',
//               paddingVertical: 10,
//               paddingHorizontal: 20,
//               borderRadius: 8,
//               alignItems: 'center',
//               marginVertical: 5,
//             }}
//             onPress={handleLogout}
//           >
//             <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
//               Logout
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </DrawerContentScrollView>
//     </View>
//   );
// };

// // Drawer Navigator
// const MyDrawer = () => {
//   return (
//     <Drawer.Navigator
//       initialRouteName="Upcomming Trip"
//       drawerContent={(props) => <CustomDrawerContent {...props} />}
//       screenOptions={{
//         headerShown: true,
//         drawerItemStyle: {
//           borderWidth: 1,
//           borderColor: 'white',
//           marginVertical: 5,
//           borderRadius: 16,
//         },
//         drawerActiveTintColor: 'black',
//         drawerInactiveTintColor: 'black',
     
//         drawerLabelStyle: {
//           fontSize: 16,
//           fontWeight: 'bold',
//         },
//       }}
//     >
//       <Drawer.Screen
//         name="Upcomming Trip"
//         component={HomeScreen}
//         options={{
//           drawerIcon: ({ color, size }) => (
//             <Icon name="home" size={size} color={color} />
//           ),
//         }}
//       />
//       <Drawer.Screen
//         name="Trip History"
//         component={TripHistory}
//         options={{
//           drawerIcon: ({ color, size }) => (
//             <Icon name="history" size={size} color={color} />
//           ),
//         }}
//       />
//        <Drawer.Screen
//         name="SwitchOffice"
//         component={SwitchOffce}
//         options={{
//           drawerIcon: ({ color, size }) => (
//             <MIcons name="office-building-marker" size={size} color={color} />
//           ),
//         }}
//       />
//        <Drawer.Screen
//         name="Office Navigation"
//         component={OfficeNavigation}
//         options={{
//           drawerIcon: ({ color, size }) => (
//             <MIcons name="sign-direction" size={size} color={color} />
//           ),
//         }}
//       />
//        <Drawer.Screen
//         name="Practice"
//         component={Practice}
//         options={{
//           drawerIcon: ({ color, size }) => (
//             <MIcons name="sign-direction" size={size} color={color} />
//           ),
//         }}
//       />
//     </Drawer.Navigator>
//   );
// };

// export default MyDrawer;



// ---------------



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

//   useEffect(() => {
  
//     // Call updateLocation every 2 seconds
//     const intervalId = setInterval(updateLocation, 2000);

//     // Clear interval when component unmounts
//     return () => clearInterval(intervalId);
// }, []);