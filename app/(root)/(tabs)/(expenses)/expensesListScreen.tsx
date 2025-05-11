import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Button } from 'react-native';
import { getPayments, createPayment, updatePayment, deletePayment } from '../../../../services/api';
import PaymentForm from './expensesForm';

interface Payment {
  IDpayment?: number;
  IDbooking: number;
  PaymentDate: string;
  Amount: number;
  PaymentMethod: string;
  Status: string;
}

const formatDate = (date: string): string => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
};

const ExpensesListScreen = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingPayment, setEditingPayment] = useState<Payment | null>(null);

  const fetchData = async () => {
    try {
      const pay = await getPayments();
      setPayments(pay);
    } catch (err) {
      console.error('Błąd przy pobieraniu płatności:', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeletePayment = async (id: number) => {
    try {
      await deletePayment(id);
      setPayments(prev => prev.filter(payment => payment.IDpayment !== id));
    } catch (err) {
      console.error('Błąd przy usuwaniu płatności:', err);
    }
  };

  const handleEditPayment = (id: number) => {
    const paymentToEdit = payments.find(p => p.IDpayment === id) || null;
    setEditingPayment(paymentToEdit);
    setModalVisible(true);
  };

  const handleFormClose = () => {
    setModalVisible(false);
    setEditingPayment(null);
  };

  const handleFormSubmit = async (paymentData: Payment) => {
    try {
      if (editingPayment && editingPayment.IDpayment) {
        await updatePayment(editingPayment.IDpayment, paymentData);
      } else {
        await createPayment(paymentData);
      }
      setModalVisible(false);
      setEditingPayment(null);
      fetchData();
    } catch (error) {
      console.error('Błąd przy zapisie płatności:', error);
    }
  };

  const renderPayment = (payment: Payment) => (
    <View key={payment.IDpayment} style={styles.itemBox}>
      <Text style={styles.itemTitle}>💸 Płatność #{payment.IDpayment}</Text>
      <Text style={styles.itemDetail}>📚 Booking ID: {payment.IDbooking}</Text>
      <Text style={styles.itemDetail}>📅 Data: {formatDate(payment.PaymentDate)}</Text>
      <Text style={styles.itemDetail}>
        💰 Kwota: {payment.Amount !== undefined ? `$${payment.Amount.toFixed(2)}` : 'Brak'}
      </Text>      
      <Text style={styles.itemDetail}>💳 Metoda: {payment.PaymentMethod}</Text>
      <Text style={styles.itemDetail}>🔴 Status: {payment.Status}</Text>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonSpacing}>
          <Button title="Edytuj" onPress={() => handleEditPayment(payment.IDpayment!)} />
        </View>
        <View style={styles.buttonSpacing}>
          <Button title="Usuń" color="#d9534f" onPress={() => handleDeletePayment(payment.IDpayment!)} />
        </View>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>💳 Lista płatności</Text>
      <View style={styles.addButton}>
        <Button title="Dodaj płatność" onPress={() => setModalVisible(true)} />
      </View>
      {payments.map(renderPayment)}
      {modalVisible && (
        <PaymentForm
          visible={modalVisible}
          initialData={
            editingPayment
              ? {
                  Amount: editingPayment.Amount.toString(),
                  PaymentMethod: editingPayment.PaymentMethod,
                  Status: editingPayment.Status,
                  PaymentDate: editingPayment.PaymentDate,
                }
              : undefined
          }
          onClose={handleFormClose}
          onSubmit={(data) =>
            handleFormSubmit({
              ...editingPayment,
              IDbooking: editingPayment?.IDbooking || 0,
              Amount: parseFloat(data.Amount),
              PaymentMethod: data.PaymentMethod,
              Status: data.Status,
              PaymentDate: data.PaymentDate,
            })
          }
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  sectionTitle: { fontSize: 22, fontWeight: 'bold', marginTop: 20, marginBottom: 10, color: '#333' },
  addButton: { marginBottom: 20 },
  itemBox: { backgroundColor: '#f8f8f8', borderRadius: 8, padding: 14, marginBottom: 12 },
  itemTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 8 },
  itemDetail: { fontSize: 16, color: '#555', marginBottom: 4 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  buttonSpacing: { flex: 1, marginHorizontal: 5 },
});

export default ExpensesListScreen;
