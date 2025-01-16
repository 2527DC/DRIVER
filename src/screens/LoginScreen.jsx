import React, {  useState } from "react";
import { Image, Text, TouchableOpacity, View, SafeAreaView, TextInput } from "react-native";
import { useAppContext } from "../Store/AppContext";


const Login = ({ navigation }) => {

  const [dlNumber, setDlNumber] = useState('');
   const {  isLoggedIn, setIsLoggedIn}=useAppContext()

  const handleSubmit = () => {
    console.log('DL Number submitted:', dlNumber);
   setIsLoggedIn(true)
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      
        {/* Header Image */}
        <View className="flex-row">
          <Image
            source={require('../assets/image/Ellipse1.png')}
            className="w-full h-48"
          />
        </View>

        {/* ETS Image */}
        <View className="items-center justify-between">
          <Image
            source={require('../assets/image/ETS.jpeg')}
            className="w-1/2 h-28"
            resizeMode="contain"
          />
        
        </View>

        <View className="flex-1  items-center p-3 py-6  m-1">
       

          
       <Text className="text-lg mb-2">Enter Your DL Number</Text>
       <View className="  flex-row   ">
       <TextInput
         className="  w-[280px] p-3 border border-gray-400 rounded-lg"
         placeholder="Enter your DL Number"
         value={dlNumber}
         onChangeText={setDlNumber}
       />
       
       </View>
       <TouchableOpacity onPress={handleSubmit} className="p-1 py-9  items-center">
        
       <Text className="font-bold text-[16pxs]"> Submit</Text>
       </TouchableOpacity>
     </View>
     
    </SafeAreaView>
  );
};

export default Login;


