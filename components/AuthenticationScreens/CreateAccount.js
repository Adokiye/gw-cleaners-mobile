import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  ImageBackground,
  TouchableWithoutFeedback,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Alert,
  Dimensions,
  TouchableOpacity,
} from "react-native";
type Props = {};
import Toast from 'react-native-simple-toast';
import { API_URL } from '../../root.js';
import HideWithKeyboard from "react-native-hide-with-keyboard";
import AsyncStorage from '@react-native-community/async-storage';
import axios from "axios";
import Loader from "../Includes/Loader";
import { connect } from "react-redux";
import { setToken, setId,  } from "../../actions/index";
import firebase from "react-native-firebase";
const mapStateToProps = state => ({
  ...state
});
const mapDispatchToProps = dispatch => {
  return {
    setToken: token => dispatch(setToken(token)),
    setId: id => dispatch(setId(id)),
  };
};
class reduxCreateAccount extends Component<Props> {
  static navigationOptions = {
    header: null,
    drawerLockMode: "locked-closed"
  };
  constructor(props) {
    super(props);
    this.state = {
     regLoader: false,
     first_name_text_input: true, 
     last_name_text_input: false,
     email_text_input: false,
     number_text_input: false,
     address_text_input: false,
     zip_text_input: false, 
     password_text_input: false,
     number: '',
     first_name: '',
     last_name: '',
     address: '',
     zip: '',
     email: '',
     password: '',
     fcmToken: ''
    };
  }
  async componentDidMount(){
    this.checkPermission();
  }
  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
        console.log("enabled")
        this.getToken();
    } else {
      console.log("unenabled")
        this.requestPermission();
    }
  }
  
    //3
  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
        fcmToken = await firebase.messaging().getToken();
        if (fcmToken) {
            // user has a device token
            this.setState({fcmToken});
            console.log(fcmToken);
            await AsyncStorage.setItem('fcmToken', fcmToken);
        }else{
          console.log("\n"+"\n"+"no token"+"\n"+"\n")
        }
    }else{
      console.log("here")
      this.setState({fcmToken});
      console.log(fcmToken);
    }
  }
  
    //2
  async requestPermission() {
    try {
        await firebase.messaging().requestPermission();
        console.log("admin authorised")
        // User has authorised
        this.getToken();
    } catch (error) {
        // User has rejected permissions
        console.log('permission rejected');
    }
  }
  createAccount(){
    let regg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (regg.test(this.state.email) === false) {
     Toast.show('Invalid Email')
    } else if (this.state.password.length < 1 || this.state.address.length < 1 || this.state.email.length < 1
      || this.state.first_name.length < 1 || this.state.last_name.length < 1 || this.state.zip < 1 || this.state.number.length < 1){
      Toast.show('Please fill all required fields')
    } else if (this.state.number.length != 10) {
      Toast.show('Invalid Mobile Number')
    }else if(this.state.password.length < 8){
       Toast.show('Password must be up to 8 characters')
    } else{
      this.setState({regLoader: true})
      var bodyParameters = {
        email: this.state.email,
        password: this.state.password,
        address: this.state.address,
       // zipcode: this.state.zip,
        mobile_number: this.state.number,
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        device_token: this.state.fcmToken
      }
      axios
      .post(API_URL+"users", bodyParameters, {
        timeout: 20000
      })
      .then(response => {
        console.log(response);
        let id = response.data.data._id;
        let token = response.data.token;
        this.props.setToken(token);
        this.props.setId(id);
        this.setState({ regLoader: false });
      //  Toast.show('Sign in successful');
      this.props.navigation.navigate("Dashboard", {});
          })
          .catch(error => {
            console.log(error);
            this.setState({ regLoader: false }); 
            if (error.response.data) {
              Toast.show(error.response.data.message);
              console.log(JSON.stringify(error));
            }
          });
    }
  }
  render() {
    return (
     <View style={styles.container}>
     <TouchableOpacity onPress={()=> this.props.navigation.goBack()}
     hitSlop={{left: 2, right: 2, top: 2, bottom: 2}}>
      <Image 
          source={require('../../assets/images/leftback.png')}
          resizeMode={'contain'}
          style={styles.leftImage}
      />
      </TouchableOpacity>
      <ScrollView>
       <Text style={styles.createText}>Create Account</Text>
       <View style={styles.fullNameView}>
       <Text style={styles.fullNameText}>
       Full name
       </Text>
       </View>
       <View style={styles.numberViewRow}>
        <View style={this.state.first_name_text_input?styles.focusedSubNameFieldView:styles.subNameFieldView}>
       <TextInput
              underlineColorAndroid={"transparent"}
              allowFontScaling={false}
              placeholder="Enter First Name"
              returnKeyType={'next'}
              ref={ (input) => {this.firstNameTextInput = input }}
              blurOnSubmit={false}
              onFocus={()=> this.setState({first_name_text_input: true})}
              onBlur={()=> this.setState({first_name_text_input: false})}
              onSubmitEditing={()=> {this.lastNameTextInput.focus();}}
              placeholderTextColor="#c4c4c4"
              autoFocus={true}
              style={styles.textFieldInput}
              value={this.state.first_name}
              onChangeText={first_name => this.setState({first_name})}
            />
       </View>
       <View style={this.state.last_name_text_input?styles.focusedSubNameFieldView:styles.subNameFieldView}>
       <TextInput
              underlineColorAndroid={"transparent"}
              allowFontScaling={false}
              placeholder="Enter Last Name"
              returnKeyType={'next'}
              ref={ (input) => {this.lastNameTextInput = input }}
              blurOnSubmit={false}
              onFocus={()=> this.setState({last_name_text_input: true})}
              onBlur={()=> this.setState({last_name_text_input: false})}
              onSubmitEditing={()=> {this.emailTextInput.focus();}}
              placeholderTextColor="#c4c4c4"
              style={styles.textFieldInput}
              value={this.state.last_name}
              onChangeText={last_name => this.setState({last_name})}
            />
       </View>
       </View>

       <View style={styles.fullNameView}>
       <Text style={styles.fullNameText}>
       Email
       </Text>
       </View>
       <View style={this.state.email_text_input?styles.focusedTextFieldView:styles.textFieldView}>
       <TextInput
              underlineColorAndroid={"transparent"}
              allowFontScaling={false}
              placeholder="Enter Email"
              returnKeyType={'next'}
              ref={ (input) => {this.emailTextInput = input }}
              blurOnSubmit={false}
              onFocus={()=> this.setState({email_text_input: true})}
              onBlur={()=> this.setState({email_text_input: false})}
              onSubmitEditing={()=> {this.passwordTextInput.focus();}}
              placeholderTextColor="#c4c4c4"
              style={styles.textFieldInput}
              value={this.state.email}
              onChangeText={email => this.setState({email})}
            />
       </View>
       <View style={styles.fullNameView}>
       <Text style={styles.fullNameText}>
       Password
       </Text>
       </View>
       <View style={this.state.password_text_input?styles.focusedTextFieldView:styles.textFieldView}>
       <TextInput
              underlineColorAndroid={"transparent"}
              allowFontScaling={false}
              securedTextEntry={true}
              placeholder="Enter Password, at least 8 characters"
              returnKeyType={'next'}
              ref={ (input) => {this.passwordTextInput = input }}
              blurOnSubmit={false}
              onFocus={()=> this.setState({password_text_input: true})}
              onBlur={()=> this.setState({password_text_input: false})}
              onSubmitEditing={()=> {this.numberTextInput.focus();}}
              placeholderTextColor="#c4c4c4"
              style={styles.textFieldInput}
              value={this.state.password}
              onChangeText={password => this.setState({password})}
            />
       </View>
       <View style={styles.fullNameView}>
       <Text style={styles.fullNameText}>
       Mobile Number
       </Text>
       </View>
           <View style={!this.state.number_text_input?styles.numberFieldView:styles.focusedNumberFieldView}>
           <TextInput
              underlineColorAndroid={"transparent"}
              allowFontScaling={false}
              placeholder="Enter Mobile Number"
              returnKeyType={'next'}
              keyboardType={'numeric'}
              value={this.state.number}
              onChangeText={number => this.setState({number})}
              ref={ (input) => {this.numberTextInput = input }}
              blurOnSubmit={false}
              onFocus={()=> this.setState({number_text_input: true})}
              onBlur={()=> this.setState({number_text_input: false})}
              onSubmitEditing={()=> {
                  if(this.state.number && this.state.number.length ==  10){
                      this.addressTextInput.focus();}
                      }
                  }
              placeholderTextColor="#c4c4c4"
              style={styles.textFieldInput}
            />
           </View>
       <View style={styles.fullNameView}>
       <Text style={styles.fullNameText}>
       Address
       </Text>
       </View>
       <View style={this.state.address_text_input?styles.focusedTextFieldView:styles.textFieldView}>
       <TextInput
              underlineColorAndroid={"transparent"}
              allowFontScaling={false}
              placeholder="Enter Address"
              returnKeyType={'next'}
              ref={ (input) => {this.addressTextInput = input }}
              blurOnSubmit={false}
              onFocus={()=> this.setState({address_text_input: true})}
              onBlur={()=> this.setState({address_text_input: false})}
              onSubmitEditing={this.createAccount.bind(this)}
              placeholderTextColor="#c4c4c4"
              style={styles.textFieldInput}
              value={this.state.address}
              onChangeText={address => this.setState({address})}
            />
       </View>
       <TouchableOpacity onPress={()=> this.props.navigation.navigate('SignIn')}>
       <Text style={{width: '88%', alignSelf: 'center', textAlign: 'center', color: '#769CF1',
       fontSize: 14, marginTop: 10, marginBottom: 10, fontFamily: 'mont-reg'}}>
         Already User?, Sign In
       </Text></TouchableOpacity>
       <TouchableOpacity onPress={this.createAccount.bind(this)}>
       <View style={styles.continueView}>
          <Text style={styles.continueText}>
          CONTINUE
          </Text>
        </View></TouchableOpacity>
        </ScrollView>
      {this.state.regLoader?<Loader /> :null} 
     </View>
    );
  }
}
const CreateAccount = connect(
  mapStateToProps, mapDispatchToProps
)(reduxCreateAccount);
export default CreateAccount;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: '#fff'
      },
    leftImage: {
        marginLeft: 20,
        marginTop: 20,
        width: 20,
        height: 20
    },
    bottomBox: {
        backgroundColor: '#fff',
        height: '100%',
        width: '100%',
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        paddingTop: 20, 
        flexDirection: 'column',
        alignSelf: 'flex-end'
    },
    createText: {
        fontFamily: 'mont-semi',
        alignSelf: 'center',
        fontSize: 21,
        color: '#769CF1',
        marginTop: 20
    },
    fullNameView: {
        width: '87.5%', 
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 7
    },
    fullNameText: {
        color: '#000',
         fontFamily: 'mont-semi',
         fontSize: 10
    },
    textFieldView: {
        width: '88%',
        height: 50,
        //borderRadius: 3,
        borderBottomColor: '#c4c4c4',
        borderBottomWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 23,
        alignSelf: 'center'
    },
    focusedTextFieldView: {
      width: '88%',
      height: 50,
     // borderRadius: 3,
      borderBottomColor: '#769CF1',
      borderBottomWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 23,
      alignSelf: 'center'
  },  
  subNameFieldView: {
      width: '45%',
      height: 50,
   //   borderRadius: 3,
      borderBottomColor: '#c4c4c4',
      borderBottomWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center'
  },
  focusedSubNameFieldView: {
    width: '45%',
    height: 50,
    //borderRadius: 3,
    borderBottomColor: '#769CF1',
    borderBottomWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  numberViewRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent:'space-between',
      alignSelf: 'center',
      marginBottom: 23
  },
  dialCodeView: {
      borderColor: '#769CF1',
      width: 68,
      height: 50,
      borderRadius: 3,
      alignItems: 'center',
      justifyContent: 'space-around',
      flexDirection: 'row'
  },
  dialCodeText: {
      color: '#000',
      fontSize: 11,
      fontFamily: 'mont-reg'
  },
  focusedNumberFieldView: {
    width: '88%',
    height: 50,
   // borderRadius: 3,
    borderBottomColor: '#769CF1',
    borderBottomWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 23,
    alignSelf: 'center'
},   
numberFieldView: {
  width: '88%',
  height: 50,
  //borderRadius: 3,
  borderBottomColor: '#c4c4c4',
  borderBottomWidth: 1,
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 23,
  alignSelf: 'center'
},   
textFieldInput: {
    width: '100%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#000',
    fontSize: 16,
     fontFamily: "mont-medium",
     paddingLeft: -1
 },
 continueView:{
    width:'87.5%',
    height:45,
    backgroundColor:'#769CF1',
    alignItems:'center',
    justifyContent:'center',
    marginTop:30,
    alignSelf:'center',
    borderRadius:10,
    marginBottom: 10
},
continueText:{
    color:'#fff',
    fontFamily:'mont-semi',
    fontSize:16
}
});
