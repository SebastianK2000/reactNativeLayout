import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
    Trips: undefined;
    TripsForm: undefined;
};

type OptionItemProps = {
    label: string;
    icon: keyof typeof MaterialIcons.glyphMap;
    screen: string;
};

const Trips: React.FC = () => {
    const [trips, setTrips] = useState([]);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const handleCreateTeam = () => {
        navigation.navigate('TripsForm');
    };

    return (
        <View style={styles.container}>
            {trips.length === 0 ? (
                <Text style={styles.noTrips}>No trips available. Add a new one!</Text>
            ) : (
                <FlatList
                    data={trips}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.tripCard}>
                            <Text style={styles.tripTitle}>{item.teamName}</Text>
                            <Text>Destination: {item.destination}</Text>
                        </View>
                    )}
                />
            )}

            <OptionItem label="Create new Arrival" icon="add" screen="TripsForm" />

            <TouchableOpacity style={styles.fab} onPress={handleCreateTeam}>
                <MaterialIcons name="add" size={24} color="white" />
            </TouchableOpacity>

            <OptionItem label="List Trips" icon="info" screen="TripList" />

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
    noTrips: {
        fontSize: 18,
        color: '#888',
        textAlign: 'center',
        marginBottom: 20,
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

export default Trips;