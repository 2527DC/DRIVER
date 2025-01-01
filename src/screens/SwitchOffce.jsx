import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ToastAndroid } from 'react-native';

// SwitchItem component for rendering individual items with multiple descriptions
const SwitchItem = ({ title, descriptions, isChecked, onToggle }) => {
  return (
    <View className='flex-1 p-1 bg-white m-2 py-3 rounded-lg'>
      <View className='flex-row justify-between p-2'>
        <Text className='text-lg'>{title}</Text>
        <TouchableOpacity onPress={onToggle}>
          <Icon
            name={isChecked ? "check-box" : "check-box-outline-blank"}
            size={24}
            color={isChecked ? "blue" : "gray"}
          />
        </TouchableOpacity>
      </View>

      {descriptions.map((description, index) => (
        <View key={index} className='flex-row items-center'>
          <Text className='px-2'>
            <Icon name="check-circle" size={20} color="green" />
          </Text>
          <Text className='p-1'>{description}</Text>
        </View>
      ))}
    </View>
  );
};

const SwitchOffce = () => {
  const [switches, setSwitches] = useState([
    { id: 1, title: "Office one id or name", descriptions: ["Platform Configured", "Cab Associated", "Employee Data Synced"], isChecked: false },
    { id: 2, title: "Another Item", descriptions: ["System Initialized", "Server Setup", "Database Synced"], isChecked: false },
  ]);

  // Handle toggle of checkbox ensuring only one item is checked at a time
  const handleToggle = (id) => {
    const updatedSwitches = switches.map(switchItem =>
      switchItem.id === id
        ? { ...switchItem, isChecked: true }
        : { ...switchItem, isChecked: false }
    );
    setSwitches(updatedSwitches);
  };

  // Handle the "Start" button click to log checked items' titles
  const handleStart = () => {
    const checkedItems = switches.filter(item => item.isChecked);
    
  
   
   
      console.log("Checked Item: ", checkedItems[0].title);
    
  };

  return (
    <ScrollView className='flex-1'>
      {switches.map(switchItem => (
        <SwitchItem
          key={switchItem.id}
          title={switchItem.title}
          descriptions={switchItem.descriptions}
          isChecked={switchItem.isChecked}
          onToggle={() => handleToggle(switchItem.id)}
        />
      ))}

      {/* Start Button at the bottom */}
      <TouchableOpacity
        onPress={handleStart}
        style={{
          backgroundColor: 'blue',
          padding: 15,
          margin: 20,
          borderRadius: 5,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: 'white', fontSize: 16 }}>Start</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SwitchOffce;
