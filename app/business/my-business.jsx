import { View, Text, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-expo';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../configs/fireBaseConfig';
import BusinessListCart from '../../components/Explore/BusinessListCart';
import { useNavigation } from 'expo-router';

const MyBusiness = () => {
    const { user } = useUser();
    const [businessList, setBusinessList] = useState([]);
    const [loading,setLoading] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerShown:true,
            headerTitle:'My Business'
        })
        user && GetUserBusiness();
    }, [user]);

    const GetUserBusiness = async () => {
        setLoading(true);
        setBusinessList([]);
        const q = query(collection(db, 'BusinessList'), 
        where('userEmail', '==', user?.primaryEmailAddress?.emailAddress));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log("MY BUSINESS -> " + JSON.stringify(doc.data()));
            setBusinessList(prev => [...prev, { id: doc.id, ...doc.data() }]);
        });
        setLoading(false);
    }

    return (
        <View style={{
           padding:10
        }}>
           
            <FlatList
                data={businessList}
                onRefresh={GetUserBusiness}
                refreshing={loading}
                renderItem={({ item, index }) => (
                    <BusinessListCart business={item} key={index} />
                )}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
}

export default MyBusiness;
