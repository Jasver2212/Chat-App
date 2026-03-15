import { View, Text, StyleSheet } from "react-native";

export default function ChatBubble({ message }) {
  return (
    <View style={styles.container}>
      <View style={styles.bubble}>
        <Text style={styles.text}>{message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  bubble: {
    backgroundColor: "#DCF8C6",
    padding: 12,
    borderRadius: 16,
    maxWidth: "75%",
  },
  text: {
    fontSize: 16,
  },
});