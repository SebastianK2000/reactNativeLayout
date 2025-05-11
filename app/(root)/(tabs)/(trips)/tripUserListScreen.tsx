import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Button, TextInput, Alert } from 'react-native';
import { getTripUsers, createTripUser, updateTripUser, deleteTripUser } from '../../../../services/api';

const TripUsersListScreen = () => {
  interface TripUser {
    IDtripUser: string;
    IDuser: string;
    IDtrip: string;
    joinDate: string;
  }

  const [tripUsers, setTripUsers] = useState<TripUser[]>([]);
  const [editingUser, setEditingUser] = useState<TripUser | null>(null);

  const today = new Date().toISOString().split('T')[0];

  const [IDuser, setIDuser] = useState('');
  const [IDtrip, setIDtrip] = useState('');
  const [joinDate, setJoinDate] = useState(today);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await getTripUsers();
        setTripUsers(users);
      } catch (err) {
        console.error(err);
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
    if (!IDuser || !IDtrip || !joinDate) {
      Alert.alert('Błąd', 'Uzupełnij wszystkie pola');
      return;
    }

    const payload = {
      IDuser,
      IDtrip,
      joinDate: new Date(joinDate).toISOString(),
    };

    try {
      if (editingUser) {
        await updateTripUser(editingUser.IDtripUser, payload);
        setTripUsers(tripUsers.map(u => (u.IDtripUser === editingUser.IDtripUser ? { ...payload, IDtripUser: editingUser.IDtripUser } : u)));
        Alert.alert('Zaktualizowano', 'Użytkownik zaktualizowany.');
      } else {
        const created = await createTripUser(payload);
        setTripUsers([...tripUsers, created]);
        Alert.alert('Dodano', 'Użytkownik dodany do wyjazdu.');
      }
      resetForm();
    } catch (error) {
      console.error('Błąd zapisu:', error);
      Alert.alert('Błąd', 'Nie udało się zapisać danych.');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTripUser(id);
      setTripUsers(tripUsers.filter(u => u.IDtripUser !== id));
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
    <View style={styles.itemBox} key={user.IDtripUser}>
      <Text style={styles.itemTitle}>User: {user.IDuser}</Text>
      <Text style={styles.itemDetail}>🧳 Trip ID: {user.IDtrip}</Text>
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
          <TextInput style={styles.input} placeholder="ID Użytkownika" value={IDuser} onChangeText={setIDuser} />
          <TextInput style={styles.input} placeholder="ID Wyjazdu" value={IDtrip} onChangeText={setIDtrip} />
          <TextInput style={styles.input} placeholder="Data dołączenia (YYYY-MM-DD)" value={joinDate} onChangeText={setJoinDate} />
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

export default TripUsersListScreen;
