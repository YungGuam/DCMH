import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, FlatList } from 'react-native';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { FIREBASE_DB } from '../../firebaseConfig';

const Leaderboard = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        const fetchUsers = async () => {
            const usersQuery = query(collection(FIREBASE_DB, 'users'), orderBy('points', 'desc'));
            const querySnapshot = await getDocs(usersQuery);
            const users = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setUsers(users);
        };

        fetchUsers();
    }, []);

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePreviousPage = () => {
        setCurrentPage(currentPage - 1);
    };

    const usersPerPage = 10;
    const start = currentPage * usersPerPage;
    const end = start + usersPerPage;
    const pageUsers = users.slice(start, end);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Leaderboard</Text>
            <FlatList
                data={pageUsers}
                keyExtractor={user => user.id}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text>{item.fullName}: {item.points} points</Text>
                    </View>
                )}
            />
            {currentPage > 0 && <Button title="Previous" onPress={handlePreviousPage} />}
            {end < users.length && <Button title="Next" onPress={handleNextPage} />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    text: {
        fontSize: 20,
    },
    item: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        alignItems: 'center',
    },
});

export default Leaderboard;