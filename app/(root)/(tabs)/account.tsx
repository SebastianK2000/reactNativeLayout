import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MaterialIcons } from "@expo/vector-icons";

type OptionItemProps = {
    label: string;
    icon: keyof typeof MaterialIcons.glyphMap;
    screen: string;
};

const Account: React.FC = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.profileContainer}>
                <View style={styles.avatarWrapper}>
                    <Image source={{ uri: "https://via.placeholder.com/100" }} style={styles.avatar} />
                    <TouchableOpacity style={styles.editButton}>
                        <MaterialIcons name="edit" size={16} color="black" />
                    </TouchableOpacity>
                </View>
                <Text style={styles.name}>John Doe</Text>
                <Text style={styles.info}>johndoe@example.com</Text>
                <Text style={styles.info}>+1 234 567 890</Text>
            </View>

            <View style={styles.optionsContainer}>
                <OptionItem label="Edycja danych" icon="edit" screen="EditProfile" />
                <OptionItem label="Notifications" icon="notifications" screen="Notifications" />
                <OptionItem label="Language" icon="language" screen="Language" />
                <OptionItem label="Theme" icon="palette" screen="ThemeSelection" />
                <OptionItem label="FAQ" icon="help-outline" screen="Faq" />
                <OptionItem label="Contact Us" icon="email" screen="ContactUs" />
                <OptionItem label="Privacy" icon="lock" screen="PrivacyPolicy" />
                <OptionItem label="Logout" icon="exit-to-app" screen="Logout" />
            </View>
        </ScrollView>
    );
};

const OptionItem: React.FC<OptionItemProps> = ({ label, icon, screen }) => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    return (
        <TouchableOpacity onPress={() => navigation.navigate(screen)} style={styles.optionItem}>
            <MaterialIcons name={icon} size={24} color="gray" />
            <Text style={styles.optionText}>{label}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        backgroundColor: "#ffffff",
        paddingHorizontal: 20,
        paddingTop: 40,
        paddingBottom: 20,
    },
    profileContainer: {
        alignItems: "center",
        marginBottom: 20,
    },
    avatarWrapper: {
        position: "relative",
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: "#ccc",
    },
    editButton: {
        position: "absolute",
        bottom: 0,
        right: 0,
        backgroundColor: "#e0e0e0",
        padding: 6,
        borderRadius: 20,
    },
    name: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 10,
    },
    info: {
        fontSize: 14,
        color: "gray",
    },
    optionsContainer: {
        marginTop: 20,
    },
    optionItem: {
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
        borderRadius: 10,
        backgroundColor: "#f5f5f5",
        marginBottom: 10,
    },
    optionText: {
        marginLeft: 15,
        fontSize: 16,
    },
});

export default Account;
