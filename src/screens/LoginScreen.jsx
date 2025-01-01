import React, { useState } from 'react';
import { TextInput, Button, View, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Login = ({ navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false, // Disable header for this screen
    });
  }, [navigation]);

  const [email, setEmail] = useState(''); // State to manage the input

  const handleSubmit = () => {
    navigation.navigate("Main")
  };

  return (
    <SafeAreaProvider>
      <View className="flex-1 justify-center items-center p-4">
        <Text className="text-2xl mb-5">Enter your DL Number</Text>

        <View className="w-2/3">
          <TextInput
            className="w-full p-3 border border-gray-400 rounded-lg mb-5"
            placeholder="Enter your DL Number"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <Button title="Submit" onPress={handleSubmit} />
      </View>
    </SafeAreaProvider>
  );
};

export default Login;
