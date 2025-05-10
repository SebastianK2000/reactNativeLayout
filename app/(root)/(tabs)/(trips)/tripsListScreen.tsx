import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Button, TextInput, Alert } from 'react-native';
import { getTrips, createTrip } from '../../../../services/api'; // Zakładam, że masz funkcję addTrip w API

const TripsListScreen = () => {
  interface Trip {
    tripName: string;
    startDate: string;
    destination: string;
    description: string;
    id?: string; // Optional if IDs are generated later
  }

  const [trips, setTrips] = useState<Trip[]>([]);
  const [isAdding, setIsAdding] = useState(false); // Nowy stan do kontrolowania widoczności formularza
  const [newTripName, setNewTripName] = useState('');
  const [newTripDate, setNewTripDate] = useState('');
  const [newTripDestination, setNewTripDestination] = useState('');
  const [newTripDescription, setNewTripDescription] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tripData = await getTrips();
        setTrips(tripData);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const handleDeleteTrip = (id: string) => {
    setTrips(trips.filter((item: any) => item.id !== id));
  };

  const handleEditTrip = (id: string) => {
    console.log(`Edit trip with id: ${id}`);
  };

  const handleAddTrip = async () => {
    if (!newTripName || !newTripDate || !newTripDestination || !newTripDescription) {
      Alert.alert('Error', 'Please fill out all fields');
      return;
    }

    const newTrip = {
      tripName: newTripName,
      startDate: newTripDate,
      destination: newTripDestination,
      description: newTripDescription,
    };

    try {
      await createTrip(newTrip); // Zakładając, że masz funkcję addTrip w API
      setTrips([...trips, newTrip]); // Dodaj nową podróż do listy
      // Wyczyść formularz po dodaniu
      setNewTripName('');
      setNewTripDate('');
      setNewTripDestination('');
      setNewTripDescription('');
      setIsAdding(false); // Zatrzymaj wyświetlanie formularza
    } catch (error) {
      console.error('Error adding new trip:', error);
      Alert.alert('Error', 'Failed to add new trip');
    }
  };

  const renderTrip = (item: any) => (
    <View style={styles.itemBox}>
      <Text style={styles.itemTitle}>Trip: {item.tripName || 'No Name'}</Text>
      <Text style={styles.itemDetail}>📅 Date: {item.startDate || 'No Date'}</Text>
      <Text style={styles.itemDetail}>🏠 Location: {item.destination || 'No Location'}</Text>
      <Text style={styles.itemDetail}>📝 Description: {item.description || 'No Description'}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Edit" onPress={() => handleEditTrip(item.id)} />
        <Button title="Delete" onPress={() => handleDeleteTrip(item.id)} />
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>🚗 Trips</Text>

      {/* Formularz do dodawania nowej podróży */}
      {isAdding ? (
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Trip Name"
            value={newTripName}
            onChangeText={setNewTripName}
          />
          <TextInput
            style={styles.input}
            placeholder="Start Date (YYYY-MM-DD)"
            value={newTripDate}
            onChangeText={setNewTripDate}
          />
          <TextInput
            style={styles.input}
            placeholder="Destination"
            value={newTripDestination}
            onChangeText={setNewTripDestination}
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={newTripDescription}
            onChangeText={setNewTripDescription}
          />
          <Button title="Add Trip" onPress={handleAddTrip} />
          <Button title="Cancel" onPress={() => setIsAdding(false)} />
        </View>
      ) : (
        <Button title="Add New Trip" onPress={() => setIsAdding(true)} />
      )}

      {/* Lista podróży */}
      {trips.map((item, index) => (
        <React.Fragment key={index}>{renderTrip(item)}</React.Fragment>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  sectionTitle: { fontSize: 22, fontWeight: 'bold', marginTop: 20, marginBottom: 10, color: '#333' },
  itemBox: { backgroundColor: '#f8f8f8', borderRadius: 8, padding: 14, marginBottom: 12 },
  itemTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 8 },
  itemDetail: { fontSize: 16, color: '#555', marginBottom: 4 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },

  // Styl formularza
  formContainer: { marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
});

export default TripsListScreen;
