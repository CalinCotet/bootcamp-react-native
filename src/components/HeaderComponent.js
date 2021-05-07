import React from 'react';
import { 
        StyleSheet,
        View,
     } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { colors, padding } from './base';

const HeaderComponent = (props) => {

    const { navigation } = props;

    return (
        <View style={styles.header} >
            <Icon name="bars" size={30} onPress={()=> navigation.toggleDrawer()}></Icon>
            <Icon name="book" size={30}> BOOKS</Icon>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        alignItems:'center',
        backgroundColor: colors.background,
        flex: 1,
        flexDirection: 'row',
        justifyContent:'space-between',
        paddingHorizontal: padding.md
    },
})

export default HeaderComponent;