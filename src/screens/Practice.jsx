import React from 'react';
import { View, Text, TouchableOpacity, PermissionsAndroid, Platform } from 'react-native';

import { useAppContext } from '../Store/AppContext';


const Practice = () => {
  const {stopBackgroundTask,  startBackgroundTask,}= useAppContext()

  return (
    <View className="flex-1 justify-between items-center">
      <TouchableOpacity className="p-1 m-1 bg-green-500" onPress={startBackgroundTask}>
        <Text className="p-1 m-1">Start Background Task</Text>
      </TouchableOpacity>

      <TouchableOpacity className="p-1 m-1 bg-red-500" onPress={stopBackgroundTask}>
        <Text className="p-1 m-1">Stop Background Task</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Practice;

