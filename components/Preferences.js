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
import { setPreferences,  setPrice  } from "../actions/index";
const mapDispatchToProps = dispatch => {
    return {
        setPreferences: preferences => dispatch(setPreferences(preferences)),
        setPrice: price => dispatch(setPrice(price)),
    };
  };
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
     price: '',
     hang_dry: '',
     hypo: '',
     bleach_white: ''
    };
  }
  componentDidMount(){
  }
  order(){
      this.props.setPreferences('')
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
   if(this.state.hang_dry){
    preference = preference+ 'Hang Dry, '
}
if(this.state.hypo){
    preference = preference+ 'Hypoallergenic Soap, '
}
if(this.state.bleach_white){
    preference = preference+ 'Bleach White, '
}
   if(preference){
       this.props.setPreferences(preference)
   }
   this.props.navigation.navigate('Confirm', {order: true, preference: preference, price: this.state.price})
}
  render() {
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
            buttonColor={'#769CF1'}
            borderColor={'#769CF1'}
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
            buttonColor={'#769CF1'}
            borderColor={'#769CF1'}
            backgroundColor={'#f4f4f4'}
            height={23}
            borderRadius={12.5}
            options={options}
            />
            </View>
        </View>
        <View style={styles.explainedBox}>
            {/* <Image 
                source={require('../assets/images/softener.png')}
                resizeMode={'contain'}
                style={{width: 38, height: 38}}
            /> */}
            <View style={styles.explainedSmallView}>
                <Text style={styles.explainedTitle}>Hang Dry($1)</Text>
            </View>
            <View style={{width: 58}}>
            <SwitchSelector
            initial={0}
            onPress={value => this.setState({ hang_dry: value })}
            //selectedColor={colors.white}
            buttonMargin={3}
            buttonColor={'#769CF1'}
            borderColor={'#769CF1'}
            backgroundColor={'#f4f4f4'}
            height={23}
            borderRadius={12.5}
            options={options}
            />
            </View>
        </View>
        <View style={styles.explainedBox}>
            {/* <Image 
                source={require('../assets/images/softener.png')}
                resizeMode={'contain'}
                style={{width: 38, height: 38}}
            /> */}
            <View style={styles.explainedSmallView}>
                <Text style={styles.explainedTitle}>Hypoallergenic soap($2)</Text>
            </View>
            <View style={{width: 58}}>
            <SwitchSelector
            initial={0}
            onPress={value => this.setState({ hypo: value })}
            //selectedColor={colors.white}
            buttonMargin={3}
            buttonColor={'#769CF1'}
            borderColor={'#769CF1'}
            backgroundColor={'#f4f4f4'}
            height={23}
            borderRadius={12.5}
            options={options}
            />
            </View>
        </View>
        <View style={styles.explainedBox}>
            {/* <Image 
                source={require('../assets/images/softener.png')}
                resizeMode={'contain'}
                style={{width: 38, height: 38}}
            /> */}
            <View style={styles.explainedSmallView}>
                <Text style={styles.explainedTitle}>Low dry($2)</Text>
            </View>
            <View style={{width: 58}}>
            <SwitchSelector
            initial={0}
            onPress={value => this.setState({ low_dry: value })}
            //selectedColor={colors.white}
            buttonMargin={3}
            buttonColor={'#769CF1'}
            borderColor={'#769CF1'}
            backgroundColor={'#f4f4f4'}
            height={23}
            borderRadius={12.5}
            options={options}
            />
            </View>
        </View>
                <View style={styles.explainedBox}>
            {/* <Image 
                source={require('../assets/images/softener.png')}
                resizeMode={'contain'}
                style={{width: 38, height: 38}}
            /> */}
            <View style={styles.explainedSmallView}>
                <Text style={styles.explainedTitle}>Bleach white</Text>
            </View>
            <View style={{width: 58}}>
            <SwitchSelector
            initial={0}
            onPress={value => this.setState({ bleach_white: value })}
            //selectedColor={colors.white}
            buttonMargin={3}
            buttonColor={'#769CF1'}
            borderColor={'#769CF1'}
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
            buttonColor={'#769CF1'}
            borderColor={'#769CF1'}
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
            buttonColor={'#769CF1'}
            borderColor={'#769CF1'}
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
  mapStateToProps, mapDispatchToProps
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
          backgroundColor: '#769CF1',
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
          fontFamily: 'mont-reg',
          fontSize: 13,
          color: '#fff'
      },
      hiText: {
          color: '#fff',
          fontFamily: 'mont-semi',
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
          fontFamily: 'mont-extraBold',
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
          fontFamily: 'mont-semi',
          color: '#000'
      }, 
      detailsText: {
          fontFamily: 'mont-reg',
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
          backgroundColor: '#769CF1',
          alignItems: 'center',
          justifyContent: 'center', 
          marginTop: 20,
          marginBottom: 10
      }
});
