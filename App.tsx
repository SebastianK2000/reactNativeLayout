import { ScreenContent } from 'components/ScreenContent';
import { StatusBar } from 'expo-status-bar';

import './global.css';
import {Text, View} from "react-native";
import {Link} from "expo-router";

export default function App() {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >

            <Text className="font-bold text-lg my-10 ">Welcome to ReState</Text>

            <Link href="/app/sign-in">Sign In</Link>
            <Link href="/app/(root)/(tabs)/explore">Explore</Link>
            <Link href="/app/(root)/(tabs)/profile">Profile</Link>
            <Link href="/app/(root)/properties/[id]">Property</Link>

        </View>
    );
}