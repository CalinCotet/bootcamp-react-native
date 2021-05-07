

import React, { useEffect, useState, useContext } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { colors, fonts, padding } from '../base';
import { getUserData } from '../helpers/data-helpers';
import AuthContext from '../context/context';
import HeaderComponent from '../HeaderComponent';
import Loading from '../common/Loading';


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
        
        <View style={styles.content} >
        {user ? 
            <>
                <Image
                    style={styles.tinyLogo}
                    source={require('../../images/rn-qr-code.png')}
                />
                <Text style={styles.item}>{user.firstName} {user.lastName}</Text>
                <Text style={styles.item}>Member Id: {user.memberId}</Text>
                <Text style={styles.item}>Member since: {user.memberSince}</Text>
                <Text style={styles.item}>Date of birth: {user.dateOfBirth}</Text>
            </>
            : 
            <Loading/> 
        }
        </View>  
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.primary,
        flex:1,
    },
    content: {
        alignItems:'center',
        flex: 5,
        justifyContent: 'center',
    },
    item: {
        fontSize: fonts.md,
        marginVertical: padding.sm,
    }
  });

export default BadgeScreen;