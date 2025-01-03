import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BreakingNews from '../screens/BreakingNewsScreen';
import NewsChannelList from '../screens/NewsChannelListScreen';
import FavoriteArticlesScreen from '../screens/FavoriteArticlesScreen';
import FavoritesChannelScreen from '../screens/FavoritesChannelScreen';
import NewsChannel from '../screens/NewsChannelScreen';
import WebViewScreen from '../screens/WebViewScreen';
import LoginScreen from '../screens/LoginScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../redux/store';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom Tab Navigator
const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarStyle: {
                    height: 80,
                    paddingBottom: 10,
                },
                tabBarHideOnKeyboard: true,
                // eslint-disable-next-line react/no-unstable-nested-components
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    // Set different icons and colors based on focus state
                    if (route.name === 'Breaking News') {
                        iconName = focused ? 'newspaper' : 'newspaper-outline';
                    } else if (route.name === 'Channel List') {
                        iconName = focused ? 'list' : 'list-outline';
                    } else if (route.name === 'Favorite Channels') {
                        iconName = focused ? 'heart' : 'heart-outline';
                    } else if (route.name === 'Favorite Articles') {
                        iconName = focused ? 'heart' : 'heart-outline';
                    }
                    return <Icon name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'black',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="Breaking News" component={BreakingNews} />
            <Tab.Screen name="Channel List" component={NewsChannelList} />
            <Tab.Screen name="Favorite Channels" component={FavoritesChannelScreen} />
            <Tab.Screen name="Favorite Articles" component={FavoriteArticlesScreen} />

        </Tab.Navigator>
    );
};

const App = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <NavigationContainer>
                    <Stack.Navigator>
                        <Stack.Screen
                            name="Main"
                            component={TabNavigator}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="News"
                            component={NewsChannel}
                            options={{ headerShown: true, title: '' }}
                        />
                        <Stack.Screen
                            name="NewsDiscriptions"
                            component={WebViewScreen}
                            options={{ headerShown: true, title: '' }}
                        />
                        <Stack.Screen
                            name="LoginScreen"
                            component={LoginScreen}
                            options={{ headerShown: false }}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </PersistGate>
        </Provider>
    );
};

export default App;
