import { StatusBar } from 'expo-status-bar';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Home from "../my-expo-app/app/(root)/(tabs)/home";
import Trips from "./app/(root)/(tabs)/trips";
import Booking from "./app/(root)/(tabs)/booking";
import Expenses from "./app/(root)/(tabs)/expenses";
import Account from "./app/(root)/(tabs)/account";

import Notifications from "./app/(root)/(tabs)/(account)/notifications";
import Language from "./app/(root)/(tabs)/(account)/language";
import ThemeSelection from "./app/(root)/(tabs)/(account)/theme";
import FAQ from "./app/(root)/(tabs)/(account)/FAQ";
import ContactUs from "./app/(root)/(tabs)/(account)/contactUs";
import PrivacyPolicy from "./app/(root)/(tabs)/(account)/privacyPolicy";

import Expense from "./app/(root)/(tabs)/(expenses)/expensesForm";
import BookingForm from "./app/(root)/(tabs)/(booking)/bookingForm";
import TripsForm from "./app/(root)/(tabs)/(trips)/tripsForm";

type RootStackParamList = {
    Home: undefined;
    Account: undefined;
    Notifications: undefined;
    Language: undefined;
    ThemeSelection: undefined;
    FAQ: undefined;
    ContactUs: undefined;
    PrivacyPolicy: undefined;
    Expense: undefined;
    BookingForm: undefined;
    TripsForm: undefined;
    Trips: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

function HomeTabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Trips"
                component={Trips}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="airplane" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Booking"
                component={Booking}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="book" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Expenses"
                component={Expenses}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="card" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Account"
                component={Account}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person" size={size} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default function App() {

    return (
        <NavigationContainer>
            <StatusBar style="auto" />
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={HomeTabs}
                    options={{
                        headerTitle: () => <Text style={{ fontSize: 24, textAlign: 'center' }}>Planner Hub</Text>,
                    }}
                />
                <Stack.Screen name="Account" component={Account} />
                <Stack.Screen name="Notifications" component={Notifications} />
                <Stack.Screen name="Language" component={Language} />
                <Stack.Screen name="ThemeSelection" component={ThemeSelection} />
                <Stack.Screen name="FAQ" component={FAQ} />
                <Stack.Screen name="ContactUs" component={ContactUs} />
                <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
                <Stack.Screen name="Expense" component={Expense} />
                <Stack.Screen name="BookingForm" component={BookingForm} />
                <Stack.Screen name="TripsForm" component={TripsForm} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
