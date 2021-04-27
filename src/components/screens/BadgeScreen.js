

import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { colors } from '../base';
import { getData } from '../helpers/data-helpers';


const BadgeScreen = (props) => {

    const [user, setUser] = useState(null);

    const { navigation } = props;
    let config = {
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW1iZXJJZCI6IjExMTExMSJ9.oWxKNWxPxigt5YfUeAeluwg2QV9tKfgLPRnSNqiNIak'
        }
      };

    const getUserData = () => {
        getData(`http://rn-bootcamp2021.mocklab.io/v1/members/2`, config).then(
            (data) => {
                setUser(data);
            });
    }

    useEffect(() => {
        getUserData();
    }, []); 

    return (
    <View style={styles.container}>
        <View style={styles.header} >
            <Icon name="rocket" size={30} color="#900" onPress={()=> navigation.toggleDrawer()} > Menu </Icon>
            <Text>RN BOOKS</Text>
        </View>
        <View style={styles.content} >
            <Text style={styles.item}>QR CODE</Text>
            <Text style={styles.item}>{user.firstName} {user.lastName}</Text>
            <Text style={styles.item}>Member Id: {user.memberId}</Text>
            <Text style={styles.item}>Member since: {user.memberSince}</Text>
            <Text style={styles.item}>Date of birth: {user.dateOfBirth}</Text>
           
        </View>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex:1,
        backgroundColor: colors.background,
        alignItems: 'flex-start', justifyContent: 'center' ,
    },
    header: {
        width:'100%',
        flex: 1,
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor: 'powderblue',
    },
    content: {
        flex: 5,
        width:'100%',
        backgroundColor: 'steelblue',
        justifyContent: 'center',
        alignItems:'center'
    },
    item: {
        fontSize: 20
    }
  });

export default BadgeScreen;