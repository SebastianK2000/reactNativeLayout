import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const Faq = () => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.card}>
                <Text style={styles.cardTitle}>What is Lorem Ipsum?</Text>
                <Text style={styles.cardContent}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                    tincidunt, purus eget scelerisque lacinia, metus urna hendrerit eros,
                    a condimentum metus urna eget dui.
                </Text>
            </View>
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Why do we use Lorem Ipsum?</Text>
                <Text style={styles.cardContent}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vel risus
                    nec augue placerat venenatis. Integer laoreet auctor justo non
                    condimentum.
                </Text>
            </View>
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Where can I get some?</Text>
                <Text style={styles.cardContent}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
                    tempus, sem eget faucibus eleifend, ante dui viverra felis, vel
                    pharetra lorem purus a ante.
                </Text>
            </View>
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Is Lorem Ipsum safe to use?</Text>
                <Text style={styles.cardContent}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                    suscipit orci ac neque tempor, sit amet sodales neque pretium. Integer
                    facilisis sem velit.
                </Text>
            </View>
            <View style={styles.card}>
                <Text style={styles.cardTitle}>How do I generate Lorem Ipsum?</Text>
                <Text style={styles.cardContent}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vel
                    quam a libero viverra scelerisque at nec risus. Vivamus imperdiet urna
                    vel turpis aliquet, sit amet convallis felis interdum.
                </Text>
            </View>
            <View style={styles.card}>
                <Text style={styles.cardTitle}>What is the history of Lorem Ipsum?</Text>
                <Text style={styles.cardContent}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at ante
                    sit amet felis accumsan tempor et ut mauris. Suspendisse potenti.
                </Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#f4f4f4',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 20,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 8,
        color: '#333',
    },
    cardContent: {
        fontSize: 16,
        color: '#666',
    },
});

export default Faq;
