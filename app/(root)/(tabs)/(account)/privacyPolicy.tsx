import React from 'react';
import styled from 'styled-components/native';
import { ScrollView } from 'react-native';

const Container = styled.View`
    flex: 1;
    background-color: #ffffff;
    padding: 20px;
`;

const Title = styled.Text`
    font-size: 24px;
    font-weight: bold;
    color: #1c1c1e;
    margin-bottom: 20px;
`;

const Paragraph = styled.Text`
    font-size: 16px;
    color: #3a3a3c;
    margin-bottom: 15px;
    line-height: 24px;
`;

const PrivacyPolicy = () => {
    return (
        <Container>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Title>Privacy Policy</Title>
                <Paragraph>
                    Your privacy is important to us. This privacy policy explains how we collect,
                    use, and protect your personal information.
                </Paragraph>
                <Paragraph>
                    We collect data to provide and improve our services. We do not share your
                    personal information with third parties without your consent.
                </Paragraph>
                <Paragraph>
                    By using our app, you agree to the collection and use of information in
                    accordance with this policy.
                </Paragraph>
            </ScrollView>
        </Container>
    );
};

export default PrivacyPolicy;
