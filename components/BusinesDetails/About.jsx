import { View, Text } from 'react-native'
import React from 'react'

const About = ({business}) => {
  return (
    <View style={{backgroundColor:'white',padding:20}}>
        <Text style={{fontFamily:'bold',fontSize:20}}>About</Text>
      <Text style={{fontFamily:'regular',textAlign:'left',fontSize:15}}>{business.about}</Text>
    </View>
  )
}

export default About