import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
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

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Accommodations</Text>
      {accommodations.map((item, index) => (
        <View key={index} style={styles.box}>
          <Text>{JSON.stringify(item)}</Text>
        </View>
      ))}

      <Text style={styles.title}>Payments</Text>
      {payments.map((item, index) => (
        <View key={index} style={styles.box}>
          <Text>{JSON.stringify(item)}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginTop: 10, marginBottom: 10 },
  box: { padding: 10, backgroundColor: '#f0f0f0', marginBottom: 10, borderRadius: 5 },
});

export default ExpensesListScreen;
