import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from '../slices/accountSlice';

import { colors, globalStyles } from './GlobalStyle';
import HeaderMain from './Components/HeaderMain';
import { Filigree9, Filigree5_Bottom } from './Decorations/Filigree';
import { } from './Decorations/DecoButton';
import ScreenTitle from './Components/ScreenTitle';
import BookList from './Components/BookList';
import FooterMain from './Components/FooterMain';

const createRandomList = (array, count) => {
    return [...array]
        .sort(() => Math.random() - 0.5)
        .slice(0, count);
};

const AccountScreen = () => {
    const bookDatabase = useSelector((state) => state.books.bookDatabase);
    const user = useSelector((state) => state.account.user);
    const dispatch = useDispatch();

    const listOfBooks = createRandomList(bookDatabase, 10);

    const navigation = useNavigation();

    const handleLogout = () => {
        Alert.alert(
            "Đăng xuất",
            "Bạn có chắc chắn muốn đăng xuất?",
            [
                {
                    text: "Hủy",
                    style: "cancel"
                },
                {
                    text: "Đăng xuất",
                    style: "destructive",
                    onPress: () => {
                        dispatch(logoutUser());
                        navigation.navigate('LoginScreen');
                    }
                }
            ]
        );
    };
    
    return (
        <View style={styles.container}>
            <HeaderMain />
            <ScrollView bounces={false} overScrollMode="never" style={{ width: '100%' }}>
                <ScreenTitle title={"TÀI KHOẢN"} icon={"person"} />

                <View style={{ width: '100%', height: 400, zIndex: 1 }}>
                    <Filigree9 />
                </View>

                {/* avt */}
                <View style={styles.avatarWrapper}>
                    <View style={styles.avatarContainer}>
                        <Image
                            source={{ uri: user?.avatar || 'https://www.cnet.com/a/img/resize/e58477ebf3a1bb812b68953ea2bf6c5cdc93e825/hub/2019/07/08/631653cd-fb27-476a-bb76-1e8f8b70b87e/troller-t4-trail-1.jpg?auto=webp&width=1200' }}
                            style={styles.avatar}
                        />
                    </View>
                </View>

                <View style={styles.ornateTextbox_white}>
                    <View>

                        {/* tên hiển thị dưới avt*/}
                        <Text style={styles.username}>Alt Schwift X
                            <Text style={styles.iconWrapper}>
                                <Image
                                    source={require('../assets/edit.png')}
                                    style={styles.edit}
                                />
                            </Text>
                        </Text>
                        <Text style={styles.userSubtitle}>Đoàn Thị Nguyên Sa</Text>

                    </View>
                    <Filigree5_Bottom />
                    <LinearGradient colors={[colors.black, 'transparent']}
                        style={[globalStyles.shadow, globalStyles.topShadow, { opacity: 0.3, }]}
                    />
                </View>

                {/* style listbook */}
                <View style={styles.bookListWrapper}>
                    <BookList bookType="SÁNG TÁC CỦA BẠN" listOfBooks={listOfBooks} customDestination={"LibraryListingScreen"} />
                </View>

                <View style={styles.buttonContainer}>
                    {/* <TouchableOpacity style={styles.optionButton}>
                        <Text style={styles.optionText}>+ Sửa Thông Tin Tài Khoản</Text>
                    </TouchableOpacity> */}

                    <TouchableOpacity
                        style={styles.optionButton}
                        onPress={() => navigation.navigate('AccountEdit')}
                    >
                        <Text style={styles.optionText}>+ Sửa Thông Tin Tài Khoản</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.optionButton} onPress={handleLogout}>
                        <Text style={styles.optionText}>+ Đăng Xuất</Text>
                    </TouchableOpacity>
                </View>

                {/* <BookList bookType="SÁNG TÁC CỦA BẠN" listOfBooks={listOfBooks} customDestination={"LibraryListingScreen"} /> */}
            </ScrollView>
            <FooterMain currentScreen={4} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: colors.black,
    },

    ornateTextbox_white: {
        zIndex: 999,

        width: '100%',
        height: 100,
        marginVertical: 10,

        overflow: 'hidden',

        borderColor: colors.white,
        borderTopWidth: 3,
        borderBottomWidth: 2,
        backgroundColor: colors.white,

        // canh chỉnh tên hiển thị
        alignSelf: 'center',
        alignItems: 'center',
        paddingVertical: 20,
    },


    // phần bổ sung

    avatarWrapper: {
        alignItems: 'center',
        marginTop: -400, // cách 5px so với "TÀI KHOẢN"
        marginBottom: -15, // cách 5px với phần text box trắng
    },

    avatar: {
        width: 135,        // tăng kích thước
        height: 135,       // tăng kích thước
        borderRadius: 70,  // bán kính = 1/2 để giữ hình tròn
        borderWidth: 2,
        borderColor: '#FFD700',
        backgroundColor: '#000',
        resizeMode: 'cover',
    },

    iconWrapper: {
        paddingLeft: 10,
    },

    edit: {
        width: 15,
        height: 15,
    },

    username: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },

    userSubtitle: {
        fontSize: 14,
        color: '#555',
        marginTop: 3,
    },

    bookListWrapper: {
        position: 'relative',
        zIndex: 5,
    },

    buttonContainer: {
        width: '100%',
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 60, // chừa khoảng phía footer
        position: 'relative',
        zIndex: 10, // đảm bảo hiển thị trên nền và trước footer
    },

    optionButton: {
        width: '100%',
        paddingVertical: 14,
        alignItems: 'center',
        justifyContent: 'center',

        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: colors.white,

        backgroundColor: 'transparent',
        marginVertical: 4,
    },

    optionText: {
        color: colors.white,
        fontSize: 15,
        fontWeight: '500',
    },

    // User info styles
    userInfoContainer: {
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 30,
        zIndex: 10,
    },
    userName: {
        color: colors.white,
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 5,
    },
    userEmail: {
        color: colors.lightgray,
        fontSize: 16,
        textAlign: 'center',
    },
});

export default AccountScreen;