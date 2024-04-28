import React, { useState, useEffect }  from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { doc, updateDoc } from 'firebase/firestore';
import { FIREBASE_DB } from '../../firebaseConfig';
import { Camera } from 'expo-camera';

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

  const CameraComponent = () => {
    const [hasPermission, setHasPermission] = useState(null);
  
    useEffect(() => {
      (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    }, []);
  
    if (hasPermission === null) {
      return <View><Text>Requesting for camera permission</Text></View>;
    }
    if (hasPermission === false) {
      return <View><Text>No access to camera</Text></View>;
    }
  
    return (
      <Camera
        style={{ flex: 1 }}
        type={Camera.Constants.Type.back}
        onBarCodeScanned={({ data }) => {
          const [userId, itemId, quantity] = data.split(',');
          handleBarCodeRead(userId, itemId, quantity);
        }}
      >
        <View><Text>Camera is working</Text></View>
      </Camera>
    );
  };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default CameraComponent;