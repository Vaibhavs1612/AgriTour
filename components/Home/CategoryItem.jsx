import { View, Image, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'

const CategoryItem = ({ category, onCategoryPress }) => {
  return (
    <TouchableOpacity onPress={() => onCategoryPress(category)} style={{ padding: 5, flex: 1, alignItems: 'center' }}>
      <View style={{ width: 90, alignItems: 'center' }}>
        <View style={{
          backgroundColor: 'white',
          width: 50,
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: Colors.PRIMARY,
          shadowOffset: { width: 10, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 5,
          elevation: 8,
          overflow: 'hidden',
          borderWidth: 0.2,
          borderColor: Colors.PRIMARY,
          borderRadius: 40,
        }}>
          <Image style={{ width: 40, height: 40, borderRadius: 30 }} source={{ uri: category.icon }} />
        </View>
        <Text style={{ fontFamily: 'medium', fontSize: 10, textAlign: 'center', marginTop: 5 }}>{category.name}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default CategoryItem;
