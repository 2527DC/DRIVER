import React, { useState } from 'react';
import { ScrollView, View, Text, Image, TextInput, TouchableOpacity } from 'react-native';

export default function ProfileScreen() {
  

  return (
    <ScrollView className="flex-1 ">
      <View className="p-5 ">
        {/* Profile Header */}
        <View className="mb-4 rounded-2xl bg-blue-200 shadow-md">
          <View className="items-center p-6">
            <Image
              source={require('../assets/image/images.jpg')} // Replace with your image path
              className="w-[96px] h-[80px] rounded-full border-4 border-white"
            />
            <TouchableOpacity className="mt-3 py-2 px-4 border border-white rounded-full">
              <Text className="text-white font-bold text-center">Upload Photo</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Personal Info */}
        <View className="mb-4 rounded-2xl  shadow-md">
          <View className="p-5  ">
            <Text className="text-xl font-bold text-gray-800 mb-4">Personal Information</Text>

            {/* Name Section */}
            <View className="flex-row justify-between items-center mb-4">
              <View className="flex-1">
                <Text className="text-md text-gray-600">Full Name</Text>
                <Text className="text-base text-gray-800 mt-1">John Doe</Text>
              </View>
             
            </View>

           
            {/* Contact Information */}
            <View>
              {/* Phone */}
              <View className="mb-4">
                <Text className="text-sm text-gray-600">Phone Number</Text>
                <Text className="text-base text-gray-800 mt-1">+1 (555) 123-4567</Text>
              </View>

              {/* Email */}
              <View className="mb-4">
                <Text className="text-sm text-gray-600">Email Address</Text>
                <Text className="text-base text-gray-800 mt-1">john.doe@example.com</Text>
              </View>

              {/* Gender */}
              <View className="mb-4">
                <Text className="text-sm text-gray-600">Gender</Text>
                <Text className="text-base text-gray-800 mt-1">Male</Text>
              </View>

              {/* Address */}
              <View className="mb-4">
                <Text className="text-sm text-gray-600">Address</Text>
                <Text className="text-base text-gray-800 mt-1">1234 Main St, City, Country</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

