import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Button, Alert } from 'react-native';
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
        console.log("Booking data:", bookingData);
        setBookings(bookingData);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBookings();
  }, []);

  const handleDeleteBooking = async (id: number | string | undefined) => {
    if (!id) {
      console.error("Brak ID rezerwacji do usunięcia");
      return;
    }

    try {
      await deleteBooking(id);
      setBookings(bookings.filter((item: any) => item.id !== id));
      Alert.alert("Sukces", "Rezerwacja została usunięta.");
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
    const payload = {
      IDbooking: editingBooking.id,
      IDuser: parseInt(formData.IDuser, 10),
      IDaccommodation: parseInt(formData.IDaccommodation, 10),
      BookingDate: formData.bookingDate,
      CheckInDate: formData.bookingDate,
      CheckOutDate: formData.bookingDate,
      TotalPrice: parseFloat(formData.totalPrice),
      Status: formData.status || 'New',
    };

    if (editingBooking && editingBooking.id) {
      const updated = await updateBooking(editingBooking.id, payload);
      setBookings(bookings.map(b => (b.id === updated.iDbooking ? { ...updated, id: updated.iDbooking } : b)));
    } else {
      const newBooking = await createBooking(payload);
      setBookings([...bookings, { ...newBooking, id: newBooking.iDbooking }]);
    }

    handleFormClose();
  } catch (err) {
    console.error('Form submission error:', err);
  }
};

  const renderBooking = (item: any) => (
    <View style={styles.itemBox} key={item.id}>
      <Text style={styles.itemTitle}>Booking ID: {item.IDbooking || 'No ID'}</Text>
      <Text style={styles.itemDetail}>👤 User ID: {item.IDuser || 'No User'}</Text>
      <Text style={styles.itemDetail}>📅 Booking Date: {item.bookingDate?.split('T')[0] || 'No Date'}</Text>
      <Text style={styles.itemDetail}>🏠 Accommodation ID: {item.IDaccommodation || 'No Accommodation'}</Text>
      <Text style={styles.itemDetail}>💰 Price: {item.totalPrice ? `${item.totalPrice} $` : 'No Price'}</Text>
      <Text style={styles.itemDetail}>🔄 Status: {item.status || 'No status'}</Text>

      <View style={styles.buttonContainer}>
        <View style={styles.buttonSpacing}>
          <Button title="Edytuj" onPress={() => handleEditBooking(item)} />
        </View>
        <View style={styles.buttonSpacing}>
          <Button title="Usuń" color="#d9534f" onPress={() => handleDeleteBooking(item.id)} />
        </View>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>🏨 Bookings</Text>
      <View style={styles.addButton}>
        <Button title="Dodaj rezerwację" onPress={() => setModalVisible(true)} />
      </View>
      {bookings.map((item) => renderBooking(item))}
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

export default BookingListScreen;
