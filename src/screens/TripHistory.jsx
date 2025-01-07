import { View, Text, TouchableOpacity, Animated, Modal, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import Filter from 'react-native-vector-icons/MaterialCommunityIcons'; // Import icon library
import { Calendar } from 'react-native-calendars'; // Import Calendar component

const TripHistory = () => {
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null); // Track the selected date
  const [animation] = useState(new Animated.Value(0)); // Start with the calendar off-screen
  const navigation = useNavigation();

  const handleFilterButton = () => {
    setCalendarVisible(true); // Show the calendar when the filter button is pressed
    Animated.timing(animation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleCancel = () => {
    setCalendarVisible(false); // Close the calendar without doing anything
    setSelectedDate(null); // Reset the selected date
  };

  const handleOk = () => {
    console.log('Selected date:', selectedDate);
    setCalendarVisible(false); // Close the calendar after confirming the date
  };

  useEffect(() => {
    navigation.setOptions({
      title: "Trip History",
      headerStyle: {
        backgroundColor: "white",
      },
      headerTintColor: "black",
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerRight: () => (
        <TouchableOpacity onPress={handleFilterButton} className='mr-2'>
          <Filter name="filter-menu-outline" size={27} color="black" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View className='flex-1'>
      <Text>Upcoming Trip</Text>

      {/* The Animated View for the calendar */}
      <Animated.View
        style={{
          opacity: animation,
          transform: [{
            translateY: animation.interpolate({
              inputRange: [0, 1],
              outputRange: [300, 0], // Move the calendar from below to top
            }),
          }],
        }}
      >
        <Modal
          transparent={true}
          visible={calendarVisible}
          animationType="slide"
          onRequestClose={handleCancel} // Close the calendar on back press
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <View style={{ width: 320, backgroundColor: 'white', borderRadius: 10, padding: 10 }}>
              <Calendar
                // Add your calendar props here
                onDayPress={(day) => {
                  setSelectedDate(day); // Set the selected date when a day is pressed
                  console.log('Selected day', day);
                }}
                markedDates={selectedDate ? { [selectedDate.dateString]: { selected: true } } : {}}
              />
              {/* Cancel button */}
              <TouchableOpacity
                onPress={handleCancel}
                style={{
                  marginTop: 10,
                  padding: 10,
                  backgroundColor: '#ddd',
                  borderRadius: 5,
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: 'black', fontWeight: 'bold' }}>Cancel</Text>
              </TouchableOpacity>
              {/* OK button */}
              <TouchableOpacity
                onPress={handleOk}
                style={{
                  marginTop: 10,
                  padding: 10,
                  backgroundColor: '#4CAF50', // Green color for OK
                  borderRadius: 5,
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </Animated.View>
    </View>
  );
}

export default TripHistory;
