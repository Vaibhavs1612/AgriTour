import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, ScrollView, FlatList, RefreshControl, ActivityIndicator } from 'react-native';
import { Colors } from './../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../configs/fireBaseConfig';
import Category from '../../components/Home/Category';
import BusinessListCart from '../../components/Explore/BusinessListCart';

const Explore = () => {
    const [businessList, setBusinessList] = useState([]);
    const [filteredBusinessList, setFilteredBusinessList] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true); // State to manage loading indicator

    useEffect(() => {
        GetBusinesses();
    }, []);

    const onRefresh = () => {
        setRefreshing(true);
        GetBusinesses();
        setRefreshing(false);
        setSearchText('');
    };

    const GetBusinesses = async () => {
        setLoading(true); // Show loading indicator
        setBusinessList([]);
        const q = query(collection(db, "BusinessList"));
        const querySnapShot = await getDocs(q);

        const businesses = [];
        querySnapShot.forEach((doc) => {
            businesses.push({ id: doc.id, ...doc.data() });
        });

        setBusinessList(businesses);
        setFilteredBusinessList(businesses); // Initially set filtered list to all businesses
        setLoading(false); // Hide loading indicator after data fetch
    };

    useEffect(() => {
        applyFilters();
    }, [searchText, businessList]);

    const applyFilters = () => {
        if (searchText.trim() === '') {
            setFilteredBusinessList(businessList);
        } else {
            const filteredList = businessList.filter((business) =>
                business.name.toLowerCase().includes(searchText.toLowerCase())
            );
            setFilteredBusinessList(filteredList);
        }
    };

    const handleCategorySelect = async (category) => {
        setSearchText(''); // Clear the search text
        setLoading(true); // Show loading indicator
        setFilteredBusinessList([]);

        const q = query(collection(db, "BusinessList"), where('category', '==', category));
        const querySnapShot = await getDocs(q);

        const businesses = [];
        querySnapShot.forEach((doc) => {
            businesses.push({ id: doc.id, ...doc.data() });
        });

        setFilteredBusinessList(businesses);
        setLoading(false); // Hide loading indicator after fetching and updating filtered list
    };

    return (
        <View style={{ flex: 1, padding: 8 }}>
            <Text style={{
                fontFamily: "bold",
                fontSize: 18,
                padding: 25,
                marginTop: 16,
                shadowColor: Colors.PRIMARY,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 5,
                elevation: 3,
                overflow: 'hidden',
            }}>Explore More</Text>

            {/* Search bar */}
            <View style={{
                margin: 1,
                marginTop: 4,
                marginRight: 2,
                backgroundColor: '#F3F4F6', // Light gray background
                padding: 12,
                borderRadius: 12,
                flexDirection: 'row',
                alignItems: 'center',
                shadowColor: Colors.PRIMARY, // Shadow color
                shadowOffset: { width: 0, height: 2 }, // Shadow offset
                shadowOpacity: 0.25, // Shadow opacity
                shadowRadius: 3.84, // Shadow radius
                elevation: 5, // Elevation (Android only)
            }}>
                <Ionicons name="search" size={24} color={Colors.PRIMARY} style={{ marginRight: 8 }} />
                <TextInput
                    placeholder='Search'
                    style={{ flex: 1 }}
                    value={searchText}
                    onChangeText={(text) => setSearchText(text)}
                />
            </View>

            {/* Categories */}
            <Category
                explore={true}
                onCategorySelect={handleCategorySelect}
            />

            {/* Business list */}
            {loading ? (
                <ActivityIndicator
                    size="large"
                    color={Colors.PRIMARY}
                    style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
                />
            ) : (
                <ScrollView
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                >
                    <FlatList
                        scrollEnabled
                        showsVerticalScrollIndicator={false}
                        data={filteredBusinessList}
                        renderItem={({ item, index }) => (
                            <BusinessListCart
                                key={index}
                                business={item}
                            />
                        )}
                    />
                </ScrollView>
            )}
        </View>
    )
}

export default Explore;
