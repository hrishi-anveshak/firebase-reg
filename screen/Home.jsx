import { View, Text, TouchableOpacity } from "react-native";

export default function Home({ data }) {
  return (
    <View>
      <Text>User logged IN 🥳</Text>
      <TouchableOpacity>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
