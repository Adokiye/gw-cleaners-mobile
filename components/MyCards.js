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
import { API_URL } from "../root.js";
import axios from "axios";
import Toast from "react-native-simple-toast";
import Sure from "./Includes/Sure";
type Props = {};
import { connect } from "react-redux";
const mapStateToProps = state => ({
  ...state
});
class reduxMyCards extends Component<Props> {
  static navigationOptions = {
    header: null,
    drawerLockMode: "locked-closed"
  };

  constructor(props) {
    super(props);
    this.state = {
      regLoader: false,
      cards: [],
      sure: false,
      card_id: ""
    };
    this.getApiData = this.getApiData.bind(this);
  }
  componentDidMount() {
    const { params } = this.props.navigation.state;
    console.log(params);
    this.setState({ regLoader: true });
    this.getApiData();
  }
  getApiData() {
    const { params } = this.props.navigation.state;
    var config = {
      headers: { Authorization: "Bearer " + this.props.token },
      timeout: 20000
    };
    axios
      .get(API_URL + "cards/" + this.props.id, config)
      .then(response => {
        console.log(response);
        if (response.data && response.data.length > 0) {
          console.log("response.data");
          console.log("here" + response.data);
          var len = response.data.length;
          this.setState({ cards: [] });
          for (let i = 0; i < len; i++) {
            let row = response.data[i];
            this.setState(prevState => ({
              cards: [...prevState.cards, row]
            }));
          }
        } else {
          Toast.show("No Card available");
          if (params.order) {
            this.props.navigation.navigate("AddCard", {
              order: true,
              preferences: params.preferences || null,
              price: params.price || null
            });
          }
        }
        this.setState({ regLoader: false, fetch: false });
      })
      .catch(error => {
        this.setState({ regLoader: false });
        if (error.code == "ECONNABORTED") {
          Toast.show("Connection TImeout");
        } else {
          Toast.show(error.message);
        }
        console.log(error);
      });
  }
  set() {
    const { params } = this.props.navigation.state;
    this.setState({ regLoader: true });
    var config = {
      headers: { Authorization: "Bearer " + this.props.token },
      timeout: 20000
    };
    var bodyParameters = {
      card_id: card_id,
      user_id: this.props.id
    };
    //  console.log(bodyParameters)
    axios
      .post(API_URL + "cards/setDefault", bodyParameters, config)
      .then(response => {
        console.log(response);
        Toast.show("Success");
        this.setState({ regLoader: false });

        this.props.navigation.navigate("OrderProcessed");
      })
      .catch(error => {
        console.log(error);
        this.setState({ regLoader: false });
        if (error) {
          Toast.show(error.message);
          console.log(JSON.stringify(error));
        }
      });
  }
  order(card_id) {
    const { params } = this.props.navigation.state;
    this.setState({ regLoader: true });
    var config = {
      headers: { Authorization: "Bearer " + this.props.token },
      timeout: 20000
    };
    var bodyParameters = {
      card_id: card_id,
      user_id: this.props.id,
      price: params.price || this.props.price,
      preference: params.preference || this.props.preference,
      dropoff_date: this.props.dropoffDate,
      pickup_date: this.props.pickupDate,
      dropoff_time: this.props.dropoffTime,
      pickup_time: this.props.pickupTime,
      dropbox_id: this.props.dropboxId,
      dropbox_adress: this.props.dropbox_address,
    };
    //  console.log(bodyParameters)
    axios
      .post(API_URL + "orders", bodyParameters, config)
      .then(response => {
        console.log(response);
        Toast.show("Success");
        this.setState({ regLoader: false });

        this.props.navigation.navigate('OrderProcessed');
      })
      .catch(error => {
        console.log(error);
        this.setState({ regLoader: false });
        if (error) {
          Toast.show(error.message);
          console.log(JSON.stringify(error));
        }
      });
  }
  render() {
    let cards = "";
    const { params } = this.props.navigation.state;
    if (this.state.cards) {
      if (params.order) {
        cards = (
          <FlatList
            data={this.state.cards}
            renderItem={({ item, index }) => (
              <TouchableOpacity onPress={this.order.bind(this, item._id)}>
                <View style={styles.cardView}>
                  <Text style={styles.cardLastDigits}>{item.name}</Text>
                  <View style={styles.cardLastDigitsView}>
                    <Image
                      source={require("../assets/images/greyCircleGroup.png")}
                      style={{ width: 46.67, height: 8.46 }}
                    />
                    <Image
                      source={require("../assets/images/greyCircleGroup.png")}
                      style={{ width: 46.67, height: 8.46 }}
                    />
                    <Image
                      source={require("../assets/images/greyCircleGroup.png")}
                      style={{ width: 46.67, height: 8.46 }}
                    />
                    <Text style={styles.cardLastDigits}>{item.no}</Text>
                  </View>
                  <Text style={styles.dateText}>
                    {item.month}/{item.year}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => `list-item-{'\u20A6'}{index}`}
          />
        );
      } else {
        cards = (
          <FlatList
            data={this.state.orders}
            renderItem={({ item, index }) => (
              <View style={styles.cardView}>
                <Text style={styles.cardLastDigits}>{item.name}</Text>
                <View style={styles.cardLastDigitsView}>
                  <Image
                    source={require("../assets/images/greyCircleGroup.png")}
                    style={{ width: 46.67, height: 8.46 }}
                  />
                  <Image
                    source={require("../assets/images/greyCircleGroup.png")}
                    style={{ width: 46.67, height: 8.46 }}
                  />
                  <Image
                    source={require("../assets/images/greyCircleGroup.png")}
                    style={{ width: 46.67, height: 8.46 }}
                  />
                  <Text style={styles.cardLastDigits}>{item.no}</Text>
                </View>
                <Text style={styles.dateText}>
                  {item.month}/{item.year}
                </Text>
              </View>
            )}
            keyExtractor={(item, index) => `list-item-{'\u20A6'}{index}`}
          />
        );
      }
    } else {
      cards = null;
    }
    return (
      <View style={styles.container}>
        <View style={styles.headerView}>
        <Image
          source={require("../assets/images/washitBack.png")}
          resizeMode="cover"
          style={{position: 'absolute', width: 187, height: 50, top: 0, right: 0}}
        />
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Image
              source={require("../assets/images/back.png")}
              resizeMode={"contain"}
              style={{ width: 25, height: 25 }}
            />
          </TouchableOpacity>
          <View style={styles.welcomeBox}>
            <Text style={styles.hiText}>My Cards</Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate("AddCard", { order: false })
            }
          >
            <Image
              source={require("../assets/images/plus.png")}
              resizeMode={"contain"}
              style={{ width: 21, height: 21, marginLeft: "63%" }}
            />
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>{cards}</ScrollView>
        {this.state.sure && (
          <Sure
            cancelOperation={() => this.setState({ sure: false })}
            set={this.set.bind(this)}
          />
        )}
        {this.state.regLoader ? <Loader /> : null}
      </View>
    );
  }
}
const MyCards = connect(mapStateToProps)(reduxMyCards);
const dimensions = Dimensions.get("window");
const Width = dimensions.width;
export default MyCards;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center"
  },
  headerView: {
    width: "100%",
    height: 100,
    backgroundColor: "#769CF1",
    flexDirection: "row",
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: "center",
    marginBottom: 15
  },
  welcomeBox: {
    flexDirection: "column",
    marginLeft: 13
  },
  dateText: {
    fontFamily: "mont-reg",
    fontSize: 13,
    color: "#fff"
  },
  hiText: {
    color: "#fff",
    fontFamily: "mont-semi",
    fontSize: 20
  },
  cardView: {
    alignSelf: "center",
    width: Width * (91.46 / 100),
    height: 159,
    borderRadius: 4,
    backgroundColor: "#fff",
    paddingLeft: 15,
    paddingTop: 20,
    paddingBottom: 20,
    justifyContent: "space-between",
    elevation: 2,
    flexDirection: "column",
    marginBottom: 30
  },
  cardLastDigitsView: {
    width: "81.3%",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  cardLastDigits: {
    color: "#000",
    fontSize: 12,
    fontFamily: "mont-semi"
  },
  dateText: {
    fontFamily: "mont-reg",
    fontSize: 10,
    color: "#000"
  }
});
