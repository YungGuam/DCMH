import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, FlatList, Image, TouchableOpacity } from 'react-native';
import { FIREBASE_DB } from '../../firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { ListItem, Icon } from 'react-native-elements';


const HomePage = ({ route }) => {
    const userRole = route.params.userRole;
    const [category, setCategory] = useState('');
    const [itemCount, setItemCount] = useState('');
    const [image, setImage] = useState('');
    const [items, setItems] = useState([]);
    const [name, setName] = useState('');
    const navigation = useNavigation();
    const [expandedIndex, setExpandedIndex] = useState(null);
    const [maxValue, setMaxValue] = useState('');


    const categories = ['Dairy', 'Proteins', 'Carbs', 'Vegetables', 'Fruits', 'Basic Needs', 'Other'];

    useEffect(() => {
        const fetchItems = async () => {
            const fetchedItems = await getItems();
            setItems(fetchedItems);
        };

        fetchItems();
    }, []);


    const handleAddItem = async () => {
        await addItem(category, itemCount, image, name);
        setCategory('');
        setItemCount('');
        setImage('');
        setName('');
        setMaxValue('');
    };

    const handleItemPress = (item) => {
        navigation.navigate('Schedule', { item });
    };

    async function addItem(category, itemCount, image) {
        try {
            await addDoc(collection(FIREBASE_DB, 'items'), {
                category,
                itemCount,
                image,
                name,
                maxValue,
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

 console.log('Items:', items);
    return (
        <View style={styles.container}>
  {userRole === 'admin' && (
    <View style={{ flex: 1 }}>
      <View style={{ alignItems: 'flex-end', justifyContent: 'flex-start', marginTop:50 }}>
        <Button
          title="Go to Camera"
          onPress={() => navigation.navigate('CameraComponent')}
        />
      </View>
      <Text>Add a new item:</Text>
      <Picker
        selectedValue={category}
        onValueChange={(itemValue) => setCategory(itemValue)}
        style={{height: 50, width: 150}}
      >
        {categories.map((category) => (
          <Picker.Item key={category} label={category} value={category} />
        ))}
      </Picker>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Item name"
      />
      <TextInput
        value={itemCount}
        onChangeText={setItemCount}
        placeholder="Item count"
      />
      <TextInput
        value={maxValue}
        onChangeText={setMaxValue}
        placeholder="Max Count"
      />
      <TextInput
        value={image}
        onChangeText={setImage}
        placeholder="Image URL"
      />
      <Button title="Add Item" onPress={handleAddItem} />
    </View>
  )}

    {categories.map((category, i) => (
    <ListItem.Accordion
        key={i}
        content={
            <ListItem.Content>
                <ListItem.Title>{category}</ListItem.Title>
            </ListItem.Content>
        }
        isExpanded={expandedIndex === i}
        onPress={() => {
            setExpandedIndex(expandedIndex === i ? null : i);
        }}
    >
       {items
  .filter(item => item.category === category)
  .map(item => {
    const percentage = (Number(item.itemCount) / Number(item.maxValue)) * 100;
    console.log('Percentage:', percentage); // Log the percentage
    return {
      ...item,
      percentage,
    };
  })
  .sort((a, b) => a.percentage - b.percentage)
  .map(item => (
    <ListItem
      key={item.id}
      bottomDivider
      onPress={() => navigation.navigate('Schedule', { item })}
      containerStyle={{
        backgroundColor: item.percentage < 30 ? 'red' : 'white',
        borderColor: 'black', // Add a border
        borderWidth: 1,
      }}
    >
      <ListItem.Content>
        <ListItem.Title>{item.name}</ListItem.Title>
        <ListItem.Subtitle>{`Quantity: ${item.itemCount}, Max: ${item.maxValue}`}</ListItem.Subtitle> 
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  ))}
</ListItem.Accordion>
))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        
    },
    text: {
        fontSize: 20,
    },
});

export default HomePage;