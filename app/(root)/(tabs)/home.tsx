import React from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

// Definiowanie typów dla TypeScript
interface HomeProps {
    navigation: NativeStackNavigationProp<any>;
}

const Home: React.FC<HomeProps> = ({ navigation }) => {
    const upcomingTrips = [
        { id: '1', name: 'Wypad w góry', date: '2025-07-15', image: 'https://source.unsplash.com/400x300/?mountains' },
        { id: '2', name: 'Wakacje nad morzem', date: '2025-08-01', image: 'https://source.unsplash.com/400x300/?beach' },
    ];

    const inspirations = [
        { id: '1', name: 'Malediwy', image: 'https://unsplash.com/photos/a-person-standing-on-top-of-a-large-rock-eOWabmCNEdg' },
        { id: '2', name: 'Santorini', image: 'https://unsplash.com/photos/a-person-standing-on-top-of-a-large-rock-eOWabmCNEdg' },
        { id: '3', name: 'Nowy Jork', image: 'https://unsplash.com/photos/a-person-standing-on-top-of-a-large-rock-eOWabmCNEdg' },
    ];

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <Text style={styles.header}>🌍 Travel Planner</Text>

                    <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('Trips')}>
                        <Text style={styles.addButtonText}>+ Dodaj podróż</Text>
                    </TouchableOpacity>

                    <Text style={styles.sectionTitle}>✈️ Nadchodzące podróże</Text>
                    <FlatList
                        data={upcomingTrips}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.tripCard}>
                                <View style={styles.tripInfo}>
                                    <Text style={styles.tripName}>{item.name}</Text>
                                    <Text style={styles.tripDate}>{item.date}</Text>
                                </View>
                            </View>
                        )}
                        ListEmptyComponent={<Text style={{ textAlign: 'center', padding: 20 }}>Brak nadchodzących podróży</Text>}
                        showsHorizontalScrollIndicator={false}
                    />


                    <Text style={styles.sectionTitle}>🔥 Inspiracje</Text>
                    <FlatList
                        horizontal
                        data={inspirations}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.inspirationCard}>
                                <FastImage
                                    source={{ uri: item.image }}
                                    style={styles.inspirationImage}
                                    resizeMode={FastImage.resizeMode.contain}
                                />
                                <Text style={styles.inspirationText}>{item.name}</Text>
                            </View>
                        )}
                        showsHorizontalScrollIndicator={false}
                    />

                    <Text style={styles.sectionTitle}>🔔 Powiadomienia</Text>
                    <View style={styles.notifications}>
                        <Text style={styles.notificationItem}>🛫 Twój lot do Grecji za 3 dni!</Text>
                        <Text style={styles.notificationItem}>🏨 Pamiętaj o potwierdzeniu rezerwacji hotelu!</Text>
                        <Text style={styles.notificationItem}>📅 Sprawdź pogodę przed podróżą!</Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
        paddingHorizontal: 15,
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
        color: '#333',
    },
    addButton: {
        backgroundColor: '#ff7f50',
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 10,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginVertical: 15,
        color: '#444',
    },
    tripCard: {
        width: 200,
        marginRight: 15,
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: '#fff',
        elevation: 4,
    },
    tripImage: {
        width: '100%',
        height: 120,
    },
    tripInfo: {
        padding: 10,
    },
    tripName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    tripDate: {
        fontSize: 14,
        color: '#666',
    },
    inspirationCard: {
        width: 160,
        marginRight: 15,
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: '#fff',
        elevation: 4,
    },
    inspirationImage: {
        width: '100%',
        height: 120,
    },
    inspirationText: {
        padding: 10,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    notifications: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        elevation: 3,
        marginBottom: 20,
    },
    notificationItem: {
        fontSize: 16,
        paddingVertical: 5,
    },
});

export default Home;