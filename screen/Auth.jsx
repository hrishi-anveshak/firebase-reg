import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import auth from "@react-native-firebase/auth";
import { firebase } from "@react-native-firebase/app";

export default function Auth() {
  const [creds, setCreds] = useState({});
  const [authState, setAuthState] = useState(true);
  if (!firebase.apps.length) {
    firebase.initializeApp();
  } else {
    firebase.app();
  }
  const handleData = (val, name) => {
    setCreds((prev) => ({
      ...prev,
      [name]: val.replace(/^\s+/g, ""),
    }));
  };

  const handleAuth = async () => {
    if (!creds.email || !creds.password) {
      console.warn("Email and Password are required");
      return;
    }
    try {
      let response;
      if (authState) {
        response = await auth().createUserWithEmailAndPassword(
          creds.email,
          creds.password
        );
        console.log("User signed up!", response);
        setCreds({});
      } else {
        response = await auth().signInWithEmailAndPassword(
          creds.email,
          creds.password
        );
        console.log("User logged in", response);
        setCreds({});
      }
    } catch (error) {
      console.error(
        authState ? "Sign-up error:" : "Login error:",
        error.message
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text>{authState ? "SignUp" : "Login"}</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={creds.email}
        onChangeText={(val) => handleData(val, "email")}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        value={creds.password}
        placeholder="Password"
        onChangeText={(val) => handleData(val, "password")}
        secureTextEntry
      />
      <TouchableOpacity style={styles.btn} onPress={handleAuth}>
        <Text style={styles.btnText}>{authState ? "SignUp" : "Login"}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btnAuth}
        onPress={() => setAuthState(!authState)}
      >
        <Text style={styles.btnText}>{!authState ? "SignUp" : "Login"}</Text>
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
  btnAuth: {
    borderWidth: 1,
    borderRadius: 5,
    width: 80,
    padding: 10,
    marginTop: 10,
    backgroundColor: "#007bff",
  },
});
