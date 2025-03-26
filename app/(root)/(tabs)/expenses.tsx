import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface Expense {
    description: string;
    amount: number;
    date: string;
    category: string;
    paymentMethod: string;
    notes?: string;
}

type OptionItemProps = {
    label: string;
    icon: keyof typeof MaterialIcons.glyphMap;
    screen: string;
};

const Expenses: React.FC = () => {
    const [showForm, setShowForm] = useState<boolean>(false);
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const handleAddExpense = (expense: Expense) => {
        setExpenses([...expenses, expense]);
        setShowForm(false);
    };

    return (
        <View style={styles.container}>
            {expenses.length === 0 ? (
                <Text style={styles.noExpenses}>No expenses. Add a new expense!</Text>
            ) : (
                expenses.map((expense, index) => (
                    <Text key={index} style={styles.expenseItem}>
                        {expense.description} - {expense.amount} zł
                    </Text>
                ))
            )}

            <OptionItem label="Add Expense" icon="add" screen="ExpenseForm" />

            <TouchableOpacity
                style={styles.fab}
                onPress={() => navigation.navigate('ExpenseForm')}
            >
                <MaterialIcons name="add" size={24} color="white" />
            </TouchableOpacity>
        </View>
    );
};

const OptionItem: React.FC<OptionItemProps> = ({ label, icon, screen }) => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    return (
        <TouchableOpacity onPress={() => navigation.navigate(screen)} style={styles.optionItem}>
            <MaterialIcons name={icon} size={24} color="#2563eb" />
            <Text style={styles.optionLabel}>{label}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    noExpenses: {
        fontSize: 18,
        color: '#888',
        marginBottom: 20,
        textAlign: 'center',
    },
    expenseItem: {
        fontSize: 16,
        marginVertical: 10,
        color: '#333',
        textAlign: 'center',
    },
    fab: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        backgroundColor: '#2563eb',
        padding: 15,
        borderRadius: 30,
        shadowColor: 'rgba(0,0,0,0.2)',
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 6,
        shadowOpacity: 0.3,
    },
    optionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 10,
    },
    optionLabel: {
        marginLeft: 10,
        fontSize: 16,
        color: '#2563eb',
    },
});

export default Expenses;