import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

const Container = styled.View`
    flex: 1;
    background-color: #ffffff;
    padding: 20px;
`;

const Title = styled.Text`
    font-size: 22px;
    font-weight: bold;
    color: #1c1c1e;
    margin-bottom: 20px;
`;

const ThemeOption = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 15px 10px;
    border-bottom-width: 1px;
    border-bottom-color: #d1d1d6;
`;

const ThemeText = styled.Text`
    font-size: 18px;
    color: #1c1c1e;
`;

const themes = [
    { id: 'light', name: 'Light Mode' },
    { id: 'dark', name: 'Dark Mode' },
    { id: 'system', name: 'System Default' }
];

const ThemeSelection = () => {
    const [selectedTheme, setSelectedTheme] = useState('system');

    return (
        <Container>
            <Title>Appearance</Title>
            {themes.map((theme) => (
                <ThemeOption key={theme.id} onPress={() => setSelectedTheme(theme.id)}>
                    <ThemeText>{theme.name}</ThemeText>
                    <Ionicons
                        name={selectedTheme === theme.id ? 'checkmark-circle' : 'ellipse-outline'}
                        size={24}
                        color={selectedTheme === theme.id ? '#2563EB' : '#D1D1D6'}
                    />
                </ThemeOption>
            ))}
        </Container>
    );
};

export default ThemeSelection;