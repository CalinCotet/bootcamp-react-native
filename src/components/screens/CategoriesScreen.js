

import React from 'react';
import {
  StyleSheet,
  View,
  Text, Button
} from 'react-native';
import { colors, fonts } from '../base';
import Categories from '../Categories';

export default class CategoriesScreen extends React.Component {

  render() {
    return (
      <View style={styles.container}>   
        <Button onPress={() => this.props.navigation.goBack()} title="Go back home" />
        {/* <Categories
          onSelect = {id => {
            console.log(id)
            this.props.navigation.navigate('Category', {id})
          }}
        /> */}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: colors.primary,
    fontSize: 69,
    alignItems:'center',
    justifyContent:'center'
  },
});
