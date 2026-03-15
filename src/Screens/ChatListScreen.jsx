import {
	View,
	Text,
	StyleSheet,
	TextInput,
	KeyboardAvoidingView,
	FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ChatListUser from "../Elements/ChatListUser";
import { Ionicons } from "@expo/vector-icons";

const data = [
	{ id: "1", name: "first", lastMessage: "..." },
	{ id: "2", name: "second", lastMessage: "Hello there!" },
	{ id: "3", name: "third", lastMessage: "How are you?" },
	{ id: "4", name: "fourth", lastMessage: "Let's meet later." },
	{ id: "5", name: "fifth", lastMessage: "See you soon!" },
	{ id: "6", name: "sixth", lastMessage: "Good morning!" },
	{ id: "7", name: "seventh", lastMessage: "Don't forget the meeting." },
	{ id: "8", name: "eighth", lastMessage: "Thanks!" },
	{ id: "9", name: "ninth", lastMessage: "Okay 👍" },
	{ id: "10", name: "tenth", lastMessage: "Got it." },
	{ id: "11", name: "eleventh", lastMessage: "Talk to you later." },
];

export default function ChatListScreen() {
	return (
		<SafeAreaView style={styles.container}>
			<KeyboardAvoidingView style={styles.container}>
				<View style={styles.container}>
					<View style={styles.searchBar}>
						<TextInput placeholder="Search" style={styles.input} />

						<View style={styles.iconBackground}>
							<Ionicons name="settings-outline" size={24} />
						</View>
					</View>

					<FlatList
						data={data}
						renderItem={({ item }) => (
							<ChatListUser
								name={item.name}
								message={item.lastMessage}
							/>
						)}
					/>

				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#274C77'
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
	chatList: {
		flex: 1,
		backgroundColor: "#FF0000",
		position: "relative",
	},
	iconBackground: {
		backgroundColor: '#8B8C89',
		width: 40,
		height: 40,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10,
		borderWidth: 2,
	}
});
