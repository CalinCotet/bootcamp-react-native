

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from '../base';
import Categories from '../Categories';

export default class HomeScreen extends React.Component {

  static navigationOptions = {
    title: 'RN Books'
  }  

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.header} >
          <Icon name="rocket" size={30} color="#900" onPress={()=> navigation.toggleDrawer()} > Menu </Icon>
          <Text>RN BOOKS</Text>
        </View>
        <View style={styles.content} >
          <Categories/>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex:1,
    backgroundColor: colors.background,
    alignItems: 'flex-start', justifyContent: 'center' ,
  },
  header: {
    width:'100%',
    flex: 1,
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems:'center',
    backgroundColor: 'powderblue',
  },
  content: {
    flex: 5,
    width:'100%',
    backgroundColor: 'steelblue'
  }
});
