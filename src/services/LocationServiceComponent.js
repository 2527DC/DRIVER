// import React, { Component } from 'react';
// import { View, Text } from 'react-native';
// import BackgroundService from 'react-native-background-actions';
// import { updateLocationTask } from './BackgroundLocationService';

// class LocationServiceComponent extends Component {
//   componentDidMount() {
//     // Start the background service when the component mounts
//     this.startService();
//   }

//   componentWillUnmount() {
//     // Stop the service when the component unmounts
//     BackgroundService.stop();
//   }

//   startService = async () => {
//     await BackgroundService.start(updateLocationTask, {
//       taskName: 'Location Update',
//       taskTitle: 'Updating Location',
//       taskDesc: 'Sending location to Firebase every 2 seconds',
//       color: '#00ff00',
//       parameters: {
//         delay: 2000, // 2 seconds
//       },
//     });
//   };

//   render() {
//     return (
//       <View>
//         <Text>Location Update Service is Running</Text>
//       </View>
//     );
//   }
// }

// export default LocationServiceComponent;
