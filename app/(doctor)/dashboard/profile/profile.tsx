import React from "react";
import { View, Text, StyleSheet, ScrollView, Image, Dimensions } from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

// Get device height to adjust the box size dynamically
const { height } = Dimensions.get("window");

export default function DoctorProfile() {
  // Dummy doctor data (Replace with API data if needed)
  const doctor = {
    id: "DOC12345",
    name: "Dr. Kishore",
    designation: "Senior Cardiologist",
    sex: "Male",
    mobile: "+91 98765 43210",
    specialization: "Cardiology",
    address: "Apollo Hospital, Chennai, India",
    maritalStatus: "Married",
    summary:
      "Dr. Kishore is a highly experienced cardiologist with over 15 years of expertise in treating complex heart conditions. He is known for his compassionate care, advanced treatment techniques, and commitment to patient well-being.",
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

      {/* Doctor Details */}
      <View style={styles.profileCard}>
        <Text style={styles.doctorName}>{doctor.name}</Text>
        <Text style={styles.designation}>{doctor.designation}</Text>

        {/* Doctor Information */}
        <View style={styles.infoContainer}>
          <FontAwesome name="id-badge" size={24} color="#4a5568" />
          <Text style={styles.infoText}>Doctor ID: {doctor.id}</Text>
        </View>

        <View style={styles.infoContainer}>
          <MaterialIcons name="phone" size={24} color="#4a5568" />
          <Text style={styles.infoText}>Mobile: {doctor.mobile}</Text>
        </View>

        <View style={styles.infoContainer}>
          <FontAwesome name="user-md" size={24} color="#4a5568" />
          <Text style={styles.infoText}>Specialization: {doctor.specialization}</Text>
        </View>

        <View style={styles.infoContainer}>
          <FontAwesome name="venus-mars" size={24} color="#4a5568" />
          <Text style={styles.infoText}>Sex: {doctor.sex}</Text>
        </View>

        <View style={styles.infoContainer}>
          <MaterialIcons name="location-on" size={24} color="#4a5568" />
          <Text style={styles.infoText}>Address: {doctor.address}</Text>
        </View>

        <View style={styles.infoContainer}>
          <FontAwesome name="heart" size={24} color="#4a5568" />
          <Text style={styles.infoText}>Marital Status: {doctor.maritalStatus}</Text>
        </View>

        {/* Doctor Summary */}
        <Text style={styles.summaryTitle}>About</Text>
        <Text style={styles.summaryText}>{doctor.summary}</Text>
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
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  profileCard: {
    backgroundColor: "#fff",
    width: "90%",
    borderRadius: 15,
    padding: 25,
    minHeight: height * 0.55, // Covers at least half the screen
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  doctorName: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#2d3748",
    marginBottom: 5,
  },
  designation: {
    fontSize: 18,
    textAlign: "center",
    color: "#4a5568",
    marginBottom: 15,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  infoText: {
    fontSize: 18,
    color: "#4a5568",
    marginLeft: 10,
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2d3748",
    marginTop: 20,
    marginBottom: 5,
  },
  summaryText: {
    fontSize: 16,
    color: "#4a5568",
    textAlign: "justify",
    lineHeight: 22,
  },
});
