import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Button, Alert, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import {
  getAccommodations,
  createAccommodation,
  updateAccommodation,
  deleteAccommodation,
  getUsers,
} from '../../../services/api';

const AccommodationListScreen = () => {
  const today = new Date().toISOString().split('T')[0];

  const [accommodations, setAccommodations] = useState<any[]>([]);
  const [editingAccommodation, setEditingAccommodation] = useState<any>(null);
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [address, setAddress] = useState('');
  const [price, setPrice] = useState('');
  const [date, setDate] = useState(today);

  const [users, setUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | number>('');

  const [isFormVisible, setIsFormVisible] = useState(false);

useEffect(() => {
  const fetchUsers = async () => {
    try {
      const userList = await getUsers();
      setUsers(userList);
      if (userList.length > 0) {
setSelectedUser(userList[0].iDuser);
      }
    } catch (err) {
      console.error(err);
    }
  };
  fetchUsers();
}, []);


  const resetForm = () => {
    setName('');
    setType('');
    setAddress('');
    setPrice('');
    setDate(today);
    setSelectedUser('');
    setEditingAccommodation(null);
    setIsFormVisible(false);
  };

  const handleEditAccommodation = (item: any) => {
    setName(item.name || '');
    setType(item.type || '');
    setAddress(item.address || '');
    setPrice(item.price?.toString() || '');
    setDate(item.date?.split('T')[0] || today);
    setSelectedUser(item.iduser || '');
    setEditingAccommodation(item);
    setIsFormVisible(true);
  };

  const handleDeleteAccommodation = async (id?: string | number) => {
    if (!id) {
      console.error("Brak ID noclegu do usunięcia");
      return;
    }
    try {
      await deleteAccommodation(id);
      setAccommodations(accommodations.filter((item) => item.id !== id));
      Alert.alert("Sukces", "Zakwaterowanie zostało usunięte.");
    } catch (error) {
      console.error("Błąd usuwania:", error);
    }
  };

  const handleFormSubmit = async () => {
    if (!name || !type || !address || isNaN(parseFloat(price)) || !date || !selectedUser) {
      Alert.alert('Błąd', 'Wszystkie pola muszą być wypełnione poprawnie');
      return;
    }
    try {
const payload = {
  Name: name,
  Type: type,
  Address: address,
  Price: parseFloat(price),
  Date: date,
  IDuser: selectedUser === '' ? null : Number(selectedUser)
};

      if (editingAccommodation?.id) {
        await updateAccommodation(editingAccommodation.id, {
          ...payload,
          IDaccommodation: editingAccommodation.id,
        });
      } else {
        await createAccommodation(payload);
      }
      const updated = await getAccommodations();
      setAccommodations(updated);
      resetForm();
    } catch (err) {
      console.error('Błąd podczas zapisu:', err);
    }
  };

  const renderAccommodation = (item: any) => (
    <View style={styles.itemBox} key={item.id || item.IDaccommodation}>
      <Text style={styles.itemTitle}>{item.name || 'Brak nazwy'}</Text>
      <Text style={styles.itemDetail}>📍 Adres: {item.address || 'Brak adresu'}</Text>
      <Text style={styles.itemDetail}>🏠 Typ: {item.type || 'Brak typu'}</Text>
      {item.price && <Text style={styles.itemDetail}>💰 Cena: {item.price} $</Text>}
      {item.date && (
        <Text style={styles.itemDetail}>
          📅 Data: {new Date(item.date).toLocaleDateString('pl-PL', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </Text>
      )}
        <Text style={styles.itemDetail}>
          👤 Użytkownik: {
            item.user
              ? `${item.user.firstName} ${item.user.lastName}`
              : "Brak przypisanego użytkownika"
          }
        </Text>

      <View style={styles.buttonContainer}>
        <View style={styles.buttonSpacing}>
          <Button title="Edytuj" onPress={() => handleEditAccommodation(item)} />
        </View>
        <View style={styles.buttonSpacing}>
          <Button title="Usuń" color="#d9534f" onPress={() => handleDeleteAccommodation(item.id)} />
        </View>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>🏨 Zakwaterowania</Text>
      {isFormVisible ? (
        <View style={styles.itemBox}>
          <Text style={styles.itemTitle}>
            {editingAccommodation ? 'Edytuj zakwaterowanie' : 'Dodaj zakwaterowanie'}
          </Text>
          <TextInput
            placeholder="Nazwa"
            style={styles.input}
            value={name}
            onChangeText={setName}
          />
          <TextInput
            placeholder="Typ"
            style={styles.input}
            value={type}
            onChangeText={setType}
          />
          <TextInput
            placeholder="Adres"
            style={styles.input}
            value={address}
            onChangeText={setAddress}
          />
          <TextInput
            placeholder="Cena"
            style={styles.input}
            keyboardType="numeric"
            value={price}
            onChangeText={setPrice}
          />
          <TextInput
            placeholder="Data (YYYY-MM-DD)"
            style={styles.input}
            value={date}
            onChangeText={setDate}
          />
          <Picker
            selectedValue={selectedUser}
            onValueChange={itemValue => setSelectedUser(itemValue)}
            style={styles.input}
          >
            <Picker.Item label="Wybierz użytkownika" value="" />
            {users.map(user => (
              <Picker.Item
                key={user.IDuser ?? user.id}
                label={`${user.firstName} ${user.lastName}`}
                value={user.IDuser ?? user.id}
              />
            ))}
          </Picker>

          <View style={styles.buttonContainer}>
            <Button title="Zapisz" onPress={handleFormSubmit} />
            <Button title="Anuluj" color="grey" onPress={resetForm} />
          </View>
        </View>
      ) : (
        <View style={styles.addButton}>
          <Button
            title="Dodaj zakwaterowanie"
            onPress={() => {
              setIsFormVisible(true);
            }}
          />
        </View>
      )}
      {accommodations.map(item => renderAccommodation(item))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  sectionTitle: { fontSize: 22, fontWeight: 'bold', marginTop: 20, marginBottom: 10, color: '#333' },
  itemBox: { backgroundColor: '#f8f8f8', borderRadius: 8, padding: 14, marginBottom: 12 },
  itemTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 8 },
  itemDetail: { fontSize: 16, color: '#555', marginBottom: 4 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  buttonSpacing: {
    flex: 1,
    marginHorizontal: 5,
  },
  addButton: {
    marginBottom: 20,
  },
});

export default AccommodationListScreen;
