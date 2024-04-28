import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { doc, updateDoc } from 'firebase/firestore';
import { FIREBASE_DB } from 'your/firebase/config';

const handleBarCodeRead = async (userId, itemId, quantity) => {
    const itemRef = doc(FIREBASE_DB, 'items', itemId);
    const userRef = doc(FIREBASE_DB, 'users', userId);
  
    // Update inventory
    await updateDoc(itemRef, {
      quantity: firebase.firestore.FieldValue.increment(-quantity),
    });
  
    // Update user's point score
    await updateDoc(userRef, {
      points: firebase.firestore.FieldValue.increment(1),
    });
  };

const Camera = () => {
    return (
        <RNCamera
  onBarCodeRead={({ data }) => {
    const [userId, itemId, quantity] = data.split(',');
    handleBarCodeRead(userId, itemId, quantity);
  }}
/>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Camera;