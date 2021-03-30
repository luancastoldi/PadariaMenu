import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';

import Home from './Home'
import Drink from './Drink'
import Portion from './Portion'
import Food from './Food'


const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Food"
      tabBarOptions={{
        activeTintColor: 'red',
        inactiveTintColor: 'grey',
        style: {
          backgroundColor: 'white'
        }
      }}>
        <Tab.Screen
         name="Food" 
         component={Food}
         options={{
            tabBarLabel: 'Lanches',
            tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="lunch-dining" size={size} color={color} />),
            }}
            /> 
        <Tab.Screen 
        name="Drink" 
        component={Drink} 
        options={{
            tabBarLabel: 'Bebidas',
            tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="local-drink" size={size} color={color} />  ),
            }}
            />
            <Tab.Screen 
        name="Portion" 
        component={Portion} 
        options={{
            tabBarLabel: 'Porções',
            tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="dinner-dining" size={size} color={color} />  ),
            }}
            />
      </Tab.Navigator>
    </NavigationContainer>
  );
}