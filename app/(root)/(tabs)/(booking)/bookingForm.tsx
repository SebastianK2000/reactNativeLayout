import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { TextInput, Button, Text, Checkbox, Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';

const BookingForm: React.FC = () => {
    const [visible, setVisible] = useState(false);
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [currency, setCurrency] = useState('PLN');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [peopleCount, setPeopleCount] = useState('');
    const [offerLink, setOfferLink] = useState('');
    const [image, setImage] = useState<string | null>(null);
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

    const users = [
        { id: '1', name: 'User 1' },
        { id: '2', name: 'User 2' },
        { id: '3', name: 'User 3' },
        { id: '4', name: 'User 4' },
    ];

    const toggleModal = () => setVisible(!visible);

    const handleSubmit = () => {
        if (!title || !price || isNaN(parseFloat(price)) || !startDate) {
            return;
        }

        console.log('Booking submitted:', { title, price, currency, description, peopleCount, startDate, endDate, offerLink, image, selectedUsers });
        toggleModal();
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        // if (!result.cancelled) {
        //     setImage(result.uri);
        // }
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

    const handleUserSelection = (userId: string) => {
        setSelectedUsers((prevState) =>
            prevState.includes(userId)
                ? prevState.filter((id) => id !== userId)
                : [...prevState, userId]
        );
    };

    return (
        <PaperProvider theme={theme}>
            <View style={styles.container}>
                <ScrollView>
                    <Text style={styles.title}>Add Booking</Text>

                    <TextInput label="Title" value={title} onChangeText={setTitle} style={styles.input} />
                    <TextInput label="Price" value={price} onChangeText={setPrice} keyboardType="numeric" style={styles.input} />
                    <TextInput label="Number of People" value={peopleCount} onChangeText={setPeopleCount} keyboardType="numeric" style={styles.input} />

                    <Text style={styles.pickerLabel}>Select Type</Text>
                    <Picker selectedValue={currency} onValueChange={setCurrency} style={styles.picker}>
                        <Picker.Item label="Villa" value="Villa" />
                        <Picker.Item label="Summer house" value="Summer house" />
                        <Picker.Item label="Concert" value="Concert" />
                        <Picker.Item label="Event" value="Event" />
                        <Picker.Item label="Car" value="Car" />
                        <Picker.Item label="Airplane flight" value="Airplane flight" />
                        <Picker.Item label="Ticket" value="Ticket" />
                        <Picker.Item label="Other" value="Other" />
                    </Picker>

                    <Text style={styles.pickerLabel}>Select currency</Text>
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

                    <TextInput label="Description (Optional)" value={description} onChangeText={setDescription} style={styles.input} />
                    <TextInput label="Link For Offer" value={offerLink} onChangeText={setOfferLink} style={styles.input} />
                    <TextInput label="Start Date (YYYY-MM-DD)" value={startDate} onChangeText={setStartDate} style={styles.input} />
                    <TextInput label="End Date (YYYY-MM-DD)" value={endDate} onChangeText={setEndDate} style={styles.input} />

                    <Text style={styles.pickerLabel}>Select Users</Text>
                    {users.map((user) => (
                        <View key={user.id} style={styles.checkboxContainer}>
                            <Checkbox
                                status={selectedUsers.includes(user.id) ? 'checked' : 'unchecked'}
                                onPress={() => handleUserSelection(user.id)}
                            />
                            <Text>{user.name}</Text>
                        </View>
                    ))}

                    <Button mode="outlined" onPress={pickImage} style={styles.imageButton}>
                        Choose Image
                    </Button>
                    {image && <Image source={{ uri: image }} style={styles.imagePreview} />}

                    <Button mode="contained" onPress={handleSubmit} style={styles.submitButton}>
                        Add Booking
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
    imageButton: { marginTop: 10, marginBottom: 20 },
    imagePreview: { width: 100, height: 100, marginTop: 10, borderRadius: 8, alignSelf: 'center' },
    submitButton: {
        backgroundColor: '#2563eb',
        marginTop: 20,
    },
    pickerLabel: {
        fontSize: 16,
        marginBottom: 5,
        marginTop: 30,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
});

export default BookingForm;
