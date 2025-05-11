import React, { useState, useEffect } from 'react';
import { Modal, View, TextInput, Button, StyleSheet, Text } from 'react-native';

interface PaymentFormProps {
  visible: boolean;
  initialData?: {
    IDbooking?: number;
    Amount: string;
    PaymentMethod: string;
    Status: string;
    PaymentDate: string;
  };
  onClose: () => void;
  onSubmit: (data: {
    IDbooking: number;
    Amount: string;
    PaymentMethod: string;
    Status: string;
    PaymentDate: string;
  }) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ visible, initialData, onClose, onSubmit }) => {
  const today = new Date().toISOString().split('T')[0];

  const [IDbooking, setIDbooking] = useState('');
  const [Amount, setAmount] = useState('');
  const [PaymentMethod, setPaymentMethod] = useState('Credit Card');
  const [Status, setStatus] = useState('Pending');
  const [PaymentDate, setPaymentDate] = useState(today);

  useEffect(() => {
    if (initialData) {
      setIDbooking(initialData.IDbooking?.toString() || '');
      setAmount(initialData.Amount || '');
      setPaymentMethod(initialData.PaymentMethod || 'Credit Card');
      setStatus(initialData.Status || 'Pending');
      setPaymentDate(initialData.PaymentDate || today);
    }
  }, [initialData]);

  const handleSubmit = () => {
    if (!IDbooking || isNaN(Number(IDbooking)) || !Amount || isNaN(Number(Amount)) || !PaymentMethod || !Status || !PaymentDate) {
      alert('Wszystkie pola muszą być wypełnione poprawnie');
      return;
    }

    onSubmit({
      IDbooking: parseInt(IDbooking, 10),
      Amount,
      PaymentMethod,
      Status,
      PaymentDate,
    });

    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.container}>
        <Text style={styles.title}>
          {initialData ? 'Edytuj Płatność' : 'Dodaj Nową Płatność'}
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Booking ID"
          keyboardType="numeric"
          value={IDbooking}
          onChangeText={setIDbooking}
        />
        <TextInput
          style={styles.input}
          placeholder="Kwota"
          keyboardType="numeric"
          value={Amount}
          onChangeText={setAmount}
        />
        <TextInput
          style={styles.input}
          placeholder="Metoda płatności"
          value={PaymentMethod}
          onChangeText={setPaymentMethod}
        />
        <TextInput
          style={styles.input}
          placeholder="Status"
          value={Status}
          onChangeText={setStatus}
        />
        <TextInput
          style={styles.input}
          placeholder="Data (YYYY-MM-DD)"
          value={PaymentDate}
          onChangeText={setPaymentDate}
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

export default PaymentForm;
