import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from "react-redux";
import { selectChapter } from '../../slices/bookSlice';

import { colors, bookCover } from '../GlobalStyle';
import { Filigree2, Filigree4 } from '../Decorations/Filigree';
import { DecoButton } from '../Decorations/DecoButton';

const CurrentBook = ({ book: propBook }) => {
  const book = propBook || useSelector((state) => state.books.currentBook);
  const chaptersOfSelectedBook = useSelector((state) => state.books.chaptersOfSelectedBook);
  const currentChapter = useSelector((state) => state.books.currentChapter);
  
  const navigation = useNavigation();

  if (book == null) return (null);

  const totalChapter = chaptersOfSelectedBook?.length || 1;
  const safeCurrentChapter = currentChapter || 0;
  const currentProgress = Math.round(((safeCurrentChapter + 1) / totalChapter) * 100);

  return (
    <View style={styles.cb_container}>
      <Filigree2 />
      <Filigree4
        customLeftPosition={-12}
        customBottomPosition={10}
      />
      <LinearGradient
        colors={[colors.black, 'transparent']}
        style={[styles.shadow, styles.topShadow, { marginTop: 20, opacity: 0.2}]}
      />
      <LinearGradient
        colors={['transparent', colors.black]}
        style={[styles.shadow, styles.bottomShadow, { height: 130, opacity: 0.2 }]}
      />
      <LinearGradient
        colors={['transparent', colors.black]}
        style={[styles.shadow, styles.bottomShadow, { top: -40, height: 40, opacity: 1 }]}
      />

      <View style={[styles.bl_header, { paddingLeft: 160 }]}>
        <Text style={styles.bl_headerTitle}>
          ĐANG ĐỌC
        </Text>
      </View>
      <TouchableOpacity style={styles.cb_bookCover}
        activeOpacity={1}
        onPress={() => navigation.navigate('PageScreen')}>
        <Image
          source={bookCover[book.cover]}
          style={styles.cb_bookCoverImg}
          resizeMode="cover"
        />
      </TouchableOpacity>
      <View style={styles.cb_desContainer}>
        <Text style={styles.cb_desTitle}
          numberOfLines={4}
        >{book.title}</Text>
        <Text style={styles.cb_desAuthor}>{book.author}</Text>
        <Text style={styles.cb_desProgress}>
          Chương {safeCurrentChapter + 1} | {currentProgress}%
        </Text>
      </View>
      <TouchableOpacity style={styles.decoButton}
        activeOpacity={1}
        onPress={() => {
          // dispatch(selectChapter())
          navigation.navigate('PageScreen')
        }}
      >
        <DecoButton ButtonText="ĐỌC TIẾP" ButtonIcon="import-contacts" />
      </TouchableOpacity>
    </View >
  )
}

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
    opacity: 0.1,
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
    marginTop: 60,

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

export default CurrentBook;