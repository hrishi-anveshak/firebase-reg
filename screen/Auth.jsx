import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import auth from "@react-native-firebase/auth";
import { firebase } from "@react-native-firebase/app";
import { useDispatch, useSelector } from "react-redux";
import { credsData } from "../redux/data/authSlice";

export default function Auth({ navigation }) {
  const dispatch = useDispatch();
  const [creds, setCreds] = useState({ email: "", password: "" });
  const [authState, setAuthState] = useState(true);
  const [errData, setErrData] = useState({});
  // check email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^.{8,}$/;

  const { credsAuthData } = useSelector((state) => state.auth);
  console.log("homeData", credsAuthData?.payload._user);
  console.log("errData", errData);

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
    setErrData({ ...errData, [name]: "" });
  };

  const handleAuth = async () => {
    if (!emailRegex.test(creds.email) || !passwordRegex.test(creds.password)) {
      setErrData({
        email: !emailRegex.test(creds.email) && "Email is invaild",
        password:
          !passwordRegex.test(creds.password) &&
          "Password should be 8 characters or more",
      });
      return;
    }

    try {
      let response;
      if (authState) {
        let isValid = true;
        let cpyErr = { ...errData };
        Object.keys(creds).map((key) => {
          if (creds[key].length === 0) {
            isValid = false;
            cpyErr[key] = `Please enter valid ${key}`;
          }
        });
        setErrData(cpyErr);
        if (isValid) {
          response = await auth().createUserWithEmailAndPassword(
            creds.email,
            creds.password
          );
          console.log("User signed up!", response);

          dispatch(
            credsData({ type: "auth/credsData", payload: response.user })
          );
          setCreds({});
        }
      } else {
        let isValid = true;
        let cpyErr = { ...errData };
        Object.keys(creds).map((key) => {
          if (creds[key].length === 0) {
            isValid = false;
            cpyErr[key] = `Please enter valid ${key}`;
          }
        });
        setErrData(cpyErr);
        if (isValid) {
          response = await auth().signInWithEmailAndPassword(
            creds.email,
            creds.password
          );
          console.log("User logged in", response);
          dispatch(
            credsData({ type: "auth/credsData", payload: response.user })
          );
          setCreds({});
        }
      }
    } catch (error) {
      setErrData({ email: error.message?.replace(/\[.*?\]\s*/, "") });
      console.error(
        authState ? "Sign-up error:" : "Login error:",
        error.message
      );
    }
  };

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      console.log("user", user);
      if (user) {
        dispatch(credsData({ type: "auth/credsData", payload: user }));
        navigation.reset({
          index: 0,
          routes: [{ name: "Home" }],
        });
      }
    });

    return unsubscribe;
  }, []);

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
      <Text>{errData?.email}</Text>
      <TextInput
        style={styles.input}
        value={creds.password}
        placeholder="Password"
        onChangeText={(val) => handleData(val, "password")}
        secureTextEntry
      />
      <Text>{errData?.password}</Text>
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
    width: "50%",
    margin: 5,
    padding: 8,
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
  btnAuth: {
    borderWidth: 1,
    borderRadius: 5,
    width: 80,
    padding: 10,
    marginTop: 10,
    backgroundColor: "#000",
  },
});
