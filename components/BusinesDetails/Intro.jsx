import { View, Text, Image, TouchableOpacity, Alert, ToastAndroid } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { useRouter } from 'expo-router';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../configs/fireBaseConfig';
import { useUser } from '@clerk/clerk-expo';
import ActionButtons from './ActionButtons';

const Intro = ({ business }) => {
    const router = useRouter();
    const {user} = useUser();

    const OnDelete = () => {
        Alert.alert(
            "Do you want to Delete?",
            "Do you really want to delete",
            [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                {
                    text: 'Delete',
                    onPress: () => {
                        deleteBusiness();
                    },
                    style: 'destructive'
                }
            ]
        );
    };

    const deleteBusiness = async () => {
        try {
            await deleteDoc(doc(db, 'BusinessList', business?.id));
            router.back();
            ToastAndroid.show("Business Deleted!", ToastAndroid.LONG);
        } catch (error) {
            console.error("Error deleting business: ", error);
            ToastAndroid.show("Failed to delete business", ToastAndroid.LONG);
        }
    };

    return (
        <View>
            <View style={{
                position: 'absolute',
                zIndex: 100,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
                padding: 10,
                marginTop: 20
            }}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="chevron-back-circle" size={40} color={Colors.PRIMARY} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Ionicons name="heart-sharp" size={40} color={Colors.PRIMARY} />
                </TouchableOpacity>
            </View>
            <Image source={{ uri: business.imageUrl }}
                style={{
                    width: '100%',
                    height: 350
                }}
            />
            
            <View style={{
                marginTop: -30,
                padding: 20,
                borderTopLeftRadius: 40,
                borderTopRightRadius: 40,
                backgroundColor: 'white'
            }}>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <Text style={{
                        fontFamily: 'bold',
                        fontSize: 18,
                    }}>{business.name}
                    </Text>
                    {user?.primaryEmailAddress.emailAddress==business?.userEmail &&<TouchableOpacity onPress={OnDelete}>
                        <Ionicons name="trash" size={30} color="red" />
                    </TouchableOpacity>}
                </View>
                <Text style={{
                    fontFamily: 'regular',
                    fontSize: 14,
                    color: 'grey'
                }}>{business.address}</Text>
                <View className='flex-row'>
                    <View className=' flex-1 flex-row space-x-2'>
                        <Image source={require('./../../assets/images/star.png')} className='w-6 h-6' />
                        <Text style={{ fontSize: 12, fontFamily: 'regular', }}>4.5</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default Intro;
