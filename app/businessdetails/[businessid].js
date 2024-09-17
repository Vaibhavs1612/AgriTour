import { View, Text, ActivityIndicator, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { collection, getDoc, query, doc } from 'firebase/firestore';
import { db } from '../../configs/fireBaseConfig';
import { Colors } from '../../constants/Colors';
import Intro from '../../components/BusinesDetails/Intro';
import ActionButtons from '../../components/BusinesDetails/ActionButtons';
import About from '../../components/BusinesDetails/About';
import Review from '../../components/BusinesDetails/Review';
import GallaryImages from '../../components/BusinesDetails/GallaryImages';

const BusinessDetails = () => {
  const { businessid } = useLocalSearchParams();
  const [business, setBusiness] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    GetBusinessDetailsById();
  }, []);

  // use to get the business by id
  const GetBusinessDetailsById = async () => {
    setLoading(true);
    const docRef = doc(db, 'BusinessList', businessid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setBusiness({id: docSnap.id,...docSnap.data()});
      setLoading(false);
    } else {
      console.log("No data found!");
    }
  };

  return (
    <ScrollView>
      {
        loading ?
          <ActivityIndicator
          style={{
            marginTop:'90%',
          }}
            size={'large'}
            color={Colors.PRIMARY}
          /> :
          <View>
            {/* intro*/}
            <Intro business={business}/>
            
            {/* Action buttons*/}
            <ActionButtons business={business}/>
            
            {/* about section*/}
            <About business={business}/>

            {/* gallay section*/}
            <GallaryImages business={business}/>

             {/* review section*/}
           <Review business={business}/>
          </View>
      }
    </ScrollView>

  )
}

export default BusinessDetails