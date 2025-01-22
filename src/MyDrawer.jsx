import React from 'react';
import { createDrawerNavigator, } from '@react-navigation/drawer';

import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import Practice from './screens/Practice';


const Drawer = createDrawerNavigator();

  const DrawerNavigation = () => (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="practice" component={Practice} />
    </Drawer.Navigator>
  );
 export default DrawerNavigation;