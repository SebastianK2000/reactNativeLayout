import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const themes = [
    { id: 'light', name: 'Light Mode' },
    { id: 'dark', name: 'Dark Mode' },
    { id: 'system', name: 'System Default' }
];

const ThemeSelection = () => {
    const [selectedTheme, setSelectedTheme] = useState('system');

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Appearance</Text>
            {themes.map((theme) => (
                <TouchableOpacity
                    key={theme.id}
                    style={styles.themeOption}
                    onPress={() => setSelectedTheme(theme.id)}
                >
                    <Text style={styles.themeText}>{theme.name}</Text>
                    <Ionicons
                        name={selectedTheme === theme.id ? 'checkmark-circle' : 'ellipse-outline'}
                        size={24}
                        color={selectedTheme === theme.id ? '#2563EB' : '#D1D1D6'}
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
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1c1c1e',
        marginBottom: 20,
    },
    themeOption: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#d1d1d6',
    },
    themeText: {
        fontSize: 18,
        color: '#1c1c1e',
    },
});

export default ThemeSelection;
