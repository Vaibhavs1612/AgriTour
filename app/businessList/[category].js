import { View, Text, FlatList, Image, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../configs/fireBaseConfig';
import BusinessListCart from '../../components/BusinessList/BusinessListCart';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';

const BusinessListByCategory = () => {
    const navigation = useNavigation();
    const { category } = useLocalSearchParams();
    const [businessList, setBusinessList] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {

        navigation.setOptions({
            headerShown: true,
            headerTitle: category,
        });
        GetBusinessList();
    }, []);
    // used to get the business list by category
    const GetBusinessList = async () => {
        setLoading(true);
        setBusinessList([]);
        const q = query(collection(db, 'BusinessList'), where("category", '==', category));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            console.log(doc.data());
            setBusinessList(prev => [...prev, {id:doc?.id,...doc.data()}]);
        })
        setLoading(false);
    }
    return (
        <View>
            {businessList?.length > 0 && loading == false ?
                <FlatList
                    data={businessList}
                    onRefresh={GetBusinessList}
                    refreshing={loading}
                    horizontal={false}
                    showsHorizontalScrollIndicator={false}
                    style={{ paddingLeft: 6, paddingTop: 8,}}
                    renderItem={({ item, index }) => (
                        <BusinessListCart 
                        key={index}
                        business={item} />
                    )} />
                :
                loading ? <ActivityIndicator style={{ marginTop: '90%' }}
                    size={'large'}
                    color={Colors.PRIMARY}
                /> :
                    <View style={{ flexDirection: 'row', marginTop: '90%', alignItems: 'center', marginLeft: '25%', gap: 5 }}>
                        <MaterialIcons name="error-outline" size={24} color={Colors.PRIMARY} />
                        <Text style={{ fontFamily: 'bold', color: 'grey', }}>Business Not Found</Text>
                    </View>}
        </View>
    )
}

export default BusinessListByCategory