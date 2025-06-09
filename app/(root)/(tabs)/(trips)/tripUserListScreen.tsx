import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Button, Alert, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { getTripUsers, createTripUser, updateTripUser, deleteTripUser, getUsers, getTrips } from '../../../../services/api';

const TripUsersListScreen = () => {
  interface User {
    IDuser: string;
    firstName: string;
    lastName: string;
  }

  interface Trip {
    IDtrip: string;
    tripName: string;
  }

  interface TripUser {
    IDtripUser: string;
    IDuser: string;
    IDtrip: string;
    joinDate: string;
    User?: User;
    Trip?: Trip;
  }

  const [tripUsers, setTripUsers] = useState<TripUser[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [editingUser, setEditingUser] = useState<TripUser | null>(null);

  const today = new Date().toISOString().split('T')[0];
  const [IDuser, setIDuser] = useState('');
  const [IDtrip, setIDtrip] = useState('');
  const [joinDate, setJoinDate] = useState(today);
  const [isFormVisible, setIsFormVisible] = useState(false);

useEffect(() => {
  const fetchData = async () => {
    try {
      const [tu, us, ts] = await Promise.all([getTripUsers(), getUsers(), getTrips()]);
      console.log('TripUsers z API:', tu);
      setTripUsers(tu);
      setUsers(us.map((u: any) => ({
        IDuser: u.iDuser,
        firstName: u.firstName,
        lastName: u.lastName,
      })));
      setTrips(ts);
    } catch (err) {
      console.error('Błąd ładowania danych:', err);
    }
  };
  fetchData();
}, []);

  const resetForm = () => {
    setIDuser('');
    setIDtrip('');
    setJoinDate(today);
    setEditingUser(null);
    setIsFormVisible(false);
  };

const handleAddOrUpdate = async () => {
  console.log('Kliknięto Zapisz!');

  const parsedIDuser = parseInt(IDuser, 10);
  const parsedIDtrip = parseInt(IDtrip, 10);

  if (isNaN(parsedIDuser) || isNaN(parsedIDtrip)) {
    Alert.alert('Błąd', 'Wybrano niepoprawnego użytkownika lub wyjazd');
    return;
  }

const payload = {
  IDtripUser: editingUser?.IDtripUser ?? '0',
  IDuser: parsedIDuser,
  IDtrip: parsedIDtrip,
  joinDate: new Date(joinDate).toISOString(),
};

  try {
    if (editingUser) {
      console.log('Aktualizacja z danymi:', payload);
      await updateTripUser(editingUser.IDtripUser, payload);
      Alert.alert('Zaktualizowano', 'Użytkownik zaktualizowany.');
    } else {
      console.log('Tworzenie z danymi:', payload);
      const created = await createTripUser(payload);
      console.log('Odpowiedź:', created);
      Alert.alert('Dodano', 'Użytkownik dodany do wyjazdu.');
      setTripUsers(prev => [...prev, created]);
    }

    resetForm();
  } catch (error: any) {
    console.error('Błąd zapisu:', error.message || error);
    Alert.alert('Błąd', 'Nie udało się zapisać danych.');
  }
};

  const handleDelete = async (id: string) => {
    try {
      await deleteTripUser(id);
      setTripUsers(prev => prev.filter(u => u.IDtripUser !== id));
      Alert.alert('Usunięto', 'Użytkownik został usunięty.');
    } catch (error) {
      console.error('Błąd usuwania:', error);
      Alert.alert('Błąd', 'Nie udało się usunąć użytkownika.');
    }
  };

  const handleEdit = (user: TripUser) => {
    setIDuser(user.IDuser);
    setIDtrip(user.IDtrip);
    setJoinDate(user.joinDate.split('T')[0]);
    setEditingUser(user);
    setIsFormVisible(true);
  };

  const renderUser = (user: TripUser) => (
      console.log('Render user item:', user),
    <View style={styles.itemBox} key={user.IDtripUser}>
    <Text>User: {user.User?.firstName} {user.User?.lastName}</Text>
    <Text>Trip: {user.Trip?.tripName}</Text>
      <Text style={styles.itemDetail}>📅 Join Date: {user.joinDate?.split('T')[0]}</Text>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonSpacing}>
          <Button title="Edytuj" onPress={() => handleEdit(user)} />
        </View>
        <View style={styles.buttonSpacing}>
          <Button title="Usuń" color="#d9534f" onPress={() => handleDelete(user.IDtripUser)} />
        </View>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>👥 Użytkownicy wyjazdów</Text>

      {isFormVisible ? (
        <View style={styles.formContainer}>
          <Picker selectedValue={IDuser} onValueChange={setIDuser} style={styles.input}>
            <Picker.Item label="-- Wybierz użytkownika --" value="" />
            {users.map(user => (
        <Picker.Item
          key={user.IDuser}
          label={
            user.firstName && user.lastName
              ? `${user.firstName} ${user.lastName}`
              : 'Nieznany użytkownik'
          }
          value={user.IDuser}
        />
            ))}
          </Picker>

          <Picker selectedValue={IDtrip} onValueChange={setIDtrip} style={styles.input}>
            <Picker.Item label="-- Wybierz wyjazd --" value="" />
            {trips.map(trip => (
              <Picker.Item key={trip.IDtrip} label={trip.tripName} value={trip.IDtrip} />
            ))}
          </Picker>

          <TextInput
            style={styles.input}
            placeholder="Data dołączenia (YYYY-MM-DD)"
            value={joinDate}
            onChangeText={setJoinDate}
          />

          <View style={styles.formButtons}>
            <View style={styles.buttonSpacing}>
              <Button title="Zapisz" onPress={handleAddOrUpdate} />
            </View>
            <View style={styles.buttonSpacing}>
              <Button title="Anuluj" color="#6c757d" onPress={resetForm} />
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.addButton}>
          <Button title="Dodaj użytkownika" onPress={() => setIsFormVisible(true)} />
        </View>
      )}

      {tripUsers.map(renderUser)}
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
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
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
  itemDetail: { fontSize: 16, color: '#555', marginBottom: 4 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
});

export default TripUsersListScreen;
