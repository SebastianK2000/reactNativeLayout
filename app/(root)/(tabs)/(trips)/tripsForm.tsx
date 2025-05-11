import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Button, TextInput, Alert } from 'react-native';
import { getTrips, createTrip } from '../../../../services/api';

const TripsListScreen = () => {
  const [trips, setTrips] = useState([]);
  const [tripName, setTripName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [destination, setDestination] = useState('');
  const [description, setDescription] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);

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

  const handleAddTrip = async () => {
    if (!tripName || !startDate || !destination || !description) {
      Alert.alert('Error', 'Please fill out all fields');
      return;
    }

    const newTrip = {
      tripName: tripName,
      startDate: startDate,
      destination: destination,
      description: description,
    };

    try {
      await createTrip(newTrip);
      Alert.alert('Success', 'Trip added successfully');
      setIsFormVisible(false);
      setTripName('');
      setStartDate('');
      setDestination('');
      setDescription('');
    } catch (error) {
      console.error('Error adding trip:', error);
      Alert.alert('Error', 'Failed to add trip');
    }
  };

  const handleDeleteTrip = (id: string) => {
    setTrips(trips.filter((item: any) => item.id !== id));
  };

  const handleEditTrip = (id: string) => {
    console.log(`Edit trip with id: ${id}`);
  };

  const renderTrip = (item: any) => (
    <View style={styles.itemBox} key={item.id}>
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

      {isFormVisible ? (
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Trip Name"
            value={tripName}
            onChangeText={setTripName}
          />
          <TextInput
            style={styles.input}
            placeholder="Start Date (YYYY-MM-DD)"
            value={startDate}
            onChangeText={setStartDate}
          />
          <TextInput
            style={styles.input}
            placeholder="Destination"
            value={destination}
            onChangeText={setDestination}
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
          />
          <Button title="Add Trip" onPress={handleAddTrip} />
          <Button title="Cancel" onPress={() => setIsFormVisible(false)} />
        </View>
      ) : (
        <Button title="Add New Trip" onPress={() => setIsFormVisible(true)} />
      )}

      {trips.map((item) => renderTrip(item))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  sectionTitle: { fontSize: 22, fontWeight: 'bold', marginTop: 20, marginBottom: 10, color: '#333' },
  formContainer: { marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  itemBox: { backgroundColor: '#f8f8f8', borderRadius: 8, padding: 14, marginBottom: 12 },
  itemTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 8 },
  itemDetail: { fontSize: 16, color: '#555', marginBottom: 4 },
});

export default TripsListScreen;
