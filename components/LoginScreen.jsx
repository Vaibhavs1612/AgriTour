import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import * as WebBrowser from "expo-web-browser";

import { useWarmUpBrowser } from "./../hooks/useWarmUpBrowser";
import { useOAuth } from '@clerk/clerk-expo';

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {

  useWarmUpBrowser();
  
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <View>
      <View className='flex-1 items-center mt-20'>
        <Image  style={{ width: "100%", height: 450,}} source={require('./../assets/images/farm-tour.png')} />
      </View>
      <View style={{ 
        backgroundColor: '#fff',
        padding: 10, 
        marginTop: 410, 
      }} >
      
        <Text className='text-2xl font-bold text-center gap-2 space-y-2'>
          AGRICULTURE <Text style={{ color: Colors.PRIMARY }}>TOUR</Text> APP
        </Text>
      </View>
      <Text className='text-center p-1 font-regular text-gray-500'>Discover agricultural tours near you and explore the beauty of nature</Text>
      <TouchableOpacity onPress={onPress} 
      style={{ 
        backgroundColor: 'green', 
        padding: 10, 
        borderRadius: 25, 
        width: '80%', 
        alignItems: 'center', 
        margin: 30 ,
        marginLeft:40
      }}>
      <Text style={{ color: '#fff', fontSize: 16 }}>Get Started</Text>
    </TouchableOpacity>
    </View>
  )
}

export default LoginScreen
