import React, { useState } from 'react';
import styled from 'styled-components/native';
import { ScrollView, Switch, View } from 'react-native';

const Container = styled.SafeAreaView`
    flex: 1;
    background-color: #ffffff;
`;

const SectionTitle = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: #1c1c1e;
    margin-top: 20px;
    margin-bottom: 10px;
    padding-left: 15px;
`;

const Divider = styled.View`
    height: 1px;
    background-color: #d1d1d6;
    margin-vertical: 10px;
`;

const NotificationItem = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
`;

const NotificationText = styled.Text`
    font-size: 18px;
    color: #1c1c1e;
`;

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
        <Container>
            <ScrollView showsVerticalScrollIndicator={false}>
                {categories.map((category) => (
                    <View key={category}>
                        <SectionTitle>{category}</SectionTitle>
                        {notifications.filter(n => n.category === category).map((item) => (
                            <NotificationItem key={item.id}>
                                <NotificationText>{item.name}</NotificationText>
                                <Switch
                                    trackColor={{ false: '#D1D1D6', true: '#2563EB' }}
                                    thumbColor={enabled[item.id] ? '#ffffff' : '#f4f3f4'}
                                    onValueChange={() => toggleSwitch(item.id)}
                                    value={!!enabled[item.id]}
                                />
                            </NotificationItem>
                        ))}
                        <Divider />
                    </View>
                ))}
            </ScrollView>
        </Container>
    );
};

export default NotificationsScreen;