/* eslint-disable react/react-in-jsx-scope */
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Menu, MenuOption, MenuOptions, MenuProvider, MenuTrigger } from 'react-native-popup-menu';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { addToFavorite } from '../redux/favoriteChannelSlice';
const NewsChannelList = () => {
    const navigation1 = useNavigation();
    const dispatch = useDispatch();

    const feeds = [
        { name: 'Times of India', url: 'https://timesofindia.indiatimes.com/rssfeedstopstories.cms' },
        { name: 'India News', url: 'https://www.dnaindia.com/feeds/india.xml' },
        { name: 'The Telegraph', url: 'https://www.telegraph.co.uk/rss' },
        { name: 'BBC News', url: 'http://feeds.bbci.co.uk/news/rss.xml' },
        { name: 'NDTV', url: 'https://feeds.feedburner.com/ndtvnews-top-stories' },
        { name: 'Hindustan Times', url: 'https://www.hindustantimes.com/rss/india/rssfeed.xml' },
        { name: 'The Hindu', url: 'https://www.thehindu.com/news/national/feeder/default.rss' },
        { name: 'Al Jazeera', url: 'https://www.aljazeera.com/xml/rss/all.xml' },
        { name: 'CNN', url: 'http://rss.cnn.com/rss/cnn_topstories.rss' },
        { name: 'The Times', url: 'https://www.thetimes.co.uk/rss' },
        { name: 'Reuters', url: 'http://feeds.reuters.com/reuters/topNews' },
        { name: 'The Guardian', url: 'https://www.theguardian.com/world/rss' },
        { name: 'Fox News', url: 'http://feeds.foxnews.com/foxnews/latest' },
        { name: 'Economic Times', url: 'https://economictimes.indiatimes.com/rssfeedstopstories.cms' },
        { name: 'India Today', url: 'https://www.indiatoday.in/rss/1202838' },
    ];

    const handleNavigation = (feedUrl) => {
        navigation1.navigate('News', { feedUrl });
    };

    const handleAddToFavorites = (feed) => {
        dispatch(addToFavorite(feed));
    };

    return (
        <MenuProvider>
            <View style={styles.container}>
                <Text style={styles.title}>Choose Your Favorite News Channel</Text>
                <Text style={styles.title1}>News from all around the world</Text>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    {feeds.map((feed, index) => (
                        <View key={index} style={styles.card}>
                            <View style={styles.cardContent}>
                                <TouchableOpacity onPress={() => handleNavigation(feed.url)} >
                                    <Text style={styles.cardText}>{feed.name}</Text>
                                </TouchableOpacity>
                                <Menu>
                                    <MenuTrigger>
                                        <Text style={styles.menuTrigger}> ⋮ </Text>
                                    </MenuTrigger>
                                    <MenuOptions>
                                        <MenuOption
                                            style={styles.menuOption}
                                            onSelect={() => handleAddToFavorites(feed)} // Call the function when option is selected
                                        >
                                            <Text style={styles.menuOptionText}>Add to Favorites</Text>
                                        </MenuOption>
                                    </MenuOptions>
                                </Menu>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </View>
        </MenuProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f4f4f4',
    },
    title: {
        color: 'black',
        fontSize: 30,
        fontWeight: 'bold',
        paddingTop: 20,
        paddingHorizontal: 5,
    },
    scrollContainer: {
        paddingBottom: 20,
        paddingTop: 8,
    },
    card: {
        padding: 15,
        marginBottom: 15,
        backgroundColor: '#eeeeee',
    },
    cardContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    cardText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    title1: {
        color: 'gray',
        fontSize: 13,
        fontWeight: 'bold',
        paddingTop: 5,
        paddingHorizontal: 5,
    },
    menuTrigger: {
        fontSize: 24,
        color: '#333',
        marginLeft: -20,
    },
    menuOption: {
        padding: 10,
    },
    menuOptionText: {
        fontSize: 16,
        color: '#333',
    },
});

export default NewsChannelList;
