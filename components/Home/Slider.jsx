import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from './../../configs/fireBaseConfig';
import { Colors } from '../../constants/Colors';

const Slider = () => {
    const [sliderList, setSliderList] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef(null);

    useEffect(() => {
        GetSliderList();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => {
                const nextIndex = prevIndex + 1;
                if (nextIndex === sliderList.length * 2) {
                    flatListRef.current.scrollToIndex({ index: sliderList.length, animated: false });
                    return sliderList.length;
                }
                flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
                return nextIndex;
            });
        }, 100000);
        return () => clearInterval(interval);
    }, [sliderList]);

    const GetSliderList = async () => {
        setSliderList([]);

        const q = query(collection(db, 'Slider'));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            setSliderList(prev => [...prev, doc.data()]);
        });
    };

    const extendedSliderList = [...sliderList, ...sliderList];

    return (
        <View style={{
            
        }}>
            <Text style={{ fontFamily: 'medium', padding: 1,marginTop:10}}>
                # Special for you
            </Text>
            <FlatList
                ref={flatListRef}
                data={extendedSliderList}
                horizontal={true}
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                style={{ paddingLeft: 15, paddingTop: 8,
                    
                 }}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.sliderItem}>
                        <Image source={{ uri: item.imageUrl }}
                            style={styles.sliderImage}
                        />
                    </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
                onMomentumScrollEnd={(event) => {
                    const newIndex = Math.floor(event.nativeEvent.contentOffset.x / 250);
                    if (newIndex >= sliderList.length) {
                        flatListRef.current.scrollToIndex({ index: 0, animated: false });
                        setCurrentIndex(0);
                    } else {
                        setCurrentIndex(newIndex);
                    }
                }}
            />
            <View style={styles.dotsContainer}>
                {sliderList.map((_, index) => (
                    <View key={index} style={[styles.dot, currentIndex % sliderList.length === index && styles.activeDot]} />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    sliderItem: {
        shadowColor: Colors.PRIMARY,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
        marginRight: 15,
        
    },
    sliderImage: {
        width: 250,
        height: 150,
        borderBottomRightRadius:20,
        borderTopLeftRadius:20,
        borderColor:"green",
        borderWidth:1,
        
    },
    dotsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 8,
    },
    dot: {
        width:8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'gray',
        marginHorizontal: 8,
    },
    activeDot: {
        backgroundColor: Colors.PRIMARY,
    },
});

export default Slider;
