import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface Booking {
    title: string;
    price: string;
    currency: string;
    description: string;
    date: string;
}

type OptionItemProps = {
    label: string;
    icon: keyof typeof MaterialIcons.glyphMap;
    screen: string;
};

const BookingScreen: React.FC = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const handleAddBooking = () => {
        navigation.navigate('BookingForm');
    };

    return (
        <View style={styles.container}>
            {bookings.length === 0 ? (
                <Text style={styles.noBookings}>No bookings. Add a new booking!</Text>
            ) : (
                <FlatList
                    data={bookings}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.bookingItem}>
                            <Text style={styles.bookingTitle}>{item.title}</Text>
                            <Text>{item.price} {item.currency}</Text>
                            <Text>{item.description}</Text>
                            <Text>{item.date}</Text>
                        </View>
                    )}
                />
            )}

            <OptionItem label="Add Booking" icon="add" screen="BookingForm" />

            <TouchableOpacity
                style={styles.fab}
                onPress={handleAddBooking}
            >
                <MaterialIcons name="add" size={24} color="white" />
            </TouchableOpacity>
        </View>
    );
};

const OptionItem: React.FC<OptionItemProps> = ({ label, icon, screen }) => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    return (
        <TouchableOpacity onPress={() => navigation.navigate(screen)} style={styles.optionItem}>
            <MaterialIcons name={icon} size={24} color="#2563eb" />
            <Text style={styles.optionLabel}>{label}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    noBookings: {
        fontSize: 18,
        color: '#888',
        marginBottom: 20,
        textAlign: 'center',
    },
    bookingItem: {
        marginVertical: 10,
        padding: 10,
        backgroundColor: '#f4f4f4',
        borderRadius: 5,
        width: '100%',
    },
    bookingTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 40,
        left: 20,
        right: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    fab: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        backgroundColor: '#2563eb',
        padding: 15,
        borderRadius: 30,
        shadowColor: 'rgba(0,0,0,0.2)',
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 6,
        shadowOpacity: 0.3,
    },
    optionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 10,
    },
    optionLabel: {
        marginLeft: 10,
        fontSize: 16,
        color: '#2563eb',
    },
});

export default BookingScreen;
