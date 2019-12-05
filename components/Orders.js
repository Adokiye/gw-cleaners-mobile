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
class Orders extends Component<Props> {
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
        <TouchableOpacity onPress={()=> this.props.navigation.goBack()}>
        <Image 
                source={require('../assets/images/back.png')}
                resizeMode={'contain'}
                style={{width: 25, height: 25, }}
            /></TouchableOpacity>
            <View style={styles.welcomeBox}>
                <Text style={styles.hiText}>
                   Orders
                </Text>        
            </View>
        </View>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.orderView}>
        <View style={styles.rightImageView}>
          <Image
            source={require('../assets/images/sideOrder.png')}
            style={{flex: 1}}
            resizeMode={'contain'}
           />
        </View>
        <Text style={styles.orderDetailsHeader}>
        #2300B4V
        </Text>
        <Text style={styles.orderDetailsSubText}>
        Dropbox:Bronx Avenue, NY{'\n'}
        Locker Number: #db0001{'\n'}
        Locker Code: 211256{'\n'}
        </Text>
       <View style={styles.meterView}>
         <View style={styles.insideMeterView}></View>
       </View>
       <Text style={styles.orderDetailsSubText}> Sorting Stage</Text>
        <Text style={styles.inProcessTime}>
        Pick up between October 21 and October 24</Text>
        <View style={styles.statusView}>
          <View style={styles.inProcessCircle}></View>
          <Text style={styles.statusText}>In Process</Text>
        </View>
        </View>
        <View style={styles.orderView}>
        <View style={styles.rightImageView}>
          <Image
            source={require('../assets/images/sideOrder.png')}
            style={{flex: 1}}
            resizeMode={'contain'}
           />
        </View>
        <Text style={styles.orderDetailsHeader}>
        #220000
        </Text>
        <Text style={styles.orderDetailsSubText}>
        Dropbox:Bronx Avenue, NY{'\n'}
        Locker Number: #db0001{'\n'}
        Locker Code: 211256{'\n'}
        </Text>
        <Text style={styles.inProcessTime}>
        25|11|2019</Text>
        <View style={styles.statusView}>
          <View style={styles.completedCircle}></View>
          <Text style={styles.statusText}>Completed</Text>
        </View>
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
export default Orders;
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
      orderView: {
        alignSelf: 'center',
        width: Width*(91.46/100),
        height: 171,
        borderRadius: 3,
        backgroundColor: '#fff',
        paddingLeft: 15,
        paddingTop: 25,
        paddingBottom: 25,
        justifyContent: 'space-evenly',
        elevation: 2,
        flexDirection: 'column',
        marginBottom: 30
      },
      orderDetailsHeader: {
        fontFamily: 'proBold',
        color: '#000',
        fontSize: 17
      },
      orderDetailsSubText: {
        color: '#000',
        fontFamily: 'proRegular',
        fontSize: 13, 
      },
      inProcessTime: {
        fontFamily: 'proBoldItalic',
        fontSize: 10,
        color: '#000',
        marginTop: 5
      },
      statusView: {
        flexDirection: 'row',
        position: 'absolute',
        top: 30,
        right: 40
      },
      statusText: {
        fontFamily: 'proItalic',
        fontSize: 10,
        color: '#000'
      },
      completedCircle: {
        width: 11,
        height: 11, 
        borderRadius: 11/2,
        backgroundColor: '#1bc47d',
        marginRight: 5
      },
      inProcessCircle: {
        backgroundColor: '#FFCD29',
        width: 11,
        height: 11, 
        borderRadius: 11/2,
        marginRight: 5
      },
      rightImageView: {
        position: 'absolute',
        right: 0,
        width: 60,
        height: 171
      },
      meterView: {
        width: '50%',
        height: 2, 
        backgroundColor: '#f4f4f4',
        flexDirection: 'row'
      },
      insideMeterView: {
        width: '80%',
        height: 2, 
        backgroundColor: '#1bc47d'
      }
});
