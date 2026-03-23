import { View, Text, StyleSheet } from "react-native";

export default function ChatBubble({ message, sender }) {
  const isMe = sender === "me";

  return (
    <View style={[styles.row, isMe ? styles.rowRight : styles.rowLeft]}>
      <View style={[styles.bubble, isMe ? styles.bubbleMe : styles.bubbleThem]}>
        <Text style={[styles.text, isMe ? styles.textMe : styles.textThem]}>
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
  text: {
    fontSize: 15,
  },
  textMe: {
    color: "#000",
  },
  textThem: {
    color: "#333",
  },
});
