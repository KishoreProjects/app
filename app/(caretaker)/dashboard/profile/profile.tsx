import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

export default function CaretakerProfile() {
  // Dummy caretaker data (Replace with API data if needed)
  const caretaker = {
    id: "CTK67890",
    name: "Mr. Ramesh Kumar",
    designation: "Father",
    sex: "Male",
    mobile: "+91 98765 67890",
    experience: "10 years",
    address: "Sunrise Care Center, Bangalore, India",
    maritalStatus: "Married",
    summary: "Mr. Ramesh Kumar is a dedicated caretaker with over a decade of experience in providing compassionate care to patients with chronic illnesses. He specializes in assisting patients with daily activities, medication reminders, and emotional support. His empathetic approach and strong commitment make him a trusted and valued member of the healthcare community."
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Profile Picture */}
      <View style={styles.profileImageContainer}>
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
          }}
          style={styles.profileImage}
        />
      </View>

      {/* Caretaker Details */}
      <View style={styles.profileCard}>
        <Text style={styles.doctorName}>{caretaker.name}</Text>
        <Text style={styles.designation}>{caretaker.designation}</Text>

        {/* Caretaker Information */}
        <View style={styles.infoContainer}>
          <FontAwesome name="id-badge" size={20} color="#4a5568" />
          <Text style={styles.infoText}>Caretaker ID: {caretaker.id}</Text>
        </View>

        <View style={styles.infoContainer}>
          <MaterialIcons name="phone" size={20} color="#4a5568" />
          <Text style={styles.infoText}>Mobile: {caretaker.mobile}</Text>
        </View>

        <View style={styles.infoContainer}>
          <FontAwesome name="briefcase" size={20} color="#4a5568" />
          <Text style={styles.infoText}>Experience: {caretaker.experience}</Text>
        </View>

        <View style={styles.infoContainer}>
          <FontAwesome name="venus-mars" size={20} color="#4a5568" />
          <Text style={styles.infoText}>Sex: {caretaker.sex}</Text>
        </View>

        <View style={styles.infoContainer}>
          <MaterialIcons name="location-on" size={20} color="#4a5568" />
          <Text style={styles.infoText}>Address: {caretaker.address}</Text>
        </View>

        <View style={styles.infoContainer}>
          <FontAwesome name="heart" size={20} color="#4a5568" />
          <Text style={styles.infoText}>Marital Status: {caretaker.maritalStatus}</Text>
        </View>

        <View style={styles.infoContainer}>
          <FontAwesome name="info-circle" size={20} color="#4a5568" />
          <Text style={styles.infoText}>Summary: {caretaker.summary}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f7fafc",
    alignItems: "center",
    paddingVertical: 20,
  },
  profileImageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileCard: {
    backgroundColor: "#fff",
    width: "90%",
    borderRadius: 10,
    padding: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  doctorName: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "#2d3748",
  },
  designation: {
    fontSize: 18,
    textAlign: "center",
    color: "#4a5568",
    marginBottom: 10,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  infoText: {
    fontSize: 16,
    color: "#4a5568",
    marginLeft: 8,
  },
});
