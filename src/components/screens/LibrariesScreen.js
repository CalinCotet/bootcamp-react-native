

import React, {useEffect, useState, useContext} from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { colors } from '../base';
import { getLibraries } from '../helpers/data-helpers';
import AuthContext from '../context/context';
import HeaderComponent from '../HeaderComponent';
import MapComponent from '../MapComponent';

const LibrariesScreen = (props) => {
    
    const { navigation } = props;
    const [libraries, setLibraries] = useState([]);
    const [librariesTotal, setLibrariesTotal] = useState(0);

    const {token} = useContext(AuthContext);

    const lat = null;
    const lon = null;

    useEffect(() => {
        getLibraries(lat, lon, token).then((data) => {
            const {libraries, total} = data;
            setLibraries(libraries);
            setLibrariesTotal(total);
        });
    }, []); 
    
    
    return (
        <View style={styles.container}>
            <HeaderComponent navigation={navigation}/>
            <View style={styles.content}>
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
                <MapComponent/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems:'center',    
        backgroundColor: 'white',
        flex:1,
        fontSize: 69,
        justifyContent:'center',
    },
    content: {
        alignItems:'center',    
        flex:5,
        justifyContent:'center',
        
    },
    sectionHeader: {
        fontSize: 32,
    },
    list: {
        flex:2
    },
    library: {
        backgroundColor: colors.secondary,
        marginHorizontal: 16,
        marginVertical: 8,

    },
    item: {
        fontSize: 20
    },
  });

export default LibrariesScreen;