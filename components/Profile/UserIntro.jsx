import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import { Colors } from '../../constants/Colors'
import { router } from 'expo-router'

const UserIntro = () => {
    const { user } = useUser();
    return (
        <View style={{
            display: 'flex',
            alignItems: 'center',
            marginTop: 30
        }}>
            <TouchableOpacity style={{
                shadowColor: Colors.PRIMARY,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 5,
                elevation: 3,
                overflow: 'hidden',
                borderWidth:0.2,
                borderColor:Colors.PRIMARY,
                borderRadius:85
            }}
            onPress={()=>router.push('/home')}
            >
            <Image source={{ uri: user?.imageUrl }}
                style={{
                    width: 200,
                    height: 200,
                    borderRadius: 100
                }}
            />
            </TouchableOpacity>
            <Text style={{
                fontFamily: "bold",
                fontSize: 22,
                marginTop: 8
            }}>{user?.fullName}</Text>
            <Text style={{
                fontFamily: "regular",
                fontSize: 12,
            }}>{user?.primaryEmailAddress?.emailAddress}</Text>
        </View>
    )
}

export default UserIntro