import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  StatusBar,
  View,
  TouchableOpacity
} from "react-native";
//import LoaderModal from './Modals/LoaderModal';
//var SharedPreferences = require("react-native-shared-preferences");
type Props = {};
//import { connect } from "react-redux";
/*const mapStateToProps = state => ({
  ...state
});*/
class OrderProcessed extends Component<Props> {
  static navigationOptions = {
    header: null,
    drawerLockMode: "locked-closed"
  };
  constructor(props) {
    super(props);
    this.state = {
     regLoader: true
    };
  }
  componentDidMount(){
    setTimeout(() => {
        this.props.navigation.navigate('Dashboard');
      }, 1000);
  }
  render() {
    return (
        <View style={styles.container}>
       <View style={styles.welcomeBox}>
           <Image 
               source={require('../assets/images/welcome.png')}
               style={{width: 92, height: 92}}
               resizeMode={'contain'}
           />
           <Text style={styles.welcomeText}>Your Order is{'\n'} being Processed</Text>
           <Text style={styles.subText}>you would be notified with your dropbox details</Text>
       </View>
        </View>
    );
  }
}
/*const Splash = connect(
  mapStateToProps,
)(reduxSplash);*/
export default OrderProcessed;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: '#1bc47d',
        justifyContent: 'center'
      },
      welcomeBox: {
          flexDirection: 'column',
          alignItems: 'center'
      },
      welcomeText: {
          fontFamily: 'proBold',
          fontSize: 30,
          color: '#fff',
          textAlign: 'center'
      }, 
      subText: {
        fontSize: 14,
        fontFamily: 'proRegular',
        width: '77.6%',
        color: '#fff',
        textAlign: 'center',
        marginTop: 23
      }
});
