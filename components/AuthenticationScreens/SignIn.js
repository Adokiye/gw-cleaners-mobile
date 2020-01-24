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
  AsyncStorage
} from "react-native";
import Toast from 'react-native-simple-toast';
import { API_URL } from '../../root.js';
import HideWithKeyboard from "react-native-hide-with-keyboard";
import axios from "axios";
import Loader from "../Includes/Loader";
import { connect } from "react-redux";
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
     error_message: ''
    };
  }
  // 08029694883
  componentDidMount(){
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
        password: this.state.password
      };
      Toast.show(API_URL);
      axios
      .post(API_URL+"login", bodyParameters, {
        timeout: 20000
      })
      .then(response => {
        console.log(response);
        let id = response.data.data._id;
        let token = response.data.token;
        this.props.setToken(token);
        this.props.setId(id);
        this.setState({ regLoader: false });
        Toast.show('Sign in successful');
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
       <Text style={styles.createText}>Sign In</Text>
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
              placeholderTextColor="#B9B2B2"
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
              placeholderTextColor="#B9B2B2"
              style={styles.textFieldInput}
            />
       </View></ScrollView>
       <TouchableOpacity onPress={()=> this.props.navigation.navigate('CreateAccount')}>
       <Text style={{width: '88%', alignSelf: 'center', textAlign: 'center', color: '#1bc47d',
       fontSize: 10, marginTop: 10, marginBottom: 10, fontFamily: 'proRegular'}}>
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
        backgroundColor: '#1bc47d'
      },
    leftImage: {
        marginLeft: 20,
        marginTop: 20,
        width: 20,
        height: 20
    },
    bottomBox: {
        backgroundColor: '#fff',
        height: '90%',
        width: '100%',
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        paddingTop: 20, 
        flexDirection: 'column',
        alignSelf: 'flex-end'
    },
    createText: {
        fontFamily: 'proBold',
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
         fontFamily: 'proBold',
         fontSize: 10
    },
    textFieldView: {
        width: '88%',
        height: 50,
        borderRadius: 3,
        borderColor: '#fefefe',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 23,
        alignSelf: 'center'
    },
    focusedTextFieldView: {
      width: '88%',
      height: 50,
      borderRadius: 3,
      borderColor: '#1bc47d',
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 23,
      alignSelf: 'center'
  },  
  subNameFieldView: {
      width: '45%',
      height: 50,
      borderRadius: 3,
      borderColor: '#fefefe',
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center'
  },
  focusedSubNameFieldView: {
    width: '45%',
    height: 50,
    borderRadius: 3,
    borderColor: '#1bc47d',
    borderWidth: 1,
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
      borderColor: '#1bc47d',
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
      fontFamily: 'proRegular'
  },
  focusedNumberFieldView: {
    width: '60%',
    height: 50,
    borderRadius: 3,
    borderColor: '#1bc47d',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
},   
numberFieldView: {
    width: '60%',
    height: 50,
    borderRadius: 3,
    borderColor: '#fefefe',
    borderWidth: 1,
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
     fontFamily: "proSemi",
     paddingLeft: -1
 },
 continueView:{
    width:'87.5%',
    height:42,
    backgroundColor:'#1BC47D',
    alignItems:'center',
    justifyContent:'center',
    marginTop:30,
    alignSelf:'center',
    borderRadius:3,
    marginBottom: 10
},
continueText:{
    color:'#fff',
    fontFamily:'proBold',
    fontSize:13
}
});
