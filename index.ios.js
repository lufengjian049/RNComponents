/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
// import TestIndex from './src/components/test/index';
import TestIndex from 'TestIndex';

export default class RNCompoents extends Component {
  
  render() {
    console.log('====================================')
  console.log('test')
  console.log('====================================')
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!wwwccc
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.jsd22121
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu33333
        </Text>
        <TestIndex />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('RNCompoents', () => RNCompoents);
