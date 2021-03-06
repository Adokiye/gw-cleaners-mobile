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
  ScrollView,
  PermissionsAndroid
} from "react-native";
//import LoaderModal from './Modals/LoaderModal';
import DropBoxNavBar from '../../components/Includes/DropBoxNavBar'
import MapView, { Marker,} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Toast from 'react-native-simple-toast';
//var SharedPreferences = require("react-native-shared-preferences");
type Props = {};
//import { connect } from "react-redux";
/*const mapStateToProps = state => ({
  ...state
});*/
const stopPropagation = thunk => e => {
    e.stopPropagation();
    thunk();
  };
  const default_region = {
    latitude:6.465422,
    longitude: 3.406448,
    latitudeDelta: 1,
    longitudeDelta: 1
};
const LATITUDE_DELTA = 0.0005;
const LONGITUDE_DELTA = 0.005;
class DropBox extends Component<Props> {
  static navigationOptions = {
    header: null,
    drawerLockMode: "locked-closed"
  };
  constructor(props) {
    super(props);
    this.state = {
     regLoader: false,
     fulton: false,
     latitude: '',
longitude: '',
start_location: '',
currentCoordinate: '',
region: default_region,
    };
  }
  componentDidMount(){
    this.requestGeolocationPermission();
  }
  async requestGeolocationPermission() {
    try{
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          'title': 'WashIt Geolocation Permission',
          'message': 'WashIt needs access to your current location'
        }
      );
      if(granted === PermissionsAndroid.RESULTS.GRANTED){
        Geolocation.getCurrentPosition(
            (position) => {
              console.log(JSON.stringify(position.coords))
                  this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    start_location: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                      },
                   currentCoordinate: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA
                    } 
                  } )
            },
            (error) => console.log(error.message),
            {enableHighAccuracy: true, 
              //timeout: 10000, 
              //maximumAge: 3000
            },
          );
           
      }else{
        Toast.show('Geolocation permission denied')
        console.log("Geolocation permission denied")
      }
    }catch(err){
      console.warn(err)
    }
  }
  handleMarkerPress(){
      this.setState({fulton: false})
  }
  render() {
    return (
        <View style={styles.container}>
        <MapView style={{position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 73,
        }} 
        showsUserLocation={true}
        showsMyLocationButton={true}
        region={{
            latitude: this.state.latitude?this.state.latitude:default_region.latitude,
        longitude: this.state.longitude?this.state.longitude:default_region.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
          }}
          zoomEnabled={true}
          zoomControlEnabled={true}
           >
            <Marker 
             coordinate={{"latitude": 6.458985,"longitude":3.601521}}
             onPress={()=> this.setState({fulton: true})}
             image={require('../../assets/images/atm.png')}>
             </Marker>
             <Marker 
             coordinate={{"latitude": 6.458985,"longitude":3.601521}}>
              {this.state.fulton && 
              <View style={styles.modalView}>
               <Image 
                   source={require('../../assets/images/boxLocation.png')}
                   resizeMode={'contain'} 
                   style={{width: 36, height: 36, marginTop: 18}}
               />
                <Text style={styles.boxId}>#DB000012</Text>
                <Text style={styles.boxLocation}>Lekki Phase 1</Text>
                <TouchableOpacity onPress={stopPropagation(this.handleMarkerPress)}>
                <View style={styles.closeView}>
                    <Text style={styles.closeText}>CLOSE</Text>
                </View>
                </TouchableOpacity>
               </View>}
             </Marker>
             <Marker 
             coordinate={{"latitude":6.4559766,"longitude":3.554504}}
             onPress={()=> this.setState({fulton: true})}
             image={require('../../assets/images/atm.png')}>
             </Marker>
             <Marker 
             coordinate={{"latitude":6.4559766,"longitude":3.554504}}>
              {this.state.fulton && 
              <View style={styles.modalView}>
               <Image 
                   source={require('../../assets/images/boxLocation.png')}
                   resizeMode={'contain'} 
                   style={{width: 36, height: 36, marginTop: 18}}
               />
                <Text style={styles.boxId}>#DB000012</Text>
                <Text style={styles.boxLocation}>Ikota Lekki</Text>
                <TouchableOpacity onPress={stopPropagation(this.handleMarkerPress)}>
                <View style={styles.closeView}>
                    <Text style={styles.closeText}>CLOSE</Text>
                </View>
                </TouchableOpacity>
               </View>}
             </Marker>
           </MapView> 
        <View style={styles.headerView}>
        <Image
          source={require("../../assets/images/washitSplashBack.png")}
          resizeMode="cover"
          style={{position: 'absolute', width: '100%', height: '100%', top: 0, right: 0}}
        />
            <View style={styles.welcomeBox}>
                <Text style={styles.hiText}>
                   Dropbox
                </Text>                
                <Text style={styles.dateText}>
                 Check for Dropboxes close to your location
                </Text>
            </View>
            <Image 
                source={require('../../assets/images/notification.png')}
                resizeMode={'contain'}
                style={{width: 25, height: 25, opacity: 0}}
            />
        </View>
        <DropBoxNavBar navigation={this.props.navigation}/>
        </View>
    );
  }
}
/*const Splash = connect(
  mapStateToProps,
)(reduxSplash);*/
export default DropBox;
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
          position: 'absolute',
          top: 0
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
          fontFamily: 'mont-semi',
          fontSize: 26
      },
      modalView: {
          width: 192,
          height: 152,
          borderRadius: 3,
          backgroundColor: '#fff',
          flexDirection: 'column',
          alignItems: 'center'
      },
      boxId: {
          color: '#000',
          fontFamily: 'mont-semi',
          fontSize: 13
      },
      boxLocation: {
        color: '#000',
        fontFamily: 'mont-semi',
        fontSize: 13,
        marginTop: 14,
        width: 158,
        textAlign: 'center'
    },
    closeView: {
        width: 137,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#769CF1',
        borderRadius: 2,
        marginTop: 13,
        zIndex : 1
    },
    closeText: {
        color: '#fff',
        fontSize: 14,
        fontFamily: 'mont-reg'
    }
});
