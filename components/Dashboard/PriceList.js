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
import PriceListNavBar from '../Includes/PriceListNavBar'
//var SharedPreferences = require("react-native-shared-preferences");
type Props = {};
//import { connect } from "react-redux";
/*const mapStateToProps = state => ({
  ...state
});*/
class PriceList extends Component<Props> {
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
          source={require("../../assets/images/washitBack.png")}
          resizeMode="cover"
          style={{position: 'absolute', width: 187, height: 50, top: 0, right: 0}}
        />
            <View style={styles.welcomeBox}>
                <Text style={styles.hiText}>
                   Pricelist
                </Text>
            </View>
            <Image 
                source={require('../../assets/images/notification.png')}
                resizeMode={'contain'}
                style={{width: 25, height: 25, opacity: 0}}
            />
        </View>
        <ScrollView>
        <View style={styles.mainPriceView}>
            <Text style={styles.clothName}>Shirt</Text>
            <View style={styles.priceView}>
                <Text style={styles.priceText}>{'\u20A6'}200</Text>
            </View>
        </View>
        <View style={styles.mainPriceView}>
            <Text style={styles.clothName}>Pants</Text>
            <View style={styles.priceView}>
                <Text style={styles.priceText}>{'\u20A6'}400</Text>
            </View>
        </View>
        <View style={styles.mainPriceView}>
            <Text style={styles.clothName}>Dress</Text>
            <View style={styles.priceView}>
                <Text style={styles.priceText}>{'\u20A6'}200</Text>
            </View>
        </View>
        <View style={styles.mainPriceView}>
            <Text style={styles.clothName}>Blazer</Text>
            <View style={styles.priceView}>
                <Text style={styles.priceText}>{'\u20A6'}1000</Text>
            </View>
        </View>
        <View style={styles.mainPriceView}>
            <Text style={styles.clothName}>SweatShirt</Text>
            <View style={styles.priceView}>
                <Text style={styles.priceText}>{'\u20A6'}1000</Text>
            </View>
        </View>
        <View style={styles.mainPriceView}>
            <Text style={styles.clothName}>Suit</Text>
            <View style={styles.priceView}>
                <Text style={styles.priceText}>{'\u20A6'}1500</Text>
            </View>
        </View>
        <View style={styles.mainPriceView}>
            <Text style={styles.clothName}>Blouse</Text>
            <View style={styles.priceView}>
                <Text style={styles.priceText}>{'\u20A6'}1000</Text>
            </View>
        </View>
        <View style={styles.mainPriceView}>
            <Text style={styles.clothName}>Vest</Text>
            <View style={styles.priceView}>
                <Text style={styles.priceText}>{'\u20A6'}1000</Text>
            </View>
        </View>
        <View style={styles.mainPriceView}>
            <Text style={styles.clothName}>Tie</Text>
            <View style={styles.priceView}>
                <Text style={styles.priceText}>{'\u20A6'}200</Text>
            </View>
        </View>
        <View style={styles.mainPriceView}>
            <Text style={styles.clothName}>Shorts</Text>
            <View style={styles.priceView}>
                <Text style={styles.priceText}>{'\u20A6'}200</Text>
            </View>
        </View>
        </ScrollView>
        <PriceListNavBar navigation={this.props.navigation}/>
        </View>
    );
  }
}
/*const Splash = connect(
  mapStateToProps,
)(reduxSplash);*/
export default PriceList;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: '#fff',
      },
      headerView: {
          width: '100%',
          height: 100,
          backgroundColor: '#769CF1',
          flexDirection: 'row',
          paddingLeft: 10,
          paddingRight: 10,
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 30
      },
      welcomeBox: {
          flexDirection: 'column'
      },
      dateText: {
          fontFamily: 'mont-reg',
          fontSize: 13,
          color: '#fff'
      },
      hiText: {
          color: '#fff',
          fontFamily: 'mont-bold',
          fontSize: 26
      },
      mainPriceView: {
          marginBottom: 15,
          width: '67.2%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignSelf: 'center'
      },
      clothName: {
          fontFamily: 'mont-reg',
          color: '#000',
          fontSize: 19
      },
      priceView: {
          backgroundColor: '#769CF1',
          borderRadius: 4,
          width: 51,
          height: 20,
          alignItems: 'center',
          justifyContent: 'center'
      }, 
      priceText: {
          color: '#fff',
          fontFamily: 'mont-bold',
          fontSize: 14
      } 
});
