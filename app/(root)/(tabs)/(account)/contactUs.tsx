import React, { useState } from 'react';
import { ScrollView, SafeAreaView, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (name: string, value: string) => {
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        alert('Form submitted');
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.title}>
                    We would love to hear from you! Fill out the form below, and we'll get back to you as soon as possible.
                </Text>
                <SafeAreaView style={styles.form}>
                    <TextInput
                        style={styles.input}
                        value={formData.name}
                        onChangeText={(text) => handleChange('name', text)}
                        placeholder="Your Name"
                        placeholderTextColor="#aaa"
                    />
                    <TextInput
                        style={styles.input}
                        value={formData.email}
                        onChangeText={(text) => handleChange('email', text)}
                        placeholder="Your Email"
                        placeholderTextColor="#aaa"
                        keyboardType="email-address"
                    />
                    <TextInput
                        style={styles.textarea}
                        value={formData.message}
                        onChangeText={(text) => handleChange('message', text)}
                        placeholder="Your Message"
                        placeholderTextColor="#aaa"
                        multiline
                    />
                    <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                        <Text style={styles.submitButtonText}>Send Message</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        padding: 20,
    },
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: 40,
    },
    title: {
        fontSize: 17,
        fontWeight: '500',
        color: '#1c1c1e',
        textAlign: 'center',
        marginBottom: 40,
        marginTop: 40,
        padding: 20,
    },
    form: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 50,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        shadowOpacity: 0.1,
    },
    input: {
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 12,
        fontSize: 16,
        color: '#333',
        backgroundColor: '#f9f9f9',
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        shadowOpacity: 0.2,
    },
    textarea: {
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 12,
        fontSize: 16,
        color: '#333',
        backgroundColor: '#f9f9f9',
        minHeight: 150,
        textAlignVertical: 'top',
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        shadowOpacity: 0.2,
    },
    submitButton: {
        padding: 16,
        backgroundColor: '#0066ff',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 24,
        elevation: 5,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
});

export default ContactUs;
