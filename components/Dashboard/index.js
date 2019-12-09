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
import HomeNavBar from '../../components/Includes/HomeNavBar'
import Loader from "../Includes/Loader";
import { API_URL } from '../../root.js';
import axios from "axios";
import Toast from 'react-native-simple-toast';
type Props = {};
import { connect } from "react-redux";
const mapStateToProps = state => ({
  ...state
});
var today = new Date(); var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
class reduxDashboard extends Component<Props> {
  static navigationOptions = {
    header: null,
    drawerLockMode: "locked-closed"
  };
  constructor(props) {
    super(props);
    this.state = {
     regLoader: false,
     fetch: false,
     pending: [],
     completed: [],
     first_name: ''
    };
    this.getApiData = this.getApiData.bind(this)
  }
  componentDidMount(){
 //  this.props.navigation.navigate('CreateAccount')
    this.setState({ regLoader: true });
    this.getApiData();
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
         if(response.data.message == 'Token is not valid'){
            this.props.navigation.navigate('SignIn')
          }
          var len = response.data.length;
          this.setState({pending: [], completed: []})
          for (let i = 0; i < len; i++) {
            let row = response.data[i];
            if (row.stage == "In Process") {
              this.setState(prevState => ({
                pending: [...prevState.pending, row]
              }));
            } else {
              this.setState(prevState => ({
                completed: [...prevState.completed, row]
              }));
            }
          }
    }
      this.setState({ regLoader: false, fetch: false });
      axios.get(API_URL+"users/" + this.props.id, config).then(response => {
        console.log(response);
        if(response.data.message == 'Token is not valid'){
          this.props.navigation.navigate('SignIn')
        }
        this.setState({first_name: response.data.first_name})
      }).catch(error => {
    //    this.setState({regLoader: false})
      if(error.code == 'ECONNABORTED'){
        Toast.show('Connection TImeout')
    }else{
      Toast.show(error.message)
      if(error.message == 'Token is not valid'){
        this.props.navigation.navigate('SignIn')
      }
    }
      console.log(error);
    });
    })
    .catch(error => {
        this.setState({regLoader: false})
      if(error.code == 'ECONNABORTED'){
        Toast.show('Connection TImeout')
    }else{
        Toast.show(error.message)
        if(error.message == 'Token is not valid'){
          this.props.navigation.navigate('SignIn')
        }
    }
      console.log(error);
    });
  }
  componentDidUpdate(){
  //  this.getApiData()
  }
  render() {
      let show = '';
      if(this.state.pending.length > 0 || this.state.completed.length > 0){
        show = <View style={styles.insideGreenBoxTwo}>
        <View style={styles.descriptionView}>
          <Text style={styles.descriptionText}>Orders In Process</Text>
          <View style={styles.numberOrdersView}>
              <Text style={styles.numberOrdersText}>{this.state.pending.length}</Text>
          </View>
        </View>
        <View style={styles.descriptionView}>
          <Text style={styles.descriptionText}>Completed Orders</Text>
          <View style={styles.numberOrdersView}>
              <Text style={styles.numberOrdersText}>{this.state.completed.length}</Text>
          </View>
        </View>
    </View>
      }else{
       show = <View style={styles.insideGreenBox}>
        <Text style={styles.noOrders}>You have no pending orders!</Text>
        <Image 
        source={require('../../assets/images/dashboardWash.png')}
        resizeMode={'contain'}
        style={{width: 270, height: 243}}
    />
    </View>
      }
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
                   Hi {this.state.first_name?this.state.first_name:null}
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
            {show}
            <TouchableOpacity onPress={()=> this.props.navigation.navigate('Preferences', {order: true})}>
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
        {this.state.regLoader?<Loader /> :null} 
        </View>
    );
  }
}
const dimensions = Dimensions.get("window");
const Width = dimensions.width;
const Height = dimensions.height;
const Dashboard = connect(
  mapStateToProps,
)(reduxDashboard);
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
          width: Width*(77.867/100),
          height:Height*(54.42/100) ,
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '5%',
          paddingTop: 30,
          flexDirection: 'column',
          backgroundColor: '#1bc47d'
      },
      insideGreenBoxTwo: {
        width: Width*(77.867/100),
        height:Height*(54.42/100) ,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: '5%',
        flexDirection: 'column',
        backgroundColor: '#1bc47d'
    },
    descriptionView: {
      flexDirection: 'column',
    },
    descriptionText: {
        color: '#fff',
        fontSize: 14,
        fontFamily: 'proRegular',
        marginBottom: 16
    },
    numberOrdersView: {
        backgroundColor: '#61D4A4',
        width: '78.425%',
        height: '9.36%',
        elevation: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    numberOrdersText: {
        color: '#fff',
        fontFamily: 'proBold',
        fontSize: 40
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
