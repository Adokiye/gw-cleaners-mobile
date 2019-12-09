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
import SwitchSelector from "react-native-switch-selector";
type Props = {};
import { connect } from "react-redux";
const mapStateToProps = state => ({
  ...state
});
const options = [
    { label: "", value: "true",  },
    { label: "", value: "false", },
  ];
class reduxPreferences extends Component<Props> {
  static navigationOptions = {
    header: null,
    drawerLockMode: "locked-closed"
  };
  
  constructor(props) {
    super(props);
    this.state = {
     regLoader: false,
     separateWhites: '',
     softener: '',
     crease: '',
     starch: '',
     price: ''
    };
  }
  componentDidMount(){
  }
  order(){
 //  this.setState({regLoader: true})
   if(this.state.separateWhites){
      this.setState({price: 300})
   }
   let preference = '';
   if(this.state.separateWhites){
       preference = preference+ 'Separate Whites, '
   }
   if(this.state.softener){
       preference = preference+ 'Softener, '
   }
   if(this.state.crease){
       preference= preference+ 'Crease, '
   }
   if(this.state.starch){
       preference = preference+ 'Starch, '
   }
   this.props.navigation.navigate('MyCards', {order: true, preference: preference, price: this.state.price})
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
                   Preferences
                </Text>                
                <Text style={styles.dateText}>
                 Select Preferences
                </Text>
            </View>
        </View>
        <ScrollView contentContainerStyle={{flexGrow: 1}}
        showVerticalScrollIndicator={false}>
        <View style={styles.clothTypeView}>
            <Text style={styles.clothTypeText}>Laundry</Text>
        </View>
        <View style={styles.explainedBox}>
        <Text style={styles.detailsText}>all clothes will be washed together if the button is turned off</Text>
            <Image 
                source={require('../assets/images/separateWhites.png')}
                resizeMode={'contain'}
                style={{width: 68, height: 44}}
            />
            <View style={styles.explainedSmallView}>
                <Text style={styles.explainedTitle}>Seperate Whites ($3)</Text>
            </View>
            <View style={{width: 58}}>
            <SwitchSelector
            initial={0}
            onPress={value => this.setState({ separateWhites: value })}
            //selectedColor={colors.white}
            buttonMargin={3}
            buttonColor={'#1bc47d'}
            borderColor={'#1bc47d'}
            backgroundColor={'#f4f4f4'}
            height={23}
            borderRadius={12.5}
            options={options}
            />
            </View>
        </View>
        <View style={styles.explainedBox}>
            <Image 
                source={require('../assets/images/softener.png')}
                resizeMode={'contain'}
                style={{width: 38, height: 38}}
            />
            <View style={styles.explainedSmallView}>
                <Text style={styles.explainedTitle}>Softener</Text>
            </View>
            <View style={{width: 58}}>
            <SwitchSelector
            initial={0}
            onPress={value => this.setState({ softener: value })}
            //selectedColor={colors.white}
            buttonMargin={3}
            buttonColor={'#1bc47d'}
            borderColor={'#1bc47d'}
            backgroundColor={'#f4f4f4'}
            height={23}
            borderRadius={12.5}
            options={options}
            />
            </View>
        </View>
        <View style={styles.clothTypeView}>
            <Text style={styles.clothTypeText}>DryCleaning</Text>
        </View>
        <View style={styles.explainedBox}>
            <Image 
                source={require('../assets/images/crease.png')}
                resizeMode={'contain'}
                style={{width: 68, height: 44}}
            />
            <View style={styles.explainedSmallView}>
                <Text style={styles.explainedTitle}>Crease</Text>
            </View>
            <View style={{width: 58}}>
            <SwitchSelector
            initial={0}
            onPress={value => this.setState({ crease: value })}
            //selectedColor={colors.white}
            buttonMargin={3}
            buttonColor={'#1bc47d'}
            borderColor={'#1bc47d'}
            backgroundColor={'#f4f4f4'}
            height={23}
            borderRadius={12.5}
            options={options}
            />
            </View>
        </View>
        <View style={styles.explainedBox}>
            <Image 
                source={require('../assets/images/starch.png')}
                resizeMode={'contain'}
                style={{width: 68, height: 44}}
            />
            <View style={styles.explainedSmallView}>
                <Text style={styles.explainedTitle}>Starch</Text>
            </View>
            <View style={{width: 58}}>
            <SwitchSelector
            initial={0}
            onPress={value => this.setState({ starch: value })}
            //selectedColor={colors.white}
            buttonMargin={3}
            buttonColor={'#1bc47d'}
            borderColor={'#1bc47d'}
            backgroundColor={'#f4f4f4'}
            height={23}
            borderRadius={12.5}
            options={options}
            />
            </View>
        </View>
        <TouchableOpacity onPress={this.order.bind(this)}>
        <View style={styles.circleView}>
         <Image 
             source={require('../assets/images/rightArrow.png')}
             resizeMode={'contain'}
             style={{width: 20, height: 20}}
         />
           </View></TouchableOpacity>
        </ScrollView>
        {this.state.regLoader?<Loader /> :null} 
        </View>
    );
  }
}
const Preferences = connect(
  mapStateToProps,
)(reduxPreferences);
export default Preferences;
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
     //     justifyContent: 'space-between',
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
      clothTypeView: {
          width: '87.5%', 
          marginTop: 17,
          alignSelf: 'center',
          marginBottom: 10
      },
      clothTypeText: {
          color: '#000',
          fontFamily: 'proExtraBold',
          fontSize: 18
      },
      explainedBox: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          width: '90%',
          height: 84,
          marginBottom: 29,
          alignSelf: 'center',
          elevation: 2,
          backgroundColor: '#fff'
      },
      explainedSmallView: {
          flexDirection: 'column'
      },
      explainedTitle: {
          fontSize: 17,
          fontFamily: 'proBold',
          color: '#000'
      }, 
      detailsText: {
          fontFamily: 'proRegular',
          fontSize: 8,
          color: '#FF0707',
          position:'absolute',
          bottom: 2
      },
      circleView:{
          width: 43,
          height: 43,
          borderRadius: 43/2,
          alignSelf: 'center',
          backgroundColor: '#1bc47d',
          alignItems: 'center',
          justifyContent: 'center', 
          marginTop: 20,
          marginBottom: 10
      }
});
