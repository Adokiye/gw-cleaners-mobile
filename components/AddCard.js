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
import {
  CreditCardInput,
  LiteCreditCardInput
} from "react-native-credit-card-input";
import { API_URL } from "../root.js";
import axios from "axios";
import Toast from "react-native-simple-toast";
// import stripe from 'tipsi-stripe'
import Sure from "./Includes/Sure";
import { stripeCheckoutRedirectHTML } from "./Includes/AddCard.js";
import { WebView } from "react-native-webview";
type Props = {};
import { connect } from "react-redux";
const mapStateToProps = state => ({
  ...state
});
const dimensions = Dimensions.get("window");
const Width = dimensions.width;
const Height = dimensions.height;
class reduxAddCard extends Component<Props> {
  static navigationOptions = {
    header: null,
    drawerLockMode: "locked-closed"
  };

  constructor(props) {
    super(props);
    this.state = {
      regLoader: true,
      cards: [],
      sure: false,
      card_id: "",
      card_no: "",
      expiry_month: "",
      expiry_year: "",
      cvv: "",
      valid: false,
      token: ""
    };
    this.order = this.order.bind(this);
  }
  hideSpinner() {
    this.setState({ regLoader: false });
  }
  componentDidMount() {
    const { params } = this.props.navigation.state;
    console.log(params);
  }
  _onChange = form => {
    let expiry_month,
      expiry_year,
      slash_loc = "";
    if (form.status.expiry == "valid") {
      for (let i = 0; i < form.values.expiry.length; i++) {
        if (form.values.expiry[i] == "/") {
          slash_loc = i;
        }
        if (slash_loc) {
          if (form.values.expiry[i] != "/") {
            expiry_year += form.values.expiry[i];
          }
        } else {
          if (form.values.expiry[i] != "/") {
            expiry_month += form.values.expiry[i];
          }
        }
      }
    }
    console.log(JSON.stringify(form.values));
    this.setState(
      {
        valid: form.valid,
        card_no: form.values.number,
        expiry_month: expiry_month,
        expiry_year: expiry_year,
        cvv: form.values.cvv
      },
      () => {
        if (this.state.valid) {
          console.log("kks");
          this.order();
        }
      }
    );
  };
  order(token) {
    // const { params } = this.props.navigation.state;
    this.setState({ regLoader: true });
    var config = {
      headers: { Authorization: "Bearer " + this.props.token },
      timeout: 20000
    };
    const params = {
      // mandatory
      number: this.state.card_no,
      expMonth: this.state.expiry_month,
      expYear: this.state.expiry_year,
      cvc: this.state.cvv
    };
    // const token = await stripe.createTokenWithCard(params);
    console.log(JSON.stringify(token));
    var bodyParameters = {
      user_id: this.props.id,
      token: token,
      dropoff_date: this.props.dropoffDate,
      pickup_date: this.props.pickupDate,
      dropoff_time: this.props.dropoffTime,
      pickup_time: this.props.pickupTime,
      dropbox_id: this.props.dropboxId,
      dropbox_adress: this.props.dropbox_address,
      preferences: this.props.preferences
    };
    console.log(JSON.stringify(bodyParameters));
    axios
      .post(API_URL + "cards", bodyParameters, config)
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
  render() {
    return (
      <View style={{ flex: 1 }}>
        <WebView
          originWhitelist={["*"]}
          onLoad={this.hideSpinner.bind(this)}
          source={{ html: stripeCheckoutRedirectHTML() }}
          onMessage={event => {
            //   alert(event.nativeEvent.data);
            console.log(event.nativeEvent.data);
            this.setState({ token: event.nativeEvent.data }, () => {
              this.order(this.state.token);
            });
          }}
          scalesPageToFit={true}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          style={{ flex: 1 }}
          //   onLoadStart={onLoadStart}
        />
        {this.state.regLoader && (
          <ActivityIndicator
            style={{ position: "absolute", top: Height / 2, left: Width / 2 }}
            size="large"
          />
        )}
      </View>
    );
  }
}
const AddCard = connect(mapStateToProps)(reduxAddCard);

export default AddCard;
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
    fontSize: 26
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
