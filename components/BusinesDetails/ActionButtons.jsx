import { View, Text, FlatList, Image, TouchableOpacity, Linking, Share } from 'react-native';
import React from 'react';
import { Colors } from '../../constants/Colors';

const ActionButtons = ({ business }) => {
    const actionButtonsMenu = [
        {
            id: 1,
            name: 'call',
            icon: require('./../../assets/images/call.png'),
            url: 'tel:' + business?.contact
        },
        {
            id: 2,
            name: 'Location',
            icon: require('./../../assets/images/pin.png'),
            url: 'https://www.google.com/maps/search/?api=1&query=' + business?.address
        },
        {
            id: 3,
            name: 'web',
            icon: require('./../../assets/images/web.png'),
            url: business?.website
        },
        {
            id: 4,
            name: 'share',
            icon: require('./../../assets/images/share.png'),
            url: ''  // This can be handled later for sharing functionality
        },
    ];

    const onPressHandler = (item) => {
        if (item.name === 'share') {
            // Implement share functionality here
            Share.share({
                message: business?.name + "\n Address:" + business?.address + "\n vaibhav awate" + business.about
            })
            return;
        }
        Linking.openURL(item.url);
    };

    return (
        <View style={{ padding: 10,backgroundColor:'#fff' }}>
            <FlatList
                data={actionButtonsMenu}
                keyExtractor={(item) => item.id.toString()}
                numColumns={4}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                renderItem={({ item }) => (
                    <TouchableOpacity style={{
                        backgroundColor: '#fff', width: 70, borderRadius: 100, height: 70, justifyContent: 'center', alignItems: 'center', 
                        borderWidth: .1, borderColor: 'green', shadowColor: Colors.PRIMARY,
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 5,
                    }}
                        onPress={() => onPressHandler(item)}
                    >
                        <Image source={item.icon}
                            style={{
                                width: 20,
                                height: 20,

                            }}
                        />
                        <Text
                            style={{
                                fontFamily: 'regular',
                                textAlign: 'center',
                                fontSize: 10
                            }}>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

export default ActionButtons;
