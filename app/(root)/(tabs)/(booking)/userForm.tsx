import { useState, useEffect } from 'react';
import { Modal, View, TextInput, Button, StyleSheet, Text } from 'react-native';

export interface UserFormProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (formData: any) => Promise<void>;
  initialData?: any;
}

const UserForm = ({ visible, onClose, onSubmit, initialData }: UserFormProps) => {
  const [form, setForm] = useState({
    FirstName: '',
    LastName: '',
    Phone: '',
    Email: '',
    Address: '',
    IsActive: true,
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        FirstName: initialData.FirstName || '',
        LastName: initialData.LastName || '',
        Phone: initialData.Phone || '',
        Email: initialData.Email || '',
        Address: initialData.Address || '',
        IsActive: initialData.IsActive ?? true,
      });
    } else {
      setForm({
        FirstName: '',
        LastName: '',
        Phone: '',
        Email: '',
        Address: '',
        IsActive: true,
      });
    }
  }, [initialData]);

  const handleChange = (field: string, value: string | boolean) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = () => {
    if (!form.Email || !form.FirstName || !form.LastName) {
      alert('Imię, nazwisko i e-mail są wymagane.');
      return;
    }

    onSubmit({
      ...form,
      IsActive: !!form.IsActive,
    });

    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <Text style={styles.title}>{initialData ? 'Edytuj użytkownika' : 'Nowy użytkownik'}</Text>

        <TextInput
          placeholder="Imię"
          style={styles.input}
          value={form.FirstName}
          onChangeText={(val) => handleChange('FirstName', val)}
        />
        <TextInput
          placeholder="Nazwisko"
          style={styles.input}
          value={form.LastName}
          onChangeText={(val) => handleChange('LastName', val)}
        />
        <TextInput
          placeholder="Telefon"
          style={styles.input}
          keyboardType="phone-pad"
          value={form.Phone}
          onChangeText={(val) => handleChange('Phone', val)}
        />
        <TextInput
          placeholder="E-mail"
          style={styles.input}
          keyboardType="email-address"
          value={form.Email}
          onChangeText={(val) => handleChange('Email', val)}
        />
        <TextInput
          placeholder="Adres"
          style={styles.input}
          value={form.Address}
          onChangeText={(val) => handleChange('Address', val)}
        />
        <TextInput
          placeholder="Aktywny? (true/false)"
          style={styles.input}
          value={form.IsActive.toString()}
          onChangeText={(val) => handleChange('IsActive', val === 'true')}
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

export default UserForm;
