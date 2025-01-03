import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Share } from 'react-native';
import * as rssParser from 'react-native-rss-parser';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../redux/favoriteArticlesSlice';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import EducationNews from './EducationNewsScreen';
import SportsScreen from './SportsNewsScreen';
import BusinesScreen from './BusinessNewsScreen';
import ScienceScreen from './ScienceNewsScreen';
import TestScreen from './TestScreen';
import { useNavigation } from '@react-navigation/native';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';

const Tab = createMaterialTopTabNavigator();

const BreakingNews = () => {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>Breaking News</Text>
                <Text style={styles.title1}>News from all around the world</Text>
            </View>
            <Tab.Navigator
                initialRouteName="All News"
                lazy={true}
                screenOptions={{
                    tabBarIndicatorStyle: {
                        backgroundColor: 'black',
                        height: 3,
                    },

                    tabBarLabelStyle: {
                        fontWeight: 'bold',
                        fontSize: 13,

                    },
                    tabBarItemStyle: {
                        width: 'auto',
                    },
                    tabBarScrollEnabled: true,
                    tabBarPressColor: 'lightgray',
                }}
            >
                <Tab.Screen name="All News" component={TopStories} />
                <Tab.Screen name="Education News" component={EducationNews} />
                <Tab.Screen name="Sports News" component={SportsScreen} />
                <Tab.Screen name="Business News" component={BusinesScreen} />
                <Tab.Screen name="Science News" component={ScienceScreen} />
                <Tab.Screen name="Test News" component={TestScreen} />
            </Tab.Navigator>
        </View>
    );
};


const TopStories = () => {
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);
    const favorites = useSelector(state => state.favoriteArticles?.favorites);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [user, setUser] = useState(null);

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            setUser(user);
        });

        const rssFeeds = [
            'https://timesofindia.indiatimes.com/rssfeedstopstories.cms',
            'https://www.dnaindia.com/feeds/india.xml',
            'https://feeds.feedburner.com/ScrollinArticles.rss',
            'https://timesofindia.indiatimes.com/rssfeeds/4719148.cms',
            'https://feeds.feedburner.com/ndtvnews-top-stories',
            'https://www.thehindu.com/feeder/default.rss',
        ];

        const fetchFeeds = async () => {
            try {
                const allStories = [];
                for (let url of rssFeeds) {
                    const response = await fetch(url);
                    const responseData = await response.text();
                    const rss = await rssParser.parse(responseData);
                    const formattedStories = rss.items.map((item) => ({
                        title: item.title,
                        description: item.description,
                        link: item.id,
                        image: item.enclosures?.[0]?.url,
                    }));
                    allStories.push(...formattedStories);
                }
                setStories(allStories);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching RSS feeds:', err);
                setLoading(false);
            }
        };
        fetchFeeds();
    }, []);

    const handleAddFavorite = (article) => {
        if (!user) {
            navigation.navigate('LoginScreen');
            return;
        }

        if (favorites.some(fav => fav.link === article.link)) {
            dispatch(removeFavorite(article));
        } else {
            dispatch(addFavorite(article));
        }
    };

    const onShare = async (title, url) => {
        try {
            const result = await Share.share({
                message: '${title}\n\nRead more at: ${url}',
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                }
            } else if (result.action === Share.dismissedAction) {
            }
        } catch (error) {
            alert(error.message);
        }
    };

    const navigateToWebViewScreen = (url) => {
        if (url && url.startsWith('http')) {
            navigation.navigate('NewsDiscriptions', { url });
        }
    };

    const renderItem = ({ item }) => {
        const isFavorite = favorites.some(fav => fav.link === item.link);
        return (
            <TouchableOpacity style={styles.cardWrapper} onPress={() => navigateToWebViewScreen(item.link)}>
                <Image source={{ uri: item.image }} style={styles.cardImage} />
                <View style={styles.textContainer}>
                    <Text style={styles.textTitle} numberOfLines={1}>{item.title}</Text>
                    <Text style={styles.textDescription} numberOfLines={3}>{item.description}</Text>
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity style={styles.shareButton} onPress={() => onShare(item.title, item.link)}>
                            <Icon name="share-alt" size={25} color="gray" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.favoriteButton} onPress={() => handleAddFavorite(item)}>
                            <Icon name={isFavorite ? "heart" : "heart-o"} size={25} color={isFavorite ? "lightblue" : "black"} />
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.contentContainer}>
            {loading ? <Text>Loading...</Text> : stories.length === 0 ? <Text>No stories available.</Text> : (
                <FlatList
                    data={stories}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={{ paddingBottom: 20 }}
                />
            )}
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    title: {
        color: 'black',
        fontSize: 30,
        fontWeight: 'bold',
        paddingTop: 35,
        paddingHorizontal: 20,
    },
    title1: {
        color: 'gray',
        fontSize: 12,
        fontWeight: 'bold',
        paddingTop: 8,
        paddingHorizontal: 20,
    },
    contentContainer: {
        flex: 1,
        padding: 10,
    },
    cardWrapper: {
        flexDirection: 'row',
        padding: 10,
        marginBottom: 15,
    },
    cardImage: {
        width: 120,
        height: 120,
        borderRadius: 10,
    },
    textContainer: {
        marginLeft: 10,
        marginRight: 30,
    },
    textTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    textDescription: {
        fontSize: 14,
        color: 'gray',
        paddingTop: 5,
    },
    buttonsContainer: {
        flexDirection: 'row',
        marginTop: 10,
    },
    shareButton: {
        padding: 5,
        borderRadius: 5,
        alignSelf: 'flex-start',
        marginRight: 20,
    },
    favoriteButton: {
        padding: 5,
        alignSelf: 'flex-start',
    },
});

export default BreakingNews;
