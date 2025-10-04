import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList, Image, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Svg, { Circle, Line } from 'react-native-svg';
import MaterialIcons from '@react-native-vector-icons/material-icons';

import { colors, globalStyles, bookCover } from './GlobalStyle';
import HeaderMain from './Components/HeaderMain';
import { Filigree1, Filigree4 } from './Decorations/Filigree';
import { useDispatch, useSelector } from 'react-redux';
import ScreenTitle from './Components/ScreenTitle';
import { searchForBooks } from '../slices/bookSlice';

const GenreDisplay = ({ genreList }) => {
    const data = genreList;
    const navigation = useNavigation();

    const bookDatabase = useSelector((state) => state.books.bookDatabase);

    return (
        <View style={styles.rd_container}>
            <FlatList
                data={data}
                renderItem={
                    (genre) =>
                        <GenreItem
                            navigation={navigation}
                            genre={genre.item}
                            bookDatabase={bookDatabase}
                        />
                }
                keyExtractor={genre => genre.name}
                scrollEnabled={false}
            />
            <Filigree1 customPosition={-90} />
        </View>
    )
}

const GenreItem = ({ navigation, genre, bookDatabase }) => {
    const dispatch = useDispatch();

    const bookWithTheGenre = bookDatabase.filter(book => book.genreList.includes(genre.name));
    const bookCount = bookWithTheGenre.length;
    const authorWithTheGenre = new Set(bookWithTheGenre.map(book => book.author));
    const authorCount = authorWithTheGenre.size;
    const viewCount = bookWithTheGenre.reduce((sum, book) => sum + book.totalView, 0);

    if (bookCount <= 0) return null;

    return (
        <TouchableOpacity style={styles.gi_container}
            onPress={() => {
                dispatch(searchForBooks({ searchType: "Thể Loại", searchKeyword: genre.name }))
                navigation.navigate("SearchResultScreen")
            }}
        >
            <Filigree4
                customBottomPosition={-10}
                customLeftPosition={-130}
                customOpacity={0.1}
            />
            <LinearGradient
                colors={['rgba(0,0,0,0.3)', 'transparent']}
                style={[globalStyles.shadow, globalStyles.topShadow]}
            />
            <View style={styles.gi_header}>
                <Text style={styles.gi_genreName}>{genre.name}</Text>
                <Text style={styles.gi_genreDescription}>{genre.description}</Text>
            </View>
            <View style={styles.gi_statContainer}>
                <View style={styles.gi_stat}>
                    <Text style={styles.gi_statNum}>{formatCompactNumber(bookCount)}</Text>
                    <Text style={styles.gi_statText}>Tác Phẩm</Text>
                </View>
                <View style={styles.gi_divLine} />
                <View style={styles.gi_stat}>
                    <Text style={styles.gi_statNum}>{formatCompactNumber(authorCount)}</Text>
                    <Text style={styles.gi_statText}>Tác Giả</Text>
                </View>
                <View style={styles.gi_divLine} />
                <View style={styles.gi_stat}>
                    <Text style={styles.gi_statNum}>{formatCompactNumber(viewCount)}</Text>
                    <Text style={styles.gi_statText}>Đọc Giả</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}
const formatCompactNumber = (number) => {
    if (typeof number !== 'number' || isNaN(number)) return 'Invalid';

    if (number >= 1000000000) {
        return (number / 1000000000).toFixed(1) + 'B';
    }
    if (number >= 1000000) {
        return (number / 1000000).toFixed(1) + 'M';
    }
    if (number >= 1000) {
        return (number / 1000).toFixed(1) + 'k';
    }
    return number.toString();
};

const GenreListingScreen = ({ navigation }) => {
    const bookDatabase = useSelector((state) => state.books.bookDatabase);
    const genreList = require('../assets/_genreDatabase.json');

    return (
        <View style={styles.container}>
            <HeaderMain />
            <ScrollView bounces={false} overScrollMode="never">
                <ScreenTitle title={"THỂ LOẠI"} icon={"list"} customIconPosition={-2} />

                <GenreDisplay genreList={genreList} />

                <View style={globalStyles.bottomPadding} />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    //-------------------------------------------------------//

    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: colors.black,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',

        width: '100%',

        marginVertical: 5,
    },

    //-------------------------------------------------------//
    // RESULTS DISPLAY

    rd_container: {
        justifyContent: 'center',
        alignItems: 'center',

        width: '100%',
        paddingVertical: 10,
        marginTop: 0,
    },

    //-------------------------------------------------------//
    // BOOK ITEM

    gi_container: {
        flexDirection: 'collumn',
        justifyContent: 'center',
        alignItems: 'flex-start',
        overflow: 'hidden',

        width: 320,
        height: 135,
        marginVertical: 4,

        borderRadius: 4,

        backgroundColor: colors.gray,

        borderColor: colors.gray,
        borderTopWidth: 2
    },
    gi_header: {
        paddingLeft: 25,
        marginBottom: 15,
    },
    gi_genreName: {
        fontSize: 20,
        color: colors.gold,
        fontWeight: 'bold',
        letterSpacing: 0.5
    },
    gi_genreDescription: {
        fontSize: 12,
        color: colors.white,
        fontWeight: 'regular',
        letterSpacing: 0.5
    },
    gi_statContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        width: '100%',
        marginBottom: 5,
    },
    gi_stat: {
        justifyContent: 'center',
        alignItems: 'center',

        width: '30%',
        paddingHorizontal: 20,
    },
    gi_statNum: {
        fontSize: 18,
        color: colors.white,
        fontWeight: 'bold',
        letterSpacing: 0.5
    },
    gi_statText: {
        fontSize: 12,
        color: colors.lightgray,
    },
    gi_divLine: {
        height: 20,
        width: 1,

        opacity: 0.2,

        backgroundColor: colors.lightgray
    }

    //-------------------------------------------------------//
});

export default GenreListingScreen;