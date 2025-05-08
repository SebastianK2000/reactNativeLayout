import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Button } from 'react-native';
import { getAccommodations, getPayments } from '../../../../services/api';

const ExpensesListScreen = () => {
  const [accommodations, setAccommodations] = useState([]);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const acc = await getAccommodations();
        const pay = await getPayments();
        setAccommodations(acc);
        setPayments(pay);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const handleDeleteAccommodation = (id: string) => {
    setAccommodations(accommodations.filter((item: any) => item.id !== id));
  };

  const handleEditAccommodation = (id: string) => {
    console.log(`Edit id: ${id}`);
  };

  const handleDeletePayment = (id: string) => {
    setPayments(payments.filter((item: any) => item.id !== id));
  };

  const handleEditPayment = (id: string) => {
    console.log(`Edit id: ${id}`);
  };

  const renderAccommodation = (item: any) => (
    <View style={styles.itemBox}>
      <Text style={styles.itemTitle}>{item.name || 'Empty Name'}</Text>

      <Text style={styles.itemDetail}>📍 Address: {item.address || 'Empty Address'}</Text>
      <Text style={styles.itemDetail}>🏠 Type of house: {item.type || 'Empty type'}</Text>

      {item.price && (
        <Text style={styles.itemDetail}>💰 Price: {item.price} $</Text>
      )}

      {item.date && (
        <Text style={styles.itemDetail}>📅 Date: {formatDate(item.date)}</Text>
      )}

      <Text style={styles.itemDetail}>👤 Created At: {item.createdBy}</Text>

      <View style={styles.buttonContainer}>
        <Button title="Edit" onPress={() => handleEditAccommodation(item.id)} />
        <Button title="Delete" onPress={() => handleDeleteAccommodation(item.id)} />
      </View>
    </View>
  );

  const renderPayment = (item: any) => (
    <View style={styles.itemBox}>
      <Text style={styles.itemTitle}>Payment number {item.id}</Text>

      {item.status && (
        <Text style={styles.itemDetail}>🔴 Status: {item.status}</Text>
      )}
      {item.method && (
        <Text style={styles.itemDetail}>💳 Methood: {item.method}</Text>
      )}
      {item.amount && (
        <Text style={styles.itemDetail}>💰 Amount: {item.amount} $</Text>
      )}
      {item.date && (
        <Text style={styles.itemDetail}>📅 Payment Date: {formatDate(item.date)}</Text>
      )}

      <View style={styles.buttonContainer}>
        <Button title="Edit" onPress={() => handleEditPayment(item.id)} />
        <Button title="Delete" onPress={() => handleDeletePayment(item.id)} />
      </View>
    </View>
  );

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pl-PL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>🏨 Accommodations</Text>
      <Button title="Add new Accommodations" onPress={() => console.log('Add new Accommodations')} />
      {accommodations.map((item, index) => (
        <React.Fragment key={index}>{renderAccommodation(item)}</React.Fragment>
      ))}

      <Text style={styles.sectionTitle}>💳 Payments</Text>
      <Button title="Add new Payments" onPress={() => console.log('Add new Payments')} />
      {payments.map((item, index) => (
        <React.Fragment key={index}>{renderPayment(item)}</React.Fragment>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#333',
  },
  itemDetail: {
    fontSize: 16,
    color: '#555',
    marginBottom: 4,
  },
  itemBox: {
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 14,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default ExpensesListScreen;
