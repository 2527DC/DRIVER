// import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import Svg, { Line } from 'react-native-svg';
// import EmployeeCard from './EmpolyeeCard';
// import { Linking, Platform, Alert } from 'react-native';

// // Static source and destination coordinates
// // const source = { latitude: 12.9716, longitude: 77.5946 }; // Example source coordinates (Bangalore)
// // const destination = { latitude: 28.7041, longitude: 77.1025 }; // Example destination coordinates (Delhi)

// const source = { latitude:13.133999, longitude: 77.478801}; // Example source coordinates (Bangalore)
// const destination = { latitude: 12.976664, longitude:77.571256}; // Example destination coordinates (Delhi)

// // The TripCard component
// const TripCard = ({ site, date, startLocation, endLocation, employees, pickupPoints, id }) => {
//   const [showEmployees, setShowEmployees] = useState(false);
//   const [showEmployeeCard, setShowEmployeeCard] = useState(false);
//   const [employeeName, setEmployeeName] = useState("");

//   const handleEmployeePress = (name) => {
//     setEmployeeName(name);
//     setShowEmployeeCard(!showEmployeeCard);
//   };
//   useEffect(() => {
//     console.log("Pickup Points:", pickupPoints);
// }, [pickupPoints]); 

// const openMaps = () => {
//   if (Platform.OS === 'ios') {
//     let url = `https://maps.apple.com/?saddr=${13.133999},${77.478801}&daddr=${12.976664},${77.571256}`;
//     pickupPoints.forEach((stop, index) => {
//       const stopAddress = `${stop.latitude},${stop.longitude}`;
//       if (index === 0) {
//         url += `&saddr=${stopAddress}`; // Source address
//       } else if (index === pickupPoints.length - 1) {
//         url += `&daddr=${stopAddress}`; // Final destination
//       } else {
//         url += `&daddr=${stopAddress}`; // Waypoints as destination
//       }
//     });
//     Linking.openURL(url).catch((err) => {
//       Alert.alert('Error', 'Unable to open Apple Maps');
//       console.error(err);
//     });
//   } else if (Platform.OS === 'android') {
//     let url = `https://www.google.com/maps/dir/?api=1&origin=${source.latitude},${source.longitude}&destination=${destination.latitude},${destination.longitude}`;
//     if (pickupPoints.length > 0) {
//       const waypoints = pickupPoints
//         .map((stop) => `${stop.latitude},${stop.longitude}`)
//         .join('|');
//       url += `&waypoints=${waypoints}`;
//     }
//     Linking.openURL(url).catch((err) => {
//       Alert.alert('Error', 'Unable to open Google Maps');
//       console.error(err);
//     });
//   }
// };


//   return (
//     <>
//       <View className="flex bg-gray-300 py-2 m-3 rounded-xl">
//         <View className="flex-row justify-between ">
//           <Text className="p-2 font-bold">Site: {site}</Text>
//           <Text className="font-bold p-2">{date}</Text>
//         </View>

//         <View className="flex-row justify-between px-2 mb-1">
//           <View className="flex-1">
//             <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
//               <Text className="flex-row">
//                 <Icon name="location-on" size={20} color="red" />
//                 {startLocation}
//               </Text>
//             </ScrollView>

//             <View className="relative ml-1">
//               <Svg height="30" width="10" viewBox="0 0 10 50">
//                 <Line
//                   x1="5"
//                   y1="0"
//                   x2="5"
//                   y2="50"
//                   stroke="black"
//                   strokeWidth="2"
//                   strokeDasharray="5,5"
//                 />
//               </Svg>
//             </View>

//             <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
//               <Text className="flex-row">
//                 <Icon name="location-on" size={20} color="green" />
//                 {endLocation}
//               </Text>
//             </ScrollView>
//           </View>

//           <View className="flex-1 items-center mt-5">
//             <View className="flex-row mt-4">
//               <Text className="p-1 font-bold">{id}</Text>
//               <Text className="p-1 bg-white rounded">Logout</Text>
//             </View>
//           </View>
//         </View>

//         <TouchableOpacity
//           onPress={() => {
//             setShowEmployees(!showEmployees);
//             setShowEmployeeCard(false);
//           }}
//           className="flex-row justify-center items-center bg-gray-200 py-1"
//         >
//           <Text className="text-center font-bold">Employees</Text>
//           <Icon
//             name={showEmployees ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
//             size={24}
//             color="black"
//             style={{ marginLeft: 10 }}
//           />
//         </TouchableOpacity>

//         {showEmployees && (
//           <View className="flex-row flex-wrap justify-between p-2 rounded-lg">
//             {employees.map((item, i) => (
//               <TouchableOpacity
//                 key={i}
//                 className="w-1/3 mb-1 px-4 py-1"
//                 onPress={() => handleEmployeePress(item)}
//               >
//                 <Text className="text-center bg-white py-1 rounded-lg">{item}</Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         )}

//         <View className="p-2 ml-3 mr-4">
//           <TouchableOpacity
//             className="flex-row items-center bg-white p-2 rounded-lg justify-center"
//             onPress={openMaps} // Attach the track handler
//           >
//             <Icon name="directions" size={30} color="blue" />
//             <Text className="text-lg font-bold ml-2">Track</Text>
//           </TouchableOpacity>
//         </View>

//         {showEmployeeCard && <EmployeeCard name={employeeName} />}
//       </View>
//     </>
//   );
// };

// export default TripCard;


// { "name": "p1", "latitude": 12.9716, "longitude": 77.5946 },
// { "name": "p2", "latitude": 19.7515, "longitude": 75.7139 },
// { "name": "p3", "latitude": 28.7041, "longitude": 77.1025 },
// { "name": "p4", "latitude": 26.9124, "longitude": 75.7873 }