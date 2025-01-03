import { Text, View } from "react-native";
import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from "react";


const TestScreen = () => {
    const [myData, setMyData] = useState(null);

    useEffect(() => {
        getDatabase();

    }, []);

    const getDatabase = async () => {

        try {
            const data = await firestore()
                .collection('testing')
                .doc('D9pRtIEqrT3saWAcSmPi')
                .get();
            setMyData(data.data());
            console.log(data.data());

        } catch (error) {
            console.log(error);

        }
    };
    return (
        <View>
            <Text>Name:-{myData ? myData.name : 'Lading...'}</Text>
            <Text>Age:-{myData ? myData.age : 'Lading...'}</Text>
        </View>

    );

};

export default TestScreen;