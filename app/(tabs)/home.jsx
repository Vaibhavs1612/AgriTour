import { View, Text, ScrollView, RefreshControl, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import Header from '../../components/Home/Header';
import Slider from '../../components/Home/Slider';
import Category from '../../components/Home/Category';
import PopularBusiness from '../../components/Home/PopularBusiness';
import { Colors } from '../../constants/Colors';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    // Simulate fetching data
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={Colors.PRIMARY} />
      </View>
    );
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/*header*/}
      <Header />

       {/*slider*/}
       <Slider />

       {/*categories*/}
      <Category />

      {/*popular business*/}
      <PopularBusiness />
    </ScrollView>
  );
};

export default Home;
