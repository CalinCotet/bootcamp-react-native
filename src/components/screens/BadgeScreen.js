

import React, {useEffect, useState, useContext} from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { colors } from '../base';
import {getUserData} from '../helpers/data-helpers';
import AuthContext from '../context/context';
import HeaderComponent from '../HeaderComponent';


const BadgeScreen = (props) => {

    const [user, setUser] = useState(null);

    const { navigation } = props;
    const {token} = useContext(AuthContext);

    useEffect(() => {
        getUserData(token).then((data) => {
            setUser(data);
        });
    }, []); 

    return (
    <View style={styles.container}>
        <HeaderComponent navigation={navigation} />
        {user ? <View style={styles.content} >
            <Image
                style={styles.tinyLogo}
                source={require('../../images/rn-qr-code.png')}
            />
            <Text style={styles.item}>{user.firstName} {user.lastName}</Text>
            <Text style={styles.item}>Member Id: {user.memberId}</Text>
            <Text style={styles.item}>Member since: {user.memberSince}</Text>
            <Text style={styles.item}>Date of birth: {user.dateOfBirth}</Text>
        </View> : 
        <View style={styles.content}>
            <Text style={styles.item}>LOADING</Text>
        </View>}
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-start', 
        backgroundColor: colors.background,
        flex:1,
        justifyContent: 'center',
        width: '100%',
    },
    content: {
        alignItems:'center',
        backgroundColor: colors.primary,
        flex: 5,
        justifyContent: 'center',
        width:'100%',
    },
    item: {
        fontSize: 20
    }
  });

export default BadgeScreen;