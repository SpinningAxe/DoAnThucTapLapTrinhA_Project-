import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Svg, { Circle, Line } from 'react-native-svg';

import { useSelector, useDispatch } from "react-redux";
import { searchForBooks, selectBook, viewBookType } from "../../slices/bookSlice";

import { colors, globalStyles, bookCover } from '../GlobalStyle';
import { Filigree1, Filigree5_Bottom } from '../Decorations/Filigree';
import { DecoButton } from '../Decorations/DecoButton';

const BookList = ({ bookType, listOfBooks, customDestination }) => {
    if (listOfBooks == null || listOfBooks.length <= 0) return (null);
    const navDestination = customDestination == null ? "BookListingScreen" : customDestination;

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const BookItem = ({ book }) => {
        if (book == null) return (null);
        return (
            <TouchableOpacity style={styles.bi_container}
                activeOpacity={1}
                onPress={() => {
                    navigation.navigate('BookDetailScreen', { book: book.title })
                    dispatch(selectBook(book))
                }}
            >
                <View style={styles.bi_bookCover}>
                    <Image
                        source={bookCover[book.cover]}
                        style={styles.bi_bookCoverImg}
                        resizeMode="cover"
                    />
                </View>
                <Text style={styles.bi_bookTitle}
                    numberOfLines={2}
                    ellipsizeMode="tail"
                >
                    {book.title}
                </Text>
                <Text style={styles.bi_bookAuthor}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                >
                    {book.author}
                </Text>
            </TouchableOpacity>
        );
    }
    return (
        <View style={styles.bl_container}>
            <View style={styles.line} />
            <Filigree1 />
            <Filigree5_Bottom />
            <LinearGradient
                colors={['rgba(0, 0, 0, 0.3)', 'transparent']}
                style={[globalStyles.shadow, globalStyles.topShadow, { marginTop: 30, }]}
            />
            <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.2)']}
                style={[globalStyles.shadow, globalStyles.bottomShadow]}
            />
            <LinearGradient
                colors={['transparent', 'rgba(0,0,0,1)']}
                style={[globalStyles.shadow, globalStyles.bottomShadow, { top: -30, height: 30 }]}
            />
            <View style={styles.bl_header}>
                <Text style={styles.bl_headerTitle}>
                    {bookType}
                </Text>
            </View>

            <FlatList
                data={listOfBooks}
                renderItem={(bookItem) => <BookItem book={bookItem.item} />}
                keyExtractor={bookItem => bookType + bookItem.title}
                horizontal={true}
                style={styles.bl_flatList}
            />

            {listOfBooks.length > 6 &&
                <TouchableOpacity style={styles.decoButton}
                    activeOpacity={1}
                    onPress={() => {
                        dispatch(viewBookType(bookType.toLowerCase()))
                        navigation.navigate(navDestination)
                    }}
                >
                    <DecoButton ButtonText="XEM THÊM" />
                </TouchableOpacity>
            }
        </View>
    )
}
export const BookList_Alt = ({ title, listOfBooks }) => {
    if (listOfBooks == null || listOfBooks.length <= 0) return (null);
    const navigation = useNavigation();

    const dispatch = useDispatch();
    const BookItem = ({ book }) => {
        if (book == null) return (null);
        return (
            <TouchableOpacity style={styles.bi_container}
                activeOpacity={1}
                onPress={() => {
                    navigation.navigate('BookDetailScreen', { book: book.title })
                    dispatch(selectBook(book))
                }}
            >
                <View style={styles.bi_bookCover}>
                    <Image
                        source={bookCover[book.cover]}
                        style={styles.bi_bookCoverImg}
                        resizeMode="cover"
                    />
                </View>
                <Text style={styles.bi_bookTitle}
                    numberOfLines={2}
                    ellipsizeMode="tail"
                >
                    {book.title}
                </Text>
                <Text style={styles.bi_bookAuthor}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    {book.author}
                </Text>
            </TouchableOpacity>
        );
    }
    return (
        <View style={styles.bl_container_alt}>
            <Filigree1 />
            <Filigree5_Bottom />
            <LinearGradient
                colors={['rgba(0, 0, 0, 0.4)', 'transparent']}
                style={[globalStyles.shadow, globalStyles.topShadow]}
            />
            <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.2)']}
                style={[globalStyles.shadow, globalStyles.bottomShadow]}
            />
            <View style={styles.bl_header_alt}>
                <Svg width={38} height={38 * 0.184} viewBox="0 0 45 7">
                    <Circle
                        cx="30"
                        cy="3.5"
                        r="3"
                        fill={colors.black}
                        stroke={colors.black}
                    />
                    <Line
                        x1="30"
                        y1="3.5"
                        x2="0"
                        y2="3.5"
                        stroke={colors.black}
                        strokeWidth="1"
                    />
                </Svg>
                <Text style={styles.bl_headerText_alt}>
                    {title}
                </Text>
            </View>

            <FlatList
                data={listOfBooks}
                renderItem={(bookItem) => <BookItem book={bookItem.item} />}
                keyExtractor={bookItem => title + bookItem.title}
                horizontal={true}
                style={styles.bl_flatList}
            />
        </View>
    )
}
export const BookList_Detail = ({ searchType, searchKeyword, listOfBooks, customDestination }) => {
    if (listOfBooks == null || listOfBooks.length <= 1) return (null);
    const navDestination = customDestination == null ? "SearchResultScreen" : customDestination;

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const BookItem = ({ book }) => {
        if (book == null) return (null);

        return (
            <TouchableOpacity style={styles.bi_container}
                key={searchType + searchKeyword + book.title}
                activeOpacity={1}
                onPress={() => {
                    dispatch(selectBook(book))
                    navigation.navigate('BookDetailScreen', { book: book.title })
                }}
            >
                <View style={styles.bi_bookCover}>
                    <Image
                        source={bookCover[book.cover]}
                        style={styles.bi_bookCoverImg}
                        resizeMode="cover"
                    />
                </View>
                <Text style={styles.bi_bookTitle}
                    numberOfLines={2}
                    ellipsizeMode="tail"
                >
                    {book.title}
                </Text>
                <Text style={styles.bi_bookAuthor}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                >
                    {book.author}
                </Text>
            </TouchableOpacity>
        );
    }
    return (
        <View style={styles.bl_container}>
            <View style={styles.line} />
            <Filigree1 />
            <Filigree5_Bottom />
            <LinearGradient
                colors={['rgba(0, 0, 0, 0.3)', 'transparent']}
                style={[globalStyles.shadow, globalStyles.topShadow, { marginTop: 30, }]}
            />
            <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.2)']}
                style={[globalStyles.shadow, globalStyles.bottomShadow]}
            />
            <LinearGradient
                colors={['transparent', 'rgba(0,0,0,1)']}
                style={[globalStyles.shadow, globalStyles.bottomShadow, { top: -30, height: 30 }]}
            />
            <View style={styles.bl_header}>
                <Text style={styles.bl_headerTitle}>
                    {searchType}: {searchKeyword}
                </Text>
            </View>

            <FlatList
                data={listOfBooks}
                renderItem={(bookItem) => <BookItem book={bookItem.item} />}
                keyExtractor={bookItem => searchType + searchKeyword + bookItem.title}
                horizontal={true}
                style={styles.bl_flatList}
            />

            {listOfBooks.length > 6 &&
                <TouchableOpacity style={styles.decoButton}
                    activeOpacity={1}
                    onPress={() => {
                        dispatch(searchForBooks({ searchType: searchType, searchKeyword: searchKeyword }))
                        navigation.navigate(navDestination)
                    }}
                >
                    <DecoButton ButtonText="XEM THÊM" />
                </TouchableOpacity>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    //-------------------------------------------------------//

    container: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },

    //-------------------------------------------------------//
    // BOOK LISTING

    bl_container: {
        justifyContent: 'flex-start',
        alignItems: 'center',

        width: '100%',
        marginBottom: 60,

        backgroundColor: colors.white,
        borderBottomColor: colors.gray,
        borderBottomWidth: 2
    },
    bl_container_alt: {
        justifyContent: 'flex-start',
        alignItems: 'center',

        width: '100%',
        marginBottom: 15,

        backgroundColor: colors.white,
        borderColor: colors.white,
        borderTopWidth: 2
    },
    bl_header: {
        zIndex: 999,

        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',

        zIndex: 9,

        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 10,

        backgroundColor: colors.gray,
    },
    bl_header_alt: {
        zIndex: 999,

        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',

        width: '100%',
        marginTop: 15,
    },
    bl_headerTitle: {
        color: colors.gold,
        fontWeight: 'bold',
        letterSpacing: 2,
        fontSize: 17,
    },
    bl_headerText_alt: {
        color: colors.black,
        fontWeight: 'bold',
        letterSpacing: 1,
        fontSize: 20,

        paddingHorizontal: 5,
    },
    bl_flatList: {
        marginHorizontal: 6,
        marginVertical: 20,
    },

    //-------------------------------------------------------//
    // BOOK ITEM

    bi_container: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',

        height: "100%",
        width: 150,
        marginHorizontal: 8,
        paddingBottom: 10
    },
    bi_bookCover: {
        height: 250,
        width: 150,
        marginBottom: 10,

        borderRadius: 4,

        backgroundColor: 'white',

        elevation: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    bi_bookCoverImg: {
        width: "100%",
        height: '100%',
        borderRadius: 4,
    },
    bi_bookTitle: {
        fontWeight: 'bold',
        fontSize: 14
    },
    bi_bookAuthor: {
        fontWeight: 'light',
        fontSize: 12,
        fontStyle: 'italic'
    },

    //-------------------------------------------------------//

    decoButton: {
        position: 'absolute',
        bottom: -15,
        zIndex: 999,
    },
});

export default BookList;