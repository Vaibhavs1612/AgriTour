import { View, Text, FlatList, Image, TouchableOpacity, Share, Alert } from 'react-native';
import React from 'react';
import { Colors } from '../../constants/Colors'
import { useRouter } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo';

const MenuList = () => {
    const router = useRouter();
    const { signOut } = useAuth();

    const OnMenuClick = (item) => {
        if (item.path === 'logout') {
            Alert.alert(
                "Log Out",
                "Do you really want to log out?",
                [
                    {
                        text: 'Cancel',
                        style: 'cancel'
                    },
                    {
                        text: 'Log Out',
                        onPress: () => signOut(),
                        style: 'destructive'
                    }
                ]
            );
            return;
        }
        if (item.path === 'share') {
            Share.share({
                message: 'Download Business Directory app by VAIBHAV AWATE, Download URL:'
            });
            return;
        }
        router.push(item.path);
    };

    const menuList = [
        {
            id: 1,
            name: 'Add Business',
            icon: require('../../assets/images/add.png'),
            path: '/business/add-business'
        },
        {
            id: 2,
            name: 'My Business',
            icon: require('../../assets/images/business-and-trade.png'),
            path: '/business/my-business'
        },
        {
            id: 3,
            name: 'Share App',
            icon: require('../../assets/images/share_1.png'),
            path: 'share'
        },
        {
            id: 4,
            name: 'Log out',
            icon: require('../../assets/images/logout.png'),
            path: 'logout'
        },
    ];

    return (
        <View>
            <FlatList
                numColumns={2}
                data={menuList}
                renderItem={({ item, index }) => (
                    <TouchableOpacity key={index} style={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'row',
                        gap: 10,
                        flex: 1,
                        marginTop: 20,
                        marginHorizontal: 3,
                        borderRadius: 25,
                        backgroundColor: '#fff',
                        shadowColor: Colors.PRIMARY,
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.2,
                        shadowRadius: 5,
                        elevation: 3,
                        padding: 10,
                    }}
                        onPress={() => OnMenuClick(item)}
                    >
                        <View style={{
                            flexDirection: 'row', alignItems: 'center', gap: 2
                        }}>
                            <Image source={item.icon}
                                style={{
                                    width: 60,
                                    height: 60,
                                    borderRadius: 30
                                }}
                            />
                            <Text style={{
                                fontFamily: 'medium',
                                fontSize: 12
                            }}>{item.name}</Text></View>
                    </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
            <View className='mt-10'>
                <Text style={{
                    marginTop: 20,
                    fontSize: 8,
                    fontFamily: 'regular',
                    color: '#333',
                    textAlign: 'center',
                    textShadowColor: 'rgba(0, 0, 0, 0.3)',
                    textShadowOffset: { width: 1, height: 1 },
                    textShadowRadius: 5,
                    marginTop: 20,
                }}>
                    Developed By
                    <Text style={{
                        fontSize: 10,
                        fontFamily: 'bold',
                        color: Colors.PRIMARY,
                        textShadowColor: 'rgba(0, 0, 0, 0.3)',
                        textShadowOffset: { width: 1, height: 1 },
                        textShadowRadius: 5,
                    }}> Vaibhav Awate</Text>
                </Text>
            </View>

        </View>
    );
}

export default MenuList;
