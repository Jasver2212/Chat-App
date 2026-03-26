import { View, Text, StyleSheet, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Slider from "@react-native-community/slider";
import React, { createContext, useState, useContext } from "react";

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [fontSize, setFontSize] = useState(16);

  return (
    <SettingsContext.Provider value={{ fontSize, setFontSize }}>
      {children}
    </SettingsContext.Provider>
  );
};

export default function SettingScreen() {
  const { fontSize, setFontSize } = useContext(SettingsContext);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Font Size: {Math.round(fontSize)}</Text>
        <Slider
          style={styles.slider}
          minimumValue={10}
          maximumValue={36}
          value={fontSize}
          minimumTrackTintColor="#274C77"
          maximumTrackTintColor="#8B8C89"
          onValueChange={(size) => setFontSize(size)}
        />
        <Text style={[styles.preview, { fontSize }]}>Preview Text</Text>
        <View style={styles.note}>
          <Text style={styles.preview}>
            Note: The font size will only change the messages sent
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#274C77",
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#E7ECEF",
    marginBottom: 24,
    paddingHorizontal: 4,
  },
  card: {
    backgroundColor: "#A3CEF1",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#E7ECEF",
    padding: 16,
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#274C77",
    marginBottom: 8,
  },
  slider: {
    width: "100%",
    height: 40,
  },
  preview: {
    color: "#274C77",
    marginTop: 8,
  },
  note: {
    paddingTop: 10,
  },
});
