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
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  useFonts,
  JetBrainsMono_400Regular,
} from "@expo-google-fonts/jetbrains-mono";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ChatBubble from "../Elements/Message";
import { useState, useRef, useEffect } from "react";

const STORAGE_KEY = "sentMessages";

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

  useEffect(() => {
    const loadSentMessages = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          const restored = parsed.map((msg) => ({
            message: msg,
            sender: "me",
          }));
          setMessages((prev) => [...prev, ...restored]);
        }
      } catch (e) {
        console.error("Failed to load sent messages:", e);
      }
    };
    loadSentMessages();
  }, []);

  const handleSend = async () => {
    if (typedMessage.trim() === "") return;

    const newMessage = typedMessage.trim();

    setMessages((prev) => [...prev, { message: newMessage, sender: "me" }]);
    setTypedMessage("");

    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      const existing = stored ? JSON.parse(stored) : [];
      const updated = [...existing, newMessage];
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to save sent message:", e);
    }

    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const handleDelete = (index) => {
    if (messages[index].sender !== "me") return;

    Alert.alert(
      "Delete Message",
      "Are You Sure you want to delete this message?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            const updated = messages.filter((_, i) => i !== index);
            setMessages(updated);
            try {
              const updatedSent = updated
                .filter((m) => m.sender === "me")
                .map((m) => m.message);
              await AsyncStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(updatedSent),
              );
            } catch (e) {
              console.log("Failed to update storage after delete", e);
            }
          },
        },
      ],
    );
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
            <TouchableOpacity onPress={() => navigation.navigate("ChatList")}>
              <Ionicons name="arrow-back-outline" size={30} color="black" />
            </TouchableOpacity>

            <Image
              style={styles.image}
              source={require("../../assets/black.png")}
              resizeMode="cover"
            />

            <Text style={styles.userText}>{name}</Text>

            <TouchableOpacity
              style={styles.iconBackground}
              onPress={() => navigation.navigate("Settings")}
            >
              <Ionicons name="settings-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        {/* CHAT CONTENT */}
        <View style={styles.content}>
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onLongPress={() => handleDelete(index)}
                delayLongPress={400}
                activeOpacity={1}
              >
                <ChatBubble message={item.message} sender={item.sender} />
              </TouchableOpacity>
            )}
            contentContainerStyle={{ paddingBottom: 10 }}
            onContentSizeChange={() =>
              flatListRef.current?.scrollToEnd({ animated: true })
            }
          />

          <View style={styles.inputRow}>
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

// ... styles unchanged
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
