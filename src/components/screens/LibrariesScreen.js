

import React, { useEffect, useState, useContext } from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { colors, fonts, padding } from '../base';
import { getLibraries } from '../helpers/data-helpers';
import AuthContext from '../context/context';
import HeaderComponent from '../HeaderComponent';
import MapComponent from '../MapComponent';
import Loading from '../common/Loading';

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
                {
                    !libraries.length ?
                    <Loading/> :
                    <>
                        <View style={styles.list}>
                            <FlatList 
                                data={libraries}
                                renderItem={({item}) => 
                                    <View style={styles.library}>
                                        <Text style={styles.title}>{item.name}</Text>
                                        <Text style={styles.item}>{item.address1}, {item.city}</Text>
                                        <Text/>
                                        <Text style={styles.item}>Zip Code: {item.zipCode}</Text>
                                        <Text style={styles.item}>Country: {item.country}</Text>
                                    </View>
                                }
                                keyExtractor={(item, index) => index}
                            />
                        </View>
                        <MapComponent libraries={libraries}/>
                    </>
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
        flex:5,
        justifyContent:'center', 
    },
    list: {
        flex:2,
    },
    library: {
        flex: 1,
        backgroundColor: colors.secondary,
        paddingHorizontal: padding.md,
        paddingVertical: padding.sm,
        marginVertical: padding.md,
        marginHorizontal: padding.md,
        borderRadius: padding.md,
        alignItems: "flex-start",
        justifyContent: 'center'
    },
    item: {
        fontSize: fonts.md
    },
    title: {
        fontSize: fonts.lg,
    },
  });

export default LibrariesScreen;