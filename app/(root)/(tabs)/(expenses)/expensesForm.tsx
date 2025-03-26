import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Text, HelperText, Modal, Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';

const ExpenseForm = () => {
    const [visible, setVisible] = useState(false);
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [currency, setCurrency] = useState('PLN');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [category, setCategory] = useState('Fuel');
    const [paymentMethod, setPaymentMethod] = useState('Cash');
    const [notes, setNotes] = useState('');

    const toggleModal = () => setVisible(!visible);

    const handleSubmit = () => {
        if (!title || !price || isNaN(parseFloat(price)) || !date) {
            return;
        }

        toggleModal();
    };

    const theme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            primary: '#2563eb',
            accent: '#2563eb',
        },
        roundness: 5,
    };

    return (
        <PaperProvider theme={theme}>
            <View style={styles.container}>
                <ScrollView>
                    <Text style={styles.title}>Add Expense</Text>
                    <TextInput
                        label="Title"
                        value={title}
                        onChangeText={setTitle}
                        style={styles.input}
                    />
                    <TextInput
                        label="Price"
                        value={price}
                        onChangeText={setPrice}
                        keyboardType="numeric"
                        style={styles.input}
                    />
                    <HelperText type="error" visible={price !== '' && isNaN(parseFloat(price))}>
                        Please enter a valid price
                    </HelperText>
                    <Picker selectedValue={currency} onValueChange={setCurrency} style={styles.picker}>
                        <Picker.Item label="PLN" value="PLN" />
                        <Picker.Item label="EUR" value="EUR" />
                        <Picker.Item label="USD" value="USD" />
                        <Picker.Item label="GBP" value="GBP" />
                        <Picker.Item label="CHF" value="CHF" />
                        <Picker.Item label="SEK" value="SEK" />
                        <Picker.Item label="JPY" value="JPY" />
                        <Picker.Item label="Other" value="Other" />
                    </Picker>
                    <TextInput
                        label="Description (Optional)"
                        value={description}
                        onChangeText={setDescription}
                        style={styles.input}
                    />
                    <TextInput
                        label="Date (YYYY-MM-DD)"
                        value={date}
                        onChangeText={setDate}
                        style={styles.input}
                    />
                    <Picker selectedValue={category} onValueChange={setCategory} style={styles.picker}>
                        <Picker.Item label="Fuel" value="Fuel" />
                        <Picker.Item label="Food" value="Food" />
                        <Picker.Item label="Shopping" value="Shopping" />
                        <Picker.Item label="Ticket" value="Ticket" />
                        <Picker.Item label="Highway ticket" value="Highway ticket" />
                        <Picker.Item label="Accommodation" value="Accommodation" />
                        <Picker.Item label="Other" value="Other" />
                    </Picker>
                    <Picker selectedValue={paymentMethod} onValueChange={setPaymentMethod} style={styles.picker}>
                        <Picker.Item label="Cash" value="Cash" />
                        <Picker.Item label="Card" value="Card" />
                        <Picker.Item label="Bank Transfer" value="Bank Transfer" />
                        <Picker.Item label="Other" value="Other" />
                    </Picker>
                    <TextInput
                        label="Notes (Optional)"
                        value={notes}
                        onChangeText={setNotes}
                        style={styles.input}
                    />
                    <Button mode="contained" onPress={handleSubmit} style={styles.submitButton}>
                        Add Expense
                    </Button>
                </ScrollView>
            </View>
        </PaperProvider>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    title: { fontSize: 22, fontWeight: 'bold', marginBottom: 15, color: 'black' },
    input: { marginBottom: 10, backgroundColor: '#f4f4f4' },
    picker: { marginBottom: 10 },
    submitButton: {
        backgroundColor: '#2563eb',
        marginTop: 20,
    },
});

export default ExpenseForm;
