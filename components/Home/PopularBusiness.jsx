import { View, Text, FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { collection, getDocs, limit, query } from 'firebase/firestore';
import { db } from '../../configs/fireBaseConfig';
import PopularBusinessCart from './PopularBusinessCart';
import { router } from 'expo-router';

const PopularBusiness = () => {
    const [businessList, setBusinessList] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        GetBusinessList();
    }, []);

    const GetBusinessList = async () => {
        setBusinessList([]);
        const q = query(collection(db, 'BusinessList'), limit(10));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            console.log(doc.data());
            setBusinessList(prev => [...prev, { id: doc.id, ...doc.data() }]);
        });
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await GetBusinessList();
        setRefreshing(false);
    };

    return (
        <View>
            <View style={{ flexDirection: 'row', paddingTop: 20 }}>
                <Text style={{ fontFamily: 'medium', fontSize: 15, padding: 1, flex: 1 }}>Business List</Text>
                <TouchableOpacity style={{ marginTop: 4, flexDirection: 'row', gap: 9, alignContent: 'center', alignItems: 'center', marginRight: 8 }}
                onPress={()=>router.push('/explore')}
                >
                    <Text style={{ fontSize: 10, color: Colors.PRIMARY, fontFamily: 'medium' }}>View All</Text>
                    <Ionicons name="arrow-forward-outline" size={24} color={Colors.PRIMARY} />
                </TouchableOpacity>
            </View>
            <FlatList
                data={businessList}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={{ paddingLeft: 15, paddingTop: 8,marginLeft:-16}}
                renderItem={({ item }) => (
                    <PopularBusinessCart business={item} />
                )}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            />
        </View>
    );
};

export default PopularBusiness;
