import { StyleSheet } from "react-native";
import { iOSUIKit } from "react-native-typography";
export default (styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center"
  },
  logoContainer: {
    height: 256,
    width: 256,
    padding: 25,
    alignSelf: "center"
  },

  primaryTextContainer: {
    ...iOSUIKit.title3Emphasized,
    fontSize: 48,
    // fontWeight: "bold",
    alignSelf: "center",
    margin: 15,
    padding: 25
  },
  secondTextContainer: {
    ...iOSUIKit.footnoteEmphasized,
    fontSize: 24,
    //fontWeight: "bold",
    alignSelf: "center",
   // margin: 15,
    paddingTop: 25
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: 'space-between',
    padding: 25
  }
}));
