import React, {useState} from "react";
import {SafeAreaView, SafeAreaProvider} from "react-native-safe-area-context";
import {
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    TextInput,
    StyleSheet
} from "react-native";

import icons from "../constants/icons";

const SignIn = () => {
    const [text, setText] = useState("");
    const [password, setPassword] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    return (

        <SafeAreaView style={styles.safeContainer}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.innerContainer}>
                    <Text style={styles.signInText}>Sign in</Text>

                    <Text style={styles.infoText}>
                        If you don’t have an account register {"\n"}
                        <Text style={styles.registerText} onPress={() => console.log("Navigate to Register")}>Register
                            here!</Text>
                    </Text>

                    <SafeAreaProvider>
                        <SafeAreaView style={styles.formContainer}>
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Username</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter your username"
                                    onChangeText={setText}
                                    value={text}
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Password</Text>
                                <View style={styles.passwordWrapper}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Enter your password"
                                        secureTextEntry={!isPasswordVisible}
                                        onChangeText={setPassword}
                                        value={password}
                                    />
                                    <TouchableOpacity
                                        onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                                        style={styles.eyeButton}
                                    >
                                        <Image source={isPasswordVisible ? icons.eye : icons.eye}
                                               style={styles.eyeIcon} />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <TouchableOpacity onPress={() => console.log("Forgot Password")}>
                                <Text style={styles.forgotPasswordText}>Forgot password?</Text>
                            </TouchableOpacity>
                        </SafeAreaView>
                    </SafeAreaProvider>

                    <TouchableOpacity style={styles.loginButton} onPress={() => console.log("Login Pressed")}>
                        <Text style={styles.loginButtonText}>Login</Text>
                    </TouchableOpacity>

                    <Text style={styles.socialLoginText}>
                        or continue with
                    </Text>

                    <TouchableOpacity style={styles.googleButton}>
                        <View style={styles.googleButtonContent}>
                            <Image
                                source={icons.google}
                                style={styles.googleIcon}
                                resizeMode="contain"
                            />
                            <Text style={styles.googleButtonText}>
                                Continue with Google
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.googleButton}>
                        <View style={styles.googleButtonContent}>
                            <Image
                                source={icons.apple}
                                style={styles.googleIcon}
                                resizeMode="contain"
                            />
                            <Text style={styles.googleButtonText}>
                                Continue with Apple ID
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.googleButton}>
                        <View style={styles.googleButtonContent}>
                            <Image
                                source={icons.facebook}
                                style={styles.googleIcon}
                                resizeMode="contain"
                            />
                            <Text style={styles.googleButtonText}>
                                Continue with Facebook
                            </Text>
                        </View>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: "center",
    },
    innerContainer: {
        paddingHorizontal: 40,
    },
    signInText: {
        fontSize: 24,
        textAlign: "center",
        textTransform: "uppercase",
        fontFamily: "Rubik",
        color: "#374151",
        fontWeight: "bold",
        marginBottom: 5,
    },
    infoText: {
        fontSize: 18,
        fontFamily: "Rubik-Bold",
        textAlign: "center",
        color: "#1f2937",
        marginTop: 8,
        marginBottom: 8,
    },
    registerText: {
        color: "#2563eb",
        fontWeight: "bold",
        marginTop: 10,
    },
    formContainer: {
        marginTop: 24,
        paddingHorizontal: 16,
    },
    inputContainer: {
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        color: "#374151",
        marginBottom: 6,
    },
    input: {
        width: "100%",
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#d1d5db",
        backgroundColor: "#fff",
        fontSize: 16,
    },
    socialLoginText: {
        fontSize: 18,
        fontFamily: "Rubik",
        textAlign: "center",
        color: "#374151",
        marginTop: 24,
    },
    googleButton: {
        backgroundColor: "#ffffff",
        shadowColor: "#d1d5db",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 4,
        borderRadius: 50,
        paddingVertical: 12,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 16,
    },
    googleButtonContent: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    googleIcon: {
        width: 20,
        height: 20,
    },
    googleButtonText: {
        fontSize: 18,
        fontFamily: "Rubik-Medium",
        color: "#1f2937",
        marginLeft: 8,
    },
    forgotPasswordText: {
        color: "#2563eb",
        textAlign: "right",
        marginBottom: 16,
    },
    loginButton: {
        backgroundColor: "#2563eb",
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
    },
    loginButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    passwordWrapper: {
        position: 'relative',
        width: '100%',
    },
    eyeButton: {
        position: 'absolute',
        right: 12,
        top: '50%',
        transform: [{ translateY: -10 }],
        padding: 8,
    },
    eyeIcon: {
        width: 20,
        height: 20,
        tintColor: '#6b7280',
        position: 'relative',
        bottom: 7,
    },

});

export default SignIn;
