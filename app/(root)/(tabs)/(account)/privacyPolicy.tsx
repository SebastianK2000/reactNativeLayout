import React from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';

const PrivacyPolicy = () => {
    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>Privacy Policy</Text>
                <Text style={styles.paragraph}>
                    Your privacy is important to us. This privacy policy explains how we collect,
                    use, and protect your personal information.
                </Text>
                <Text style={styles.paragraph}>
                    We collect data to provide and improve our services. We do not share your
                    personal information with third parties without your consent.
                </Text>
                <Text style={styles.paragraph}>
                    By using our app, you agree to the collection and use of information in
                    accordance with this policy.
                </Text>
            </ScrollView>
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
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1c1c1e',
        marginBottom: 20,
    },
    paragraph: {
        fontSize: 16,
        color: '#3a3a3c',
        marginBottom: 15,
        lineHeight: 24,
    },
});

export default PrivacyPolicy;
