import { StatusBar } from 'expo-status-bar';
import { Text, Button, View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation, NavigationProp } from '@react-navigation/native';

import Explore from "../my-expo-app/app/(root)/(tabs)/explore";
import Profile from "./app/(root)/(tabs)/profile";
import SignIn from "./app/sign-in";
import Register from "./app/register";
import Properties from "./app/(root)/properties/[id]";

type RootStackParamList = {
    Home: undefined;
    SignIn: undefined;
    Explore: undefined;
    Profile: undefined;
    Properties: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

function HomeTabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Explore" component={Explore} />
            <Tab.Screen name="Profile" component={Profile} />
            <Tab.Screen name="Properties" component={Properties} />
            <Tab.Screen name="Sign in" component={SignIn} />
            <Tab.Screen name="Register" component={Register} />
        </Tab.Navigator>
    );
}

function HomeScreen() {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>(); // Określamy typ nawigacji

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 24, textAlign: 'center' }}>Welcome to ReState</Text>

            <Button
                title="Go to Sign In"
                onPress={() => navigation.navigate('SignIn')} // Teraz nawigacja działa poprawnie
            />
        </View>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <StatusBar style="auto" />
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={HomeTabs} // Przekazujemy HomeTabs jako ekran główny
                    options={{
                        headerTitle: () => <Text style={{ fontSize: 24, textAlign: 'center' }}>Planner Hub</Text>,
                    }}
                />
                <Stack.Screen name="SignIn" component={SignIn} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
