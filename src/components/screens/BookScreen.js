

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Alert
} from 'react-native';
import { colors } from '../base';
import Book from '../Book';
import Loading from '../common/Loading';

export default class BookScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: null,
    }
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    const {navigation, route} = this.props;
    // this.props.route.params.id;
    //http://acamicaexample.herokuapp.com/books
    fetch(`http://acamicaexample.herokuapp.com/books/${route.params.id}`)
    .then(res => res.json())
    .then(data => {
      this.setState({
        data
      })
    })
    .catch(error => {
      Alert.alert('AOLEO!', 'smth went wrong!')
    })
    .finally(() => {
      this.setState({loading: false})
    })
  }
  render() {
    const {loading, data: book} = this.state;
    return loading ? <Loading isLoading={true}/> :
    (
      <View style={styles.container}>
        <Book
          author={book.author}
          image={book.image}
          description={book.description}
          url={book.url}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: colors.primary,
    fontSize: 69,
  },
});
