import { View, Text } from 'react-native'
import React from 'react'
import UserIntro from '../../components/Profile/UserIntro'
import MenuList from '../../components/Profile/MenuList'


const profile = () => {


 
  return (
    <View style={{
      paddingTop:25,
      padding:4
    }}>
      <Text style={{
        fontFamily:'bold',
        fontSize:18,
      }}>profile</Text>

      {/*user info*/}
      <UserIntro/>
      {/*menu list*/}
      <MenuList/>
    </View>
  )
}

export default profile