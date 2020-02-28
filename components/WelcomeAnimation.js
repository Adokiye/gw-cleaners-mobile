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
class WelcomeAnimation extends Component<Props> {
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
           <Text style={styles.welcomeText}>Welcome!</Text>
       </View>
        </View>
    );
  }
}
/*const Splash = connect(
  mapStateToProps,
)(reduxSplash);*/
export default WelcomeAnimation;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: '#769CF1',
        justifyContent: 'center'
      },
      welcomeBox: {
          flexDirection: 'column',
          alignItems: 'center'
      },
      welcomeText: {
          fontFamily: 'mont-semi',
          fontSize: 44,
          color: '#fff'
      }
});
