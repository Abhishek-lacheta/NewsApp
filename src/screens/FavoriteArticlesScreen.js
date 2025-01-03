/* eslint-disable react/react-in-jsx-scope */
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, Share } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { removeFavorite } from '../redux/favoriteArticlesSlice';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const FavoriteArticlesScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const favorites = useSelector(state => {
        return state.favoriteArticles?.favorites;
    });
    const navigateToWebViewScreen = (url) => {
        if (url && url.startsWith('http')) {
            navigation.navigate('NewsDiscriptions', { url });
        }
    };
    const onShare = async (title, url) => {
        try {
            const result = await Share.share({
                message: '${title}\n\nRead more at: ${url}',
            });
            if (result.action === Share.sharedAction) {
            } else if (result.action === Share.dismissedAction) {
            }
        } catch (error) {
            alert(error.message);
        }
    };

    const handleRemoveFavorite = (item) => {
        dispatch(removeFavorite(item));
    };

    const renderItem = ({ item }) => (
        // eslint-disable-next-line react/react-in-jsx-scope
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
                        onPress={() => handleRemoveFavorite(item)}
                    >
                        <Icon name="heart" size={25} color="lightblue" />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>Favorite Articles</Text>
                <Text style={styles.title1}>News from all around the world</Text>
            </View>
            {favorites.length === 0 ? (
                <Text>No favorite articles</Text>
            ) : (
                <FlatList
                    style={styles.content}
                    data={favorites}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.link}
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

export default FavoriteArticlesScreen;
