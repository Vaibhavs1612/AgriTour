import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import { Colors } from './../../constants/Colors'
import { Ionicons } from '@expo/vector-icons';

const Header = () => {
    const { user } = useUser();

    return (
        <View style={{ 
            backgroundColor: Colors.PRIMARY, 
            // borderBottomLeftRadius: 30, 
            // borderBottomRightRadius: 30, 
            paddingTop: 36, 
            paddingLeft: 12, 
            paddingBottom: 12, 
            zIndex: 100 
        }}>
            <View style={{ 
                flexDirection: 'row', 
                alignItems: 'center',
            }}>
                <Image style={{ 
                    width: 56, 
                    height: 56, 
                    borderRadius: 28 
                }} source={{ uri: user?.imageUrl }} />
                <View style={{ 
                    paddingLeft: 8,
                    justifyContent: 'center' 
                }}>
                    <Text style={{ 
                        color: '#fff', 
                        fontWeight: 'bold', 
                        fontSize: 16 
                    }}>Welcome</Text>
                    <Text style={{ 
                        color: '#fff', 
                        fontWeight: '500', 
                        fontSize: 14 
                    }}>{user?.fullName}</Text>
                </View>
                <View style={{ 
                    marginTop: 16, 
                    marginRight: 8, 
                    // backgroundColor: '#f9f9f9', 
                    padding: 8, 
                    flexDirection: 'row', 
                    alignItems: 'center',
                    marginLeft:30 
                    
                }}>
                    <Ionicons name="location-sharp" size={24} color='#fff' />
                    <TouchableOpacity>
                        <Text style={{ 
                            color: '#fff', 
                            fontWeight: '500', 
                            paddingLeft: 8 
                        }}>Set Location</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Header;
