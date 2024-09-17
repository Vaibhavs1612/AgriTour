import { View, Image, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Colors } from '../../constants/Colors';
import { useRouter } from 'expo-router';

const PopularBusinessCart = ({ business }) => {
    const router = useRouter();
    return (
        <TouchableOpacity 
            className='p-2 bg-white m-2'
            onPress={() => router.push('/businessdetails/' + business?.id)}
            style={{
                shadowColor: Colors.PRIMARY,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 5,
                elevation: 3,
                overflow: 'hidden',
                flex: 1,
                width: 380, // Set a fixed width
                paddingBottom:15,
                borderWidth:.6,
                borderColor:Colors.PRIMARY,
            }}
        >
            <Image source={{ uri: business?.imageUrl }}
                style={{ width: '100%', height: 200, borderRadius: 0 }}
            />
            <View style={{ padding: 5 }}>
                <Text style={{ fontFamily: "medium", fontSize: 16 }}>{business.name}</Text>
                <Text 
                    style={{ fontFamily: "medium", fontSize: 14 }}
                    numberOfLines={2} // Limits the number of lines to 2
                >
                    {business.address}
                </Text>
            </View>
            <View className='flex-row'>
                <View className='flex-1 flex-row space-x-2'>
                    <Image source={require('./../../assets/images/star.png')} className='w-6 h-6' />
                    <Text style={{ fontSize: 12, fontFamily: 'regular' }}>4.5</Text>
                </View>
                <Text 
                    style={{
                        fontSize: 10,
                        backgroundColor: Colors.PRIMARY,
                        borderRadius: 10,
                        color: "white",
                        padding: 3,
                        textAlign: "center",
                        paddingBottom: 6,
                        marginBottom: 15
                    }}
                >
                    {business.category}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

export default PopularBusinessCart;
