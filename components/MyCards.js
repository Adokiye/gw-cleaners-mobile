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
class MyCards extends Component<Props> {
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
                   My Cards
                </Text>        
            </View>
        <TouchableOpacity onPress={()=> this.props.navigation.navigate('AddCard')}>
        <Image 
                source={require('../assets/images/plus.png')}
                resizeMode={'contain'}
                style={{width: 21, height: 21, marginLeft: '65%'}}
            /></TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.cardView}>
        <Image 
          source={require('../assets/images/mastercard.png')}
          resizeMode={'contain'}
          style={{width: 42, height: 42}}
        />
        <View style={styles.cardLastDigitsView}>
          <Image 
            source={require('../assets/images/greyCircleGroup.png')}
            style={{width: 46.67, height: 8.46}}
          />
                    <Image 
            source={require('../assets/images/greyCircleGroup.png')}
            style={{width: 46.67, height: 8.46}}
          />
                    <Image 
            source={require('../assets/images/greyCircleGroup.png')}
            style={{width: 46.67, height: 8.46}}
          />
           <Text style={styles.cardLastDigits}>1234</Text>
        </View>
        <Text style={styles.dateText}>09/20</Text>
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
export default MyCards;
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
      cardView: {
        alignSelf: 'center',
        width: Width*(91.46/100),
        height: 159,
        borderRadius: 4,
        backgroundColor: '#fff',
        paddingLeft: 15,
        paddingTop: 20,
        paddingBottom: 20,
        justifyContent: 'space-between',
        elevation: 2,
        flexDirection: 'column',
        marginBottom: 30
      },
      cardLastDigitsView: {
         width: '81.3%',
         flexDirection: 'row',
         justifyContent: 'space-between'
      },
      cardLastDigits: {
        color: '#000',
        fontSize: 12,
        fontFamily: 'proBold'
      },
      dateText: {
        fontFamily: 'proRegular',
        fontSize: 10,
        color: '#000'
      }
});
