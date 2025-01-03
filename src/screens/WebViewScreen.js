import React from 'react';
import { WebView } from 'react-native-webview';

const WebViewScreen = ({ route }) => {
    const { url } = route.params;
    return <WebView source={{ uri: url }} style={{ flex: 1 }} startInLoadingState={true} />;
};

export default WebViewScreen;
