

import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    View,
    Text,
    SectionList
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { colors } from '../base';
import { getData } from '../helpers/data-helpers';


const BookHistoryScreen = (props) => {
    
    const { navigation } = props;
    const [returnedBooks, setReturnedBooks] = useState([]);
    const [unreturnedBooks, setUnreturnedBooks] = useState([]);
    const [totalActive, setTotalActive] = useState(0);
    const [totalReturned, setTotalReturned] = useState(0);

    const userId = 2 // mock
    useEffect(() => {

        let config = {
            headers: {
              Accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW1iZXJJZCI6IjExMTExMSJ9.oWxKNWxPxigt5YfUeAeluwg2QV9tKfgLPRnSNqiNIak'
            }
          };

        getData(`http://rn-bootcamp2021.mocklab.io/v1/members/${userId}/books`, config).then((data) => {
            const {books, totalActive, totalReturned} = data; 
            
            const unreturned = [], returned = [];
            books.map(book => {
                if (book.returnedDate === null) {
                    unreturned.push(book);
                } else {
                    returned.push(book)
                }
            });
    
            setReturnedBooks(returned);
            setUnreturnedBooks(unreturned);
            setTotalActive(totalActive);
            setTotalReturned(totalReturned);
        })
        
    }, []); 
    
    
    return (
        <View style={styles.container}>
            <View style={styles.header} >
                <Icon name="rocket" size={30} color="#900" onPress={()=> navigation.toggleDrawer()} > Menu </Icon>
                <Text>RN BOOKS</Text>
            </View>
            <View style={styles.list}>    
                <SectionList 
                    sections={[
                        {title: 'Not Returned', data: unreturnedBooks},
                        {title: 'Returned', data: returnedBooks},
                    ]}
                    renderItem={({item}) => 
                        <View style={styles.book}>
                            <Text style={styles.item}>{item.name}</Text>
                            <Text style={styles.item}>{item.author}</Text>
                            <Text style={styles.item}>Borrow Date: {item.takenDate}</Text>
                            <Text style={styles.item}>{item.returnedDate ? 
                            `Returned date: ${item.returnedDate}` : 
                            `Return before: ${item.returnBefore}`}</Text>
                        </View>
                    }
                    renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
                    keyExtractor={(item, index) => item.isbn}
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
    book: {
        flex: 1,
        backgroundColor: colors.primary,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    item: {
        fontSize: 20
    }
  });

export default BookHistoryScreen;