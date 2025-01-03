import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { removeToFavorite } from '../redux/favoriteChannelSlice';
import { useNavigation } from '@react-navigation/native';

const FavoriteNewsChannelsScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const favoriteChannels = useSelector((state) => {
        return state.favoriteChannel?.favorites || [];
    });

    const handleRemoveFromFavorites = (channel) => {
        dispatch(removeToFavorite(channel));
    };
    const handleNavigation = (channelUrl) => {
        navigation.navigate('News', { feedUrl: channelUrl });
    };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your Favorite News Channels</Text>
            <Text style={styles.title1}>News from all around the world</Text>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {favoriteChannels.length > 0 ? (
                    favoriteChannels.map((channel) => (
                        <View key={channel.url} style={styles.card}>
                            <View style={styles.cardContent}>
                                <TouchableOpacity onPress={() => handleNavigation(channel.url)} >
                                    <Text style={styles.cardText}>{channel.name}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleRemoveFromFavorites(channel)}>
                                    <Text style={styles.removeText}>Remove</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))
                ) : (
                    <Text style={styles.noFavorites}>No favorite channels yet.</Text>
                )}
            </ScrollView>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f4f4f4',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        paddingTop: 20,
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
        alignItems: 'center',
    },
    cardText: {
        fontSize: 18,
        fontWeight: '600',
    },
    removeText: {
        fontSize: 16,
        color: 'black',
    },
    noFavorites: {
        fontSize: 16,
        color: 'gray',
        textAlign: 'center',
    },
    title1: {
        color: 'gray',
        fontSize: 13,
        fontWeight: 'bold',
        paddingTop: 5,
        paddingHorizontal: 5,
    },
});

export default FavoriteNewsChannelsScreen;
