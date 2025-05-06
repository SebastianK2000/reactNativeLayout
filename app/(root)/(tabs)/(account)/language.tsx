import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const languages = [
    { id: 'en-us', name: 'English (US)', category: 'Suggested' },
    { id: 'en-uk', name: 'English (UK)', category: 'Suggested' },
    { id: 'pl', name: 'Polish', category: 'Others' },
    { id: 'es', name: 'Spanish', category: 'Others' },
    { id: 'fr', name: 'French', category: 'Others' },
    { id: 'ar', name: 'Arabic', category: 'Others' },
    { id: 'ru', name: 'Russian', category: 'Others' },
    { id: 'id', name: 'Indonesian', category: 'Others' },
    { id: 'hi', name: 'Hindi', category: 'Others' },
    { id: 'vi', name: 'Vietnamese', category: 'Others' }
];

const LanguageSelector = () => {
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const suggested = languages.filter(lang => lang.category === 'Suggested');
    const others = languages.filter(lang => lang.category === 'Others');

    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>Suggested</Text>
            {suggested.map((item) => (
                <TouchableOpacity key={item.id} style={styles.languageItem} onPress={() => setSelectedLanguage(item.id)}>
                    <Text style={styles.languageText}>{item.name}</Text>
                    <Ionicons
                        name={selectedLanguage === item.id ? 'radio-button-on' : 'radio-button-off'}
                        size={24}
                        color={selectedLanguage === item.id ? '#2563EB' : '#D1D1D6'}
                    />
                </TouchableOpacity>
            ))}
            <View style={styles.divider} />
            <Text style={styles.sectionTitle}>Others</Text>
            {others.map((item) => (
                <TouchableOpacity key={item.id} style={styles.languageItem} onPress={() => setSelectedLanguage(item.id)}>
                    <Text style={styles.languageText}>{item.name}</Text>
                    <Ionicons
                        name={selectedLanguage === item.id ? 'radio-button-on' : 'radio-button-off'}
                        size={24}
                        color={selectedLanguage === item.id ? '#2563EB' : '#D1D1D6'}
                    />
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1c1c1e',
        marginTop: 20,
        marginBottom: 10,
    },
    divider: {
        height: 1,
        backgroundColor: '#d1d1d6',
    },
    languageItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 10,
    },
    languageText: {
        fontSize: 18,
        color: '#1c1c1e',
    },
});

export default LanguageSelector;
