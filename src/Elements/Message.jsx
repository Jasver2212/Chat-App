import { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SettingsContext } from "../Screens/SettingsScreen";

export default function ChatBubble({ message, sender }) {
  const isMe = sender === "me";
  const { fontSize, isDarkMode } = useContext(SettingsContext);

  return (
    <View style={[styles.row, isMe ? styles.rowRight : styles.rowLeft]}>
      <View
        style={[
          styles.bubble,
          isMe ? styles.bubbleMe : styles.bubbleThem,
          isDarkMode && (isMe ? styles.bubbleMeDark : styles.bubbleThemDark),
        ]}
      >
        <Text
          style={[
            isMe ? styles.textMe : styles.textThem,
            isDarkMode && styles.textDark,
            { fontSize },
          ]}
        >
          {message}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginVertical: 4,
    paddingHorizontal: 8,
  },
  rowRight: {
    justifyContent: "flex-end",
  },
  rowLeft: {
    justifyContent: "flex-start",
  },
  bubble: {
    maxWidth: "75%",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 18,
  },
  bubbleMe: {
    backgroundColor: "#A3CEF1",
    borderBottomRightRadius: 4,
  },
  bubbleThem: {
    backgroundColor: "#E7ECEF",
    borderBottomLeftRadius: 4,
  },
  bubbleMeDark: {
    backgroundColor: "#1e3a5f",
  },
  bubbleThemDark: {
    backgroundColor: "#112240",
  },
  textMe: {
    color: "#000",
  },
  textThem: {
    color: "#333",
  },
  textDark: {
    color: "#A3CEF1",
  },
});
