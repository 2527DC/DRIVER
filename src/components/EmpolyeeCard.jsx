import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, TextInput } from 'react-native';
import Icons from "react-native-vector-icons/MaterialIcons"
const EmployeeCard = ({name}) => {

    const [showOtpComponent, setShowOtpComponent] = useState(false);
    const [otp, setOtp] = useState(['', '', '', '']); // State for OTP input (4 boxes)
    const inputRefs = useRef([]); // Array to hold refs for the input boxes

    const handleChange = (text, index) => {
        if (text.length <= 1) {
          const newOtp = [...otp];
          newOtp[index] = text;
          setOtp(newOtp);
    
          // Move focus to the next input if it's filled
          if (text.length === 1 && index < otp.length - 1) {
            inputRefs.current[index + 1]?.focus();
          }
        }
      };

      const handleKeyPress = (e, index) => {
        // When backspace is pressed, move focus to the previous input
        if (e.nativeEvent.key === 'Backspace' && otp[index] === '') {
          if (index > 0) {
            inputRefs.current[index - 1]?.focus();
          }
        }
      };
    
      const handleSubmit = () => {
        const enteredOtp = otp.join(''); // Join the OTP array into a string
        if (enteredOtp.length < 4) {
          Alert.alert('Error', 'Please enter all 4 digits of the OTP');
          return;
        }
        console.log('Entered OTP:', enteredOtp);
        // Alert.alert('OTP Submitted', `Your OTP: ${enteredOtp}`);
       
        // Clear the fields
        setOtp(['', '', '', '']);
        inputRefs.current[0]?.focus(); // Focus on the first input after clearing
      };
    
  const handleOtpVerification = () => {
   setShowOtpComponent(!showOtpComponent)
  };

  const handleNoShow = () => {
    Alert.alert('No Show', 'No Show button pressed.');
  };

  return (

    <View className="bg-white rounded-lg shadow-md m-2 p-4">
        <View className=''>
      <View className="mb-4">
        <Text className="text-lg font-bold text-gray-800">{name}</Text>
      </View>
      <View className="flex-row justify-between  p-3">
        <TouchableOpacity
          className="flex-1 bg-green-500 rounded-md py-2 mx-1 items-center"
          onPress={handleOtpVerification}
        >
          <Text className="text-white font-bold">OTP Verification</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-1 bg-red-500 rounded-md py-2 mx-1 items-center"
          onPress={handleNoShow}
        >
          <Text className="text-white font-bold">No Show</Text>
        </TouchableOpacity>
        </View>
        {

            showOtpComponent?
            <View className="mt-1 p-3 flex-row justify-between items-center">
            <View className="flex-row justify-between mb-5">
              {otp.map((item, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => (inputRefs.current[index] = ref)} // Store ref in the array
                  className="w-11 h-12 border-2 border-gray-700 rounded-lg mx-1 text-center text-xl"
                  keyboardType="numeric"
                  maxLength={1}
                  value={item}
                  onChangeText={(text) => handleChange(text, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  textAlign="center"
                  autoFocus={index === 0} // Focus on the first input by default
                />
              ))}
            </View>
          
            <View className="bg-green-500">
              <TouchableOpacity onPress={handleSubmit} className="rounded-lg relative">
              <View
                    style={{
                        width: 50, // Set desired width
                        height: 30, // Maintain height for aspect ratio
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute',
                        left: -80, // Adjust to move left
                        top: -20,  // Adjust to move upward
                    }}
                    >
                    <Icons
                        name="arrow-forward"
                        size={30} // Maintain icon size
                        color="blue"
                    />
                    </View>

              </TouchableOpacity>
            </View>
          </View>
          
          :""
        }
      </View>
    </View>
  );
};

export default EmployeeCard;
