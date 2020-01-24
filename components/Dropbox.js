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
import {
    setDropboxId,
    setDropboxAddress
  } from "../actions/index";
import { connect } from "react-redux";
const mapStateToProps = state => ({
  ...state
});
const mapDispatchToProps = dispatch => {
  return {
    setDropboxId: dropboxId => dispatch(setDropboxId(dropboxId)),
    setDropboxAddress: dropboxAddress => dispatch(setDropboxAddress(dropboxAddress)),
  };
};
class reduxSelectDropbox extends Component<Props> {
  static navigationOptions = {
    header: null,
    drawerLockMode: "locked-closed"
  };
  
  constructor(props) {
    super(props);
    this.state = {
     regLoader: false,
     separateWhites: '',
     dropbox: []
    };
    this.getApiData = this.getApiData.bind(this);
  }
  componentDidMount(){
    this.setState({regLoader: true})
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
      API_URL+"dropbox", config
    )
    .then(response => {
      console.log(response);
      if (response.data && response.data.length > 0) {
        console.log("response.data");
          console.log("here" + response.data);
          var len = response.data.length;
          this.setState({dropbox: []})
          for (let i = 0; i < len; i++) {
            let row = response.data[i];
              this.setState(prevState => ({
                dropbox: [...prevState.dropbox, row]
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
    let dropbox = '';
    dropbox = (
      <FlatList
      data={this.state.dropbox}
      renderItem={({ item, index }) => (
          <TouchableOpacity
          activeOpacity={0.7}
           onPress={()=> {
              this.props.setDropboxId(item.dropbox_id);
              this.props.setDropboxAddress(item.address);
              this.props.navigation.navigate('Schedule',)}}>
        <View style={styles.orderView}>
        <View style={styles.rightImageView}>
          <Image
            source={require('../assets/images/sideOrder.png')}
            style={{flex: 1}}
            resizeMode={'contain'}
           />
        </View>
        <Text style={styles.orderDetailsHeader}>
        {item.dropbox_id}
        </Text>
        <Text style={styles.orderDetailsSubText}>
        Dropbox:{item.address}{'\n'}
        </Text>
        </View></TouchableOpacity>
      )}
      keyExtractor={(item, index) => `list-item-${index}`}
    />
  );
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
                   Select Dropbox
                </Text>        
            </View>
        </View>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          {dropbox}
        </ScrollView>
        {this.state.regLoader?<Loader /> :null} 
        </View>
    );
  }
}
const SelectDropbox = connect(
  mapStateToProps, mapDispatchToProps
)(reduxSelectDropbox);
const dimensions = Dimensions.get("window");
const Width = dimensions.width;
export default SelectDropbox;
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
        fontFamily: 'proBold',
        color: '#000',
        fontSize: 17
      },
      orderDetailsSubText: {
        color: '#000',
        fontFamily: 'proRegular',
        fontSize: 13, 
      },
      inProcessTime: {
        fontFamily: 'proBoldItalic',
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
        fontFamily: 'proItalic',
        fontSize: 10,
        color: '#000'
      },
      completedCircle: {
        width: 11,
        height: 11, 
        borderRadius: 11/2,
        backgroundColor: '#1bc47d',
        marginRight: 5
      },
      inProcessCircle: {
        backgroundColor: '#FFCD29',
        width: 11,
        height: 11, 
        borderRadius: 11/2,
        marginRight: 5
      },
      rightImageView: {
        position: 'absolute',
        right: 0,
        width: 60,
        height: 100,
        bottom: 0,
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
        backgroundColor: '#1bc47d'
      }
});
