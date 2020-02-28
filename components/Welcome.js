import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  StatusBar,
  View,
  TouchableOpacity,
} from "react-native";
//import LoaderModal from './Modals/LoaderModal';
//var SharedPreferences = require("react-native-shared-preferences");
type Props = {};
//import { connect } from "react-redux";
/*const mapStateToProps = state => ({
  ...state
});*/
class Welcome extends Component<Props> {
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
      <View style={{
        width: '100%',
        height: '70%',
        position: 'absolute',
        top: '10%'
      }}>
              <Image
          source={require("../assets/images/washitBack.png")}
          resizeMode="cover"
          style={{flex: 1}}
        />
      </View>
      <View style={styles.nine_moveView}>
      <Image
          source={require("../assets/images/washitLogo.png")}
          resizeMode="contain"
          style={{width: 167, height: 167}}
        />
        <Text style={styles.easeText}>Glad to meet you!</Text>
      </View>

        <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={()=> this.props.navigation.navigate('SignIn')}
        activeOpacity={0.7}>
          <View style={styles.button}>
          <Text style={styles.buttonText}>Sign In</Text>
          </View>
          </TouchableOpacity>
         <TouchableOpacity onPress={()=> this.props.navigation.navigate('CreateAccount')}
         activeOpacity={0.7}>
          <View style={styles.buttonOutline}>
          <Text style={styles.buttonOutlineText}>
          Sign Up
          </Text>
          </View>
          </TouchableOpacity></View>
      </View>
    );
  }
}
/*const Splash = connect(
  mapStateToProps,
)(reduxSplash);*/
const dimensions = Dimensions.get("window");
const Width = dimensions.width;
export default Welcome;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: '#fff',
    justifyContent: 'space-around'
  },
 logo: {
     width: Width*(97/100),
     height: Height*(32.8/100),
     alignSelf: 'center',
//        marginTop:'50%'
 },
 nine_moveView: {
    flexDirection: 'column',
    alignItems: 'center'
 },
 easeText: {
     fontFamily: 'mont-semi',
     fontSize: 12,
     color: '#7D7676'
 },
 button: {
  width: 219,
  height: 45,
  alignSelf: 'center',
  alignItems: 'center',
  backgroundColor: '#769CF1',
  justifyContent: 'center',
  borderRadius: 20,
  marginBottom: 10
  },
  buttonText: {
  fontFamily: 'mont-bold',
  fontSize: 14,
  color: '#fff'    
  },
  buttonOutline: {
    width: 219,
    height: 45,
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#769CF1',
    marginBottom: 50
    },
    buttonOutlineText: {
    fontFamily: 'mont-bold',
    fontSize: 14,
    color: '#769CF1'    
    },
    buttonContainer: {
      height: 102,
      flexDirection: 'column',
      justifyContent: 'space-between'
    }

});
