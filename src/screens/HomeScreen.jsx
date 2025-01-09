  import React, { useEffect, useState } from 'react';
  import {  Text, TouchableOpacity, View, TextInput, FlatList } from 'react-native';
  import TripCard from '../components/TripCard';
  import database from '@react-native-firebase/database';
  const HomeScreen = () => {
    const [dutycard, setDutyCard] = useState(false);
  

    const handleDutyCard = () => {
      setDutyCard(true);
    }

    return (  
      <View className='flex-1 '>
      {dutycard && (
        <View className='absolute top-0 left-0 right-0 bottom-0 justify-center items-center bg-opacity-50 z-50'>
          <View className='w-80 p-5 bg-white rounded-lg shadow-lg'>
            {/* Header Section */}
            <View className='flex-row justify-between items-center mb-4'>
              <Text className='text-lg font-bold'>ENTER YOUR DUTY ID</Text>
              <TouchableOpacity className='p-2 rounded-full' onPress={() => setDutyCard(false)}>
                <Text className='text-red-500 font-bold'>X</Text>
              </TouchableOpacity>
            </View>
            <TextInput className='border p-2 mb-4' placeholder='Duty ID' />
            <TouchableOpacity className='p-3 bg-blue-500 rounded-lg' onPress={() => setDutyCard(false)}>
              <Text className='text-white text-center'>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    
      <FetchData />
    
      <View className='flex-1 justify-end'>
        <View className='p-2 py-5 mb-2 bg-gray-700'>
          <View className='flex-row justify-between'>
            <View className='px-2'>
              <Text className='text-white'>MLT-218</Text>
              <Text className='text-white'>MLT-2198</Text>
            </View>
            <TouchableOpacity className='p-2 bg-green-500 mr-9 rounded-lg py-3' onPress={handleDutyCard}>
              <Text>Start Duty</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
    
    );
  };

  export default HomeScreen;





const FetchData = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const reference = database().ref('/DRIVERS/KA-02-AA-9282'); // Adjust path if necessary

        reference.once('value')
            .then(snapshot => {
                if (snapshot.exists()) {
                    const fetchedData = snapshot.val();
                    // Convert data to array for easy rendering
                    const parsedData = Object.keys(fetchedData).map(key => ({
                        id: key,
                        ...fetchedData[key]
                    }));
                    setData(parsedData);
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);




const employe=['shgobs','hghsg','hgshgs']
    return (
        <View>
           
            <FlatList
                data={data}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                  
                    <View>

                    <TripCard
                    id={item.id}
                      key={item.id}
                      site={item.site}
                      date={item.date}
                      startLocation={item.start}
                      endLocation={item.end}
                      employees={item.employes}
                      pickupPoints={item.pickupPoints}
                    />
                      

                    </View>
                )}
            />
        </View>
    );
};

