import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BookingForm from './(booking)/bookingForm';
import BookingList from './(booking)/bookingList';

const Booking = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Booking</Text>
            <BookingForm />
            <BookingList />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
});

export default Booking;
