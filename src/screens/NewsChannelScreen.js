/* eslint-disable react/react-in-jsx-scope */
import * as rssParser from 'react-native-rss-parser';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Share } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../redux/favoriteArticlesSlice';

const NewsChannel = ({ route }) => {
    const { feedUrl } = route.params;
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const favorites = useSelector(state => {
        return state.favoriteArticles?.favorites;
    });

    const handleAddFavorite = (article) => {
        if (favorites.some(fav => fav.link === article.link)) {
            dispatch(removeFavorite(article));
        } else {
            dispatch(addFavorite(article));
        }
    };

    useEffect(() => {
        fetch(feedUrl)
            .then((response) => response.text())
            .then(async (responseData) => {
                try {
                    const rss = await rssParser.parse(responseData);
                    const formattedStories = rss.items.map((item) => ({
                        title: item.title,
                        description: item.description,
                        link: item.id,
                        image: item.enclosures?.[0]?.url,
                    }));
                    setStories(formattedStories);
                    setLoading(false);
                } catch (err) {
                    setLoading(false);
                }
            });
    }, [feedUrl]);

    const navigateToWebViewScreen = (url) => {
        if (url && url.startsWith('http')) {
            navigation.navigate('NewsDiscriptions', { url });
        }
    };
    // Share functionality
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
                            <Icon name="share-alt" size={20} color="gray" />
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

            <View>
                <Text style={styles.title}>Breaking News</Text>
                <Text style={styles.title1}>News from all around the world</Text>
            </View>
            {loading ? (
                <Text>Loading...</Text>
            ) : (
                stories.length === 0 ? (
                    <Text>No stories available.</Text>
                ) : (
                    <FlatList style={styles.content}
                        data={stories}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        contentContainerStyle={{ paddingBottom: 20 }}
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
    header: {
        paddingTop: 30,
        paddingBottom: 20,
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: 'black',
        fontSize: 30,
        fontWeight: 'bold',
        paddingTop: 10,
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
    backButton: {
        position: 'absolute',
        left: 20,
        top: 30,
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.1)',
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

export default NewsChannel;
