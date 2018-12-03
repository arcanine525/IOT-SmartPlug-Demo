import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import Images from "../../Theme/Image";
import styles from "./DetailWeekScreenStyles";
import axios from "axios";
//Calculate total
//const total = data.datasets[0].data.reduce((a, b) => a + b, 0);

const chartConfig = {
  backgroundColor: "#ffffff",
  backgroundGradientFrom: "#ffffff",
  backgroundGradientTo: "#ffffff",
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`
};

export default class DetailMonthScreen extends Component {
  constructor(props) {
    super(props);
    //GET socket ID
    const { socketID } = this.props.navigation.state.params;
    this.state = {
      socketID: socketID,

      data: {
        labels: ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"],
        datasets: [
          {
            data: [20, 45, 28, 80, 99, 43, 66]
          }
        ]
      }
    };
  }
  static navigationOptions = {
    title: "WEEK"
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
      console.warn(url);

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

    // const data = {
    //   labels: ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"],
    //   datasets: [
    //     {
    //       data: [20, 45, 28, 80, 99, 43, 66]
    //     }
    //   ]
    // };
  };
  componentDidMount() {
    this._getData();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.primaryTextContainer}>
          Details for socket: {this.state.socketID}
        </Text>

        <LineChart
          data={this.state.data}
          width={Dimensions.get("screen").width}
          height={(Dimensions.get("screen").height * 2) / 3}
          chartConfig={chartConfig}
        />
      </View>
    );
  }
}
