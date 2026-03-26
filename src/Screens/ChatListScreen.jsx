import { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  FlatList,
  TouchableOpacity,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ChatListUser from "../Elements/ChatListUser";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const data = [{ id: "1", name: "Doni", lastMessage: "Halo" }];

export default function ChatListScreen() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.container}>
          <View style={styles.searchBar}>
            {/* SEARCH BAR */}
            <TextInput
              placeholder="Search"
              style={styles.input}
              value={searchQuery}
              onChangeText={setSearchQuery}
              clearButtonMode="while-editing"
            />

            {/* SETTINGS ICON */}
            <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
              <View style={styles.iconBackground}>
                <Ionicons name="settings-outline" size={24} />
              </View>
            </TouchableOpacity>
          </View>

          {/* RENDER */}
          <FlatList
            data={filteredData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ChatListUser name={item.name} message={item.lastMessage} />
            )}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No chats found</Text>
            }
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#274C77",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: "lightgray",
    borderRadius: 10,
    marginRight: 10,
    borderWidth: 2,
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
  emptyText: {
    color: "rgba(255,255,255,0.5)",
    textAlign: "center",
    marginTop: 40,
    fontSize: 15,
  },
});
