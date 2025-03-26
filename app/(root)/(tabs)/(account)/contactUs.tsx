import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.SafeAreaView`
    flex: 1;
    background-color: #f9f9f9;
    padding: 20px;
`;

const Description = styled.Text`
    font-size: 16px;
    color: #666;
    text-align: center;
    margin-bottom: 40px;
    line-height: 1.5;
    margin-top: 40px;
`;

const Form = styled.View`
    width: 100%;
    background-color: #fff;
    border-radius: 16px;
    padding: 50px;
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
`;

const Input = styled.TextInput`
    padding: 16px;
    margin-bottom: 16px;
    border: 1px solid #ddd;
    border-radius: 12px;
    font-size: 16px;
    color: #333;
    background-color: #f9f9f9;
    shadow-color: rgba(0, 0, 0, 0.1);
    shadow-offset: 0 2px;
    shadow-radius: 5px;
    shadow-opacity: 0.2;
`;

const Textarea = styled.TextInput`
    padding: 16px;
    margin-bottom: 16px;
    border: 1px solid #ddd;
    border-radius: 12px;
    font-size: 16px;
    color: #333;
    background-color: #f9f9f9;
    min-height: 150px;
    text-align-vertical: top;
    multiline: true;
    shadow-color: rgba(0, 0, 0, 0.1);
    shadow-offset: 0 2px;
    shadow-radius: 5px;
    shadow-opacity: 0.2;
`;

const SubmitButton = styled.TouchableOpacity`
    padding: 16px;
    background-color: #0066ff;
    border-radius: 12px;
    justify-content: center;
    align-items: center;
    margin-top: 24px;
    elevation: 5;
`;

const SubmitButtonText = styled.Text`
    color: #fff;
    font-size: 18px;
    font-weight: 600;
`;

const Title = styled.Text`
    font-size: 17px;
    font-weight: 500;
    color: #1c1c1e;
    text-align: center;
    margin-bottom: 40px;
    margin-top: 40px;
    padding: 20px;
`;

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
        <Container>
            <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}>
                <Title>We would love to hear from you! Fill out the form below, and we'll get back to you as soon as possible.</Title>
                <Form>
                    <Input
                        value={formData.name}
                        onChangeText={(text) => handleChange('name', text)}
                        placeholder="Your Name"
                        placeholderTextColor="#aaa"
                    />
                    <Input
                        value={formData.email}
                        onChangeText={(text) => handleChange('email', text)}
                        placeholder="Your Email"
                        placeholderTextColor="#aaa"
                        keyboardType="email-address"
                    />
                    <Textarea
                        value={formData.message}
                        onChangeText={(text) => handleChange('message', text)}
                        placeholder="Your Message"
                        placeholderTextColor="#aaa"
                        multiline
                    />
                    <SubmitButton onPress={handleSubmit}>
                        <SubmitButtonText>Send Message</SubmitButtonText>
                    </SubmitButton>
                </Form>
            </ScrollView>
        </Container>
    );
};

export default ContactUs;
