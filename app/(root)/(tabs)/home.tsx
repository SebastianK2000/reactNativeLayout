import React from 'react';
import { Image, View, Text, FlatList, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

import travel1 from '../../../assets/images/travel1.jpg';
import travel2 from '../../../assets/images/travel2.jpg';
import travel3 from '../../../assets/images/travel3.jpg';
import travel4 from '../../../assets/images/travel4.jpg';
import travel5 from '../../../assets/images/travel5.jpg';

interface HomeProps {
    navigation: NativeStackNavigationProp<any>;
}

const Home: React.FC<HomeProps> = ({ navigation }) => {
    const upcomingTrips = [
        { id: '1', name: 'A trip to the mountains', date: '2025-07-15', image: travel4 },
        { id: '2', name: 'Vacations by the Sea', date: '2025-08-01', image: travel5},
    ];

    const inspirations = [
        { id: '1', name: 'Maldives', image: travel1 },
        { id: '2', name: 'Santorini', image: travel2 },
        { id: '3', name: 'New Jork', image: travel3 },
    ];

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <Text style={styles.header}>🌍 Plan your vacation</Text>

                    <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('Trips')}>
                        <Text style={styles.addButtonText}>+ Add Trips</Text>
                    </TouchableOpacity>

                    <Text style={styles.sectionTitle}>✈️ Upcoming trips</Text>
                    <FlatList
                        horizontal
                        data={upcomingTrips}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.tripCard}>
                                <Image
                                    source={item.image}
                                    style={styles.tripImage}
                                    resizeMode="cover"
                                />
                                <View style={styles.tripInfo}>
                                    <Text style={styles.tripName}>{item.name}</Text>
                                    <Text style={styles.tripDate}>{item.date}</Text>
                                </View>
                            </View>
                        )}
                        ListEmptyComponent={<Text style={{ textAlign: 'center', padding: 20 }}>You don't have any travels</Text>}
                        showsHorizontalScrollIndicator={false}
                    />



                    <Text style={styles.sectionTitle}>🔥 Inspiration</Text>
                    <FlatList
                        horizontal
                        data={inspirations}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.inspirationCard}>
                                <Image
                                    source={item.image}
                                    style={styles.inspirationImage}
                                    resizeMode="contain"
                                />
                                <Text style={styles.inspirationText}>{item.name}</Text>
                            </View>
                        )}
                        showsHorizontalScrollIndicator={false}
                    />

                    <Text style={styles.sectionTitle}>🔔 Notifications</Text>
                    <View style={styles.notifications}>
                        <Text style={styles.notificationItem}>🛫 Your flight to Greece in 3 days!</Text>
                        <Text style={styles.notificationItem}>🏨 Remember to confirm your hotel reservation!</Text>
                        <Text style={styles.notificationItem}>📅 Check the weather before you travel!</Text>

                        <TouchableOpacity style={styles.notificationItem} onPress={() => navigation.navigate('TeamList')}>
                            <Text>🛈 Team List</Text>
                        </TouchableOpacity>

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
        backgroundColor: '#2563eb',
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