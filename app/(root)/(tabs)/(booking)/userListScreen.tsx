import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Button } from 'react-native';
import { getUsers, createUser, updateUser, deleteUser } from '../../../../services/api';
import UserForm from './userForm'; // <-- Upewnij się, że ścieżka jest poprawna

const UserListScreen = () => {
  interface User {
    IDuser: string;
    FirstName?: string;
    LastName?: string;
    Phone?: string;
    Email?: string;
    Address?: string;
    IsActive?: boolean;
  }

  const [users, setUsers] = useState<User[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userData = await getUsers();
        setUsers(userData);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUsers();
  }, []);

  const handleDeleteUser = async (id: string) => {
    try {
      await deleteUser(id);
      setUsers(users.filter((item: any) => item.IDuser !== id));
    } catch (err) {
      console.error('Błąd przy usuwaniu:', err);
    }
  };

  const handleEditUser = (user: any) => {
    setEditingUser(user);
    setModalVisible(true);
  };

  const handleAddUser = () => {
    setEditingUser(null);
    setModalVisible(true);
  };

  const handleFormClose = () => {
    setModalVisible(false);
    setEditingUser(null);
  };

  const handleFormSubmit = async (formData: any) => {
    try {
      if (editingUser && editingUser.IDuser) {
        const updated = await updateUser(editingUser.IDuser, formData);
        setUsers(users.map(u => (u.IDuser === updated.IDuser ? updated : u)));
      } else {
        const newUser = await createUser(formData);
        setUsers([...users, newUser]);
      }
      handleFormClose();
    } catch (err) {
      console.error('Błąd zapisu użytkownika:', err);
    }
  };

  const renderUser = (item: any) => (
    <View style={styles.itemBox}>
      <Text style={styles.itemTitle}>User: {(item.FirstName || '') + ' ' + (item.LastName || '')}</Text>
      <Text style={styles.itemDetail}>👤 First Name: {item.FirstName || 'No First Name'}</Text>
      <Text style={styles.itemDetail}>👤 Last Name: {item.LastName || 'No Last Name'}</Text>
      <Text style={styles.itemDetail}>📞 Phone: {item.Phone || 'No Phone'}</Text>
      <Text style={styles.itemDetail}>📧 Email: {item.Email || 'No E-mail'}</Text>
      <Text style={styles.itemDetail}>🏠 Address: {item.Address || 'No Address'}</Text>
      <Text style={styles.itemDetail}>{item.IsActive ? '✅ Active' : '❌ Inactive'}</Text>

      <View style={styles.buttonContainer}>
        <Button title="Edit" onPress={() => handleEditUser(item)} />
        <Button title="Delete" onPress={() => handleDeleteUser(item.IDuser)} />
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>👤 Users</Text>
      <Button title="Add New User" onPress={handleAddUser} />
      {users.map((item, index) => (
        <React.Fragment key={index}>{renderUser(item)}</React.Fragment>
      ))}

      {modalVisible && (
        <UserForm
          visible={modalVisible}
          initialData={editingUser}
          onClose={handleFormClose}
          onSubmit={handleFormSubmit}
        />
      )}
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
});

export default UserListScreen;
