

import React from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import { colors, fonts } from '../base';
import Category from '../Category';

export default class CategoryScreen extends React.Component {

  static navigationOptions = {
    title: 'Categories'
  }  

  render() {
    const {route, navigation} = this.props;
    console.log('this.props.nav', navigation);
    console.log('this.props.route', route);
    const categoryId = this.props.route.params.id;
    return (
      <View style={styles.container}>
        <Category
          id={categoryId}
          onSelect={(id) => navigation.navigate('Book',{id})}
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
