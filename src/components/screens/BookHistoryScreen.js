

import React, {useEffect, useState, useContext} from 'react';
import {
    SectionList,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { colors } from '../base';
import { getBooks } from '../helpers/data-helpers';
import AuthContext from '../context/context';
import HeaderComponent from '../common/HeaderComponent';


const BookHistoryScreen = (props) => {
    
    const { navigation } = props;
    const [returnedBooks, setReturnedBooks] = useState([]);
    const [unreturnedBooks, setUnreturnedBooks] = useState([]);
    const [totalActive, setTotalActive] = useState(0);
    const [totalReturned, setTotalReturned] = useState(0);

    const {userId, token} = useContext(AuthContext);

    useEffect(() => {
        getBooks(userId, token).then((data) => {
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
            <HeaderComponent navigation={navigation}/>
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
    container: {
        alignItems:'center',    
        backgroundColor: 'white',
        flex:1,
        fontSize: 69,
        justifyContent:'center',
    },
    list: {
        flex:5,
    },
    sectionHeader: {
        fontSize: 32,
    },
    book: {
        backgroundColor: colors.secondary,
        flex: 1,
        marginHorizontal: 16,
        marginVertical: 8,
    },
    item: {
        fontSize: 20
    }
  });

export default BookHistoryScreen;