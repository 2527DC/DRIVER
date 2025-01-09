import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Svg, { Line } from 'react-native-svg';

 const HistoryCard = ({ tripId, date, source, destination, employees, logoutTime }) => {
    return (
      <View className='flex m-2 bg-white rounded-lg'>
        {/* Text area */}
        <View className='flex-row justify-between pt-2 px-1'>
          <Text className='text-black text-[16px] font-bold p-1 py-1'>Trip Id: {tripId}</Text>
          <Text className='text-black text-[16px] font-bold p-1 py-1'>{date}</Text>
        </View>
        
        {/* SVG area */}
        <View className="flex-row px-3 py-2">
          {/* Left Section with Icons and Line */}
          <View className="items-center">
            <Icon name="location-on" size={24} color="red" />
            <Svg height="50" width="20" viewBox="0 0 10 50">
              <Line
                x1="5"
                y1="0"
                x2="5"
                y2="50"
                stroke="black"
                strokeWidth="2"
                strokeDasharray="5,5"
              />
            </Svg>
            <Icon name="location-on" size={24} color="green" />
          </View>
  
          {/* Time view */}
          <View className="items-center ml-3 justify-between">
            <Text className="text-lg font-semibold bg-gray-300 rounded-lg px-1">9:40</Text>
            <Text className="text-lg font-semibold bg-gray-300 rounded-lg px-1">9:40</Text>
          </View>
  
          {/* Place view */}
          <View className="ml-3 justify-between">
            <Text className="text-lg font-semibold rounded-lg">{source}</Text>
            <Text className="text-lg font-semibold rounded-lg">{destination}</Text>
          </View>
        </View>
  
        {/* Employee Info Section */}
        <View className='p-2 bg-blue-200'>
          <Text className='m-1'>No of Employees: {employees}</Text>
          <Text className='m-1'>Completed Logout: {logoutTime}</Text>
        </View>
      </View>
    );
  };
 
 export default HistoryCard