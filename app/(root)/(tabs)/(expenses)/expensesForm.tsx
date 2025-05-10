import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet } from 'react-native';

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
  const [IDbooking, setIDbooking] = useState('');
  const [Amount, setAmount] = useState('');
  const [PaymentMethod, setPaymentMethod] = useState('Credit Card'); // Domyślna wartość
  const [Status, setStatus] = useState('Pending'); // Domyślna wartość
  const [PaymentDate, setPaymentDate] = useState('');

  useEffect(() => {
    if (initialData) {
      setIDbooking(initialData.IDbooking?.toString() || '');
      setAmount(initialData.Amount);
      setPaymentMethod(initialData.PaymentMethod || 'Credit Card'); // Domyślnie ustawiamy na 'Credit Card'
      setStatus(initialData.Status || 'Pending'); // Domyślnie ustawiamy na 'Pending'
      setPaymentDate(initialData.PaymentDate);
    } else {
      const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
      setPaymentDate(today);
    }
  }, [initialData]);

  const handleSubmit = () => {
    const newPayment = {
      IDbooking: parseInt(IDbooking, 10) || 0,
      Amount,
      PaymentMethod,
      Status,
      PaymentDate,
    };
    onSubmit(newPayment);
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <Text style={styles.title}>Add / Edit Payment</Text>

        <TextInput
          style={styles.input}
          placeholder="Booking ID"
          keyboardType="numeric"
          value={IDbooking}
          onChangeText={setIDbooking}
        />
        <TextInput
          style={styles.input}
          placeholder="Amount"
          keyboardType="numeric"
          value={Amount}
          onChangeText={setAmount}
        />
        <TextInput
          style={styles.input}
          placeholder="Payment Method"
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
          placeholder="Payment Date (YYYY-MM-DD)"
          value={PaymentDate}
          onChangeText={setPaymentDate}
        />

        <Button title="Submit" onPress={handleSubmit} />
        <View style={{ marginTop: 10 }} />
        <Button title="Cancel" onPress={onClose} />
      </View>
    </Modal>
  );
};


const styles = StyleSheet.create({
  modalContainer: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  input: { height: 40, borderColor: '#ccc', borderWidth: 1, marginBottom: 12, paddingHorizontal: 8 },
});

export default PaymentForm;
