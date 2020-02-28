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
import { connect } from "react-redux";const mapStateToProps = state => ({
  ...state
});
class reduxSplash extends Component<Props> {
  static navigationOptions = {
    header: null,
    drawerLockMode: "locked-closed"
  };
  constructor(props) {
    super(props);
    this.state = {
     regLoader: false
    };
  }
  componentDidMount(){
    if(this.props.token){
      setTimeout(() => {
        this.props.navigation.navigate('Dashboard');
      }, 4000);
    }else{
      setTimeout(() => {
        this.props.navigation.navigate('Welcome');
      }, 4000);
    }
   }
  render() {
    return (
        <View style={styles.container}>
              <View style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: '10%'
      }}>
              <Image
          source={require("../assets/images/washitSplashBack.png")}
          resizeMode="cover"
          style={{flex: 1}}
        />
      </View>
       <View style={styles.welcomeBox}>
           <Image 
               source={require('../assets/images/washitSplashLogo.png')}
               style={{width: 200, height: 200}}
               resizeMode={'contain'}
           />
       </View>
        </View>
    );
  }
}
const Splash = connect(
  mapStateToProps,
)(reduxSplash);
export default Splash;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: '#769CF1',
        justifyContent: 'center'
      },
      welcomeBox: {
          flexDirection: 'column'
      },
});
