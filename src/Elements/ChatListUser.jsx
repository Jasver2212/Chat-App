import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  useFonts,
  JetBrainsMono_400Regular,
  JetBrainsMono_400Bold,
} from "@expo-google-fonts/jetbrains-mono";
import { useNavigation } from "@react-navigation/native";

export default function ChatListUser({ name, message }) {
  const navigation = useNavigation();

  return (
    <View style={{ alignItems: "center" }}>
      <TouchableOpacity
        onPress={() => navigation.navigate("ChatScreen", { name, message })}
      >
        <View style={styles.content}>
          {/* PROFILE PICTURE */}
          <Image
            style={styles.image}
            source={require("../../assets/black.png")}
          />

          {/* TEXT CONTAINER */}
          <View style={styles.textContainer}>
            {/* NAME TEXT */}
            <View style={styles.nameContainer}>
              <Text style={styles.nameText}>{name}</Text>
            </View>

            {/* MESSAGE TEXT */}
            <View style={styles.chatContainer}>
              <Text style={styles.chatText}>{message}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#6096BA",
    borderWidth: 2,
    borderRadius: 10,
    width: "98%",
    marginTop: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 100,
  },
  textContainer: {
    marginLeft: 25,
    // backgroundColor: '#FFFF00',
    width: 260,
    height: 75,
    gap: 10,
  },
  nameContainer: {
    backgroundColor: "#A3CEF1",
    fontSize: 24,
    borderRadius: 10,
  },
  nameText: {
    fontSize: 20,
    marginLeft: 10,
    fontFamily: "JetBrainsMono_400Regular",
    padding: 2,
  },
  chatContainer: {
    justifyContent: "center",
    backgroundColor: "#A3CEF1",
    borderRadius: 10,
  },
  chatText: {
    fontSize: 14,
    padding: 7,
  },
});
