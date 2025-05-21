import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { credsData } from "../redux/data/authSlice";
import auth from "@react-native-firebase/auth";
import { useDispatch, useSelector } from "react-redux";

export default function Home({ navigation }) {
  const { credsAuthData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleLogout = async () => {
    await auth().signOut();
    navigation.reset({
      index: 0,
      routes: [{ name: "Auth" }],
    });
    dispatch(credsData(null));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {credsAuthData?.payload?._user?.email} logged IN !
      </Text>
      <TouchableOpacity style={styles.btn} onPress={handleLogout}>
        <Text style={styles.btnText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: "auto",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#000",
    fontSize: 18,
  },
  btn: {
    borderWidth: 1,
    borderRadius: 5,
    width: "50%",
    padding: 10,
    marginTop: 10,
    backgroundColor: "#007bff",
  },
  btnText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
  },
});
