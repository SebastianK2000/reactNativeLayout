import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Text, Provider as PaperProvider, DefaultTheme } from 'react-native-paper';

const TripsForm: React.FC = () => {
    const [teamName, setTeamName] = useState('');
    const [participants, setParticipants] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [destination, setDestination] = useState('');

    const handleSubmit = () => {
        if (!teamName || !participants || !startDate || !destination) {
            return;
        }

        console.log('New Team Created:', {
            teamName,
            participants,
            startDate,
            endDate,
            destination,
        });
    };

    const theme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            primary: '#2563eb',
            accent: '#2563eb',
        },
        roundness: 5,
    };

    return (
        <PaperProvider theme={theme}>
            <View style={styles.container}>
                <ScrollView>
                    <Text style={styles.title}>Create New Team</Text>
                    <TextInput
                        label="Team Name"
                        value={teamName}
                        onChangeText={setTeamName}
                        style={styles.input}
                    />
                    <TextInput
                        label="Destination"
                        value={destination}
                        onChangeText={setDestination}
                        style={styles.input}
                    />
                    <TextInput
                        label="Participants"
                        value={participants}
                        onChangeText={setParticipants}
                        style={styles.input}
                    />
                    <TextInput
                        label="Start Date (YYYY-MM-DD)"
                        value={startDate}
                        onChangeText={setStartDate}
                        style={styles.input}
                    />
                    <TextInput
                        label="End Date (YYYY-MM-DD)"
                        value={endDate}
                        onChangeText={setEndDate}
                        style={styles.input}
                    />
                    <Button mode="contained" onPress={handleSubmit} style={styles.submitButton}>
                        Create Team
                    </Button>
                </ScrollView>
            </View>
        </PaperProvider>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    title: { fontSize: 22, fontWeight: 'bold', marginBottom: 15, color: 'black' },
    input: { marginBottom: 10, backgroundColor: '#f4f4f4' },
    submitButton: {
        backgroundColor: '#2563eb',
        marginTop: 20,
    },
});

export default TripsForm;