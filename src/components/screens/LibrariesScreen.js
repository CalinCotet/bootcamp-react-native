

import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    View,
    Text,
    SectionList,
    FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { colors } from '../base';
import { getData } from '../helpers/data-helpers';


const LibrariesScreen = (props) => {
    
    const { navigation } = props;
    const [libraries, setLibraries] = useState([]);
    const [librariesTotal, setLibrariesTotal] = useState(0);

    const lat = null;
    const lon = null;
    let config = {
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW1iZXJJZCI6IjExMTExMSJ9.oWxKNWxPxigt5YfUeAeluwg2QV9tKfgLPRnSNqiNIak'
        }
      };


    const getLibraries = () => {
        getData(`http://rn-bootcamp2021.mocklab.io/v1/libraries?latitude=${lat}&longitude=${lon}`, config).then(
            (data) => {
                const {libraries, total} = data;
                setLibraries(libraries);
                setLibrariesTotal(total);
            });
    }

    useEffect(() => {
        getLibraries();
    }, []); 
    
    
    return (
        <View style={styles.container}>
            <View style={styles.header} >
                <Icon name="rocket" size={30} color="#900" onPress={()=> navigation.toggleDrawer()} > Menu </Icon>
                <Text>RN BOOKS</Text>
            </View>
            <View style={styles.list}>
                <FlatList 
                    data={libraries}
                    renderItem={({item}) => 
                        <View style={styles.library}>
                            <Text style={styles.item}>{item.name}</Text>
                            <Text style={styles.item}>{item.address1}, {item.city}</Text>
                            <Text/>
                            <Text style={styles.item}>Zip Code: {item.zipCode}</Text>
                            <Text style={styles.item}>Country: {item.country}</Text>
                        </View>
                    }
                    keyExtractor={(item, index) => index}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        width:'100%',
        flex: 1,
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor: 'powderblue',
    },
    container: {
        flex:1,
        backgroundColor: 'white',
        fontSize: 69,
        justifyContent:'center',
        alignItems:'center',    
    },
    list: {
        flex:5,
        
    },
    sectionHeader: {
        fontSize: 32,
    },
    library: {
        flex: 1,
        backgroundColor: colors.primary,
        marginVertical: 8,
        marginHorizontal: 16,

    },
    item: {
        fontSize: 20
    }
  });

export default LibrariesScreen;