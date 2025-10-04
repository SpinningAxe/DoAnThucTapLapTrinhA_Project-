import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable, ScrollView, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from '@react-native-vector-icons/material-icons';

import { colors } from './GlobalStyle';
import { Filigree5_Bottom, Filigree5_Top, Filigree6_Top, Filigree6_Bottom, Filigree1, Filigree2 } from './Decorations/Filigree';
import { useDispatch, useSelector } from 'react-redux';
import { selectBook, selectChapter } from '../slices/bookSlice';

const Header = ({ showChapterPicker, setShowChapterPicker }) => {
  const navigation = useNavigation();
  const [right_isVisible, setRightIsVisible] = useState(false);

  const currentChapter = useSelector((state) => state.books.currentChapter)
  const currentChapterTitle = useSelector((state) => state.books.currentBook.chapterList[currentChapter]);

  return (
    <View>
      <View style={styles.h_container}>
        <TouchableOpacity style={styles.h_button}>
          <MaterialIcons name="arrow-back" color={colors.white} size={30}
            onPress={() => navigation.goBack()}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.h_chapterSelect}
          onPress={() => {
            setRightIsVisible(false)
            setShowChapterPicker(!showChapterPicker)
          }}
        >
          <Text style={styles.h_chapterSelectText}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            Chương {currentChapter + 1}
            {currentChapterTitle != null && ': '}
            {currentChapterTitle}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.h_button}
          onPress={() => {
            setRightIsVisible(!right_isVisible)
            setShowChapterPicker(false)
          }}
        >
          <MaterialIcons name="menu" color={colors.white} size={30} />
        </TouchableOpacity>
      </View>

      <View style={styles.sideTabContainer}>
        {
          right_isVisible &&
          <Pressable style={styles.sideTabBackground}
            onPress={() => {
              setRightIsVisible(false)
            }}
          />
        }
        {
          right_isVisible &&
          <SideTabRight setRightIsVisible={setRightIsVisible} />
        }
      </View>
    </View>
  )
}

const SideTabRight = ({ setRightIsVisible }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const currentBook = useSelector((state) => state.books.currentBook)

  return (
    <View style={styles.str_container}>
      <View style={styles.str_menuContainer}>
        <Filigree6_Top />
        <Filigree6_Bottom />

        <TouchableOpacity style={styles.str_menuButton}
          onPress={() => {
            dispatch(selectBook(currentBook))
            setRightIsVisible(false)
            navigation.navigate('BookDetailScreen')
          }}
        >
          <MaterialIcons name="info" color={colors.gold} size={20} />
          <Text style={styles.str_menuButtonText}>
            Thông Tin Sách
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.str_menuButton}>
          <MaterialIcons name="bookmark" color={colors.gold} size={20} />
          <Text style={styles.str_menuButtonText}>
            Đánh Dấu
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.str_menuButton}>
          <MaterialIcons name="settings" color={colors.gold} size={20} />
          <Text style={styles.str_menuButtonText}>
            Cài Đặt
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const PageDisplay = ({ setShowChapterPicker, showChapterPicker }) => {
  const currentChapter = useSelector((state) => state.books.currentChapter)
  const currentChapterText = useSelector((state) => state.books.currentBook.chapterContent[currentChapter])

  return (
    <View style={styles.p_container}>
      <LinearGradient
        colors={['rgba(0, 0, 0, 0.1)', 'transparent']}
        style={[styles.shadow, styles.topShadow]}
      />
      <Filigree5_Top />
      <Filigree5_Bottom />

      <View style={styles.p_textDisplay}>
        {
          showChapterPicker &&
          <ChapterPicker
            setShowChapterPicker={setShowChapterPicker}
          />
        }

        <ScrollView bounces={false} overScrollMode="never" showsVerticalScrollIndicator={false}>
          <Text style={styles.p_text}>
            {currentChapterText}
          </Text>
        </ScrollView>

      </View>
    </View>
  )
}

const ChapterPicker = ({ setShowChapterPicker }) => {
  const dispatch = useDispatch();
  const currentChapter = useSelector((state) => state.books.currentChapter);
  const chapterList = useSelector((state) => state.books.currentBook.chapterList);

  const ChapterComponent = ({ index, chapter }) => {
    return (
      <TouchableOpacity style={styles.cc_container}
        onPress={() => {
          dispatch(selectChapter({ currentChapter: index}))
          setShowChapterPicker(false)
        }}
      >
        <View style={[styles.cc_decoration, currentChapter == index && styles.cc_decoration_active]} />
        <Text style={[styles.cc_text, currentChapter == index && styles.cc_text_active]}>
          Chương {index + 1}
          {chapter != null && ": "}
          {chapter}
        </Text>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.cp_container}>
      <ScrollView
        style={{ width: '100%' }}>
        {
          chapterList.map((chapter, index) => (
            <ChapterComponent
              index={index}
              chapter={chapter}
              key={index}
            />
          ))
        }
        <Filigree2 />
      </ScrollView>
    </View>
  )
}

const PageScreen = () => {
  const [showChapterPicker, setShowChapterPicker] = useState(false);

  return (
    <View style={styles.container}>
      <Header
        showChapterPicker={showChapterPicker}
        setShowChapterPicker={setShowChapterPicker}
      />
      <PageDisplay
        showChapterPicker={showChapterPicker}
        setShowChapterPicker={setShowChapterPicker}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  //-------------------------------------------------------//

  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: colors.white,
  },

  //-------------------------------------------------------//
  // HEADER

  h_container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',

    paddingTop: 45,
    paddingBottom: 10,

    width: '100%',
    height: 'max-content',

    backgroundColor: colors.gray,
  },
  h_button: {
    marginHorizontal: 20,
  },
  h_chapterSelect: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',

    width: 220,
    height: 25,
  },
  h_chapterSelectText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 16
  },

  //-------------------------------------------------------//
  // PAGE

  p_container: {
    width: '100%',
    height: '89%',
  },
  p_textDisplay: {
    width: '100%',
    height: '100%',
    // padding: 23,
  },
  p_text: {
    color: colors.black,
    fontSize: 18,
    lineHeight: 28,
    textAlign: 'justify',

    marginVertical: 15,
    padding: 20,
    paddingBottom: 100
  },

  //-------------------------------------------------------//

  sideTabContainer: {
    zIndex: 9999,
    position: 'absolute',
    top: 85,

    width: '100%',
    height: '100%',

  },
  sideTabBackground: {
    width: '100%',
    height: 1000,

    opacity: 0.8,

    backgroundColor: colors.black
  },
  str_container: {
    zIndex: 99999,
    position: 'absolute',
    top: 0,
    right: 0,

    height: 1000,
    width: '70%',

    opacity: 1,

    backgroundColor: colors.black,
  },
  str_menuContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',

    width: '100%',
    marginTop: 10,
    paddingTop: 50,
    paddingBottom: 60,
  },
  stl_menuContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',

    width: '100%',
    marginTop: 20,
    paddingTop: 40,
    paddingBottom: 60,
  },

  str_menuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',

    width: '90%',
    marginVertical: 4,
    paddingVertical: 10,
    paddingHorizontal: 10,

    borderRadius: 4,

    borderColor: colors.lightgray,
    borderLeftWidth: 5,
    backgroundColor: colors.gray
  },
  str_menuButtonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1.5,

    marginLeft: 10,
  },

  //-------------------------------------------------------//

  cp_container: {
    zIndex: 9999,
    position: 'absolute',
    top: 0,
    alignItems: 'center',
    justifyContent: 'center',

    width: '100%',
    height: '101%',
    padding: 20,
    // paddingBottom: 65,
    marginBottom: 100,

    backgroundColor: colors.black,
    opacity: 0.99

    // borderColor: 'red',
    // borderWidth: 1
  },
  cc_container: {
    zIndex: 999,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',

    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 15,
    marginBottom: 3,

    borderRadius: 4,

    backgroundColor: colors.gray,
    // borderColor: 'red',
    // borderWidth: 1
  },
  cc_text: {
    marginLeft: 10,
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 15
  },
  cc_decoration: {
    width: 4,
    height: 15,

    backgroundColor: colors.white,

    borderRadius: 10
  },
  cc_text_active: {
    color: colors.gold,
  },
  cc_decoration_active: {
    backgroundColor: colors.gold,
  },

  //-------------------------------------------------------//

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
});

export default PageScreen;