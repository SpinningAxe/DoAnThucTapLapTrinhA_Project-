import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const localBookDatabase = require('../assets/_bookDatabase.json');
const localChapterDatabase = require('../assets/_chapterDatabase.json');

const initialState = {
    bookDatabase: localBookDatabase,
    chapterDatabase: localChapterDatabase,
    loading: false,
    error: null,

    selectedBook: null,
    chaptersOfSelectedBook: [],

    currentBook: null,
    currentChapter: 0,
    chaptersOfCurrentBook: [],

    viewBookType: null,
    viewBookList: [],

    searchType: null,
    searchKeyword: null,
    searchResultList: [],

    selectedCreationId: null,
    selectedCreation: null,
    chaptersOfSelectedCreation: [],
};

const SERVER_URL = 'http://192.168.0.103:3000';

export const fetchBookDatabase = createAsyncThunk(
    'books/fetchBookDatabase',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(`${SERVER_URL}/booksAndChapters/getBookDatabase`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchChapterDatabase = createAsyncThunk(
    'books/fetchChapterDatabase',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(`${SERVER_URL}/booksAndChapters/getChapterDatabase`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchAllData = createAsyncThunk(
    'books/fetchAllData',
    async (_, { rejectWithValue }) => {
        try {
            const [bookResponse, chapterResponse] = await Promise.all([
                fetch(`${SERVER_URL}/booksAndChapters/getBookDatabase`),
                fetch(`${SERVER_URL}/booksAndChapters/getChapterDatabase`)
            ]);

            if (!bookResponse.ok || !chapterResponse.ok) {
                throw new Error(`HTTP error! status: ${bookResponse.status}, ${chapterResponse.status}`);
            }

            const [bookData, chapterData] = await Promise.all([
                bookResponse.json(),
                chapterResponse.json()
            ]);

            return { bookData, chapterData };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const bookSlice = createSlice({
    name: "book",
    initialState,
    reducers: {
        searchForBooks: (state, action) => {
            state.searchResultList = [];

            const searchType = action.payload.searchType;
            const searchKeyword = action.payload.searchKeyword.trim();

            if (searchKeyword == null) return;

            state.searchType = searchType;
            state.searchKeyword = searchKeyword;

            switch (searchType.toLowerCase()) {
                case "tìm kiếm": {
                    const listOfKeywords = searchKeyword.split(" ");
                    console.log(listOfKeywords)
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
                case "dịch giả": {
                    state.searchResultList = state.bookDatabase.filter(book => book.translator.toLowerCase().trim() == searchKeyword.toLowerCase().trim());
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
            const bookId = bookSelected.bookId;

            state.selectedBook = bookSelected;
            state.chaptersOfSelectedBook = state.chapterDatabase.filter(
                chapter => chapter.bookId == bookId
            );
        },
        selectChapter: (state, action) => {
            const currentBook = action.payload.currentBook;
            const currentChapter = action.payload.currentChapter;

            if (currentBook != null) state.currentBook = currentBook;
            state.currentChapter = currentChapter;
            if (state.chaptersOfCurrentBook == null) {
                state.chaptersOfCurrentBook = state.chapterDatabase.filter(
                    chapter => chapter.bookId == currentBook.bookId
                );
            }
        },
        viewBookType: (state, action) => {
            const bookType = action.payload.toLowerCase().trim();

            state.viewBookType = bookType;
            state.viewBookList = state.bookDatabase.filter(
                book => book.type == bookType
            ) || null;
        },

        //--------------------------------------------------------------//

        addNewBook: (state, action) => {
            const newBook_metaData = action.payload;
            state.bookDatabase = [newBook_metaData, ...state.bookDatabase];
        },
        addNewChapter: (state, action) => {
            const newBook_chapter = action.payload;
            state.chapterDatabase = [newBook_chapter, ...state.chapterDatabase];
        },
        updateChapter: (state, action) => {
            const updated_chapter = action.payload;
            console.log("updateChapter", updated_chapter)
            state.chapterDatabase.forEach((chapter, index) => {
                if (chapter.chapterId == updated_chapter.chapterId) {
                    state.chapterDatabase[index] = updated_chapter;
                    return;
                }
            });
        },
        updateSelectedBook: (state, action) => {
            const propertyToChange = action.payload;

            // Handle case where propertyToChange is null or undefined
            if (!propertyToChange) {
                console.log("No property to change provided");
                return;
            }

            console.log("propertyToChange", propertyToChange);

            // Handle multiple properties (like for "series" case)
            if (Array.isArray(propertyToChange.name)) {
                // For cases like ["series", "bookNum"]
                propertyToChange.name.forEach((propertyName, index) => {
                    if (state.selectedCreation.hasOwnProperty(propertyName)) {
                        console.log(`Updating ${propertyName} from`, state.selectedCreation[propertyName], "to", propertyToChange.value[index]);
                        state.selectedCreation[propertyName] = propertyToChange.value[index];

                    } else {
                        console.warn(`Property ${propertyName} does not exist in selectedCreation`);
                    }
                });
                state.bookDatabase.forEach((book, index) => {
                    if (book.bookId == state.selectedCreation.bookId) {
                        state.bookDatabase[index] = state.selectedCreation;
                        return;
                    }
                });
            }
            // Handle single property
            else if (typeof propertyToChange.name === 'string') {
                if (state.selectedCreation.hasOwnProperty(propertyToChange.name)) {
                    console.log(`Updating ${propertyToChange.name} from`, state.selectedCreation[propertyToChange.name], "to", propertyToChange.value);
                    state.selectedCreation[propertyToChange.name] = propertyToChange.value;
                    state.bookDatabase.forEach((book, index) => {
                        if (book.bookId == state.selectedCreation.bookId) {
                            state.bookDatabase[index] = state.selectedCreation;
                            return;
                        }
                    });
                } else {
                    console.warn(`Property ${propertyToChange.name} does not exist in selectedCreation`);
                }
            }
            else {
                console.warn("Invalid propertyToChange format:", propertyToChange);
            }
        },

        //--------------------------------------------------------------//

        setUserCreation: (state, action) => {
            const bookId = action.payload;
            state.selectedCreationId = bookId;
            state.selectedCreation = state.bookDatabase.find(
                (book) => book.bookId == bookId
            )
            state.chaptersOfSelectedCreation = state.chapterDatabase.filter(
                (chapter) => chapter.bookId == bookId
            )
        },

        // Reset to local data in case of API errors
        resetToLocalData: (state) => {
            state.bookDatabase = localBookDatabase;
            state.chapterDatabase = localChapterDatabase;
            state.error = null;
            state.loading = false;
        }
    },
    extraReducers: (builder) => {
        builder
            // Handle fetchBookDatabase
            .addCase(fetchBookDatabase.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBookDatabase.fulfilled, (state, action) => {
                state.loading = false;
                state.bookDatabase = action.payload;
                state.error = null;
            })
            .addCase(fetchBookDatabase.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                // Keep the existing local data instead of setting to null
                console.log('Failed to fetch book database, using local data');
            })
            // Handle fetchChapterDatabase
            .addCase(fetchChapterDatabase.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchChapterDatabase.fulfilled, (state, action) => {
                state.loading = false;
                state.chapterDatabase = action.payload;
                state.error = null;
            })
            .addCase(fetchChapterDatabase.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                console.log('Failed to fetch chapter database, using local data');
            })
            // Handle fetchAllData
            .addCase(fetchAllData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllData.fulfilled, (state, action) => {
                state.loading = false;
                state.bookDatabase = action.payload.bookData;
                state.chapterDatabase = action.payload.chapterData;
                state.error = null;
            })
            .addCase(fetchAllData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                console.log('Failed to fetch all data, using local data');
            });
    },
});

export const {
    searchForBooks,
    selectBook,
    viewBookType,
    selectChapter,
    addNewBook,
    addNewChapter,
    updateChapter,
    updateSelectedBook,
    setUserCreation,
    resetToLocalData
} = bookSlice.actions;
export default bookSlice.reducer;