import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  useFonts,
  JetBrainsMono_400Regular,
} from "@expo-google-fonts/jetbrains-mono";
import { useNavigation } from "@react-navigation/native";
import ChatBubble from "../Elements/Message";
import { useState, useRef } from "react";

export default function ChatScreen({ route }) {
  const { name, message } = route.params;
  const navigation = useNavigation();
  const flatListRef = useRef(null);

  const [fontsLoaded] = useFonts({ JetBrainsMono_400Regular });

  const initialMessages = Array.isArray(message)
    ? message.map((m) => ({ ...m, sender: "them" }))
    : [{ message, sender: "them" }];

  const [messages, setMessages] = useState(initialMessages);
  const [typedMessage, setTypedMessage] = useState("");

  const handleSend = () => {
    if (typedMessage.trim() === "") return;
    setMessages((prev) => [...prev, { message: typedMessage, sender: "me" }]);
    setTypedMessage("");
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  if (!fontsLoaded) return null;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.horizontalHeader}>
            {/* BACK BUTTON */}
            <TouchableOpacity onPress={() => navigation.navigate("ChatList")}>
              <Ionicons name="arrow-back-outline" size={30} color="black" />
            </TouchableOpacity>

            {/* PROFILE PICTURE */}
            <Image
              style={styles.image}
              source={require("../../assets/black.png")}
              resizeMode="cover"
            />

            {/* NAME */}
            <Text style={styles.userText}>{name}</Text>

            {/* SETTINGS BUTTON */}
            <TouchableOpacity style={styles.iconBackground}>
              <Ionicons name="settings-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        {/* CHAT CONTENT */}
        <View style={styles.content}>
          {/* MESSAGES LIST */}
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <ChatBubble message={item.message} sender={item.sender} />
            )}
            contentContainerStyle={{ paddingBottom: 10 }}
            onContentSizeChange={() =>
              flatListRef.current?.scrollToEnd({ animated: true })
            }
          />

          {/* INPUT ROW */}
          <View style={styles.inputRow}>
            {/* TEXT INPUT */}
            <TextInput
              style={styles.textInputStyle}
              placeholder="Message"
              placeholderTextColor="#999"
              value={typedMessage}
              onChangeText={setTypedMessage}
              onSubmitEditing={handleSend}
              returnKeyType="send"
              blurOnSubmit={false}
              multiline
            />

            {/* SEND BUTTON */}
            <TouchableOpacity
              style={[
                styles.iconContainer,
                typedMessage.trim() === "" && styles.iconContainerDisabled,
              ]}
              onPress={handleSend}
              disabled={typedMessage.trim() === ""}
            >
              <Ionicons name="paper-plane-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#A3CEF1",
    height: 70,
    justifyContent: "center",
    paddingHorizontal: 15,
  },
  horizontalHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 25,
  },
  userText: {
    fontSize: 18,
    fontFamily: "JetBrainsMono_400Regular",
    flex: 1,
    color: "black",
  },
  iconBackground: {
    backgroundColor: "#8B8C89",
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 2,
  },
  content: {
    backgroundColor: "#274C77",
    flex: 1,
    padding: 10,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 8,
  },
  textInputStyle: {
    flex: 1,
    backgroundColor: "#E7ECEF",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 15,
    maxHeight: 100,
  },
  iconContainer: {
    backgroundColor: "#A3CEF1",
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainerDisabled: {
    backgroundColor: "#8B8C89",
  },
});
