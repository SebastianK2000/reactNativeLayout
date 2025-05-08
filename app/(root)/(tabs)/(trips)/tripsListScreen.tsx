import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Button } from 'react-native';
import { getTrips, getTripUsers } from '../../../../services/api';

const TripsListScreen = () => {
  const [trips, setTrips] = useState([]);
  const [tripUsers, setTripUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tripData = await getTrips();
        const tripUserData = await getTripUsers();
        setTrips(tripData);
        setTripUsers(tripUserData);
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

  const handleDeleteTripUser = (id: string) => {
    setTripUsers(tripUsers.filter((item: any) => item.id !== id));
  };

  const handleEditTripUser = (id: string) => {
    console.log(`Edit trip user with id: ${id}`);
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

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pl-PL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>🚗 Trips</Text>
      <Button title="Add New Trip" onPress={() => console.log('Add new Trip')} />
      {trips.map((item, index) => (
        <React.Fragment key={index}>{renderTrip(item)}</React.Fragment>
      ))}

      <Text style={styles.sectionTitle}>👥 Trip Users</Text>
      <Button title="Add New Trip User" onPress={() => console.log('Add new Trip User')} />
      {tripUsers.map((item, index) => (
        <React.Fragment key={index}>{renderTripUser(item)}</React.Fragment>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#333',
  },
  itemDetail: {
    fontSize: 16,
    color: '#555',
    marginBottom: 4,
  },
  itemBox: {
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 14,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default TripsListScreen;
