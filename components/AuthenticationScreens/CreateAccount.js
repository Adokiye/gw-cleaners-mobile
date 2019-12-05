import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  StatusBar,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity
} from "react-native";
//import LoaderModal from './Modals/LoaderModal';
//var SharedPreferences = require("react-native-shared-preferences");
type Props = {};
//import { connect } from "react-redux";
/*const mapStateToProps = state => ({
  ...state
});*/
class CreateAccount extends Component<Props> {
  static navigationOptions = {
    header: null,
    drawerLockMode: "locked-closed"
  };
  constructor(props) {
    super(props);
    this.state = {
     regLoader: false,
     full_name_text_input: true, 
     email_text_input: false,
     number_text_input: false,
     address_text_input: false,
     zip_text_input: false, 
     number: ''
    };
  }
  componentDidMount(){
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
       <Text style={styles.createText}>Create Account</Text>
       <View style={styles.fullNameView}>
       <Text style={styles.fullNameText}>
       Full name
       </Text>
       </View>
       <View style={this.state.full_name_text_input?styles.focusedTextFieldView:styles.textFieldView}>
       <TextInput
              underlineColorAndroid={"transparent"}
              allowFontScaling={false}
              placeholder="Enter Full Name"
              returnKeyType={'next'}
              ref={ (input) => {this.fullNameTextInput = input }}
              blurOnSubmit={false}
              onFocus={()=> this.setState({full_name_text_input: true})}
              onBlur={()=> this.setState({full_name_text_input: false})}
              onSubmitEditing={()=> {this.emailTextInput.focus();}}
              placeholderTextColor="#B9B2B2"
              autoFocus={true}
              style={styles.textFieldInput}
            />
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
              onSubmitEditing={()=> {this.numberTextInput.focus();}}
              placeholderTextColor="#B9B2B2"
              style={styles.textFieldInput}
            />
       </View>
       <View style={styles.fullNameView}>
       <Text style={styles.fullNameText}>
       Phone Number
       </Text>
       </View>
       <View style={styles.numberViewRow}>
           <View style={styles.dialCodeView}>
               <Image 
                   source={require('../../assets/images/usa.png')}
                   resizeMode={'contain'}
                   style={{width: 21, height: 21}}
               />
               <Text style={styles.dialCodeText}>+1</Text>
           </View>
           <View style={!this.state.number_text_input?styles.numberFieldView:styles.focusedNumberFieldView}>
           <TextInput
              underlineColorAndroid={"transparent"}
              allowFontScaling={false}
              placeholder="Enter Mobile Number"
              returnKeyType={'next'}
              keyboardType={'numeric'}

              ref={ (input) => {this.numberTextInput = input }}
              blurOnSubmit={false}
              onFocus={()=> this.setState({number_text_input: true})}
              onBlur={()=> this.setState({number_text_input: false})}
              onSubmitEditing={()=> {
                  if(this.state.number && this.state.number ==  10){
                      this.addressTextInput.focus();}
                      }
                  }
              placeholderTextColor="#B9B2B2"
              style={styles.textFieldInput}
            />
           </View>
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
              onSubmitEditing={()=> {this.zipTextInput.focus();}}
              placeholderTextColor="#B9B2B2"
              style={styles.textFieldInput}
            />
       </View>
       <View style={styles.fullNameView}>
       <Text style={styles.fullNameText}>
       Zip code
       </Text>
       </View>
       <View style={this.state.zip_text_input?styles.focusedTextFieldView:styles.textFieldView}>
       <TextInput
              underlineColorAndroid={"transparent"}
              allowFontScaling={false}
              placeholder="Enter Zip code"
              returnKeyType={'next'}
              keyboardType={'numeric'}
              ref={ (input) => {this.zipTextInput = input }}
              blurOnSubmit={false}
              onFocus={()=> this.setState({zip_text_input: true})}
              onBlur={()=> this.setState({zip_text_input: false})}
              placeholderTextColor="#B9B2B2"
              style={styles.textFieldInput}
            />
       </View></ScrollView>
       <TouchableOpacity onPress={()=> this.props.navigation.navigate('WelcomeAnimation')}>
       <View style={styles.continueView}>
          <Text style={styles.continueText}>
          CONTINUE
          </Text>
        </View></TouchableOpacity>
      </View>
      
     </View>
    );
  }
}
/*const Splash = connect(
  mapStateToProps,
)(reduxSplash);*/
export default CreateAccount;
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
     fontFamily: "proRegular",
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
