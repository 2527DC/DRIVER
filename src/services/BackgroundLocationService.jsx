
import Geolocation from '@react-native-community/geolocation';
import database from '@react-native-firebase/database'

const sleep = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));

 export const updateLocationTask = async (taskDataArguments) => {
    const { delay } = taskDataArguments;

    await new Promise(async (resolve) => {
        while (BackgroundService.isRunning()) {
            // Get current location
            Geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;

                    console.log(`Location: ${latitude}, ${longitude}`);

                    // Send location to Firebase    
                    await database()
                   .ref('/prcatice/user1/')
                        .doc('yourUserId') // Replace with dynamic user ID
                        .set({
                            latitude,
                            longitude,
                          
                        })
                        .catch((error) => console.error('Error updating Firebase:', error));
                },
                (error) => console.error('Geolocation Error:', error),
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );

            await sleep(delay); // Delay for 2 seconds between updates
        }
    });
};

const options = {
    taskName: 'Location Update',
    taskTitle: 'Updating Location',
    taskDesc: 'Sending location to Firebase every 2 seconds',
   
    color: '#00ff00',
    // Adjust for your app's deep link
    parameters: {
        delay: 2000, // 2 seconds
    },
};

// Start the background service
await BackgroundService.start(updateLocationTask, options);

// Stop the service when needed
await BackgroundService.stop();
