import React, {Component} from 'react';
import { View, Text, FlatList, TouchableHighlight, StyleSheet, Alert } from 'react-native';
import PropTypes from 'prop-types';
import {colors, padding} from './base';
import Loading from './common/Loading';
class Categories extends Component {

    constructor(props) {
        super();
        this.state = {
            data: [],
        }
    }

    componentDidMount(){
        this.getData();
    }
//http://acamicaexample.herokuapp.com/categories
    getData() {
        this.setState({loading: true}, () => {
            fetch('http://acamicaexample.herokuapp.com/categories')
            .then(res => res.json())
            .then(data => {
                this.setState({data})
            })
            .catch(err => {
                console.log(err);
                Alert.alert('oh snap!', 'smth went wrong')
            })
            .finally(() =>{
                this.setState({loading: false})
            })
        })
    }

    render() {
        const {data, loading} = this.state;
        const {onSelect} = this.props;
        return (
            <View>
                <Loading isLoading={loading} />
                <FlatList
                    data={data}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => 
                        <TouchableHighlight
                            underlayColor={colors.primary}
                            style={styles.listItem}
                            onPress={() => onSelect(item.id)}
                        >
                            <Text>{item.name}</Text>
                        </TouchableHighlight>}
                />  
            </View>
        )
    }
}

Categories.propTypes = {
    onSelect: PropTypes.function
}

const styles = StyleSheet.create({
    listItem: {
        flex: 1,
        padding: padding.md,
        backgroundColor: colors.background
    }
})

export default Categories;