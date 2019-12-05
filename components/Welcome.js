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
        <Text style={styles.easyBold}>Easy Laundry Solutions</Text>
        <Text style={styles.withText}>With GW cleaners</Text>
        <View style={styles.bigBox}>
          <View style={styles.smallBox}>
            <Image 
              source={require('../assets/images/welcomeImage.png')}
              resizeMode={'contain'}
              style={{width: 237, height: 237}}
            />
          </View>
        </View>
        <TouchableOpacity onPress={()=> this.props.navigation.navigate('CreateAccount')}>
        <View style={styles.continueView}>
          <Text style={styles.continueText}>
          CONTINUE
          </Text>
        </View></TouchableOpacity>
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
      },
      easyBold:{
          fontFamily:'proBold',
          fontSize:17,
          color:'#000',
          marginTop:74,
          alignSelf:'center'
      },
      withText:{
          color:'#6A6767',
          fontSize:15,
          fontFamily:'proRegular',
          alignSelf:'center'
      },
      bigBox:{
          width:'87.5%',
          height:366,
          alignSelf:'center',
          backgroundColor:'#DBFFF0',
          alignItems:'center',
          justifyContent:'center',
          borderRadius:13,
          marginTop:32
      },
      smallBox:{
          backgroundColor:'#fff',
          width:'86.89%',
          height:320,
          borderRadius:13,
          alignItems:'center',
          justifyContent:'center',
      },
      continueView:{
          width: Width*(87.5/100),
          height:42,
          backgroundColor:'#1BC47D',
          alignItems:'center',
          justifyContent:'center',
          marginTop:50,
          alignSelf:'center',
          borderRadius:3
      },
      continueText:{
          color:'#fff',
          fontFamily:'proBold',
          fontSize:13
      }
});
