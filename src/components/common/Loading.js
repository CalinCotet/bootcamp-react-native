import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { colors } from '../base';

const Loading = (props) => {
    return (
        (
            <View style={styles.container}>
                <ActivityIndicator
                    size="large"
                    color={colors.logo}
                />
            </View>
        )
    )
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary
    }
})

export default Loading;