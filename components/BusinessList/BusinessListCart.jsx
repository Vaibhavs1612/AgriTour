import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { EvilIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
const BusinessListCart = ({ business }) => {
    const router = useRouter();
    return (
        <TouchableOpacity
            className='bg-white mt-3 mr-2 p-2 flex-row space-x-3 flex-1'
            onPress={() => router.push('/businessdetails/'+business.id)}
            style={{
                shadowColor: Colors.PRIMARY,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 5,
                elevation: 3,
                overflow: 'hidden',
                borderWidth:0.2,
                borderColor:Colors.PRIMARY,
            }}
        >
            <Image source={{ uri: business.imageUrl }}
                style={{
                    width: 140,
                    height: 140,
                    borderRadius:12,
                    
                }}

            />
            <View className='flex-1 space-y-1'>
                <Text style={{ fontFamily: 'bold', fontSize: 15 }}>{business.name}</Text>
                <View className='flex-row' style={{ alignItems: 'center' }}>
                    <EvilIcons name="location" size={24} color="black" />
                    <Text style={{ fontFamily: 'regular', fontSize: 13, color: 'grey' }}>{business.address}</Text>
                </View>
                <View className=' flex-1 flex-row space-x-2'>
                    <Image source={require('./../../assets/images/star.png')} className='w-6 h-6' />
                    <Text style={{ fontSize: 12, fontFamily: 'regular', }}>4.5</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default BusinessListCart