import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const dummyBookings = [
    { id: '1', destination: 'Paris', accommodationType: 'Hotel', bookingDate: '2023-05-10', cost: '$1200' },
    { id: '2', destination: 'Tokyo', accommodationType: 'Hostel', bookingDate: '2023-06-15', cost: '$800' },
    // Dodaj więcej przykładowych danych
];

interface Booking {
    id: string;
    destination: string;
    accommodationType: string;
    bookingDate: string;
    cost: string;
}

const BookingList = () => {
    const renderItem = ({ item }: { item: Booking }) => (
        <View style={styles.item}>
            <Text style={styles.destination}>{item.destination}</Text>
            <Text>Type: {item.accommodationType}</Text>
            <Text>Date: {item.bookingDate}</Text>
            <Text>Cost: {item.cost}</Text>
        </View>
    );

    return (
        <FlatList
            data={dummyBookings}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
        />
    );
};

const styles = StyleSheet.create({
    item: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    destination: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default BookingList;