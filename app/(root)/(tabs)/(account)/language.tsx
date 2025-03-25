import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

const Container = styled.View`
    flex: 1;
    background-color: #ffffff;
    padding: 20px;
`;

const SectionTitle = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: #1c1c1e;
    margin-top: 20px;
    margin-bottom: 10px;
`;

const Divider = styled.View`
    height: 1px;
    background-color: #d1d1d6;
`;

const LanguageItem = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 15px 10px;
`;

const LanguageText = styled.Text`
    font-size: 18px;
    color: #1c1c1e;
`;

const languages = [
    { id: 'en-us', name: 'English (US)', category: 'Suggested' },
    { id: 'en-uk', name: 'English (UK)', category: 'Suggested' },
    { id: 'zh', name: 'Mandarin', category: 'Others' },
    { id: 'hi', name: 'Hindi', category: 'Others' },
    { id: 'es', name: 'Spanish', category: 'Others' },
    { id: 'fr', name: 'French', category: 'Others' },
    { id: 'ar', name: 'Arabic', category: 'Others' },
    { id: 'ru', name: 'Russian', category: 'Others' },
    { id: 'id', name: 'Indonesian', category: 'Others' },
    { id: 'vi', name: 'Vietnamese', category: 'Others' }
];

const LanguageSelector = () => {
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const suggested = languages.filter(lang => lang.category === 'Suggested');
    const others = languages.filter(lang => lang.category === 'Others');

    return (
        <Container>
            <SectionTitle>Suggested</SectionTitle>
            {suggested.map((item) => (
                <LanguageItem key={item.id} onPress={() => setSelectedLanguage(item.id)}>
                    <LanguageText>{item.name}</LanguageText>
                    <Ionicons name={selectedLanguage === item.id ? 'radio-button-on' : 'radio-button-off'} size={24} color={selectedLanguage === item.id ? '#2563EB' : '#D1D1D6'} />
                </LanguageItem>
            ))}
            <Divider />
            <SectionTitle>Others</SectionTitle>
            {others.map((item) => (
                <LanguageItem key={item.id} onPress={() => setSelectedLanguage(item.id)}>
                    <LanguageText>{item.name}</LanguageText>
                    <Ionicons name={selectedLanguage === item.id ? 'radio-button-on' : 'radio-button-off'} size={24} color={selectedLanguage === item.id ? '#2563EB' : '#D1D1D6'} />
                </LanguageItem>
            ))}
        </Container>
    );
};

export default LanguageSelector;