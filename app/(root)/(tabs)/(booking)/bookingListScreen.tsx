import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Button } from 'react-native';
import { getBookings, getUsers } from '../../../../services/api';

const BookingListScreen = () => {
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookingData = await getBookings();
        const userData = await getUsers();
        setBookings(bookingData);
        setUsers(userData);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const handleDeleteBooking = (id: string) => {
    setBookings(bookings.filter((item: any) => item.id !== id));
  };

  const handleEditBooking = (id: string) => {
    console.log(`Edit booking with id: ${id}`);
  };

  const handleDeleteUser = (id: string) => {
    setUsers(users.filter((item: any) => item.IDuser !== id));
  };

  const handleEditUser = (id: string) => {
    console.log(`Edit user with id: ${id}`);
  };

  const renderBooking = (item: any) => (
    <View style={styles.itemBox}>
      <Text style={styles.itemTitle}>Booking ID: {item.IDbooking || 'No ID'}</Text>
      <Text style={styles.itemDetail}>👤 User ID: {item.IDuser || 'No User'}</Text>
      <Text style={styles.itemDetail}>📅 Booking Date: {item.bookingDate || 'No Date'}</Text>
      <Text style={styles.itemDetail}>🏠 Accommodation ID: {item.IDaccommodation || 'No Accommodation'}</Text>
      <Text style={styles.itemDetail}>💰 Price: {item.totalPrice ? `${item.totalPrice} $` : 'No Price'}</Text>
      <Text style={styles.itemDetail}>🔄 Status: {item.status || 'No status'}</Text>

      <View style={styles.buttonContainer}>
        <Button title="Edit" onPress={() => handleEditBooking(item.id)} />
        <Button title="Delete" onPress={() => handleDeleteBooking(item.id)} />
      </View>
    </View>
  );

  const renderUser = (item: any) => (
    <View style={styles.itemBox}>
        <Text style={styles.itemTitle}>User: {(item.FirstName || '') + ' ' + (item.LastName || '')}</Text>
        <Text style={styles.itemDetail}>👤 First Name: {item.FirstName || 'No First Name'}</Text>
        <Text style={styles.itemDetail}>👤 Last Name: {item.LastName || 'No Last Name'}</Text>
        <Text style={styles.itemDetail}>📞 Phone: {item.Phone || 'No Phone'}</Text>
        <Text style={styles.itemDetail}>📧 Email: {item.Email || 'No E-maila'}</Text>
        <Text style={styles.itemDetail}>🏠 Address: {item.Address || 'No Address'}</Text>
        <Text style={styles.itemDetail}>
        {item.IsActive ? '✅ Active' : '❌ Inactive'}
        </Text>

      <View style={styles.buttonContainer}>
        <Button title="Edit" onPress={() => handleEditUser(item.IDuser)} />
        <Button title="Delete" onPress={() => handleDeleteUser(item.IDuser)} />
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
      <Text style={styles.sectionTitle}>🏨 Bookings</Text>
      <Button title="Add New Booking" onPress={() => console.log('Add new Booking')} />
      {bookings.map((item, index) => (
        <React.Fragment key={index}>{renderBooking(item)}</React.Fragment>
      ))}

      <Text style={styles.sectionTitle}>👤 Users</Text>
      <Button title="Add New User" onPress={() => console.log('Add new User')} />
      {users.map((item, index) => (
        <React.Fragment key={index}>{renderUser(item)}</React.Fragment>
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

export default BookingListScreen;
