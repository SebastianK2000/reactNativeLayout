import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.SafeAreaView`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: #f2f2f7;
    padding: 20px;
`;

const Title = styled.Text`
    font-size: 24px;
    font-weight: 600;
    color: #1c1c1e;
    text-align: center;
    margin-bottom: 40px;
`;

const Description = styled.Text`
    font-size: 18px;
    color: #636366;
    text-align: center;
    max-width: 600px;
    line-height: 1.6;
    margin-bottom: 40px;
`;

const Form = styled.View`
    width: 100%;
    max-width: 500px;
    background-color: #ffffff;
    border-radius: 12px;
    padding: 30px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Input = styled.TextInput`
    padding: 15px;
    margin-bottom: 20px;
    border: 1px solid #d1d1d6;
    border-radius: 12px;
    font-size: 16px;
    color: #1c1c1e;
    background-color: #f9f9f9;
    &:focus {
        outline: none;
        border-color: #007aff;
    }
`;

const Textarea = styled.TextInput`
    padding: 15px;
    margin-bottom: 20px;
    border: 1px solid #d1d1d6;
    border-radius: 12px;
    font-size: 16px;
    color: #1c1c1e;
    background-color: #f9f9f9;
    min-height: 150px;
    text-align-vertical: top;
    multiline: true;
`;

const SubmitButton = styled.TouchableOpacity`
    padding: 16px;
    background-color: #007aff;
    border-radius: 12px;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

const SubmitButtonText = styled.Text`
    color: #fff;
    font-size: 16px;
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
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Title>Contact Us</Title>
                <Description>
                    We would love to hear from you! Please fill out the form below and we'll get back to you as soon as possible.
                </Description>
                <Form>
                    <Input
                        value={formData.name}
                        onChangeText={(text) => handleChange('name', text)}
                        placeholder="Your Name"
                    />
                    <Input
                        value={formData.email}
                        onChangeText={(text) => handleChange('email', text)}
                        placeholder="Your Email"
                    />
                    <Textarea
                        value={formData.message}
                        onChangeText={(text) => handleChange('message', text)}
                        placeholder="Your Message"
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
