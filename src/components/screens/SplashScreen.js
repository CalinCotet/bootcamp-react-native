

import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { colors } from '../base';


const SplashScreen = (props) => {

    return (
        <View style={styles.container}>
            <Text style={styles.logo}>LOADING</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo:{
        fontWeight:"bold",
        fontSize:50,
        color:"#fb5b5a",
    },
  });

export default SplashScreen;