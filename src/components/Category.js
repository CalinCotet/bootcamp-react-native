import React, {Component} from 'react';
import { View, Text, FlatList, TouchableHighlight, StyleSheet, Alert } from 'react-native';
import PropTypes from 'prop-types';
import {colors, padding} from './base';
import Loading from './common/Loading';
class Category extends Component {

    constructor(props) {
        super();
        this.state = {
            data: [],
            page: props.page || 1,
            limit: props.limit || 3,
            noMore: props.disableInfiniteScroll || false
        }
    }

    componentDidMount(){
        this.getData();
    }
//http://acamicaexample.herokuapp.com/categories
    getData() {
        const {page, limit, noMore} = this.state;
        const {id} = this.props;
        this.setState({loading: true}, () => {
            fetch(`http://acamicaexample.herokuapp.com/books?category_id=${id}&_page=${page}&_limit=${limit}`)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    data: [...this.state.data, ...data],
                    noMore: noMore || data.length < limit,
                })
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

    loadMore = () => {
        const {page, loading, noMore} = this.state;
        if (loading || noMore) return;
        this.setState({
            page: page + 1
        }, () => {
            this.getData();
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
                            onPress={() => {onSelect(item.id);
                            }}
                        >
                            <Text>{item.name}</Text>
                        </TouchableHighlight>
                        }
                    onEndReached={this.loadMore}
                    onEndReachedThreshold={0.01}
                    ListFooterComponent={<Loading isLoading={loading}/>}
                />  
            </View>
        )
    }
}

Category.propTypes = {
    id: PropTypes.string.isRequired,
    limit: PropTypes.number,
    page: PropTypes.number,
    disableInfiniteScroll: PropTypes.bool,
    onSelect: PropTypes.func,
}

const styles = StyleSheet.create({
    listItem: {
        flex: 1,
        padding: padding.md,
        backgroundColor: colors.background
    },
      box: {
    width: 50,
    height: 80,
  },
})

export default Category;