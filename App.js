import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeScreen from './src/components/screens/HomeScreen';
import CategoriesScreen from './src/components/screens/CategoriesScreen';
import BadgeScreen from './src/components/screens/BadgeScreen';
import BookHistoryScreen from './src/components/screens/BookHistoryScreen';
import LibrariesScreen from './src/components/screens/LibrariesScreen';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator 
        initialRouteName="BadgeScreen"
        backBehavior='order'
        drawerType='front'
        minSwipeDistance='100'
      >
        <Drawer.Screen name="BadgeScreen" component={BadgeScreen} options={{title: 'My Badge ID'}}/>
        <Drawer.Screen name="BookHistoryScreen" component={BookHistoryScreen} options={{title: 'Book History'}}/>
        <Drawer.Screen name="LibrariesScreen" component={LibrariesScreen} options={{title: 'Look for libraries'}}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
