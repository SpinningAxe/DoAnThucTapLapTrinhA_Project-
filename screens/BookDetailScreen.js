import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from "@react-navigation/native";

import { colors, globalStyles, bookCover } from './GlobalStyle';
import HeaderMain from './Components/HeaderMain';
import { BookList_Detail } from './Components/BookList';
import { Filigree1, Filigree2, Filigree3_Simple, Filigree5_Bottom } from './Decorations/Filigree';
import { DecoButton, DecoButton_Dark } from './Decorations/DecoButton';

import MaterialIcons from '@react-native-vector-icons/material-icons';

import { useDispatch, useSelector } from 'react-redux';
import { searchForBooks, selectChapter } from '../slices/bookSlice';

const BookDetail = ({ theBook }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const BookGenre = ({ genre }) => {
        return (
            <TouchableOpacity style={styles.bg_container}
                onPress={() => {
                    dispatch(searchForBooks({ searchType: "Thể Loại", searchKeyword: genre }))
                    navigation.navigate('SearchResultScreen')
                }}
            >
                <Text style={styles.bg_text}>{genre}</Text>
            </TouchableOpacity>
        )
    }
    return (
        <View style={styles.bd_container}>
            <View style={styles.bd_bookCover}>
                <Image source={bookCover[theBook.cover]}
                    style={styles.bd_bookCoverImg}
                    resizeMode='cover'
                />
            </View>
            <View style={styles.bd_blurBg}>
                <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.3)']}
                    style={[globalStyles.shadow, globalStyles.bottomShadow, { height: 40 }]}
                />
                <LinearGradient
                    colors={['rgba(0, 0, 0, 0.3)', 'transparent']}
                    style={[globalStyles.shadow, globalStyles.topShadow, { height: 40 }]}
                />
                <Image source={bookCover[theBook.cover]}
                    style={styles.bd_blurBgImg}
                    resizeMode='cover'
                    blurRadius={5}
                />
            </View>
            <View style={styles.bd_detailContainer}>
                <Filigree5_Bottom />
                <LinearGradient
                    colors={['rgba(0, 0, 0, 0.3)', 'transparent']}
                    style={[globalStyles.shadow, globalStyles.topShadow, { height: 40 }]}
                />
                <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.3)']}
                    style={[globalStyles.shadow, globalStyles.bottomShadow, { height: 20 }]}
                />
                <View style={styles.bd_header}>
                    <Text style={styles.bd_headerText}>
                        {theBook.title}
                    </Text>
                </View>

                <TouchableOpacity style={styles.bd_series}
                    onPress={() => {
                        dispatch(searchForBooks({ searchType: "Series", searchKeyword: theBook.series }))
                        navigation.navigate('SearchResultScreen')
                    }}
                >
                    <MaterialIcons name="collections-bookmark"
                        color={colors.black}
                        size={15}
                        style={{ marginRight: 6 }}
                    />
                    <Text style={styles.bd_seriesText}>
                        {theBook.series} {theBook.bookNum > 0 && "| Cuốn " + theBook.bookNum}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.bd_author}
                    onPress={() => {
                        dispatch(searchForBooks({ searchType: "Tác Giả", searchKeyword: theBook.author }))
                        navigation.navigate('SearchResultScreen')
                    }}
                >
                    <MaterialIcons name="create"
                        color={colors.black}
                        size={15}
                        style={{ marginRight: 6 }}
                    />
                    <Text style={styles.bd_authorText}>
                        {theBook.author}
                    </Text>
                </TouchableOpacity>

                <View style={styles.bd_genresContainer}>
                    {
                        theBook.genreList.map((genre) => (
                            <BookGenre key={genre} genre={genre} />
                        ))
                    }
                </View>
            </View>
        </View>
    )
}

const BookStat = ({ theBook }) => {
    return (
        <View style={styles.bs_container}>
            <Filigree1 customPosition={-95} />

            <LinearGradient
                colors={['rgba(0, 0, 0, 0.3)', 'transparent']}
                style={[styles.shadow, styles.topShadow, { height: 25 }]}
            />
            <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.3)']}
                style={[styles.shadow, styles.bottomShadow, { height: 25 }]}
            />

            <View style={styles.bs_info}>
                <Text style={styles.bs_number}>{theBook.totalPage}</Text>
                <Text style={styles.bs_text}>Trang</Text>
            </View>

            {
                theBook.chapterList != null &&

                <View style={styles.bs_info}>
                    <Text style={styles.bs_number}>{theBook.totalChapter}</Text>
                    <Text style={styles.bs_text}>Chương</Text>
                </View>
            }

            <View style={styles.bs_info}>
                <Text style={styles.bs_number}>{formatCompactNumber(theBook.totalView)}</Text>
                <Text style={styles.bs_text}>Lượt Xem</Text>
            </View>

            <View style={styles.bs_info}>
                <Text style={styles.bs_number}>{formatCompactNumber(theBook.totalLike)}</Text>
                <Text style={styles.bs_text}>Lượt Thích</Text>
            </View>
        </View>
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

const MoreDetails = ({ theBook, bookDatabase }) => {
    const [option, setOption] = useState(1);

    return (
        <View style={styles.md_container}>
            <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.4)']}
                style={[globalStyles.shadow, globalStyles.bottomShadow, { top: -40, height: 40 }]}
            />
            <View style={styles.md_header}>
                <Filigree3_Simple customBottomPosition={-20} />
                <TouchableOpacity style={[styles.md_button, option == 1 && styles.md_button_Active]}
                    onPress={() => setOption(1)}
                >
                    <Text style={[styles.md_buttonText, option == 1 && styles.md_buttonText_Active]}>Giới Thiệu</Text>
                </TouchableOpacity>
                {
                    theBook.chapterList.length > 0 &&
                    <TouchableOpacity style={[styles.md_button, option == 2 && styles.md_button_Active]}
                        onPress={() => setOption(2)}
                    >
                        <Text style={[styles.md_buttonText, option == 2 && styles.md_buttonText_Active]}>D.s Chương</Text>
                    </TouchableOpacity>
                }
                <TouchableOpacity style={[styles.md_button, option == 3 && styles.md_button_Active]}
                    onPress={() => setOption(3)}
                >
                    <Text style={[styles.md_buttonText, option == 3 && styles.md_buttonText_Active]}>Tương Tự</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.md_content}>
                {option == 1 && <MoreDetailsOption1 theBook={theBook} />}
                {option == 2 && <MoreDetailsOption2 theBook={theBook} />}
                {option == 3 && <MoreDetailsOption3 theBook={theBook} bookDatabase={bookDatabase} />}
            </View>
        </View>
    )
}
const MoreDetailsOption1 = ({ theBook }) => {
    return (
        <View style={styles.moreDetailsOption1}>
            <View style={styles.mdo_textBox}>
                <Text style={styles.md_contentText}>
                    {theBook.description}
                </Text>
            </View>
            <Filigree2 />
        </View>
    )
}
const MoreDetailsOption2 = ({ theBook }) => {
    const dispatch = useDispatch();

    if (theBook.chapterList == null) return (null);

    const ChapterComponent = ({ index, chapterName }) => {
        const navigation = useNavigation();
        return (
            <TouchableOpacity style={styles.cc_container}
                onPress={() => {
                    dispatch(selectChapter({ currentBook: theBook, currentChapter: index }))
                    navigation.navigate("PageScreen")
                }}
            >
                <View style={styles.cc_decor} />
                <Text style={styles.cc_text}>
                    Chương {index + 1}
                    {chapterName != null && ": "} 
                    {chapterName}</Text>
            </TouchableOpacity >
        )
    }

    return (
        <View style={styles.moreDetailsOption2}>
            <Filigree2 />
            <View style={styles.mdo_textBox}>
                {
                    theBook.chapterList.map((chapterName, index) =>
                        <ChapterComponent index={index} chapterName={chapterName} key={index + chapterName} />
                    )
                }
            </View>
        </View>
    )
}
const MoreDetailsOption3 = ({ theBook, bookDatabase }) => {
    const listOfBooksByAuthor = bookDatabase.filter(book => book.author === theBook.author);
    const listOfBooksBySeries = bookDatabase.filter(book => book.series === theBook.series);
    return (
        <View>
            <BookList_Detail searchType="Tác Giả"
                searchKeyword={theBook.author}
                listOfBooks={listOfBooksByAuthor.slice(0, 10)} />
            {
                theBook.series != "" &&
                <BookList_Detail searchType="Series"
                    searchKeyword={theBook.series}
                    listOfBooks={listOfBooksBySeries.slice(0, 10)} />
            }
            {
                theBook.genreList.slice(0, 3).map((genre) => (
                    <BookList_Detail searchType="Thể Loại"
                        searchKeyword={genre}
                        listOfBooks={
                            bookDatabase.filter(
                                book => book.genreList.includes(genre)
                            ).slice(0, 10)
                        }
                    />
                ))
            }
        </View>
    )
}

const BookDetailScreen = ({ navigation }) => {
    const theBook = useSelector((state) => state.books.selectedBook);
    const bookDatabase = useSelector((state) => state.books.bookDatabase);
    const dispatch = useDispatch();

    const route = useRoute();
    const { book } = route.params || {};
    const scrollRef = useRef(null);

    useEffect(() => {
        scrollRef.current?.scrollTo({ y: 0, animated: true });
    }, [book]);

    return (
        <View style={globalStyles.container}>
            <HeaderMain />
            <ScrollView ref={scrollRef}
                bounces={false}
                overScrollMode="never"
                style={{ width: '100%' }}
            >
                <BookDetail theBook={theBook} />

                <BookStat theBook={theBook} />

                <TouchableOpacity style={{ zIndex: 999, marginVertical: 5 }}
                    activeOpacity={1}
                    onPress={() => {
                        dispatch(selectChapter({ currentBook: theBook, currentChapter: 0 }))
                        navigation.navigate('PageScreen')
                    }}
                >
                    <DecoButton ButtonText="ĐỌC NGAY" ButtonIcon="import-contacts" />
                </TouchableOpacity>

                <TouchableOpacity style={{ zIndex: 999, marginVertical: 5 }}
                    activeOpacity={1}
                >
                    <DecoButton_Dark ButtonText="THƯ VIỆN" ButtonIcon="add" />
                </TouchableOpacity>

                <MoreDetails theBook={theBook}
                    bookDatabase={bookDatabase}
                />
                <View style={globalStyles.bottomPadding} />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    //-------------------------------------------------------//
    // BOOK DETAIL

    bd_container: {
        alignItems: 'center',
        justifyContent: 'flex-start',

        width: '100%',
        minHeight: 400,
        height: 'auto'

    },
    bd_bookCover: {
        position: 'absolute',
        zIndex: 999,
        top: 30,

        height: 250,
        width: 150,

        borderRadius: 6,
        backgroundColor: "white",
        elevation: 5
    },
    bd_bookCoverImg: {
        height: "100%",
        width: "100%",

        borderRadius: 6,
    },
    bd_blurBg: {
        zIndex: -1,
        alignItems: 'center',
        justifyContent: 'center',

        width: "100%",
        height: 240,

        backgroundColor: colors.black
    },
    bd_blurBgImg: {
        width: "120%",
        height: "120%",

        opacity: 0.5,
        marginBottom: 30,
    },
    bd_detailContainer: {
        alignItems: 'center',
        justifyContent: 'flex-start',

        width: "100%",
        height: 'auto',
        paddingTop: 45,
        paddingBottom: 10,

        borderRadius: 0,

        backgroundColor: colors.white,
        borderColor: colors.white,
        borderTopWidth: 2
    },
    bd_header: {
        alignItems: 'center',
        justifyContent: 'center',

        width: "80%",

        paddingBottom: 5,
    },
    bd_headerText: {
        textAlign: 'center',
        color: colors.gold,
        fontSize: 25,
        fontWeight: 'bold',
    },
    bd_author: {
        flexDirection: 'row',

        alignItems: 'center',
        justifyContent: 'center',

        width: "100%",
    },
    bd_authorText: {
        color: colors.black,
        fontSize: 14,
        fontWeight: 'light',
        fontStyle: 'italic',
        letterSpacing: 3
    },
    bd_series: {
        flexDirection: 'row',

        alignItems: 'center',
        justifyContent: 'center',

        width: "100%",
        marginBottom: 5
    },
    bd_seriesText: {
        color: colors.black,
        fontSize: 14,
        fontWeight: 'bold',
        fontStyle: 'italic',
        letterSpacing: 2
    },
    bd_genresContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',

        width: '100%',
        height: 'max-content',
        marginTop: 5,
        marginBottom: 10,
        padding: 10,
    },

    //-------------------------------------------------------//
    // BOOK GENRE

    bg_container: {
        zIndex: 999,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderRadius: 4,
        margin: 2,

        backgroundColor: colors.black,
    },
    bg_text: {
        color: colors.white,
        fontWeight: 'bold'
    },

    //-------------------------------------------------------//
    // BOOK STATS

    bs_container: {
        justifyContent: 'center',
        alignItems: 'space-between',
        flexDirection: 'row',

        height: 70,
        width: '100%',
        marginBottom: 25,

        borderColor: colors.gold,
        borderBottomWidth: 2,
        borderTopWidth: 3,

        backgroundColor: colors.gray
    },
    bs_info: {
        zIndex: 99,

        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

        height: '100%',
    },
    bs_number: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
    },
    bs_text: {
        color: colors.lightgray
    },

    //-------------------------------------------------------//
    // MORE DETAIL

    md_container: {
        width: '100%',
        height: "max-content",
        marginTop: 15,

        backgroundColor: colors.gray
    },
    md_header: {
        zIndex: 9999,
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',

        width: '100%',
        height: 50,
    },
    md_button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

        height: '100%',

        borderColor: colors.gray,
        borderBottomWidth: 3,
        backgroundColor: colors.gray
    },
    md_buttonText: {
        color: colors.lightgray,
        fontWeight: 'light',
        letterSpacing: 1,
        fontSize: 13
    },
    md_buttonText_Active: {
        color: colors.gold,
        fontWeight: 'bold',
        letterSpacing: 2,
        fontSize: 14
    },
    md_button_Active: {
        borderColor: colors.gold,
        borderBottomWidth: 3,
        backgroundColor: colors.gray
    },
    md_content: {
        width: '100%',
        height: "max-content",
        paddingTop: 40,

        backgroundColor: colors.black
    },
    md_contentText: {
        color: colors.white,
        lineHeight: 25,
        fontSize: 14,
        textAlign: 'left',
    },
    mdo_textBox: {
        paddingHorizontal: 20,
    },

    //-------------------------------------------------------//
    // CHAPTER COMPONENT

    cc_container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',

        width: "100%",
        padding: 15,
        paddingHorizontal: 20,
        marginBottom: 5,

        borderRadius: 4,

        backgroundColor: colors.gray,
    },
    cc_decor: {
        height: "100%",
        width: 5,
        marginRight: 10,

        borderRadius: 10,
        backgroundColor: colors.white
    },
    cc_text: {
        color: colors.white,
        fontWeight: 'bold'
    },

    //-------------------------------------------------------//
});

export default BookDetailScreen;