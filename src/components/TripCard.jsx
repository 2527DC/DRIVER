import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Svg, { Line } from 'react-native-svg';

const TripCard = () => {
  const [showEmployees, setShowEmployees] = useState(false); // State to toggle employee list visibility

  const Employesname = [
    "Rajanee",
    "John",
    "Emily",
    "Michael",
    "Sarah",
    "David",
    "Samantha"
  ];

  return (
    <View className="flex bg-gray-300 py-2 m-3 rounded-xl">
      <View className="flex-row justify-between ">
        <Text className="p-2 font-bold">Site: Officenumber1and2</Text>
        <Text className="font-bold p-2">30 Dec, 11:40 PM</Text>
      </View>

      <View className="flex-row justify-between px-2 mb-1">
        <View className="flex-1">
          {/* Start Location (ScrollView for horizontal scrolling) */}
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <Text className="flex-row">
              <Icon name="location-on" size={20} color="red" />
              {' Start Location jhvjvjbbjhbj'}
            </Text>
          </ScrollView>

          <View className="relative ml-1">
            {/* SVG dotted line */}
            <Svg height="30" width="10" viewBox="0 0 10 50">
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
          </View>

          {/* End Location (ScrollView for horizontal scrolling) */}
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <Text className="flex-row">
              <Icon name="location-on" size={20} color="green" />
              {' End Location'}
            </Text>
          </ScrollView>
        </View>

        <View className="flex-1 items-center mt-5 ">
          <View className="flex-row mt-4">
            <Text className="p-1 font-bold">4526</Text>
            <Text className="p-1 bg-white rounded">Logout</Text>
          </View>
        </View>
      </View>

      {/* Employee Toggle Button */}
      <View className='ml-1 mr-1'>
        <TouchableOpacity
          onPress={() => setShowEmployees(!showEmployees)} // Toggle visibility of employee grid
          className="flex-row justify-center items-center bg-gray-200 p-2 rounded-lg"
        >
          <Text className="text-center font-bold">Employees</Text>
          <Icon
            name={showEmployees ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
            size={24}
            color="black"
            style={{ marginLeft: 10 }}
          />
        </TouchableOpacity>
      </View>

      {/* Employee Grid */}
      {showEmployees && (
        <View className="flex-row flex-wrap justify-between p-2 rounded-lg">
          {Employesname.map((item, i) => (
            <TouchableOpacity
              key={i}
              style={{
                width: '30%', // 3 columns layout
                marginBottom: 8, // space between rows
              }}
            >
             
                <Text className="text-center bg-white p-2 rounded-lg">{item}</Text>
             
            </TouchableOpacity>
          ))}
        </View>
      )}

      <View className="p-2 ml-3 mr-4">
        <TouchableOpacity className="flex-row items-center bg-white p-2 rounded-lg justify-center">
          {/* Icon placed at the start */}
          <Icon name="directions" size={30} color="blue" />
          {/* Text centered within the button */}
          <Text className="text-lg font-bold ml-2">Track</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TripCard;

const OtpVerification =()=>{
return<>

</>

}