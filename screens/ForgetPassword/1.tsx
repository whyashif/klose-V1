import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    TextInput,
    Alert,
    Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { utilityStyles } from '../../UtilityStyle/UtilityStyle';

import axios from 'axios';
import { urlPort } from '../../config/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../../Context/AuthContext';
import { DEVICE_WIDTH } from '../../App';
import { styles } from './ForgotPasswordStyle';

export const ForgetPassword = ({ navigation, route }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [newUser, setNewUser] = useState(false);

    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const [errorMessageOtp, setErrorMessageOtp] = useState('');
    const [errorMessagePassword, setErrorMessagePassord] = useState('');
    const [timer, setTimer] = useState(60)
    console.log(route, 'param data....................');

    const handleSubmit = async => {
        try {
            if (/\s/g.test(password) === true) {
                setErrorMessagePassord('Spaces are not allowed in Password');
            } else if (password.length <= 5) {
                setErrorMessagePassord(' Password must be atleast 6 characters');
                return;
            } else if (password.length > 26) {
                setErrorMessagePassord('Password can have only 24 characters.');

                return;
            } else if (otp === '') {
                setErrorMessageOtp('Enter a valid otp');
            } else {
                const data = {
                    enterpassword: password,
                    otp: otp,
                    email: email,
                };
                console.log(data);
                axios
                    .post(`${urlPort}/reset/password`, data)
                    .then(res => {
                        console.log(res.data, 'dataaaa');
                        if (!res.data.success) {
                            setErrorMessageOtp('Bhai otp dekh le');
                            return;
                        } else if (res.data.success) {
                            alert(
                                'password change hogaya bhai aage se yaad rakhna otp bhejne ke paise lagte hain aur hum funded nai hai',
                            );
                            navigation.navigate('PassWordScreen');
                        }
                    })
                    .catch(err => console.error(err));
            }
        } catch (error) {
            if (error.response !== undefined) {
                if (error.response.data !== undefined) {
                    alert(error.response.data.message);
                }
            }
            console.log(error);
        }
    };

    const getEmail = async () => {
        try {
            const value = await AsyncStorage.getItem('@storage_Key');
            const data_output = JSON.parse(value);

            if (data_output !== null) {
                // console.log(".......", data_output)
                setEmail(data_output.emailid);
                setNewUser(data_output.profileactive);
            }
        } catch (e) {
            // error reading value
        }
    };

    useEffect(() => {
        getEmail();

    }, []);
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    style={{ margin: 10 }}
                    source={require('./../../assets/login/Back.png')}
                />
                <Image
                    style={{ marginTop: 20 }}
                    source={require('./../../assets/login/Klose.png')}
                />
                <Image style={{ margin: 10 }} />
            </View>
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                }}>
                <View>
                    <Text style={styles.signUptext}>Reset Password</Text>
                    <Text style={styles.inputHeaderMessage}>
                        Don’t worry. We have sent an OTP on your email
                    </Text>
                    <Text style={styles.inputHeaderEmail}>{email}</Text>

                    <View style={styles.inputContainer}>
                        <Text style={styles.inputHeader}>OTP</Text>
                        <View style={styles.passwordInputContainer}>
                            <TextInput
                                style={styles.input1}
                                placeholder="********"
                                value={otp}
                                placeholderTextColor="rgba(86, 86, 87, 0.3)"
                                onChangeText={text => setOtp(text)}
                                secureTextEntry={passwordVisibility}
                            />
                            <View style={{ marginRight: DEVICE_WIDTH * 0.05 }}>
                                <Pressable>
                                    <Text style={{ color: "#809" }}>Resend</Text>
                                    <Text style={{ color: "#809" }}>&nbsp;&nbsp;in {timer}</Text>

                                </Pressable>

                            </View>
                        </View>
                        <Text style={utilityStyles.errorMessage}>
                            {errorMessagePassword}
                        </Text>
                    </View>
                    <Text />
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputHeader}>New Password</Text>
                        <View style={styles.passwordInputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="********"
                                value={password}
                                placeholderTextColor="rgba(86, 86, 87, 0.3)"
                                onChangeText={text => setPassword(text)}
                                secureTextEntry={passwordVisibility}
                            />
                            <View style={{ marginRight: DEVICE_WIDTH * 0.05 }}>
                                {passwordVisibility ? (
                                    <Pressable
                                        onPress={() => {
                                            setPasswordVisibility(!passwordVisibility);
                                        }}>
                                        <Icon name="visibility" size={20} color="#BA68C8F" />
                                    </Pressable>
                                ) : (
                                    <Pressable
                                        onPress={() => {
                                            setPasswordVisibility(!passwordVisibility);
                                        }}>
                                        <Icon name="visibility-off" size={20} color="#BA68C8" />
                                    </Pressable>
                                )}
                            </View>
                        </View>
                        <Text style={utilityStyles.errorMessage}>
                            {errorMessagePassword}
                        </Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text>Continue</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
