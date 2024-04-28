import React, { useState, useEffect }  from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { doc, updateDoc, FieldValue } from 'firebase/firestore';
import { FIREBASE_DB } from '../../firebaseConfig';
import { Camera } from 'expo-camera';

const CameraComponent = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const handleBarCodeRead = async (userId, itemId, quantity) => {
    if (scanned) {
      return;
    }
    setScanned(true);

    Alert.alert(
      "QR Code Scanned",
      `User ID: ${userId}\nItem ID: ${itemId}\nQuantity: ${quantity}`,
      [
        { text: "OK", onPress: () => setScanned(false) }
      ]
    );
  };

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
        handleBarCodeRead(userId, itemId, parseInt(quantity));
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