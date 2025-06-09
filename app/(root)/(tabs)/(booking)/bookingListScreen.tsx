import { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Button, Alert, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import {
  getBookings,
  createBooking,
  updateBooking,
  deleteBooking,
  getUsers,
  getAccommodations
} from '../../../../services/api';

const BookingListScreen = () => {
  const today = new Date().toISOString().split('T')[0];

  const [bookings, setBookings] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [accommodations, setAccommodations] = useState<any[]>([]);

  const [editingBooking, setEditingBooking] = useState<any>(null);
  const [IDuser, setIDuser] = useState('');
  const [IDaccommodation, setIDaccommodation] = useState('');
  const [bookingDate, setBookingDate] = useState(today);
  const [totalPrice, setTotalPrice] = useState('');
  const [status, setStatus] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bookingData, userData, accommodationData] = await Promise.all([
          getBookings(),
          getUsers(),
          getAccommodations()
        ]);
        console.log("Booking data:", bookingData);
        setBookings(bookingData);
        setUsers(userData);
        setAccommodations(accommodationData);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const resetForm = () => {
    setIDuser('');
    setIDaccommodation('');
    setBookingDate(today);
    setTotalPrice('');
    setStatus('');
    setEditingBooking(null);
    setIsFormVisible(false);
  };

const handleEditBooking = (booking: any) => {
  setIDuser(booking.iDuser?.toString() || '');
  setIDaccommodation(booking.iDaccommodation?.toString() || '');
  setBookingDate(booking.bookingDate?.split('T')[0] || today);
  setTotalPrice(booking.totalPrice?.toString() || '');
  setStatus(booking.status || '');
  setEditingBooking(booking);
  setIsFormVisible(true);
};

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

const handleFormSubmit = async () => {
  try {
    const payload = {
      IDuser: parseInt(IDuser, 10),
      IDaccommodation: parseInt(IDaccommodation, 10),
      BookingDate: bookingDate,
      CheckInDate: bookingDate,
      CheckOutDate: bookingDate,
      TotalPrice: parseFloat(totalPrice),
      Status: status || 'New'
    };

    if (editingBooking?.id) {
      await updateBooking(editingBooking.id, payload);
    } else {
      await createBooking(payload);
    }

    const updatedBookings = await getBookings();
    setBookings(updatedBookings);

    resetForm();
  } catch (err) {
    console.error('Form submission error:', err);
  }
};

const renderBooking = (item: any) => (
  <View style={styles.itemBox} key={item.id}>
    <Text style={styles.itemTitle}>
      🏨 Booking – {item.accommodation?.name || 'No Name'}
    </Text>
    <Text style={styles.itemDetail}>
      👤 User: {item.user ? `${item.user.firstName} ${item.user.lastName}` : `ID ${item.iDuser || 'undefined'}`}
    </Text>
    <Text style={styles.itemDetail}>
      📅 Booking Date: {item.bookingDate?.split('T')[0] || 'No Date'}
    </Text>
    <Text style={styles.itemDetail}>
      🏠 Accommodation: {item.accommodation ? item.accommodation.name : `ID ${item.iDaccommodation || 'undefined'}`}
    </Text>
    <Text style={styles.itemDetail}>
      💰 Price: {item.totalPrice ? `${item.totalPrice} $` : 'No Price'}
    </Text>
    <Text style={styles.itemDetail}>
      🔄 Status: {item.status || 'No status'}
    </Text>
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

      {isFormVisible ? (
        <View style={styles.itemBox}>
          <Text style={styles.itemTitle}>
            {editingBooking ? 'Edytuj rezerwację' : 'Dodaj rezerwację'}
          </Text>

          <Picker selectedValue={IDuser} onValueChange={setIDuser} style={styles.input}>
            <Picker.Item label="-- Wybierz użytkownika --" value="" />
              {users.map(user => {
              if (!user.iDuser || !user.firstName || !user.lastName) return null;
             return (
              <Picker.Item
                key={user.iDuser}
                label={`${user.firstName} ${user.lastName}`}
                value={user.iDuser.toString()}
              />
            );
          })}
          </Picker>

          <Picker selectedValue={IDaccommodation} onValueChange={setIDaccommodation} style={styles.input}>
            <Picker.Item label="-- Wybierz nocleg --" value="" />
              {accommodations.map(acc => {
                if (!acc?.iDaccommodation || !acc?.name) return null;
                return (
                  <Picker.Item
                    key={acc.iDaccommodation}
                    label={acc.name}
                    value={acc.iDaccommodation.toString()}
                  />
                );
              })}
          </Picker>

          <TextInput
            placeholder="Data rezerwacji (YYYY-MM-DD)"
            style={styles.input}
            value={bookingDate}
            onChangeText={setBookingDate}
          />
          <TextInput
            placeholder="Cena całkowita"
            style={styles.input}
            value={totalPrice}
            onChangeText={setTotalPrice}
            keyboardType="numeric"
          />
          <TextInput
            placeholder="Status"
            style={styles.input}
            value={status}
            onChangeText={setStatus}
          />

          <View style={styles.buttonContainer}>
            <Button title="Zapisz" onPress={handleFormSubmit} />
            <Button title="Anuluj" color="grey" onPress={resetForm} />
          </View>
        </View>
      ) : (
        <View style={styles.addButton}>
          <Button title="Dodaj rezerwację" onPress={() => setIsFormVisible(true)} />
        </View>
      )}
      {bookings.map(renderBooking)}
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

export default BookingListScreen;
