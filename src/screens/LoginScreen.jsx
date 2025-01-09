import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View, ScrollView, SafeAreaView, TextInput } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const Login = ({ navigation }) => {

  const [dlNumber, setDlNumber] = useState('');

  const handleSubmit = () => {
    console.log('DL Number submitted:', dlNumber);
    navigation.navigate("Main")
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





// import React, { useState } from "react";
// import { Image, Text, TouchableOpacity, View, ScrollView, SafeAreaView, TextInput } from "react-native";
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// const Login = ({ navigation }) => {

//   const [dlNumber, setDlNumber] = useState('');

//   const handleSubmit = () => {
//     console.log('DL Number submitted:', dlNumber);
//   };

//   return (
//     <SafeAreaView className="flex-1 bg-white">
//       <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
//         {/* Header Image */}
//         <View className="flex-row">
//           <Image
//             source={require('../assets/image/Ellipse1.png')}
//             className="w-full h-48"
//           />
//         </View>

//         {/* ETS Image */}
//         <View className="items-center justify-between mb-6">
//           <Image
//             source={require('../assets/image/ETS.jpeg')}
//             className="w-1/2 h-28"
//             resizeMode="contain"
//           />
//         </View>

//         {/* Input Form Section */}
//         <View className="items-center p-3">
//           <Text className="text-lg mb-2">Enter YOUR DL Number</Text>
//           <View className="flex-row">
//             <TextInput
//               className="w-[280px] p-3 border border-gray-400 rounded-lg"
//               placeholder="Enter your DL Number"
//               value={dlNumber}
//               onChangeText={setDlNumber}
//             />
//             <TouchableOpacity onPress={handleSubmit} className="p-1 ml-4 items-center">
//               <MaterialIcons name="arrow-forward" size={30} color="black" />
//             </TouchableOpacity>
//           </View>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default Login;
