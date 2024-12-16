import React from 'react';
import { View, Text, FlatList } from 'react-native';

const BookingHistory = ({ data }) => {
  const renderBookingItem = ({ item }) => (
    <View className="bg-white p-4 mb-4 rounded-lg shadow-lg">
      <Text className="text-sm mb-2">
        <Text className="font-bold">Booking ID:</Text> {item.booking_id}
      </Text>
      <Text className="text-sm mb-2">
        <Text className="font-bold">Ride Status:</Text> {item.ride_status}
      </Text>
      <Text className="text-sm mb-2">
        <Text className="font-bold">Book Date:</Text> {item.book_date}
      </Text>
      <Text className="text-sm mb-2">
        <Text className="font-bold">Book Time:</Text> {item.book_time}
      </Text>
      <Text className="text-sm mb-2">
        <Text className="font-bold">Source Address:</Text> {item.source_address}
      </Text>
      <Text className="text-sm mb-2">
        <Text className="font-bold">Destination Address:</Text> {item.dest_address}
      </Text>
      <Text className="text-sm mb-2">
        <Text className="font-bold">Journey Date:</Text> {item.journey_date}
      </Text>
      <Text className="text-sm mb-2">
        <Text className="font-bold">Journey Time:</Text> {item.journey_time}
      </Text>
      <Text className="text-sm mb-2">
        <Text className="font-bold">Source Time:</Text> {item.source_time}
      </Text>
      <Text className="text-sm mb-2">
        <Text className="font-bold">Destination Time:</Text> {item.dest_time}
      </Text>
      <Text className="text-sm mb-2">
        <Text className="font-bold">Driving Time:</Text> {item.driving_time || 'N/A'}
      </Text>
      <Text className="text-sm mb-2">
        <Text className="font-bold">Total Distance:</Text> {item.total_kms}
      </Text>
      <Text className="text-sm mb-2">
        <Text className="font-bold">Amount:</Text> ${item.amount}
      </Text>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-100 ">
      <FlatList
        data={data}
        renderItem={renderBookingItem}
        keyExtractor={(item) => item.booking_id.toString()}
        contentContainerStyle="pb-4"
      />
    </View>
  );
};

export default BookingHistory;
