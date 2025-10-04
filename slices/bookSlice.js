import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    bookDatabase: require('../assets/_bookDatabase.json'),

    selectedBook: null,

    currentBook: null,
    currentChapter: 0,

    viewBookType: null,
    viewBookList: [],

    searchType: null,
    searchKeyword: null,
    searchResultList: [],
};

const bookSlice = createSlice({
    name: "book",
    initialState,
    reducers: {
        searchForBooks: (state, action) => {
            state.searchResultList = [];

            const searchType = action.payload.searchType;
            const searchKeyword = action.payload.searchKeyword.trim();

            state.searchType = searchType;
            state.searchKeyword = searchKeyword;

            switch (searchType.toLowerCase()) {
                case "tìm kiếm": {
                    const listOfKeywords = searchKeyword.split(" ");
                    state.searchResultList = [...state.searchResultList,
                    ...(state.bookDatabase.filter(book => listOfKeywords.every(keyword => book.title.toLowerCase().includes(keyword.toLowerCase()))))]
                    state.searchResultList = [...state.searchResultList,
                    ...(state.bookDatabase.filter(book => listOfKeywords.every(keyword => book.series.toLowerCase().includes(keyword.toLowerCase()))))]
                    state.searchResultList = [...state.searchResultList,
                    ...(state.bookDatabase.filter(book => listOfKeywords.every(keyword => book.author.toLowerCase().includes(keyword.toLowerCase()))))]

                    state.searchResultList = [...state.searchResultList, ...(state.bookDatabase.filter(book => book.genreList.includes(searchKeyword))) || null];


                } break;
                case "tác giả": {
                    state.searchResultList = state.bookDatabase.filter(book => book.author.toLowerCase().trim() == searchKeyword.toLowerCase().trim());
                } break;
                case "thể loại": {
                    state.searchResultList = state.bookDatabase.filter(book => book.genreList.includes(searchKeyword));
                } break;
                case "series": {
                    state.searchResultList = [...state.searchResultList, ...(state.bookDatabase.filter(book => book.series.toLowerCase().trim() == searchKeyword.toLowerCase().trim())) || null];
                } break;
                default:
                    console.log("unknown searchType");
            }
            state.searchResultList = [...new Set(state.searchResultList)];
        },
        selectBook: (state, action) => {
            const bookSelected = action.payload;

            state.selectedBook = bookSelected;
        },
        selectChapter: (state, action) => {
            const currentBook = action.payload.currentBook;
            const currentChapter = action.payload.currentChapter;

            if (currentBook != null) state.currentBook = currentBook;
            state.currentChapter = currentChapter;
        },
        viewBookType: (state, action) => {
            const viewBookType = action.payload.toLowerCase();

            state.viewBookType = viewBookType;
            state.viewBookList = state.bookDatabase.filter(book => book.type == viewBookType) || null;
        },
    },
});

export const { searchForBooks, selectBook, viewBookType, selectChapter, setCurrentBook } = bookSlice.actions;
export default bookSlice.reducer;