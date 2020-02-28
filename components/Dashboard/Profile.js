import React, { Component } from "react";
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  NetInfo,
  Animated,
  ImageBackground,
  TouchableWithoutFeedback,
  ScrollView,
  Dimensions,
  FlatList,
  Alert,
  TouchableOpacity
} from "react-native";
import ProfileNavBar from '../Includes/ProfileNavBar'
import Loader from "../Includes/Loader";
import { API_URL } from '../../root.js';
import axios from "axios";
import Toast from 'react-native-simple-toast';
type Props = {};
import { connect } from "react-redux";
const mapStateToProps = state => ({
  ...state
});
class reduxProfile extends Component<Props> {
  static navigationOptions = {
    header: null,
    drawerLockMode: "locked-closed"
  };
  constructor(props) {
    super(props);
    this.state = {
     regLoader: false,
     myOrders: false,
     myCards: false,
     trackOrder: false,
     settings: false,
     first_name: '',
     last_name: ''
    };
    this.getApiData = this.getApiData.bind(this);
  }
  componentDidMount(){
    this.setState({regLoader: true})
    this.getApiData();
  }
  getApiData(){
    var config = {
      headers: {'Authorization': "Bearer " + this.props.token},
      timeout: 20000
  };
    axios.get(API_URL+"users/" + this.props.id, config).then(response => {
      console.log(response);
      this.setState({first_name: response.data.first_name, last_name: response.data.last_name, regLoader: false})
    }).catch(error => {
      this.setState({regLoader: false})
    if(error.code == 'ECONNABORTED'){
      Toast.show('Connection TImeout')
  }else{
      Toast.show(error.message)
  }
    console.log(error);
  });
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
                   Profile
                </Text>
            </View>
            <Image 
                source={require('../../assets/images/notification.png')}
                resizeMode={'contain'}
                style={{width: 25, height: 25, opacity: 0}}
            />
        </View>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.profileImageView}>
        <Image 
                source={require('../../assets/images/washitLogo.png')}
                resizeMode={'contain'}
                style={{flex: 1, alignSelf: 'center' }}
            />
        </View>
        <Text style={styles.userName}>{this.state.first_name} {this.state.last_name}</Text>
        <View style={styles.optionParentView}>
         <TouchableOpacity onPressIn={()=> this.setState({myOrders: true})}
         onPressOut={()=> this.setState({myOrders: false})}
         onPress={()=> this.props.navigation.navigate('Orders')}>
         <View style={this.state.myOrders?styles.optionPressedView:
         styles.optionUnPressedView}>
          {!this.state.myOrders?
          <Image 
             source={require('../../assets/images/myOrdersGreen.png')}
             resizeMode={'contain'}
             style={{width: 32, height: 32}}
          />: 
           <Image 
             source={require('../../assets/images/myOrdersWhite.png')}
             resizeMode={'contain'}
             style={{width: 32, height: 32}}
          />}
          <Text style={this.state.myOrders?styles.optionPressedText:
          styles.optionUnpressedText}>My Orders</Text>
         </View></TouchableOpacity>
         <TouchableOpacity onPressIn={()=> this.setState({myCards: true})}
         onPressOut={()=> this.setState({myCards: false})}
         onPress={()=> this.props.navigation.navigate('MyCards', {order:false})}>
         <View style={this.state.myCards?styles.optionPressedView:
         styles.optionUnPressedView}>
          {!this.state.myCards?
          <Image 
             source={require('../../assets/images/myCardsGreen.png')}
             resizeMode={'contain'}
             style={{width: 32, height: 32}}
          />: 
           <Image 
             source={require('../../assets/images/myCardsWhite.png')}
             resizeMode={'contain'}
             style={{width: 32, height: 32}}
          />}
          <Text style={this.state.myCards?styles.optionPressedText:
          styles.optionUnpressedText}>My Cards</Text>
         </View></TouchableOpacity>
        </View>
        {/* <View style={styles.optionParentView}>
         <TouchableOpacity onPressIn={()=> this.setState({trackOrder: true})}
         onPressOut={()=> this.setState({trackOrder: false})}>
         <View style={this.state.trackOrder?styles.optionPressedView:
         styles.optionUnPressedView}>
          {this.state.trackOrder?
          <Image 
             source={require('../../assets/images/trackOrderGreen.png')}
             resizeMode={'contain'}
             style={{width: 32, height: 32}}
          />: 
           <Image 
             source={require('../../assets/images/trackOrderWhite.png')}
             resizeMode={'contain'}
             style={{width: 32, height: 32}}
          />}
          <Text style={this.state.trackOrder?styles.optionPressedText:
          styles.optionUnpressedText}>Track Order</Text>
         </View></TouchableOpacity>
         <TouchableOpacity onPressIn={()=> this.setState({settings: true})}
         onPressOut={()=> this.setState({settings: false})}>
         <View style={this.state.settings?styles.optionPressedView:
         styles.optionUnPressedView}>
          {this.state.settings?
          <Image 
             source={require('../../assets/images/settingsGreen.png')}
             resizeMode={'contain'}
             style={{width: 32, height: 32}}
          />: 
           <Image 
             source={require('../../assets/images/settingsWhite.png')}
             resizeMode={'contain'}
             style={{width: 32, height: 32}}
          />}
          <Text style={this.state.settings?styles.optionPressedText:
          styles.optionUnpressedText}>Settings</Text>
         </View></TouchableOpacity>
        </View> */}
        </ScrollView>
        <ProfileNavBar navigation={this.props.navigation}/>
        {this.state.regLoader?<Loader /> :null} 
        </View>
    );
  }
}
const Profile = connect(
  mapStateToProps,
)(reduxProfile);
const dimensions = Dimensions.get("window");
const Width = dimensions.width;
export default Profile;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    //    flexDirection: "column",
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
      profileImageView: {
          width: 90,
          height: 90,
          borderRadius: 45,
          alignSelf: 'center',
          marginBottom: 14
      },
      userName: {
          fontFamily: 'mont-bold',
          fontSize: 16,
          color: '#000',
          alignSelf: 'center',
          marginBottom: 30
      },
      optionParentView: {
          width: '70%',
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignSelf: 'center',
          marginBottom: 30
      },
      optionUnPressedView: {
          height: 98,
          width: 110,
          alignItems:'center',
          flexDirection: 'column',
          justifyContent: 'space-around',
          backgroundColor: '#fff',
          elevation: 2,
          borderRadius: 3
      },
      optionPressedView: {
        height: 98,
        width: 110,
        alignItems:'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#769CF1',
        borderRadius: 3
    },
    optionUnpressedText: {
        color: '#000',
        fontFamily: 'mont-bold',
        fontSize: 11
    },
    optionPressedText: {
        color: '#fff',
        fontFamily: 'mont-bold',
        fontSize: 11
    }
});
