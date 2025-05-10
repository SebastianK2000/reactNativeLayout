import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Button } from 'react-native';
import { getPayments, createPayment, updatePayment, deletePayment } from '../../../../services/api';
import PaymentForm from './expensesForm'; // Formularz płatności

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
      <Text style={styles.itemTitle}>Payment #{payment.IDpayment}</Text>
      <Text style={styles.itemDetail}>📚 Booking ID: {payment.IDbooking}</Text>
      <Text style={styles.itemDetail}>📅 Date: {formatDate(payment.PaymentDate)}</Text>
      <Text style={styles.itemDetail}>
        💰 Amount: {payment.Amount !== undefined ? `$${payment.Amount.toFixed(2)}` : 'N/A'}
      </Text>      
      <Text style={styles.itemDetail}>💳 Method: {payment.PaymentMethod}</Text>
      <Text style={styles.itemDetail}>🔴 Status: {payment.Status}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Edit" onPress={() => handleEditPayment(payment.IDpayment!)} />
        <Button title="Delete" onPress={() => handleDeletePayment(payment.IDpayment!)} />
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>💳 Payments</Text>
      <Button title="Add New Payment" onPress={() => setModalVisible(true)} />
{payments.map((item) => (
  <React.Fragment key={item.IDpayment}>{renderPayment(item)}</React.Fragment>
))}
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
  itemBox: { backgroundColor: '#f8f8f8', borderRadius: 8, padding: 14, marginBottom: 12 },
  itemTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 8 },
  itemDetail: { fontSize: 16, color: '#555', marginBottom: 4 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
});

export default ExpensesListScreen;
