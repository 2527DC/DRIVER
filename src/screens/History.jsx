import React, { useState } from 'react';
import { View, Button, ActivityIndicator } from 'react-native';
import BookingHistory from '../components/BookingHistory';

const History = () => {
  const [filter, setFilter] = useState('Upcoming'); // Default filter
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const staticData = [
    {
      booking_id: 397,
      book_date: "2024-12-12",
      book_time: "11:44:04",
      source_address: "123 Main Street, Springfield, IL",
      dest_address: "Company Not Assigned",
      journey_date: "26-12-2024",
      journey_time: "08:36:00",
      ride_status: "Completed",
      source_time: "1970-01-01 05:30:00",
      dest_time: "1970-01-01 05:30:00",
      driving_time: null,
      total_kms: "10 km",
      amount: 590,
    },
    {
      booking_id: 398,
      book_date: "2024-12-11",
      book_time: "10:30:00",
      source_address: "456 Elm Street, Springfield, IL",
      dest_address: "789 Oak Avenue, Springfield, IL",
      journey_date: "26-12-2024",
      journey_time: "09:00:00",
      ride_status: "Completed",
      source_time: "1970-01-01 06:00:00",
      dest_time: "1970-01-01 06:30:00",
      driving_time: "30 mins",
      total_kms: "15 km",
      amount: 750,
    },
    {
      booking_id: 399,
      book_date: "2024-12-10",
      book_time: "15:00:00",
      source_address: "789 Pine Street, Springfield, IL",
      dest_address: "123 Birch Road, Springfield, IL",
      journey_date: "27-12-2024",
      journey_time: "07:30:00",
      ride_status: "Completed",
      source_time: "1970-01-01 07:00:00",
      dest_time: "1970-01-01 07:45:00",
      driving_time: "45 mins",
      total_kms: "20 km",
      amount: 1000,
    },
    {
      booking_id: 400,
      book_date: "2024-12-09",
      book_time: "12:00:00",
      source_address: "321 Cedar Lane, Springfield, IL",
      dest_address: "654 Maple Street, Springfield, IL",
      journey_date: "28-12-2024",
      journey_time: "06:30:00",
      ride_status: "Upcoming",
      source_time: "1970-01-01 06:15:00",
      dest_time: "1970-01-01 07:00:00",
      driving_time: "45 mins",
      total_kms: "18 km",
      amount: 850,
    },
    {
      booking_id: 401,
      book_date: "2024-12-08",
      book_time: "09:00:00",
      source_address: "987 Willow Drive, Springfield, IL",
      dest_address: "543 Aspen Way, Springfield, IL",
      journey_date: "29-12-2024",
      journey_time: "05:30:00",
      ride_status: "Canceled",
      source_time: "1970-01-01 05:15:00",
      dest_time: "1970-01-01 06:00:00",
      driving_time: "45 mins",
      total_kms: "22 km",
      amount: 1100,
    },
  ];

  const fetchFilteredData = (filterType) => {
    setLoading(true);
    setFilter(filterType);

    // Simulate a delay to mimic fetching data
    setTimeout(() => {
      const filteredData = staticData.filter(item => item.ride_status === filterType);
      setData(filteredData);
      setLoading(false);
    }, 500);
  };

  return (
    <View className="flex-1 p-1  bg-gray-100">
  <View className="flex-row justify-between mb-5">
    <Button title="Completed" onPress={() => fetchFilteredData('Completed')} />
    <Button title="Upcoming" onPress={() => fetchFilteredData('Upcoming')} />
    <Button title="Canceled" onPress={() => fetchFilteredData('Canceled')} />
  </View>

  {loading ? (
    <ActivityIndicator size="large" color="#0000ff" />
  ) : (
    <BookingHistory data={data} />
  )}
</View>

  );
};

export default History;
