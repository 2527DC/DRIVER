import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import backgroundServer from 'react-native-background-actions';

const Practice = () => {
  const sleep = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));

  // Define the intensive task to run in the background
  const veryIntensiveTask = async (taskDataArguments) => {
    const { delay } = taskDataArguments;
    await new Promise(async (resolve) => {
      for (let i = 0; backgroundServer.isRunning(); i++) {
        console.log(i);
        await sleep(delay);
      }
      resolve(); // Ensure the promise resolves when the loop ends
    });
  };

  const options = {
    taskName: 'Example',
    taskTitle: 'ExampleTask title',
    taskDesc: 'ExampleTask description',
    taskIcon: {
      name: 'ic_launcher',
      type: 'mipmap',
    },
    color: '#ff00ff',
    linkingURI: 'yourSchemeHere://chat/jane', // Deep Linking URI
    parameters: {
      delay: 1000, // Delay between each loop iteration
    },
  };

  // Start background task
  const startBackgroundTask = async () => {
    await backgroundServer.start(veryIntensiveTask, options);
    await backgroundServer.updateNotification({ taskDesc: 'New ExampleTask description' }); // Only Android
  };

  // Stop background task
  const stopBackgroundTask = async () => {
    await backgroundServer.stop();
  };

  return (
    <View className="flex-1 justify-between items-center">
      <TouchableOpacity className='p-1 m-1 bg-green-500' onPress={startBackgroundTask}>
        <Text className='p-1 m-1'>
          Start Background Task
        </Text>
      </TouchableOpacity>

      <TouchableOpacity className='p-1 m-1 bg-red-500' onPress={stopBackgroundTask}>
        <Text className='p-1 m-1'>
          Stop Background Task
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Practice;
