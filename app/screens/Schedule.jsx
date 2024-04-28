import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { addDoc, collection } from 'firebase/firestore';
import { FIREBASE_DB, FIREBASE_AUTH } from '../../firebaseConfig.js';
import DateTimePicker from '@react-native-community/datetimepicker';
import QRCode from 'react-native-qrcode-svg';


const Schedule = ({ route }) => {
    const { item } = route.params;
    const [quantity, setQuantity] = useState('');
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [showPicker, setShowPicker] = useState(false);
    const [showQRCode, setShowQRCode] = useState(false);
    const userId = FIREBASE_AUTH.currentUser.uid; // Get the user's ID

    const handleDonate = async () => {
        /* More stuff adrian added*/
        
        try {
            await addDoc(collection(FIREBASE_DB, 'schedule'), {
                itemName: item.name,
                quantity,
                dropOffTime: date.toISOString(),
                userId, // Add the user ID
            });
            setShowQRCode(true);
        } catch (error) {
            console.error('Error scheduling donation: ', error);
        }
    };

    const handleDateChange = (event, selectedDate) => {

        const currentDate = selectedDate || date;
        setDate(currentDate);
        if (mode === 'date') {
            setMode('time');
        } else {
            setShowPicker(false);
            setMode('date');
        }
    };

    return (
        <View style={styles.container}>
            <Text>{item.name}</Text>
            <TextInput value={quantity} onChangeText={setQuantity} placeholder="Quantity" />
            <Button title="Select Date and Time" onPress={() => setShowPicker(true)} />
            {showPicker && (
                <DateTimePicker
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={handleDateChange}
                />
            )}
            <Button title="Donate" onPress={handleDonate} />
            {showQRCode && (
      <QRCode
        value={`${userId},${item.name},${quantity}`}
      />
    )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
});

export default Schedule;