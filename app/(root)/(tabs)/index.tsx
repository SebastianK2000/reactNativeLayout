import { Text, View } from 'react-native';
import { Link } from 'expo-router';

import "../../../global.css";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >

        <Text className="font-bold text-lg my-10 ">Welcome to ReState</Text>

      <Link href="../../sign-in.tsx">Sign In</Link>
      <Link href="/explore">Explore</Link>
      <Link href="/profile">Profile</Link>
      <Link href="../properties">Property</Link>

    </View>
  );
}