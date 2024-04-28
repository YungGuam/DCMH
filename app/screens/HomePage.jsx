import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, FlatList, Image } from 'react-native';
import { FIREBASE_DB } from '../../firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';

const HomePage = ({ route }) => {
    const userRole = route.params.userRole;
    const [category, setCategory] = useState('');
    const [itemCount, setItemCount] = useState('');
    const [image, setImage] = useState('');
    const [items, setItems] = useState([]);

    const categories = ['Dairy', 'Proteins', 'Carbs', 'Vegetables', 'Fruits', 'Basic Needs', 'Other'];

    useEffect(() => {
        const fetchItems = async () => {
            const fetchedItems = await getItems();
            setItems(fetchedItems);
        };

        fetchItems();
    }, []);


    const handleAddItem = async () => {
        await addItem(category, itemCount, image);
        setCategory('');
        setItemCount('');
        setImage('');
    };

    async function addItem(category, itemCount, image) {
        try {
            await addDoc(collection(FIREBASE_DB, 'items'), {
                category,
                itemCount,
                image,
            });
        } catch (error) {
            console.error('Error adding item: ', error);
        }
    }

    async function getItems() {
        try {
            const querySnapshot = await getDocs(collection(FIREBASE_DB, 'items'));
            return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
            console.error('Error getting items: ', error);
        }
    }


    return (
        <View style={styles.container}>
            {userRole === 'admin' && (
                <>
                    <Text>Add a new item:</Text>
                    <TextInput
                        value={category}
                        onChangeText={setCategory}
                        placeholder="Category"
                    />
                    <TextInput
                        value={itemCount}
                        onChangeText={setItemCount}
                        placeholder="Item count"
                    />
                    <TextInput
                        value={image}
                        onChangeText={setImage}
                        placeholder="Image URL"
                    />
                    <Button title="Add Item" onPress={handleAddItem} />
                </>
            )}
    
            <FlatList
                data={items}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text>{item.category}</Text>
                        <Text>{item.itemCount}</Text>
                        <Image source={{ uri: item.image }} style={styles.image} />
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
    },
});

export default HomePage;