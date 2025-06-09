import { useState, useEffect } from 'react';
import { Modal, View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { getUsers } from '../../../../services/api';

export interface BookingFormProps {
  visible: any;
  booking?: any;
  onClose: () => void;
  onSubmit: (formData: any) => Promise<void>;
  initialData?: any;
}

const BookingForm = ({ visible, onClose, onSubmit, initialData }: BookingFormProps) => {
  const today = new Date().toISOString().slice(0, 10);

  const [form, setForm] = useState({
    IDuser: '',
    bookingDate: today,
    IDaccommodation: '',
    totalPrice: '',
    status: '',
  });

  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.error('Błąd pobierania użytkowników:', error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    if (initialData) {
      setForm({
        IDuser: initialData.IDuser?.toString() || '',
        bookingDate: initialData.bookingDate || today,
        IDaccommodation: initialData.IDaccommodation?.toString() || '',
        totalPrice: initialData.totalPrice?.toString() || '',
        status: initialData.status || '',
      });
    } else {
      setForm({
        IDuser: '',
        bookingDate: today,
        IDaccommodation: '',
        totalPrice: '',
        status: '',
      });
    }
  }, [initialData]);

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = () => {
    if (!form.bookingDate || isNaN(Date.parse(form.bookingDate))) {
      alert('Invalid data (format: RRRR-MM-DD)');
      return;
    }

    onSubmit({
      ...form,
      IDuser: parseInt(form.IDuser, 10),
      IDaccommodation: parseInt(form.IDaccommodation, 10),
      totalPrice: parseFloat(form.totalPrice),
      status: form.status || 'New',
    });

    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <Text style={styles.title}>{initialData ? 'Edit Booking' : 'Add New Booking'}</Text>

        <Text style={styles.label}>Użytkownik:</Text>
        <Picker
          selectedValue={form.IDuser}
          onValueChange={(val) => handleChange('IDuser', val)}
          style={styles.picker}
        >
          <Picker.Item label="-- Wybierz użytkownika --" value="" />
          {users.map((user) => (
            <Picker.Item
              key={user.id}
              label={`${user.firstName} ${user.lastName}`}
              value={user.id.toString()}
            />
          ))}
        </Picker>

        <TextInput
          placeholder="Booking Date (YYYY-MM-DD)"
          style={styles.input}
          value={form.bookingDate}
          onChangeText={(val) => handleChange('bookingDate', val)}
        />
        <TextInput
          placeholder="Accommodation ID"
          style={styles.input}
          value={form.IDaccommodation}
          onChangeText={(val) => handleChange('IDaccommodation', val)}
        />
        <TextInput
          placeholder="Total Price"
          style={styles.input}
          keyboardType="numeric"
          value={form.totalPrice}
          onChangeText={(val) => handleChange('totalPrice', val)}
        />
        <TextInput
          placeholder="Status"
          style={styles.input}
          value={form.status}
          onChangeText={(val) => handleChange('status', val)}
        />

        <View style={styles.buttonGroup}>
          <Button title="Cancel" onPress={onClose} color="grey" />
          <Button title="Save" onPress={handleSubmit} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 12,
    padding: 8,
    fontSize: 16,
  },
  picker: {
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
  },
  buttonGroup: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default BookingForm;
