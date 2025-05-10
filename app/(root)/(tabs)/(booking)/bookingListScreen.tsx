import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Button } from 'react-native';
import { getBookings, createBooking, updateBooking, deleteBooking } from '../../../../services/api';
import BookingForm from './bookingForm';

const BookingListScreen = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingBooking, setEditingBooking] = useState<any>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const bookingData = await getBookings();
        setBookings(bookingData);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBookings();
  }, []);

  const handleDeleteBooking = async (id: string) => {
    try {
      await deleteBooking(id);
      setBookings(bookings.filter((item: any) => item.id !== id));
    } catch (err) {
      console.error('Delete error', err);
    }
  };

  const handleEditBooking = (booking: any) => {
    setEditingBooking(booking);
    setModalVisible(true);
  };

  const handleFormClose = () => {
    setEditingBooking(null);
    setModalVisible(false);
  };

  const handleFormSubmit = async (formData: any) => {
    try {
      if (editingBooking && editingBooking.id) {
        const updated = await updateBooking(editingBooking.id, formData);
        setBookings(bookings.map(b => (b.id === updated.id ? updated : b)));
      } else {
        formData.IDuser = parseInt(formData.IDuser);
        const newBooking = await createBooking(formData);
        setBookings([...bookings, newBooking]);
      }
      handleFormClose();
    } catch (err) {
      console.error('Form submission error:', err);
    }
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
        <Button title="Edit" onPress={() => handleEditBooking(item)} />
        <Button title="Delete" onPress={() => handleDeleteBooking(item.id)} />
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>🏨 Bookings</Text>
      <Button title="Add New Booking" onPress={() => setModalVisible(true)} />
      {bookings.map((item, index) => (
        <React.Fragment key={index}>{renderBooking(item)}</React.Fragment>
      ))}
      {modalVisible && (
        <BookingForm
          visible={modalVisible}
          initialData={editingBooking}
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

export default BookingListScreen;
