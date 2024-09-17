import React, { useState } from 'react';
import { View, FlatList, Image, StyleSheet, Modal, TouchableOpacity, Text } from 'react-native';
import { Colors } from '../../constants/Colors';

const GalleryImages = ({ business }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (imageUri) => {
    setSelectedImage(imageUri);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setModalVisible(false);
  };

  return (
    <View style={{backgroundColor:'#fff'}}>
    <Text style={styles.heading}>Gallery</Text>
      {business.galleryImageUrls && business.galleryImageUrls.length > 0 ? (
        <>
          
          <FlatList
            data={business.galleryImageUrls}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => openModal(item)}>
              <View style={{}}>
                <Image source={{ uri: item }} style={styles.image} />
                </View>
              </TouchableOpacity>
            )}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />

          {selectedImage && (
            <Modal
              visible={modalVisible}
              transparent={true}
              onRequestClose={closeModal}
            >
              <View style={styles.modalContainer}>
                <TouchableOpacity style={styles.modalCloseButton} onPress={closeModal}>
                  <Text style={styles.modalCloseButtonText}>Close</Text>
                </TouchableOpacity>
                <Image source={{ uri: selectedImage }} style={styles.modalImage} />
              </View>
            </Modal>
          )}
        </>
      ) : (
        <Text style={styles.noGalleryText}>No Gallery</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 18,
    fontFamily:'bold',
    marginLeft: 19,
    marginTop:19
  },
  image: {
    width: 250,
    height: 250,
    marginRight: 10,
    margin:20,
    borderWidth:.3,
    borderColor:'green',
    borderRadius:10,
   
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: '100%',
    height: '90%',
    resizeMode: 'contain',
  },
  modalCloseButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 5,
    zIndex:100
  },
  modalCloseButtonText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  noGalleryText: {
    fontSize: 18,
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default GalleryImages;
