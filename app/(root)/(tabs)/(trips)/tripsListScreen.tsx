import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Button, TextInput, Alert } from 'react-native';
import { getTrips, createTrip, updateTrip, deleteTrip } from '../../../../services/api';

const TripsListScreen = () => {
  interface Trip {
    id: number;
    tripName: string;
    startDate: string;
    endDate: string;
    destination: string;
    createdAt?: string;
  }

  const [trips, setTrips] = useState<Trip[]>([]);
  const [editingTrip, setEditingTrip] = useState<Trip | null>(null);

  const today = new Date().toISOString().split('T')[0];

  const [tripName, setTripName] = useState('');
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const [destination, setDestination] = useState('');
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

  const resetForm = () => {
    setTripName('');
    setStartDate(today);
    setEndDate(today);
    setDestination('');
    setEditingTrip(null);
    setIsFormVisible(false);
  };

const handleAddOrUpdateTrip = async () => {
  if (!tripName || !startDate || !endDate || !destination) {
    Alert.alert('Error', 'Please fill out all fields');
    return;
  }

  const payload = {
    IDtrip: editingTrip?.id ?? 0,
    TripName: tripName,
    StartDate: new Date(startDate).toISOString(),
    EndDate: new Date(endDate).toISOString(),
    Destination: destination,
    IDuser: 1,
    CreatedAt: editingTrip?.createdAt || new Date().toISOString(),
    UpdatedAt: new Date().toISOString(),
  };

  try {
    if (editingTrip) {
      const updated = await updateTrip(editingTrip.id, payload);

      if (updated && updated.iDtrip !== undefined) {
        setTrips(prev =>
          prev.map(t => (t.id === updated.iDtrip ? { ...updated, id: updated.iDtrip } : t))
        );
        Alert.alert('Zaktualizowano', 'Wyjazd został zaktualizowany.');
      }
    } else {
      const created = await createTrip(payload);
      setTrips(prev => [...prev, { ...created, id: created.iDtrip }]);
      Alert.alert('Dodano', 'Nowy wyjazd został dodany.');
    }

    resetForm();
  } catch (error) {
    console.error('Błąd zapisu:', error);
    Alert.alert('Błąd', 'Nie udało się zapisać wyjazdu');
  }
};

  const handleDeleteTrip = async (id: number) => {
    try {
      await deleteTrip(id);
      setTrips(trips.filter((item) => item.id !== id));
      Alert.alert('Usunięto', 'Wyjazd został usunięty.');
    } catch (err) {
      console.error('Błąd usuwania wyjazdu:', err);
      Alert.alert('Błąd', 'Nie udało się usunąć wyjazdu.');
    }
  };

  const handleEditTrip = (trip: Trip) => {
    setTripName(trip.tripName);
    setStartDate(trip.startDate.split('T')[0]);
    setEndDate(trip.endDate.split('T')[0]);
    setDestination(trip.destination);
    setEditingTrip(trip);
    setIsFormVisible(true);
  };

  const renderTrip = (item: Trip) => (
    <View style={styles.itemBox} key={item.id}>
      <Text style={styles.itemTitle}>Trip: {item.tripName}</Text>
      <Text style={styles.itemDetail}>📅 Start: {item.startDate?.split('T')[0]}</Text>
      <Text style={styles.itemDetail}>📅 End: {item.endDate?.split('T')[0]}</Text>
      <Text style={styles.itemDetail}>🏠 Destination: {item.destination}</Text>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonSpacing}>
          <Button title="Edytuj" onPress={() => handleEditTrip(item)} />
        </View>
        <View style={styles.buttonSpacing}>
          <Button title="Usuń" color="#d9534f" onPress={() => handleDeleteTrip(item.id)} />
        </View>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>🚗 Lista wyjazdów</Text>

      {isFormVisible ? (
        <View style={styles.formContainer}>
          <TextInput style={styles.input} placeholder="Trip Name" value={tripName} onChangeText={setTripName} />
          <TextInput style={styles.input} placeholder="Start Date (YYYY-MM-DD)" value={startDate} onChangeText={setStartDate} />
          <TextInput style={styles.input} placeholder="End Date (YYYY-MM-DD)" value={endDate} onChangeText={setEndDate} />
          <TextInput style={styles.input} placeholder="Destination" value={destination} onChangeText={setDestination} />
          <View style={styles.formButtons}>
            <View style={styles.buttonSpacing}>
              <Button title="Zapisz" onPress={handleAddOrUpdateTrip} />
            </View>
            <View style={styles.buttonSpacing}>
              <Button title="Anuluj" color="#6c757d" onPress={resetForm} />
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.addButton}>
          <Button title="Dodaj nowy wyjazd" onPress={() => setIsFormVisible(true)} />
        </View>
      )}

      {trips.map(renderTrip)}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  sectionTitle: { fontSize: 22, fontWeight: 'bold', marginTop: 20, marginBottom: 10, color: '#333' },
  addButton: { marginBottom: 20 },
  formContainer: { marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  formButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonSpacing: {
    flex: 1,
    marginHorizontal: 5,
  },
  itemBox: { backgroundColor: '#f8f8f8', borderRadius: 8, padding: 14, marginBottom: 12 },
  itemTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 8 },
  itemDetail: { fontSize: 16, color: '#555', marginBottom: 4 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
});

export default TripsListScreen;
