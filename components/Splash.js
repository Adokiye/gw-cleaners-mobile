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
class Splash extends Component<Props> {
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
    
  }
  render() {
    return (
        <View style={styles.container}>
       <View style={styles.welcomeBox}>
           <Image 
               source={require('../assets/images/logo.png')}
               style={{width: 200, height: 200}}
               resizeMode={'contain'}
           />
       </View>
        </View>
    );
  }
}
/*const Splash = connect(
  mapStateToProps,
)(reduxSplash);*/
export default Splash;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: '#fff',
        justifyContent: 'center'
      },
      welcomeBox: {
          flexDirection: 'column'
      },
});
