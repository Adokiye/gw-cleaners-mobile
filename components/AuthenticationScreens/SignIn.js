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
import Toast from 'react-native-simple-toast';
import { API_URL } from '../../root.js';
import HideWithKeyboard from "react-native-hide-with-keyboard";
import axios from "axios";
import Loader from "../Includes/Loader";
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from "react-redux";
import firebase from "react-native-firebase";
import { setToken, setId,  } from "../../actions/index";
const mapStateToProps = state => ({
  ...state
});
const mapDispatchToProps = dispatch => {
  return {
    setToken: token => dispatch(setToken(token)),
    setId: id => dispatch(setId(id)),
  };
};
type Props = {};

class reduxSignIn extends Component<Props> {
  static navigationOptions = {
    header: null,
    drawerLockMode: "locked-closed"
  };
  constructor(props) {
    super(props);
    this.state = {
     regLoader: false,
     email_text_input: false,
     password_text_input: false,
     email_error: '',
     password_error: '',
     email: '',
     password: '',
     error: false,
     error_message: '',
     fcmToken: ''
    };
  }
  // 08029694883
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
 signIn(){
    let regg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (regg.test(this.state.email) === false) {
     Toast.show('Incorrect Credentials')
    } else if (this.state.password.length < 1 || this.state.email.length < 1) {
      Toast.show('Please fill all required fields')
    } else{
      this.setState({ regLoader: true });
      var bodyParameters = {
        email: this.state.email,
        password: this.state.password,
        device_token: this.state.fcmToken
      };
      Toast.show(API_URL);
      axios
      .post(API_URL+"login", bodyParameters, {
        timeout: 20000
      })
      .then( response => {
        console.log(response);
        let id = response.data.data._id;
        let token = response.data.token;
        this.props.setToken(token);
        this.props.setId(id);
        this.setState({ regLoader: false });
  //      await AsyncStorage.setItem('user_stats', JSON.stringify(user_stats));
        Toast.show('Log in successful');
        this.props.navigation.navigate("Dashboard", {});
          })
          .catch(error => {
            console.log(error);
            Toast.show(JSON.stringify(error.message),)
            this.setState({ regLoader: false }); 
            if (error.response) {
              Toast.show(error.response.message);
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
          source={require('../../assets/images/left.png')}
          resizeMode={'contain'}
          style={styles.leftImage}
      />
      </TouchableOpacity>
      <ScrollView></ScrollView>
      <View style={styles.bottomBox}>
      <ScrollView>
       <Text style={styles.createText}>Log In</Text>
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
              value={this.state.email}
              onChangeText={email => this.setState({ email })}
              onBlur={()=> this.setState({email_text_input: false})}
              onSubmitEditing={()=> {this.passwordTextInput.focus();}}
              placeholderTextColor="#a4b5db"
              style={styles.textFieldInput}
              autoFocus={true}
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
              placeholder="Enter Password"
              returnKeyType={'next'}
              secureTextEntry={true}
              ref={ (input) => {this.passwordTextInput = input }}
              blurOnSubmit={false}
              value={this.state.password}
              onChangeText={password => this.setState({password})}
              onFocus={()=> this.setState({password_text_input: true})}
              onBlur={()=> this.setState({password_text_input: false})}
              onSubmitEditing={this.signIn.bind(this)}
              placeholderTextColor="#a4b5db"
              style={styles.textFieldInput}
            />
       </View></ScrollView>
       <TouchableOpacity onPress={()=> this.props.navigation.navigate('CreateAccount')}>
       <Text style={{width: '88%', alignSelf: 'center', textAlign: 'center', color: '#769CF1',
       fontSize: 10, marginTop: 10, marginBottom: 10, fontFamily: 'mont-reg'}}>
         Don't Have an Account?, Sign Up
       </Text></TouchableOpacity>
       <TouchableOpacity onPress={this.signIn.bind(this)}>
       <View style={styles.continueView}>
          <Text style={styles.continueText}>
          Sign In
          </Text>
        </View></TouchableOpacity>
      </View>
     {this.state.regLoader?<Loader /> :null} 
     </View>
    );
  }
}
const SignIn = connect(
  mapStateToProps, mapDispatchToProps
)(reduxSignIn);
export default SignIn;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: '#769CF1'
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
        // borderTopLeftRadius: 35,
        // borderTopRightRadius: 35,
        paddingTop: 20, 
        flexDirection: 'column',
        alignSelf: 'flex-end'
    },
    createText: {
        fontFamily: 'mont-bold',
        alignSelf: 'center',
        fontSize: 21,
        color: '#000'
    },
    fullNameView: {
        width: '87.5%', 
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 7
    },
    fullNameText: {
        color: '#000',
         fontFamily: 'mont-bold',
         fontSize: 10
    },
    textFieldView: {
        width: '88%',
        height: 50,
       // borderRadius: 3,
        borderBottomColor: '#fefefe',
        borderBottomWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 23,
        alignSelf: 'center'
    },
    focusedTextFieldView: {
      width: '88%',
      height: 50,
      //borderRadius: 3,
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
     // borderRadius: 3,
      borderBottomColor: '#fefefe',
      borderBottomWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center'
  },
  focusedSubNameFieldView: {
    width: '45%',
    height: 50,
   // borderRadius: 3,
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
    //  borderRadius: 3,
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
    width: '60%',
    height: 50,
   // borderRadius: 3,
    borderBottomColor: '#769CF1',
    borderBottomWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
},   
numberFieldView: {
    width: '60%',
    height: 50,
    borderRadius: 3,
    borderBottomColor: '#fefefe',
    borderBottomWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
},   
textFieldInput: {
    width: '100%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#000',
    fontSize: 16,
     fontFamily: "mont-semi",
     paddingLeft: -1
 },
 continueView:{
    width:'87.5%',
    height:42,
    backgroundColor:'#769CF1',
    alignItems:'center',
    justifyContent:'center',
    marginTop:30,
    alignSelf:'center',
    borderRadius:3,
    marginBottom: 10
},
continueText:{
    color:'#fff',
    fontFamily:'mont-bold',
    fontSize:13
}
});
