/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
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
} from "react-native";
export default class Loader extends Component {
  static navigationOptions = {
    header: null,
    drawerLockMode: "locked-closed"
  };
  constructor(props) {
    super(props);
    this.state = {
     type: '',
     isVisible: true
    };
  }
  componentDidMount(){
  }
  render() {
    return (
      <View style={{height: "100%",
      width: "100%", flexDirection: 'column', alignItems: 'center',
       justifyContent: 'center', position: 'absolute', top: 0, bottom: 0}}>
      <View
       style={{    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    position: "absolute",
    top: 0, bottom: 0 }}
      />
      <View style={{width: 120, height: 50, borderRadius: 10, flexDirection: 'row',
      backgroundColor: '#fff', justifyContent: 'space-around', alignItems: 'center', alignSelf: 'center'}}>
       <ActivityIndicator color='#377848' size='large'/>
        <Text style={{fontFamily: 'proRegular', fontSize: 15, color: 'black'}}>
         Loading
         </Text>
      </View>
      </View>
    );
  }
}
const dimensions = Dimensions.get("window");
const Height = dimensions.height / 5;
const Width = dimensions.width;
const styles = StyleSheet.create({
    online: {
       color: '#1281DD',
       fontFamily: 'gilroyBold',
       fontSize: 14
    },
    offline : {
        color: 'black',
        fontFamily: 'gilroyBold',
        fontSize: 14
    },
    onlineTab: {
        width: '33.33%', 
        backgroundColor: '#1281DD', 
        height: 5
    },
    offlineTab: {
        width: '33.33%', 
        backgroundColor: '#E7E7E7', 
        height: 5
    }
});
