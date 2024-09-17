import { View, Text, FlatList, ScrollView } from 'react-native'
import React from 'react'
import BusinessListCart from './BusinessListCart'

const ExploreBusinessList = ({businessList}) => {
  return (
    <ScrollView>
      <FlatList
      scrollEnabled
      showsVerticalScrollIndicator={false}
      data={businessList}
      renderItem={({item,index})=>(
        <BusinessListCart 
        key={index}
        business={item}/>
      )}
      />
      <View style={{
        height:350
      }}>
      </View>
    </ScrollView>
  )
}

export default ExploreBusinessList