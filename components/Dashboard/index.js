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
import HomeNavBar from '../../components/Includes/HomeNavBar'
//var SharedPreferences = require("react-native-shared-preferences");
type Props = {};
//import { connect } from "react-redux";
/*const mapStateToProps = state => ({
  ...state
});*/
var today = new Date(); var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
class Dashboard extends Component<Props> {
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
        <View style={styles.headerView}>
        <Image
        source={require('../../assets/images/topAbstract.png')} 
            resizeMode={'contain'}
            style={{position: 'absolute', width: 187, height: 50, top: 0, right: 0}}
        />
            <View style={styles.welcomeBox}>
                <Text style={styles.dateText}>
                   {date}
                </Text>
                <Text style={styles.hiText}>
                   Hi Alan
                </Text>
            </View>
            <TouchableOpacity onPress={()=> this.props.navigation.navigate('Notifications')}>
            <Image 
                source={require('../../assets/images/notification.png')}
                resizeMode={'contain'}
                style={{width: 25, height: 25}}
            /></TouchableOpacity>
        </View>
        <ScrollView>
            <View style={styles.insideGreenBox}>
                <Text style={styles.noOrders}>You have no pending orders!</Text>
                <Image 
                source={require('../../assets/images/dashboardWash.png')}
                resizeMode={'contain'}
                style={{width: 270, height: 243}}
            />
            </View>
            <TouchableOpacity onPress={()=> this.props.navigation.navigate('Preferences')}>
            <View style={styles.placeOrderView}>
                <Text style={styles.placeText}>Place an order</Text>
                <Image 
                source={require('../../assets/images/rightArrow.png')}
                resizeMode={'contain'}
                style={{width: 21, height: 13}}
            />
            </View>
            </TouchableOpacity>
        </ScrollView>
        <HomeNavBar navigation={this.props.navigation}/>
        </View>
    );
  }
}
/*const Splash = connect(
  mapStateToProps,
)(reduxSplash);*/
export default Dashboard;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: '#fff',
      },
      headerView: {
          width: '100%',
          height: 100,
          backgroundColor: '#1bc47d',
          flexDirection: 'row',
          paddingLeft: 10,
          paddingRight: 10,
          alignItems: 'center',
          justifyContent: 'space-between'
      },
      welcomeBox: {
          flexDirection: 'column'
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
      insideGreenBox: {
          width: 290,
          height: 363,
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 30,
          paddingTop: 30,
          flexDirection: 'column',
          backgroundColor: '#1bc47d'
      },
      noOrders: {
          width: 215,
          textAlign: 'center',
          color: '#fff',
          fontSize: 20,
          fontFamily: 'proBold'
      },
      placeOrderView: {
          width: 200,
          height: 33,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          borderRadius: 4,
          alignSelf: 'center',
          marginTop: 20,
          backgroundColor: '#1bc47d'
      },
      placeText: {
          color: '#fff',
          fontSize: 11,
          fontFamily: 'proBold'
      },

});
