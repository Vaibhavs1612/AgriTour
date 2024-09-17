import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'
import { router, useRouter } from 'expo-router'
import { EvilIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';


const BusinessListCart = ({ business }) => {
    const router = useRouter();
    return (
        <TouchableOpacity
            onPress={() => router.push('/businessdetails/' + business?.id)}
            style={{
                borderWidth: 0.3,
                borderColor: Colors.PRIMARY,
                backgroundColor: '#fff',
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
                marginTop: 20,
                shadowColor: Colors.PRIMARY,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 5,
                elevation: 3,
                overflow: 'hidden',
            }}>


            <Image source={{ uri: business.imageUrl }}
                style={{
                    width: '100%',
                    height: 150,
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15,

                }}
            />

            <View style={{
                padding: 10
            }}>
                <View style={{
                    display:'flex',
                    flexDirection:'row',
                    gap:8
                }}>
                <Entypo name="shop" size={24} color={Colors.PRIMARY} />
                <Text style={{
                    fontFamily: 'bold'
                }}>{business?.name}</Text>
                
                </View>
                <View className='flex-row' style={{ alignItems: 'center',gap:8 }}>
                    <EvilIcons name="location" size={24} color={Colors.PRIMARY} />
                    <Text style={{ fontFamily: 'regular', fontSize: 13, color: 'grey' }}>{business.address}</Text>
                </View>
                <Text
                    style={{
                        fontSize: 10,
                        backgroundColor: "#fff",
                        borderRadius: 10,
                        color: Colors.PRIMARY,
                        padding: 3,
                        textAlign: "center",
                        paddingBottom: 6,
                        marginBottom: 15,
                        height: 28,
                        width: 70,
                        marginTop: 5,
                        borderWidth:.5,
                        borderColor:Colors.PRIMARY
                    }}
                >{business.category}</Text>
            </View>

        </TouchableOpacity>
    )
}

export default BusinessListCart