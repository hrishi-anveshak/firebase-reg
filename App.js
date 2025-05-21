import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import auth from "@react-native-firebase/auth";
import { firebase } from "@react-native-firebase/app";
export default function App() {
  const [data, setData] = useState({});

  if (!firebase.apps.length) {
    firebase.initializeApp();
  } else {
    firebase.app();
  }
  const handleData = (val, name) => {
    setData((prev) => ({
      ...prev,
      [name]: val.replace(/^\s+/g, ""),
    }));
  };

  const handleSignUp = async () => {
    if (!data.email || !data.password) {
      console.warn("Email and Password are required");
      return;
    }

    try {
      await auth().createUserWithEmailAndPassword(data.email, data.password);
      console.log("User signed in!");
    } catch (error) {
      console.error("Sign-in error:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(val) => handleData(val, "email")}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={(val) => handleData(val, "password")}
        secureTextEntry
      />
      <TouchableOpacity style={styles.btn} onPress={handleSignUp}>
        <Text style={styles.btnText}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    width: 200,
    margin: 5,
    padding: 8,
  },
  btn: {
    borderWidth: 1,
    borderRadius: 5,
    width: 200,
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
