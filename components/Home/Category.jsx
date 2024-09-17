import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react'
import { collection, getDocs, query } from 'firebase/firestore'
import { db } from './../../configs/fireBaseConfig'
import CategoryItem from './CategoryItem';
import { useRouter } from 'expo-router'

const Category = ({ explore = false, onCategorySelect }) => {
    const [categoryList, setCategoryList] = useState([]);
    const router = useRouter();
    
    useEffect(() => {
        GetCategoryList();
    }, []);

    const GetCategoryList = async () => {
        setCategoryList([]);
        const q = query(collection(db, 'Category'));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            setCategoryList(prev => [...prev, doc.data()]);
        });
    }

    const onCategoryPressHandler = (item) => {
        if (!explore) {
            router.push('/businessList/' + item.name);
        } else {
            onCategorySelect(item.name);
        }
    }

    return (
        <View>
            {!explore && 
            <View className='flex-row pt-5'>
                <Text style={{ fontFamily: 'medium' }} className='text-l p-1 flex-1'>Category</Text>
                <View style={{ marginTop: 4, flexDirection: 'row', gap: 9, alignContent: 'center', alignItems: 'center', marginRight: 8 }}>
                    <Text style={{ fontSize: 10, color: Colors.PRIMARY, fontFamily: 'medium' }}>View All</Text>
                    <Ionicons name="arrow-forward-outline" size={24} color={Colors.PRIMARY} />
                </View>
            </View>}
            <FlatList
                data={categoryList}
                numColumns={4}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <CategoryItem 
                        category={item}
                        onCategoryPress={(category) => onCategoryPressHandler(item)}
                    />
                )}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                contentContainerStyle={{ padding: 8 }}
            />
        </View>
    );
}

export default Category;
