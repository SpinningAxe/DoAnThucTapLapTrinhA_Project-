import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@react-native-vector-icons/material-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';

import { colors, globalStyles } from '../GlobalStyle';

const FooterMain = ({ currentScreen }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch()

    return (
        <View View style={styles.container}>
            <LinearGradient
                colors={['transparent', colors.gold]}
                style={[globalStyles.shadow, globalStyles.bottomShadow, { top: -13, height: 13, opacity: 0.1 }]}
            />
            <View style={styles.h_container}>
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={[colors.black, 'transparent']}
                    style={[globalStyles.shadow, globalStyles.leftShadow]}
                />
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={['transparent', colors.black]}
                    style={[globalStyles.shadow, globalStyles.rightShadow]}
                />
                <TouchableOpacity style={[styles.h_button, currentScreen == 0 && styles.h_button_active]}
                    onPress={() => {
                        navigation.navigate("MainScreen")
                    }}
                >
                    <MaterialIcons name="home" size={22} color={currentScreen == 0 ? colors.gold : colors.white} />
                    {/* <Text style={[styles.h_text, styles.h_text_active]}>
                        Trang Chủ
                    </Text> */}
                    {/* {
                        currentScreen == 0 &&
                        <LinearGradient
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            colors={[colors.trueBlack, 'transparent']}
                            style={[globalStyles.shadow, globalStyles.rightShadow]}
                        />
                    }
                    {
                        currentScreen == 0 &&
                        <LinearGradient
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            colors={['transparent', colors.trueBlack]}
                            style={[globalStyles.shadow, globalStyles.leftShadow]}
                        />
                    } */}

                </TouchableOpacity>

                <TouchableOpacity style={[styles.h_button, currentScreen == 1 && styles.h_button_active]}
                    onPress={() => {
                        navigation.navigate("LibraryScreen")
                    }}
                >
                    <MaterialIcons name="account-balance" size={22} color={currentScreen == 1 ? colors.gold : colors.white} />
                    {/* <Text style={styles.h_text}>
                        Thư Viện
                    </Text> */}
                    {/* {
                        currentScreen == 1 &&
                        <LinearGradient
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            colors={[colors.trueBlack, 'transparent']}
                            style={[globalStyles.shadow, globalStyles.leftShadow]}
                        />
                    }
                    {
                        currentScreen == 1 &&
                        <LinearGradient
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            colors={['transparent', colors.trueBlack]}
                            style={[globalStyles.shadow, globalStyles.rightShadow]}
                        />
                    } */}
                </TouchableOpacity>

                <TouchableOpacity style={[styles.h_button, currentScreen == 2 && styles.h_button_active]}
                    onPress={() => {
                        navigation.navigate("CreateStoryScreen_Main")
                    }}
                >
                    <MaterialIcons name="create" size={22} color={currentScreen == 2 ? colors.gold : colors.white} />
                    {/* <Text style={styles.h_text}>
                        Sáng Tác
                    </Text> */}
                    {/* {
                        currentScreen == 2 &&
                        <LinearGradient
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            colors={[colors.trueBlack, 'transparent']}
                            style={[globalStyles.shadow, globalStyles.leftShadow]}
                        />
                    }
                    {
                        currentScreen == 2 &&
                        <LinearGradient
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            colors={['transparent', colors.trueBlack]}
                            style={[globalStyles.shadow, globalStyles.rightShadow]}
                        />
                    } */}
                </TouchableOpacity>

                <TouchableOpacity style={[styles.h_button, currentScreen == 3 && styles.h_button_active]}
                    onPress={() => {
                        navigation.navigate("NotificationScreen")
                    }}
                >
                    <MaterialIcons name="notifications" size={22} color={currentScreen == 3 ? colors.gold : colors.white} />
                    {/* <Text style={styles.h_text}>
                        Thông Báo
                    </Text> */}
                    {/* {
                        currentScreen == 3 &&
                        <LinearGradient
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            colors={[colors.trueBlack, 'transparent']}
                            style={[globalStyles.shadow, globalStyles.leftShadow]}
                        />
                    }
                    {
                        currentScreen == 3 &&
                        <LinearGradient
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            colors={['transparent', colors.trueBlack]}
                            style={[globalStyles.shadow, globalStyles.rightShadow]}
                        />
                    } */}
                </TouchableOpacity>

                <TouchableOpacity style={[styles.h_button, currentScreen == 4 && styles.h_button_active]}
                    onPress={() => {
                        //navigation.navigate("LoginScreen")
                        navigation.navigate("AccountScreen")
                    }}
                >
                    <MaterialIcons name="person" size={22} color={currentScreen == 4 ? colors.gold : colors.white} />
                    {/* <Text style={styles.h_text}>
                        Tài Khoản
                    </Text> */}
                    {/* {
                        currentScreen == 4 &&
                        <LinearGradient
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            colors={[colors.trueBlack, 'transparent']}
                            style={[globalStyles.shadow, globalStyles.leftShadow]}
                        />
                    }
                        
                    {
                        currentScreen == 4 &&
                        <LinearGradient
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            colors={['transparent', colors.trueBlack]}
                            style={[globalStyles.shadow, globalStyles.rightShadow]}
                        />
                    } */}
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    //-------------------------------------------------------//

    container: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },

    //-------------------------------------------------------//

    h_container: {
        zIndex: 999999,

        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',

        width: '100%',
        height: 55,
        paddingHorizontal: 25,

        borderColor: colors.gold,
        borderTopWidth: 3,
        backgroundColor: colors.gray,
    },
    h_button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

        height: '100%',

        elevation: 5
        // paddingVertical: 15,
    },
    h_text: {
        fontSize: 9,
        color: colors.lightgray,
        fontStyle: 'italic'
    },
    h_button_active: {
        color: colors.gold,
        backgroundColor: colors.lightgray,
        // borderTopWidth: 5,
        // borderTopColor: colors.gold
    },
    h_text_active: {
        color: colors.gold,
    },
    //-------------------------------------------------------//
});

export default FooterMain;