import React from 'react';
import { 
        StyleSheet,
        Text,
        View,
     } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { colors } from './base';

const HeaderComponent = (props) => {

    const { navigation } = props;

    return (
        <View style={styles.header} >
            <Icon name="bars" size={30} onPress={()=> navigation.toggleDrawer()}></Icon>
            <Text>RN BOOKS</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        alignItems:'center',
        backgroundColor: colors.header,
        flex: 1,
        flexDirection: 'row',
        justifyContent:'space-around',
        width:'100%',
    },
})

export default HeaderComponent;