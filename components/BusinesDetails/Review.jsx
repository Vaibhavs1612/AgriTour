import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ToastAndroid, Image } from 'react-native';
import { Rating } from 'react-native-ratings';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../configs/fireBaseConfig';
import { useUser } from '@clerk/clerk-expo'; 

const Review = ({ business }) => {
  const [rating, setRating] = useState(4);
  const [userInput, setUserInput] = useState('');
  const { user } = useUser();

  const onSubmit = async () => {
    const docRef = doc(db, 'BusinessList', business?.id);
    await updateDoc(docRef, {
      reviews: arrayUnion({
        rating: rating,
        comment: userInput,
        userName: user?.fullName,
        userImage: user?.imageUrl,
        userEmail: user.primaryEmailAddress?.emailAddress,
      }),
    });
    ToastAndroid.show('Comment added successfully!', ToastAndroid.BOTTOM);
    setUserInput(''); // Clear the input after submission
  };

  // Function to determine if the submit button should be enabled (green)
  const isSubmitDisabled = !userInput.trim(); // Disable if userInput is empty or only whitespace

  return (
    <View style={{
      padding: 20,
      backgroundColor: 'white'
    }}>
      <Text style={{
        fontFamily: 'bold',
        fontSize: 18
      }}>Reviews</Text>
      <View>
        <Rating
          showRating={false}
          imageSize={25}
          onFinishRating={(rating) => setRating(rating)}
          style={{ paddingVertical: 10 }}
        />
        <TextInput
          style={{
            height: 100,
            borderColor: '#ccc',
            borderWidth: 2,
            borderRadius: 8,
            paddingHorizontal: 16,
            fontSize: 16,
            backgroundColor: '#fff',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 5,
            textAlignVertical: 'top',
            paddingTop: 15,
            fontSize: 13
          }}
          placeholder="Write your comment"
          placeholderTextColor="#888"
          value={userInput}
          onChangeText={(value) => setUserInput(value)}
        />
        <TouchableOpacity
          disabled={isSubmitDisabled}
          style={{
            backgroundColor: isSubmitDisabled ? '#ccc' : '#4CAF50', // Grey when disabled, green when enabled
            padding: 10,
            borderRadius: 8,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 5,
            marginVertical: 10,
          }}
          onPress={onSubmit}
        >
          <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>Submit</Text>
        </TouchableOpacity>
      </View>
      {/* Display previous reviews */}
      <View>
        {business?.reviews?.map((item, index) => (
          <View key={index} style={{
            backgroundColor: '#fff',
            padding: 10,
            borderRadius: 8,
            marginVertical: 5,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 2,
            elevation: 3,
            flexDirection: 'row',
            alignItems: 'center'
          }}>
            <Image 
              source={{ uri: item.userImage }} 
              style={{ 
                width: 40, 
                height: 40, 
                borderRadius: 20, 
                marginRight: 10 
              }} 
            />
            <View>
              <View style={{ flexDirection: 'row', gap: 8 }}>
                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{item.userName}</Text>
                <Rating
                  readonly
                  startingValue={item.rating}
                  imageSize={20}
                  style={{ paddingVertical: 5 }}
                />
              </View>
              <Text style={{ fontSize: 12, color: '#555' }}>{item.comment}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Review;
