import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Share } from 'react-native';
import * as rssParser from 'react-native-rss-parser';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../redux/favoriteArticlesSlice';

const EducationNewsScreen = () => {
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const favorites = useSelector(state => {
        return state.favoriteArticles?.favorites;
    });
    const dispatch = useDispatch();
    const navigation = useNavigation();



    // Fetch RSS feeds
    const fetchFeeds = async () => {
        setLoading(true);
        const rssFeeds = [
            'https://timesofindia.indiatimes.com/rssfeeds/913168846.cms',
        ];
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
            setRefreshing(false);
        } catch (err) {
            console.error('Error fetching RSS feeds:', err);
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchFeeds();
    }, []);

    const handleRefresh = () => {
        setRefreshing(true);
        fetchFeeds();
    };

    const handleAddFavorite = (article) => {
        if (favorites.some(fav => fav.link === article.link)) {
            dispatch(removeFavorite(article));
        } else {
            dispatch(addFavorite(article));
        }
    };

    const navigateToWebViewScreen = (url) => {
        if (url && url.startsWith('http')) {
            navigation.navigate('NewsDiscriptions', { url });
        }
    };

    const onShare = async (title, url) => {
        try {
            const result = await Share.share({
                message: `${title}\n\nRead more at: ${url}`,
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                } else {
                }
            } else if (result.action === Share.dismissedAction) {
            }
        } catch (error) {
            alert(error.message);
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
                        <TouchableOpacity
                            style={styles.shareButton}
                            onPress={() => onShare(item.title, item.link)}
                        >
                            <Icon name="share-alt" size={25} color="gray" />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.favoriteButton}
                            onPress={() => handleAddFavorite(item)}
                        >
                            <Icon
                                name={isFavorite ? "heart" : "heart-o"}
                                size={25}
                                color={isFavorite ? "lightblue" : "black"}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            {loading ? (
                <Text>Loading...</Text>
            ) : (
                stories.length === 0 ? (
                    <Text>No stories available.</Text>
                ) : (
                    <FlatList
                        style={styles.content}
                        data={stories}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        contentContainerStyle={{ paddingBottom: 20 }}
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                    />
                )
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
    content: {
        flex: 1,
        padding: 10,
        paddingRight: 100,
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

export default EducationNewsScreen;
