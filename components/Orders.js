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
  TouchableOpacity,
  RefreshControl
} from "react-native";
import Loader from "./Includes/Loader";
import { API_URL } from '../root.js';
import axios from "axios";
import Toast from 'react-native-simple-toast';
type Props = {};
import { connect } from "react-redux";
const mapStateToProps = state => ({
  ...state
});
class reduxOrders extends Component<Props> {
  static navigationOptions = {
    header: null,
    drawerLockMode: "locked-closed"
  };
  
  constructor(props) {
    super(props);
    this.state = {
     regLoader: false,
     separateWhites: '',
     orders: ''
    };
    this.getApiData = this.getApiData.bind(this);
  }
  componentDidMount(){
    this.setState({regLoader: true})
    this.getApiData();
  }
  circle(value){
    if(value == 'pending'){
      return(
        <View style={styles.inProcessCircle}/>
      )
    }
    if(value == 'active'){
      return(
        <View style={styles.active}/>
      )
    }
    if(value == 'completed'){
      return(
        <View style={styles.completedCircle}/>
      )
    }
  }
  getApiData(){
    console.log(this.props.token)
    var config = {
        headers: {'Authorization': "Bearer " + this.props.token},
        timeout: 20000
    };
    axios
    .get(
      API_URL+"orders/" + this.props.id, config
    )
    .then(response => {
      console.log(response);
      if (response.data && response.data.length > 0) {
        console.log("response.data");
          console.log("here" + response.data);
          var len = response.data.length;
          this.setState({orders: []})
          for (let i = 0; i < len; i++) {
            let row = response.data[i];
              this.setState(prevState => ({
                orders: [...prevState.orders, row]
              }));
          }
    }
      this.setState({ regLoader: false, fetch: false });
    })
    .catch(error => {
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
    let orders = '';
    
    orders = (
      <FlatList
      data={this.state.orders}
      renderItem={({ item, index }) => (
        <View style={styles.orderView}>
        {/* <View style={styles.rightImageView}>
          <Image
            source={require('../assets/images/sideOrder.png')}
            style={{flex: 1}}
            resizeMode={'contain'}
           />
        </View> */}
        <Text style={styles.orderDetailsHeader}>
        {item.order_id}
        </Text>
        <Text style={styles.orderDetailsSubText}>
        Dropbox:{item.dropbox_address}{'\n'}
        Locker Number: {item.locker_id}{'\n'}
        Locker Code: last 4 digits of phone no{'\n'}
        Sub Stage: {item.sub_stage?item.sub_stage:"N/A"}
        </Text>
 {/*      <View style={styles.meterView}>
         <View style={styles.insideMeterView}></View>
       </View>
       <Text style={styles.orderDetailsSubText}> Sorting Stage</Text>
        <Text style={styles.inProcessTime}>
        Pick up between October 21 and October 24</Text>*/} 
        <View style={styles.statusView}>
        {this.circle(item.stage)}
          {/* <View style={item.stage == 'pending'?styles.inProcessCircle:styles.completedCircle}/> */}
          <Text style={styles.statusText}>{item.stage}</Text>
        </View>
        </View>
      )}
      keyExtractor={(item, index) => `list-item-${index}`}
    />
  );
    return (
        <View style={styles.container}>
        <View style={styles.headerView}>
        <Image
          source={require("../../assets/images/washitSplashBack.png")}
          resizeMode="cover"
          style={{position: 'absolute', width: '100%', height: '100%', top: 0, right: 0}}
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
          {orders}
        </ScrollView>
        {this.state.regLoader?<Loader /> :null} 
        </View>
    );
  }
}
const Orders = connect(
  mapStateToProps,
)(reduxOrders);
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
          backgroundColor: '#769CF1',
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
          fontFamily: 'mont-reg',
          fontSize: 13,
          color: '#fff'
      },
      hiText: {
          color: '#fff',
          fontFamily: 'mont-semi',
          fontSize: 20
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
        fontFamily: 'mont-semi',
        color: '#000',
        fontSize: 17
      },
      orderDetailsSubText: {
        color: '#000',
        fontFamily: 'mont-reg',
        fontSize: 13, 
      },
      inProcessTime: {
        fontFamily: 'mont-semiItalic',
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
        fontFamily: 'mont-italic',
        fontSize: 10,
        color: '#000'
      },
      completedCircle: {
        width: 11,
        height: 11, 
        borderRadius: 11/2,
        backgroundColor: '#769CF1',
        marginRight: 5
      },
      inProcessCircle: {
        backgroundColor: '#E2574C',
        width: 11,
        height: 11, 
        borderRadius: 11/2,
        marginRight: 5
      },
      active: {
        backgroundColor: '#FFBC00',
        width: 11,
        height: 11, 
        borderRadius: 11/2,
        marginRight: 5
      },
      rightImageView: {
        position: 'absolute',
        right: 0,
        width: 60,
        height: 150,
        bottom: 0
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
        backgroundColor: '#769CF1'
      }
});
