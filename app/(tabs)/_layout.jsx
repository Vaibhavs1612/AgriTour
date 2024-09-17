import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { Entypo } from '@expo/vector-icons';
import { FontAwesome,AntDesign } from '@expo/vector-icons';
import { Colors } from './../../constants/Colors';

const TabLayout = () => {
    return (
        <Tabs screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: Colors.PRIMARY,
            // tabBarStyle:{
            //     height:50,
            //     // paddingBottom:5,
            //     // paddingTop:5,
            //     // backgroundColor:Colors.PRIMARY
            // },
            // tabBarIconStyle: {
            //     marginTop: 5,
            // },
            // tabBarLabelStyle: {
            //     fontSize: 12,
            //     fontWeight: 'medium',
            // },
        }}>
            <Tabs.Screen name="home"
            options={{
                tabBarLabel:'Home',
                tabBarIcon:({color})=><FontAwesome name="home" size={24} color={color} />
            }} />
            <Tabs.Screen name="explore"options={{
                tabBarLabel:'Explore',
                tabBarIcon:({color})=><AntDesign name="search1" size={24} color={color}  />
            }} />
            <Tabs.Screen name="profile"options={{
                tabBarLabel:'Profile',
                tabBarIcon:({color})=><FontAwesome name="user" size={24} color={color}  />
            }} />
        </Tabs>
    )
}

export default TabLayout