import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from "react-redux";

import { colors, globalStyles } from './GlobalStyle';
import HeaderMain from './Components/HeaderMain';
import { } from './Decorations/Filigree';
import { } from './Decorations/DecoButton';
import ScreenTitle from './Components/ScreenTitle';
import CurrentBook from './Components/CurrentBook';
import BookList from './Components/BookList';
import FooterMain from './Components/FooterMain';

const book = {
    "type": "sách chữ",
    "title": "A Game of Thrones",
    "author": "George R.R. Martin",
    "series": "A Song of Ice and Fire",
    "bookNum": 1,
    "cover": "../assets/aGameOfThrones.jpg",
    "publishDate": "1996-08-06",
    "genreList": [
        "Giả tưởng",
        "Chính trị",
        "Sử thi",
        "Kỳ ảo Tăm tối"
    ],
    "totalPage": 694,
    "totalView": 0,
    "totalLike": 0,
    "totalChapter": 73,
    "description": "Ở Westeros, các gia tộc quý tộc tranh giành Ngai Sắt sau cái chết của Quân vương. Trong khi đó, một mối đe dọa cổ xưa và ma quái thức tỉnh ở phía Bắc, và nữ hoàng bị lưu đày Daenerys Targaryen nuôi dưỡng tham vọng giành lại vương quốc.",
    "chapterList": [
        "Prologue",
        "Bran",
        "Catelyn",
        "Jon",
        "Catelyn"
    ],
    "chapterContent": [
        "Prologue",
        "Bran",
        "Catelyn",
        "Jon",
        "Catelyn"
    ]
}

const createRandomList = (array, count) => {
    return [...array]
        .sort(() => Math.random() - 0.5)
        .slice(0, count);
};

const LibraryScreen = () => {
    const bookDatabase = useSelector((state) => state.books.bookDatabase);

    const listOfBooks = createRandomList(bookDatabase, 10);

    return (
        <View style={styles.container}>
            <HeaderMain />
            <ScrollView bounces={false} overScrollMode="never" style={{ width: '100%' }}>
                <ScreenTitle title={"THƯ VIỆN"} icon={"account-balance"} />
                <View style={{ marginTop: 25 }}/>

                <CurrentBook />

                <BookList bookType="ĐỌC GẦN ĐÂY" listOfBooks={listOfBooks} customDestination={"LibraryListingScreen"} />

                <BookList bookType="YÊU THÍCH" listOfBooks={listOfBooks} customDestination={"LibraryListingScreen"} />

                <BookList bookType="TẢI XUỐNG" listOfBooks={listOfBooks} customDestination={"LibraryListingScreen"} />

                <View style={globalStyles.bottomPadding} />

            </ScrollView>
            <FooterMain currentScreen={1} />
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
});

export default LibraryScreen;