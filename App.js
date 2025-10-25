import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import BookDetailScreen from './screens/BookDetailScreen';
import BookListingScreen from './screens/BookListingScreen';
import MainScreen from './screens/MainScreen';
import PageScreen from './screens/PageScreen';
import SearchListingScreen from './screens/SearchListingScreen';
import SearchResultScreen from './screens/SearchResultScreen';
import LibraryScreen from './screens/LibraryScreen';
import LibraryListingScreen from './screens/LibraryListingScreen';
import CreationListingScreen from './screens/CreationListingScreen';
import EditStoryScreen from './screens/EditStoryScreen';
import EditStoryScreen_Detail from './screens/EditStoryScreen_Detail';
import CreateStoryScreen_Main from './screens/CreateStoryScreen_Main';
import CreateStoryScreen_Detail from './screens/CreateStoryScreen_Detail';
import CreateStoryScreen_MoreDetail from './screens/CreateStoryScreen_MoreDetail';
import CreateStoryScreen_Page from './screens/CreateStoryScreen_Page';
import AccountScreen from './screens/AccountScreen';
import AccountEdit from './screens/AccountEdit';
import NotificationScreen from './screens/NotificationScreen';
import LoginScreen from './screens/LoginScreen';
import GenreListingScreen from './screens/GenreListingScreen';

import { Provider } from "react-redux";
import { store } from "./store";

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="MainScreen"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="MainScreen" component={MainScreen} options={{ title: 'Overview' }} />
          <Stack.Screen name="BookDetailScreen" component={BookDetailScreen} options={{ title: 'BookDetailScreen' }} />
          <Stack.Screen name="BookListingScreen" component={BookListingScreen} options={{ title: 'BookListingScreen' }} />
          <Stack.Screen name="PageScreen" component={PageScreen} options={{ title: 'PageScreen' }} />
          <Stack.Screen name="SearchListingScreen" component={SearchListingScreen} options={{ title: 'SearchListingScreen' }} />
          <Stack.Screen name="SearchResultScreen" component={SearchResultScreen} options={{ title: 'SearchResultScreen' }} />
          
          <Stack.Screen name="CreateStoryScreen_Main" component={CreateStoryScreen_Main} options={{ title: 'CreateStoryScreen_Main' }} />
          <Stack.Screen name="CreateStoryScreen_Detail" component={CreateStoryScreen_Detail} options={{ title: 'CreateStoryScreen_Detail' }} />
          <Stack.Screen name="CreateStoryScreen_MoreDetail" component={CreateStoryScreen_MoreDetail} options={{ title: 'CreateStoryScreen_MoreDetail' }} />
          <Stack.Screen name="CreateStoryScreen_Page" component={CreateStoryScreen_Page} options={{ title: 'CreateStoryScreen_Page' }} />
          
          <Stack.Screen name="CreationListingScreen" component={CreationListingScreen} options={{ title: 'CreationListingScreen' }} />
          
          <Stack.Screen name="EditStoryScreen" component={EditStoryScreen} options={{ title: 'EditStoryScreen' }} />
          <Stack.Screen name="EditStoryScreen_Detail" component={EditStoryScreen_Detail} options={{ title: 'EditStoryScreen_Detail' }} />


          <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ title: 'LoginScreen' }} />
          <Stack.Screen name="AccountScreen" component={AccountScreen} options={{ title: 'AccountScreen' }} />
          <Stack.Screen name="AccountEdit" component={AccountEdit} options={{ title: 'AccountEdit' }} />

          <Stack.Screen name="LibraryScreen" component={LibraryScreen} options={{ title: 'LibraryScreen' }} />
          <Stack.Screen name="LibraryListingScreen" component={LibraryListingScreen} options={{ title: 'LibraryListingScreen' }} />

          <Stack.Screen name="NotificationScreen" component={NotificationScreen} options={{ title: 'NotificationScreen' }} />

          <Stack.Screen name="GenreListingScreen" component={GenreListingScreen} options={{ title: 'GenreListingScreen' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
