import React from 'react';
import { ScrollView, View} from 'react-native';
import TripCard from '../components/TripCard';


const HomeScreen = () => {
  
  const tripData = [
    {
      site: 'Office Number 1',
      date: '30 Dec, 11:40 PM',
      startLocation: 'stonex',
      endLocation: 'shivakote',
      employees: ['Rajanee', 'John', 'Emily']
    },
    {
      site: 'Office Number 2',
      date: '25 Dec, 10:00 AM',
      startLocation: 'alpha',
      endLocation: 'beta',
      employees: ['Michael', 'Sarah', 'David']
    },
    {
      site: 'Office Number 3',
      date: '20 Dec, 02:30 PM',
      startLocation: 'gamma',
      endLocation: 'delta',
      employees: ['Samantha', 'Chris', 'Natalie']
    }
  ];
  return (  <ScrollView>
    <View className="flex-1 mb-4 bg-white">
    {tripData.map((trip, index) => (
      <TripCard
        key={index}
        site={trip.site}
        date={trip.date}
        startLocation={trip.startLocation}
        endLocation={trip.endLocation}
        employees={trip.employees}
      />
    ))}
    </View>
   
  </ScrollView>
);

 
};

export default HomeScreen;
