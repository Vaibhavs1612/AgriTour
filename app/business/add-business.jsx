import { View, Text, Image, TouchableOpacity, TextInput, ScrollView, ToastAndroid, ActivityIndicator, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { router, useNavigation } from 'expo-router';
import { Colors } from '../../constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import RNPickerSelect from 'react-native-picker-select';
import { collection, doc, getDocs, query, setDoc } from 'firebase/firestore';
import { db } from '../../configs/fireBaseConfig';
import { storage } from '../../configs/fireBaseConfig';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useUser } from '@clerk/clerk-expo';

const AddBusiness = () => {
    const { user } = useUser();
    const navigation = useNavigation();
    const [mainImage, setMainImage] = useState(null);
    const [galleryImages, setGalleryImages] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [contact, setContact] = useState('');
    const [email, setEmail] = useState('');
    const [about, setAbout] = useState('');
    const [website, setWebsite] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        navigation.setOptions({
            headerTitle: 'Add New Business',
            headerShown: true
        });
        GetCategory();
    }, []);

    const onImagePicker = async (forGallery = false) => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 1,
                allowsMultipleSelection: forGallery,
            });

            if (!result.cancelled) {
                if (forGallery) {
                    setGalleryImages([...galleryImages, ...result.assets.map(asset => asset.uri)]);
                } else {
                    setMainImage(result?.assets[0]?.uri);
                }
            }
        } catch (error) {
            console.log('Error picking an image: ', error);
        }
    };

    const GetCategory = async () => {
        try {
            setCategoryList([]);
            const q = query(collection(db, 'Category'));
            const querySnapShot = await getDocs(q);
            const categories = [];

            querySnapShot.forEach((doc) => {
                categories.push({
                    label: doc.data().name,
                    value: doc.data().name,
                });
            });

            setCategoryList(categories);
        } catch (error) {
            console.log('Error fetching categories: ', error);
        }
    };

    const isFormComplete = () => {
        return name && address && contact && email && about && website && selectedCategory && (mainImage || galleryImages.length > 0);
    };

    const onAddNewBusiness = async () => {
        setLoading(true);
        try {
            let mainImageUrl = null;
            if (mainImage) {
                const fileName = Date.now().toString() + "_main.jpg";
                const resp = await fetch(mainImage);
                const blob = await resp.blob();
                const imageRef = ref(storage, 'business-app/' + fileName);

                await uploadBytes(imageRef, blob);
                mainImageUrl = await getDownloadURL(imageRef);
            }

            let galleryImageUrls = [];
            for (let uri of galleryImages) {
                const fileName = Date.now().toString() + "_gallery.jpg";
                const resp = await fetch(uri);
                const blob = await resp.blob();
                const imageRef = ref(storage, 'business-app/' + fileName);

                await uploadBytes(imageRef, blob);
                const downloadUrl = await getDownloadURL(imageRef);
                galleryImageUrls.push(downloadUrl);
            }

            await saveBusinessDetails(mainImageUrl, galleryImageUrls);

            setLoading(false);
            ToastAndroid.show('New Business added', ToastAndroid.LONG);
            router.push('/home')
        } catch (error) {
            setLoading(false);
            console.error('Error adding new business: ', error);
            ToastAndroid.show('Error adding business', ToastAndroid.LONG);
        }
    };

    const saveBusinessDetails = async (mainImageUrl, galleryImageUrls) => {
        await setDoc(doc(db, 'BusinessList', Date.now().toString()), {
            name: name,
            address: address,
            contact: contact,
            about: about,
            website: website,
            category: selectedCategory,
            username: user?.fullName,
            userEmail: user?.primaryEmailAddress?.emailAddress,
            userImage: user?.imageUrl,
            imageUrl: mainImageUrl,
            galleryImageUrls: galleryImageUrls
        });
    };

    return (
        <ScrollView style={{ padding: 10 }}>
            <Text style={{
                fontFamily: 'medium',
                color: 'grey',
                shadowColor: Colors.PRIMARY,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 5,
                elevation: 3,
            }}>
                *Fill all the details to add the business
            </Text>
            <TouchableOpacity style={{ marginTop: 10 }} onPress={() => onImagePicker(false)}>
                {!mainImage ? (
                    <Image
                        source={require('../../assets/images/placeholder.png')}
                        style={{ width: "100%", height: 200 }}
                    />
                ) : (
                    <Image
                        source={{ uri: mainImage }}
                        style={{ width: "100%", height: 200 }}
                    />
                )}
            </TouchableOpacity>
            <TouchableOpacity style={{ marginTop: 10 }} onPress={() => onImagePicker(true)}>
                <Text style={{ color: Colors.PRIMARY }}>Add Gallery Images</Text>
            </TouchableOpacity>
            <FlatList
                data={galleryImages}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <Image
                        source={{ uri: item }}
                        style={{ width: 100, height: 100, margin: 5 }}
                    />
                )}
                horizontal
            />
            <View>
                <TextInput
                    style={{
                        padding: 10,
                        borderColor: '#ddd',
                        borderWidth: 1,
                        borderRadius: 10,
                        backgroundColor: '#fff',
                        shadowColor: Colors.PRIMARY,
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.2,
                        shadowRadius: 4,
                        elevation: 2,
                        marginTop: 10,
                    }}
                    placeholder="Name of the Business"
                    value={name}
                    onChangeText={setName}
                />
                <TextInput
                    style={{
                        padding: 10,
                        borderColor: '#ddd',
                        borderWidth: 1,
                        borderRadius: 10,
                        backgroundColor: '#fff',
                        shadowColor: Colors.PRIMARY,
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.2,
                        shadowRadius: 4,
                        elevation: 2,
                        marginTop: 10,
                    }}
                    placeholder="Address"
                    value={address}
                    onChangeText={setAddress}
                />
                <TextInput
                    style={{
                        padding: 10,
                        borderColor: '#ddd',
                        borderWidth: 1,
                        borderRadius: 10,
                        backgroundColor: '#fff',
                        shadowColor: Colors.PRIMARY,
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.2,
                        shadowRadius: 4,
                        elevation: 2,
                        marginTop: 10,
                    }}
                    placeholder="Contact"
                    value={contact}
                    onChangeText={setContact}
                />
                <TextInput
                    style={{
                        padding: 10,
                        borderColor: '#ddd',
                        borderWidth: 1,
                        borderRadius: 10,
                        backgroundColor: '#fff',
                        shadowColor: Colors.PRIMARY,
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.2,
                        shadowRadius: 4,
                        elevation: 2,
                        marginTop: 10,
                    }}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={{
                        padding: 10,
                        borderColor: '#ddd',
                        borderWidth: 1,
                        borderRadius: 10,
                        backgroundColor: '#fff',
                        shadowColor: Colors.PRIMARY,
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.2,
                        shadowRadius: 4,
                        elevation: 2,
                        marginTop: 10,
                    }}
                    placeholder="Website"
                    value={website}
                    onChangeText={setWebsite}
                />
                <TextInput
                    multiline
                    numberOfLines={3}
                    style={{
                        padding: 10,
                        borderColor: '#ddd',
                        borderWidth: 1,
                        borderRadius: 10,
                        backgroundColor: '#fff',
                        shadowColor: Colors.PRIMARY,
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.2,
                        shadowRadius: 4,
                        elevation: 2,
                        marginTop: 10,
                    }}
                    placeholder="About"
                    value={about}
                    onChangeText={setAbout}
                />
                <View
                    style={{
                        borderColor: '#ddd',
                        borderWidth: 1,
                        borderRadius: 10,
                        backgroundColor: '#fff',
                        shadowColor: Colors.PRIMARY,
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.2,
                        shadowRadius: 4,
                        elevation: 2,
                        marginTop: 10,
                    }}
                >
                    <RNPickerSelect
                        onValueChange={(value) => setSelectedCategory(value)}
                        items={categoryList}
                        value={selectedCategory}
                        placeholder={{ label: "Select a category", value: null }}
                    />
                </View>
            </View>
            <TouchableOpacity
                style={{
                    marginTop: 20,
                    padding: 15,
                    borderRadius: 10,
                    backgroundColor: isFormComplete() ? 'green' : Colors.PRIMARY,
                    alignItems: 'center',
                    shadowColor: Colors.PRIMARY,
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.2,
                    shadowRadius: 4,
                    elevation: 2,
                }}
                disabled={loading}
                onPress={() => onAddNewBusiness()}
            >
                {loading ?
                    <ActivityIndicator size={"large"} color={'#fff'} /> :
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>Add</Text>
                }
            </TouchableOpacity>

            <View style={{
                height: 100
            }}>
            </View>
        </ScrollView>
    );
};

export default AddBusiness;
