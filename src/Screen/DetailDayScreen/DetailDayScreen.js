import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions
} from "react-native";
import axios from "axios";
import { LineChart } from "react-native-chart-kit";
import Images from "../../Theme/Image";
import styles from "./DetailDayScreenStyles";

const chartConfig = {
  backgroundColor: "#ffffff",
  backgroundGradientFrom: "#ffffff",
  backgroundGradientTo: "#ffffff",
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`
};

const data = {
  labels: ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43, 66]
    }
  ]
};

export default class DetailDayScreen extends Component {
  constructor(props) {
    super(props);

    //GET socket ID
    const { socketID } = this.props.navigation.state.params;
    this.state = {
      socketID: socketID,
      loading: true,
      data: ""
    };
  }
  static navigationOptions = {
    title: "DAY"
  };

  _getData = async () => {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let year = today.getFullYear();
    let url =
      "http://192.168.0.139:5533/sockets/" +
      this.state.socketID +
      "%" +
      dd +
      "%" +
      mm +
      "%" +
      year;
    try {
      //let data = axios.get("http://192.168.0.139:5533/sockets/1%1%12%2018");
      let res = await axios.get(url);
      console.warn(res.data);

      // this.setState({
      //   loading: false,
      //   data: res.data[0].consumption
      // });

      this.setState({
        loading: false,
        data: {
          labels: ["D1", "D2", "D3", "D4", "D5", "D6", "D7"],
          datasets: [
            {
              data: [
                res.data[6].consumption,
                res.data[5].consumption,
                res.data[4].consumption,
                res.data[3].consumption,
                res.data[2].consumption,
                res.data[1].consumption,
                res.data[0].consumption
              ]
            }
          ]
        }
      });
    } catch (error) {
      Alert.alert("Error: " + error);
    }
  };

  componentDidMount() {
    // axios.get("http://192.168.0.139:5533/sockets/1%1%12%2018").then(res => {
    //   console.warn(res.data);
    // });
    this._getData();
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={Images.totalEnergy} style={styles.logoContainer} />

        <Text style={styles.primaryTextContainer}>
          Today use: {this.state.data} kWh
        </Text>
        <View style={styles.infoContainer}>
          <Text style={styles.secondTextContainer}>Estimate cost: </Text>
          <Text style={styles.secondTextContainer}>500,000 VND</Text>
        </View>

        <LineChart
          data={data}
          width={Dimensions.get("screen").width}
          height={(Dimensions.get("screen").height * 2) / 3}
          chartConfig={chartConfig}
        />
      </View>
    );
  }
}
