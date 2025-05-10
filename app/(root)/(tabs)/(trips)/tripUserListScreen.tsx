import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Button } from 'react-native';
import { getTripUsers } from '../../../../services/api';

const TripUsersListScreen = () => {
  const [tripUsers, setTripUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tripUserData = await getTripUsers();
        setTripUsers(tripUserData);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const handleDeleteTripUser = (id: string) => {
    setTripUsers(tripUsers.filter((item: any) => item.id !== id));
  };

  const handleEditTripUser = (id: string) => {
    console.log(`Edit trip user with id: ${id}`);
  };

  const renderTripUser = (item: any) => (
    <View style={styles.itemBox}>
      <Text style={styles.itemTitle}>User: {item.IDuser || 'No Name'}</Text>
      <Text style={styles.itemDetail}>👤 Trip ID: {item.IDtripUser}</Text>
      <Text style={styles.itemDetail}>📅 Date Joined: {item.joinDate}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Edit" onPress={() => handleEditTripUser(item.id)} />
        <Button title="Delete" onPress={() => handleDeleteTripUser(item.id)} />
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>👥 Trip Users</Text>
      <Button title="Add New Trip User" onPress={() => console.log('Add new Trip User')} />
      {tripUsers.map((item, index) => (
        <React.Fragment key={index}>{renderTripUser(item)}</React.Fragment>
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
});

export default TripUsersListScreen;
