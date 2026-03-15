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
	FlatList
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
	useFonts,
	JetBrainsMono_400Regular,
	JetBrainsMono_400Bold,
} from "@expo-google-fonts/jetbrains-mono";
import { useNavigation } from "@react-navigation/native";
import ChatBubble from "../Elements/Message";

export default function ChatScreen({ route }) {
	const {name, message} = route.params;
	const navigation = useNavigation();

	const messagesArray = Array.isArray(message) ? message : [{ message }];

	
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
						<TouchableOpacity
							onPress={() => navigation.navigate("ChatList")}
						>
							<Ionicons
								name="arrow-back-outline"
								size={30}
								style={{ marginRight: 10 }}
							/>
						</TouchableOpacity>

						{/* PROFILE PICTURE */}
						<Image
							style={styles.image}
							source={require("../../assets/black.png")}
							content="cover"
						/>

						{/* NAME */}
						<Text style={styles.userText}>{name}</Text>

						<View style={styles.iconBackground}>
							{/* SETTINGS ICON */}
							<Ionicons
								name="settings-outline"
								size={30}
							/>
						</View>
					</View>
				</View>

				{/* CONTENT */}
				<View style={styles.content}>

					{/* MESSAGES */}
					<View style={{ flex: 1 }}>
						<FlatList
							data={messagesArray}
							keyExtractor={(item) => item.id}
							renderItem={({ item }) => (
								<ChatBubble
									message={item.message}
								/>
							)}
						/>
					</View>






					<View style={styles.inputRow}>
						{/* TEXT INPUT */}
						<View style={styles.textInputStyle}>
							<TextInput
								placeholder="Message"
								style={{ paddingLeft: 10 }}
							/>
						</View>

						{/* ICON */}
						<View style={styles.iconContainer}>
							<Ionicons
								name="paper-plane-outline"
								size={24}
								color={"black"}
							/>
						</View>
					</View>
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	header: {
		// backgroundColor: '#FF0000',
		backgroundColor: "#A3CEF1",
		height: 70,
		justifyContent: "center",
		padding: 15,
	},
	horizontalHeader: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
	},
	userText: {
		fontSize: 20,
		fontFamily: "JetBrainsMono_400Regular",
		// backgroundColor: '#FF00FF',
		width: 200,
		height: 40,
		lineHeight: 40, // ✅ vertically centers the text
	},

	content: {
		// backgroundColor: '#00FF00',
		backgroundColor: "#274C77",
		padding: 10,
		justifyContent: "flex-end",
		flex: 1,
	},
	inputRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 5,
	},
	textInputStyle: {
		backgroundColor: "#E7ECEF",
		borderRadius: 10,
		width: 320,
		justifyContent: "center",
	},
	iconContainer: {
		backgroundColor: "#8B8C89",
		width: 40,
		height: 40,
		borderRadius: 12,
		alignItems: "center",
		justifyContent: "center",
	},
	image: {
		width: 50,
		height: 50,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 25,
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
