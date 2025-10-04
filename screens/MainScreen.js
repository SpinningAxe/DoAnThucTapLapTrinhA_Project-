import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { LinearGradient } from 'expo-linear-gradient';

import { bookCover, colors, globalStyles } from './GlobalStyle';
import HeaderMain from './Components/HeaderMain';
import CurrentBook from './Components/CurrentBook';
import BookList from './Components/BookList';

const Quotes = [
  "A mind needs books\nas a sword needs a whetstone.",
  "Knowledge is power.",
  "A room without a book\nis like a body without a soul.",
  "A book is a dream\nthat you hold in your hand.",
  "Never trust anyone who has\nnot brought a book with them.",
  "There is only one thing that\ncould replace a book: the next book.",
  "Books are the mirrors of the soul.",
  "There is no friend as loyal as a book."
]

const createRandomList = (array, count) => {
  return [...array]
    .sort(() => Math.random() - 0.5)
    .slice(0, count);
};
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const Catalogue = ({ catalogueList }) => {
  const randomQuote = getRandomInt(0, Quotes.length - 1);
  const catalogueRow_1 = catalogueList.slice(0, 3);
  const catalogueRow_2 = catalogueList.slice(3, 7);
  const catalogueRow_3 = catalogueList.slice(7, 10);
  return (
    <View style={styles.c_container}>
      <LinearGradient
        colors={['rgba(0,0,0,0.8)', 'transparent']}
        style={[globalStyles.shadow, globalStyles.topShadow, { zIndex: 999, top: 0, height: 40 }]}
      />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.3)']}
        style={[globalStyles.shadow, globalStyles.bottomShadow]}
      />
      <Text style={styles.c_text}>{Quotes[randomQuote]}</Text>

      <View style={[styles.c_row, { top: -45 }]}>
        {
          catalogueRow_1.map((catalogue) => (
            <View style={styles.c_book} key={"row1" + catalogue.title}>
              <Image
                source={bookCover[catalogue.cover]}
                style={styles.c_bookImg}
                resizeMode="cover"
              />
            </View>
          ))
        }
      </View>
      <View style={[styles.c_row]}>
        {
          catalogueRow_2.map((catalogue) => (
            <View style={styles.c_book} key={"row2" + catalogue.title}>
              <Image
                source={bookCover[catalogue.cover]}
                style={styles.c_bookImg}
                resizeMode="cover"
              />
            </View>
          ))
        }
      </View>
      <View style={[styles.c_row, { bottom: -45 }]}>
        {
          catalogueRow_3.map((catalogue) => (
            <View style={styles.c_book} key={"row3" + catalogue.title}>
              <Image
                source={bookCover[catalogue.cover]}
                style={styles.c_bookImg}
                resizeMode="cover"
              />
            </View>
          ))
        }
      </View>

    </View>
  )
}
const MainScreen = ({ navigation }) => {
  const bookDatabase = useSelector((state) => state.books.bookDatabase);
  const currentBook = useSelector((state) => state.books.selectedBook);

  const catalogueList = createRandomList(bookDatabase, 10);
  const listOfBooks = createRandomList(bookDatabase, 10);
  const listOfComics = createRandomList(bookDatabase, 10);

  return (
    <View style={styles.container}>
      <HeaderMain />
      <ScrollView bounces={false} overScrollMode="never" style={{ width: '100%' }}>

        <Catalogue catalogueList={catalogueList} />

        <CurrentBook book={currentBook} />
        
        <BookList bookType="TRUYỆN TRANH" listOfBooks={listOfComics} />
        
        <BookList bookType="SÁCH CHỮ" listOfBooks={listOfBooks} />

        <View style={globalStyles.bottomPadding}/>
      </ScrollView>
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

  //-------------------------------------------------------//
  // CATALOGUE

  c_container: {
    justifyContent: 'center',
    alignItems: 'center',

    height: 450,
    width: "100%",

    overflow: 'hidden',
    backgroundColor: colors.black,
  },
  c_text: {
    position: "absolute",

    color: colors.white,
    textAlign: 'center',
    fontStyle: 'italic',
    fontWeight: 'light',
    letterSpacing: 3,
    lineHeight: 25
  },
  c_book: {
    width: "30%",
    height: "100%",
    marginHorizontal: 5,

    backgroundColor: colors.gray,
    opacity: 0.2,
  },
  c_bookImg: {
    width: "100%",
    height: "100%",
  },
  c_row: {
    position: "absolute",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    zIndex: -99,

    width: "100%",
    height: "40%",
    paddingVertical: 5,

    overflow: 'hidden',
    backgroundColor: colors.black,
  },

  //-------------------------------------------------------//
  // CURRENT BOOK

  cb_container: {
    justifyContent: 'flex-start',
    alignItems: 'center',

    height: 220,
    width: '100%',
    marginBottom: 60,

    backgroundColor: colors.white,
    borderBottomColor: colors.gray,
    borderBottomWidth: 2
  },
  cb_bookCover: {
    position: 'absolute',
    zIndex: 999,
    left: 10,
    top: -30,
    height: 215,
    width: 130,

    borderRadius: 6,
    backgroundColor: "white",

    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cb_bookCoverImg: {
    height: '100%',
    width: '100%',

    borderRadius: 6,
  },
  cb_desContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    zIndex: 9,

    width: '50%',
    height: '70%',
    marginLeft: '40%',
    paddingTop: 0,
  },
  cb_desTitle: {
    color: colors.black,
    fontWeight: 'bold',
    letterSpacing: 2,
    fontSize: 17,
  },
  cb_desAuthor: {
    color: colors.black,
    fontWeight: 'light',
    fontStyle: 'italic',
    letterSpacing: 2,
    fontSize: 14,
  },
  cb_desProgress: {
    marginTop: 20,
    color: colors.black,
    fontWeight: 'bold',
    letterSpacing: 1,
    fontSize: 12,
  },

  //-------------------------------------------------------//
  // BOOK LISTING

  bl_container: {
    justifyContent: 'flex-start',
    alignItems: 'center',

    // height: 320,
    width: '100%',
    marginBottom: 60,

    backgroundColor: colors.white,
    borderBottomColor: colors.gray,
    borderBottomWidth: 2
  },
  bl_header: {
    justifyContent: 'center',
    alignItems: 'flex-start',

    zIndex: 9,

    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,

    backgroundColor: colors.gray,
  },
  bl_headerTitle: {
    color: colors.gold,
    fontWeight: 'bold',
    letterSpacing: 2,
    fontSize: 17,
  },
  bl_flatList: {
    // height: '100%',
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
  // GENERAL

  shadow: {
    position: 'absolute',
  },
  topShadow: {
    height: 70,
    width: '100%',
    top: 0,
    left: 0,
  },
  bottomShadow: {
    height: 150,
    width: '100%',
    bottom: 0,
    left: 0,
  },
  line: {
    position: 'absolute',
    top: -10,
    zIndex: 99,

    height: 2,
    width: '100%',

    backgroundColor: colors.gray
  },
  decoButton: {
    position: 'absolute',
    bottom: -17,
    zIndex: 999,
  },
  bottomPadding: {
    paddingBottom: 120
  }
});

export default MainScreen;