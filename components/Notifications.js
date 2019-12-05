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
  ScrollView
} from "react-native";
//import LoaderModal from './Modals/LoaderModal';
//var SharedPreferences = require("react-native-shared-preferences");
type Props = {};
//import { connect } from "react-redux";
/*const mapStateToProps = state => ({
  ...state
});*/
const options = [
    { label: "", value: "true",  },
    { label: "", value: "false", },
  ];
class Notifications extends Component<Props> {
  static navigationOptions = {
    header: null,
    drawerLockMode: "locked-closed"
  };
  
  constructor(props) {
    super(props);
    this.state = {
     regLoader: false,
     separateWhites: ''
    };
  }
  componentDidMount(){
  }
  render() {
    return (
        <View style={styles.container}>
        <View style={styles.headerView}>
        <Image
        source={require('../assets/images/topAbstract.png')} 
            resizeMode={'contain'}
            style={{position: 'absolute', width: 187, height: 50, top: 0, right: 0}}
        />
        <TouchableOpacity onPress={()=> this.props.navigation.goBack()} 
        hitSlop={{left: 2, top: 2, right: 2, bottom: 2}}>
        <Image 
                source={require('../assets/images/back.png')}
                resizeMode={'contain'}
                style={{width: 25, height: 25, }}
            /></TouchableOpacity>
            <View style={styles.welcomeBox}>
                <Text style={styles.hiText}>
                   Notifications
                </Text>        
            </View>
        </View>
        <ScrollView>
          <View style={styles.notificationBox}>
             <Text style={styles.notificationText}>
             Your Order has been picked up
            from the dropbox</Text>
            <Text style={styles.timeText}>29|11|2019</Text>
          </View>
          <View style={styles.notificationBox}>
             <Text style={styles.notificationText}>
             Your Order #211XX has been processed click to 
              view allocated dropbox and set dropoff details </Text>
            <Text style={styles.timeText}>NOW</Text>
          </View>
        </ScrollView>
        </View>
    );
  }
}
/*const Splash = connect(
  mapStateToProps,
)(reduxSplash);*/
const dimensions = Dimensions.get("window");
const Width = dimensions.width;
export default Notifications;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: '#fff',
        alignItems: 'center'
      },
      headerView: {
          width: '100%',
          height: 100,
          backgroundColor: '#1bc47d',
          flexDirection: 'row',
          paddingLeft: 10,
          paddingRight: 10,
          alignItems: 'center',
          marginBottom: 15
     //     justifyContent: 'space-between',
      },
      welcomeBox: {
          flexDirection: 'column',
          marginLeft: 13
      },
      dateText: {
          fontFamily: 'proRegular',
          fontSize: 13,
          color: '#fff'
      },
      hiText: {
          color: '#fff',
          fontFamily: 'proBold',
          fontSize: 26
      },
       notificationBox: {
           width: Width*(84.267/100),
           height: 70,
           alignSelf: 'center',
           backgroundColor: '#fff',
           elevation: 2,
           flexDirection: 'row',
           paddingLeft: 13,
           paddingRight: 13,
           alignItems: 'center',
           justifyContent: 'space-between',
           marginBottom: 30,
           borderRadius: 4
       },
       notificationText: {
           width: '79.114%',
           textAlign: 'center',
           color: '#000',
           fontFamily: 'proRegular',
           fontSize: 12
       },
       timeText: {
           color: '#AFACAC',
           fontSize: 7,
           fontFamily: 'proBold'
       }
});
