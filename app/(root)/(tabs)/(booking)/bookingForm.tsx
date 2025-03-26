import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const BookingForm = () => {
    const [destination, setDestination] = useState('');
    const [accommodationType, setAccommodationType] = useState('');
    const [bookingDate, setBookingDate] = useState('');
    const [cost, setCost] = useState('');

    const handleSubmit = () => {
        // Logika dodawania rezerwacji (np. do bazy danych lub stanu aplikacji)
        console.log('Dodano rezerwację:', { destination, accommodationType, bookingDate, cost });
        // Wyczyść formularz po dodaniu rezerwacji
        setDestination('');
        setAccommodationType('');
        setBookingDate('');
        setCost('');
    };

    return (
        <View style={styles.formContainer}>
            <Text style={styles.label}>Destination:</Text>
            <TextInput
                style={styles.input}
                value={destination}
                onChangeText={setDestination}
                placeholder="Enter destination"
            />

            <Text style={styles.label}>Accommodation Type:</Text>
            <TextInput
                style={styles.input}
                value={accommodationType}
                onChangeText={setAccommodationType}
                placeholder="Enter accommodation type"
            />

            <Text style={styles.label}>Booking Date:</Text>
            <TextInput
                style={styles.input}
                value={bookingDate}
                onChangeText={setBookingDate}
                placeholder="Enter booking date"
            />

            <Text style={styles.label}>Cost:</Text>
            <TextInput
                style={styles.input}
                value={cost}
                onChangeText={setCost}
                placeholder="Enter cost"
                keyboardType="numeric"
            />

            <Button title="Add Booking" onPress={handleSubmit} />
        </View>
    );
};

const styles = StyleSheet.create({
    formContainer: {
        marginBottom: 24,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        marginVertical: 8,
        borderRadius: 4,
    },
});

export default BookingForm;
