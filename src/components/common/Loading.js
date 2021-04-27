import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { colors, padding } from '../base';

const Loading = (props) => {
    return (
        props.isLoading ? (
            <View >
                <ActivityIndicator
                    size="large"
                    color={colors.secondary}
                />
            </View>
        ) : false
    )
}

const styles = StyleSheet.create({
    container : {
        padding: padding.md,
    }
})

export default Loading;