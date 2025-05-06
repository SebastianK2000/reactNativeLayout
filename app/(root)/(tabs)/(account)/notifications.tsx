import React, { useState } from 'react';
import { ScrollView, Switch, View, Text, StyleSheet } from 'react-native';

const notifications = [
    { id: 'general', name: 'General Notification', category: 'Common' },
    { id: 'sound', name: 'Sound', category: 'Common' },
    { id: 'vibrate', name: 'Vibrate', category: 'Common' },
    { id: 'updates', name: 'App updates', category: 'System & services update' },
    { id: 'bill', name: 'Bill Reminder', category: 'System & services update' },
    { id: 'promotion', name: 'Promotion', category: 'System & services update' },
    { id: 'discount', name: 'Discount Available', category: 'System & services update' },
    { id: 'payment', name: 'Payment Request', category: 'System & services update' },
    { id: 'service', name: 'New Service Available', category: 'Others' },
    { id: 'tips', name: 'New Tips Available', category: 'Others' },
];

const NotificationsScreen = () => {
    const [enabled, setEnabled] = useState<{ [key: string]: boolean }>({});

    const toggleSwitch = (id: string) => {
        setEnabled((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const categories = [...new Set(notifications.map(n => n.category))];

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {categories.map((category) => (
                    <View key={category}>
                        <Text style={styles.sectionTitle}>{category}</Text>
                        {notifications.filter(n => n.category === category).map((item) => (
                            <View key={item.id} style={styles.notificationItem}>
                                <Text style={styles.notificationText}>{item.name}</Text>
                                <Switch
                                    trackColor={{ false: '#D1D1D6', true: '#2563EB' }}
                                    thumbColor={enabled[item.id] ? '#ffffff' : '#f4f3f4'}
                                    onValueChange={() => toggleSwitch(item.id)}
                                    value={!!enabled[item.id]}
                                />
                            </View>
                        ))}
                        <View style={styles.divider} />
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1c1c1e',
        marginTop: 20,
        marginBottom: 10,
        paddingLeft: 15,
    },
    divider: {
        height: 1,
        backgroundColor: '#d1d1d6',
        marginVertical: 10,
    },
    notificationItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
    notificationText: {
        fontSize: 18,
        color: '#1c1c1e',
    },
});

export default NotificationsScreen;
