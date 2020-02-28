/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  Image,
  Dimensions,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StatusBar,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
export default class Sure extends Component {
  static navigationOptions = {
    header: null,
    drawerLockMode: 'locked-closed',
  };
  constructor(props) {
    super(props);
    this.state = {
      type: '',
      isVisible: true,
    };
  }
  cancelOperation = () => {
    const operation = this.props.cancelOperation || (() => {});
    operation();
  };

  completeOperation = () => {
    const operation = this.props.set;
    operation();
  };
  componentDidMount() {}
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.absoluteView} />
        <View style={styles.loadingView}>
          
          <Text style={styles.loadingText}>Do you want to set this card as your default card for orders</Text>
          <View style={styles.buttonView}>
          <TouchableOpacity activeOpacity={0.7} onPress={this.completeOperation}>
          <View style={styles.button}>
          <Text>YES</Text>
          </View></TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} onPress={this.cancelOperation}>
          <View style={styles.button}>
          <Text>NO</Text>
          </View></TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
      },
      loadingText: {
        fontFamily: 'Gilroy-Regular',
        fontSize: 15,
        color: 'black',
      },
      loadingView: {
        width: 200,
        height: 90,
        borderRadius: 10,
        flexDirection: 'column',
        backgroundColor: '#fff',
        justifyContent: 'space-around',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: 'white'
      },
      buttonView: {
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around'
      },
      button: {
          width: 80,
          height: 30,
          backgroundColor: '#769CF1',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row'
      },
      buttonText: {
          color: 'white',
          fontSize: 12,
      },
      absoluteView: {
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        position: 'absolute',
        top: 0,
      },
  });