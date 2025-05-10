import { useState, useEffect } from 'react';
import { Modal, View, TextInput, Button, StyleSheet, Text } from 'react-native';

export interface AccommodationFormProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (formData: any) => Promise<void>;
  initialData?: any;
}

const AccommodationForm = ({ visible, onClose, onSubmit, initialData }: AccommodationFormProps) => {
  const [form, setForm] = useState({
    name: '',
    address: '',
    type: '',
    price: '',
    date: '',
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || '',
        address: initialData.address || '',
        type: initialData.type || '',
        price: initialData.price?.toString() || '',
        date: initialData.date || '',
      });
    }
  }, [initialData]);

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = () => {
    if (!form.name || !form.address || !form.type || isNaN(parseFloat(form.price)) || !form.date) {
      alert('Wszystkie pola muszą być wypełnione poprawnie');
      return;
    }

    onSubmit({
      ...form,
      price: parseFloat(form.price),
    });

    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <Text style={styles.title}>{initialData ? 'Edytuj Zakwaterowanie' : 'Dodaj Nowe Zakwaterowanie'}</Text>
        <TextInput
          placeholder="Nazwa"
          style={styles.input}
          value={form.name}
          onChangeText={(val) => handleChange('name', val)}
        />
        <TextInput
          placeholder="Adres"
          style={styles.input}
          value={form.address}
          onChangeText={(val) => handleChange('address', val)}
        />
        <TextInput
          placeholder="Typ"
          style={styles.input}
          value={form.type}
          onChangeText={(val) => handleChange('type', val)}
        />
        <TextInput
          placeholder="Cena"
          style={styles.input}
          keyboardType="numeric"
          value={form.price}
          onChangeText={(val) => handleChange('price', val)}
        />
        <TextInput
          placeholder="Data"
          style={styles.input}
          value={form.date}
          onChangeText={(val) => handleChange('date', val)}
        />
        <View style={styles.buttonGroup}>
          <Button title="Anuluj" onPress={onClose} color="grey" />
          <Button title="Zapisz" onPress={handleSubmit} />
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
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonGroup: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default AccommodationForm;
