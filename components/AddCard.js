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
  TextInput
} from "react-native";
type Props = {};
import { connect } from "react-redux";
import Loader from "./Includes/Loader";
import { API_URL, APPLICATION_ID, LOCATION_ID } from '../root.js';
import axios from "axios";
import Toast from 'react-native-simple-toast';
import {
  SQIPCardEntry,
} from 'react-native-square-in-app-payments';
const mapStateToProps = state => ({
  ...state
});
class reduxAddCard extends Component<Props> {
  static navigationOptions = {
    header: null,
    drawerLockMode: "locked-closed"
  };
  
  constructor(props) {
    super(props);
    this.state = {
     regLoader: false,
     cvv: '',
     cvv_text_input: false,
     number: '',
     card_number_text_input: false,
     month: '',
     month_text_input: false,
     year: '',
     year_text_input: false
    };
    this.onStartCardEntry = this.onStartCardEntry.bind(this);
    this.onCardNonceRequestSuccess = this.onCardNonceRequestSuccess.bind(this);
  }
  componentDidMount(){
    Toast.show('Please wait a moment, you\'ll soon be redirected');
    this.onStartCardEntry();
  }
    /**
   * Callback when the card entry is closed after call 'SQIPCardEntry.completeCardEntry'
   */
  onCardEntryComplete() {
    const {params} = this.props.navigation.state;
    Toast.show('Card  Added Successfully')
    if(params.order){
      this.props.navigation.navigate('OrderProcessed')
    }else{
      this.props.navigation.navigate('Dashboard')
    }
    
  }
    /**
   * Callback when successfully get the card nonce details for processig
   * card entry is still open and waiting for processing card nonce details
   * @param {*} cardDetails
   */
  async onCardNonceRequestSuccess(cardDetails) {
    try {
      // take payment with the card details
      // await chargeCard(cardDetails);

      const {params} = this.props.navigation.state;
      console.log(JSON.stringify(params)+"addcard")
      if(params.order){ 
             var config = {
        headers: {'Authorization': "Bearer " + this.props.token},
        timeout: 20000
    };
      var bodyParameters = {
        nonce: cardDetails.nonce,
        user_id: this.props.id,
        price: params.price||null,
        preference: params.preference||null
      };
      await  axios
      .post(API_URL+"cards", bodyParameters, config)
      .then(response => {
        console.log(response);
              SQIPCardEntry.completeCardEntry(
        this.onCardEntryComplete(),
      );
          })
          .catch(error => {
            console.log(error);
            this.setState({ regLoader: false }); 
            if (error) {
              Toast.show(error.response.data.message);
          //    this.props.navigation.navigate('Dashboard')
              console.log(JSON.stringify(error));
            }
          });
      }else{
        await SQIPCardEntry.completeCardEntry(
          this.onCardEntryComplete(),
        );
      }

      // payment finished successfully
      // you must call this method to close card entry

    } catch (ex) {
      // payment failed to complete due to error
      // notify card entry to show processing error
      Toast.show(ex.message);
      await SQIPCardEntry.showCardNonceProcessingError(ex.message);
    }
  }
    /**
   * Callback when card entry is cancelled and UI is closed
   */
  onCardEntryCancel() {
   Toast.show('Cancelled')
  // this.props.navigation.navigate('Dashboard')
  }
  async onStartCardEntry() {
    const cardEntryConfig = {
      collectPostalCode: true,
    };
    await SQIPCardEntry.startCardEntryFlow(
      cardEntryConfig,
      this.onCardNonceRequestSuccess,
      this.onCardEntryCancel,
    );
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
                   Add Card
                </Text>        
            </View>
        </View>
        {/* <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.fullNameView}>
       <Text style={styles.fullNameText}>
       Card Number
       </Text>
       </View>
       <View style={this.state.card_number_text_input?styles.focusedTextFieldView:styles.textFieldView}>
       <TextInput
              underlineColorAndroid={"transparent"}
              allowFontScaling={false}
              autoFocus={true}
              placeholder="Enter Card  Number"
              returnKeyType={'next'}
              keyboardType={'numeric'}
              onChangeText={text => {
                    this.setState({ number: text })
                    if(text && text.length == 16){
                      this.monthTextInput.focus()
                    }
                    }}
              onSubmitEditing={()=> {
                  if(this.state.number && this.state.number == 16){
                      this.monthTextInput.focus();}
                      }
                  }
        //      ref={ (input) => {this.zipTextInput = input }}
              blurOnSubmit={false}
              onFocus={()=> this.setState({card_number_text_input: true})}
              onBlur={()=> this.setState({card_number_text_input: false})}
              placeholderTextColor="#B9B2B2"
              style={styles.textFieldInput}
            />
       </View>
       <View style={styles.numberAndDateView}>
       <View style={this.state.month_text_input?styles.focusedSmallTextFieldView:styles.smallTextFieldView}>
       <TextInput
              underlineColorAndroid={"transparent"}
              allowFontScaling={false}
              placeholder="mm"
              returnKeyType={'next'}
              keyboardType={'numeric'}
              onChangeText={text => {
                    this.setState({ month: text })
                    if(text && text.length == 2){
                      this.yearTextInput.focus()
                    }
                    }}
              onSubmitEditing={()=> {
                  if(this.state.month && this.state.month == 2){
                      this.yearTextInput.focus();}
                      }
                  }
        //      ref={ (input) => {this.zipTextInput = input }}
              blurOnSubmit={false}
              onFocus={()=> this.setState({month_text_input: true})}
              onBlur={()=> this.setState({month_text_input: false})}
              placeholderTextColor="#B9B2B2"
              style={styles.textFieldInput}
            />
       </View>
       <View style={this.state.year_text_input?styles.focusedSmallTextFieldView:styles.smallTextFieldView}>
       <TextInput
              underlineColorAndroid={"transparent"}
              allowFontScaling={false}
              placeholder="yy"
              returnKeyType={'next'}
              keyboardType={'numeric'}
              onChangeText={text => {
                    this.setState({ year: text })
                    if(text && text.length == 2){
                      this.cvvTextInput.focus()
                    }
                    }}
              onSubmitEditing={()=> {
                  if(this.state.year && this.state.year == 2){
                      this.cvvTextInput.focus();}
                      }
                  }
        //      ref={ (input) => {this.zipTextInput = input }}
              blurOnSubmit={false}
              onFocus={()=> this.setState({year_text_input: true})}
              onBlur={()=> this.setState({year_text_input: false})}
              placeholderTextColor="#B9B2B2"
              style={styles.textFieldInput}
            />
       </View>
       <View style={this.state.cvv_text_input?styles.focusedSmallTextFieldView:styles.smallTextFieldView}>
       <TextInput
              underlineColorAndroid={"transparent"}
              allowFontScaling={false}
              placeholder="cvv"
              returnKeyType={'next'}
              keyboardType={'numeric'}
              onChangeText={text => {
                    this.setState({ cvv: text })
                    if(text && text.length == 2){
                      this.cvvTextInput.blur()
                    } 
                    }}
        //      ref={ (input) => {this.zipTextInput = input }}
              blurOnSubmit={false}
              onFocus={()=> this.setState({cvv_text_input: true})}
              onBlur={()=> this.setState({cvv_text_input: false})}
              placeholderTextColor="#B9B2B2"
              style={styles.textFieldInput}
            />
       </View>
       </View>
       <TouchableOpacity onPress={()=> this.props.navigation.navigate('CardSuccess')}>
       <View style={styles.continueView}>
          <Text style={styles.continueText}>
          ADD CARD
          </Text>
        </View></TouchableOpacity>
        </ScrollView> */}
        </View>
    );
  }
}
const AddCard = connect(
  mapStateToProps,
)(reduxAddCard);
const dimensions = Dimensions.get("window");
const Width = dimensions.width;
export default AddCard;
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
       numberAndDateView: {
         width: '87.5%',
         flexDirection: 'row',
         justifyContent: 'space-between',
         alignSelf: 'center',
         marginBottom: 23
       },
       textFieldView: {
        width: '87.5%',
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
      width: '87.5%',
      height: 50,
      borderRadius: 3,
      borderColor: '#1bc47d',
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 23,
      alignSelf: 'center'
  },  
  smallTextFieldView: {
    width: '29%',
    height: 50,
    borderRadius: 3,
    borderColor: '#fefefe',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 23,
    alignSelf: 'center'
},
focusedSmallTextFieldView: {
  width: '29%',
  height: 50,
  borderRadius: 3,
  borderColor: '#1bc47d',
  borderWidth: 1,
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
  fontSize: 14,
   fontFamily: "proRegular",
//   paddingLeft: 15
},
continueView:{
  width:Width*(87.5/100),
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
