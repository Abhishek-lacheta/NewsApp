import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const DiscoverScreen = () => {

    const navigation1 = useNavigation();

    const handleNavigationScreen = () => {

        navigation1.navigate('NewsChanelList');
    };
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button1}>
                <Icon name="chevron-back" size={30} color="black" />
            </TouchableOpacity>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button2}>
                    <Icon name="search" size={30} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button2}>
                    <Icon name="notifications" size={30} color="black" />
                </TouchableOpacity>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.text}>Discover News</Text>
                <Text style={styles.text1}>View All</Text>
            </View>

            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: 'https://random-image-pepebigotes.vercel.app/api/swag-wallpaper' }}
                    style={styles.cardImage}
                />
            </View>

            <View style={styles.textContainer1}>
                <Text style={styles.text}>Recommendation</Text>
                <Text style={styles.text2}>View All</Text>
            </View>

            <ScrollView style={styles.scrollContainer}>
                <View style={styles.content}>
                    <View style={styles.cardWrapper}>
                        <Image
                            source={{ uri: 'https://random-image-pepebigotes.vercel.app/api/skeleton-random-image' }}
                            style={styles.cardImage1}
                        />
                        <View style={styles.textContainer2}>
                            <Text style={styles.cardTitle}>City Lights</Text>
                            <Text style={styles.cardDescription}>The city lights shine bright at night.</Text>
                        </View>
                    </View>
                    <View style={styles.cardWrapper}>
                        <Image
                            source={{ uri: 'https://random-image-pepebigotes.vercel.app/api/swag-wallpaper' }}
                            style={styles.cardImage1}
                        />
                        <View style={styles.textContainer2}>
                            <Text style={styles.cardTitle}>Beautiful Beach</Text>
                            <Text style={styles.cardDescription}>A beautiful view of a beach during sunset.</Text>
                        </View>
                    </View>

                    <View style={styles.cardWrapper}>
                        <Image
                            source={{ uri: 'https://random-image-pepebigotes.vercel.app/api/random-image' }}
                            style={styles.cardImage1}
                        />
                        <View style={styles.textContainer2}>
                            <Text style={styles.cardTitle}>Mountain Adventure</Text>
                            <Text style={styles.cardDescription}>Explore the mountains and enjoy the adventure.</Text>
                        </View>
                    </View>

                    <View style={styles.cardWrapper}>
                        <Image
                            source={{ uri: 'https://random-image-pepebigotes.vercel.app/api/skeleton-random-image' }}
                            style={styles.cardImage1}
                        />
                        <View style={styles.textContainer2}>
                            <Text style={styles.cardTitle}>City Lights</Text>
                            <Text style={styles.cardDescription}>The city lights shine bright at night.</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    button1: {
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
    button2: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.1)',
    },
    buttonContainer: {
        position: 'absolute',
        right: 20,
        top: 30,
        flexDirection: 'row',
        gap: 10,
    },
    textContainer: {
        paddingTop: 100,
        flexDirection: 'row',
        position: 'absolute',
    },
    text: {
        fontSize: 25,
        fontWeight: 'bold',
        paddingHorizontal: 20,
    },
    textContainer1: {
        paddingTop: 360,
        flexDirection: 'row',
        position: 'absolute',
    },

    text2: {
        fontSize: 15,
        color: 'blue',
        paddingTop: 8,
        paddingHorizontal: 80,
    },
    text1: {
        fontSize: 15,
        color: 'blue',
        paddingTop: 8,
        paddingHorizontal: 110,
    },
    imageContainer: {
        marginTop: 150,
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    cardImage: {
        width: '100%',
        height: 200,
        borderRadius: 20,
        resizeMode: 'cover',
    },
    scrollContainer: {
        flex: 1,
        marginTop: 40,
    },
    content: {
        flex: 1,
        paddingHorizontal: 10,
    },
    cardWrapper: {
        flexDirection: 'row',
        padding: 10,
    },
    cardImage1: {
        width: 120,
        height: 120,
        borderRadius: 10,
    },
    textContainer2: {
        marginLeft: 10,
        justifyContent: 'center',
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    cardDescription: {
        fontSize: 14,
        color: 'gray',
    },
});

export default DiscoverScreen;
