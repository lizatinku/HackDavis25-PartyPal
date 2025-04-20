import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function InfoScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.header}>App Guide</Text>

      {/* Event Filters */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Event Filters</Text>

        <View style={styles.row}>
          <Text style={styles.emoji}>🚫🍻</Text>
          <Text style={styles.eventLabel}>Events with no drinking</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.emoji}>🚫🌿</Text>
          <Text style={styles.eventLabel}>Events with no smoking</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.emoji}>🚫💊</Text>
          <Text style={styles.eventLabel}>Events with no pills</Text>
        </View>
      </View>

      {/* Map Info */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Map Info</Text>

        <View style={styles.row}>
          <Text style={styles.emoji}>🎉</Text>
          <Text style={styles.mapLabel}>Parties and Social Events</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.emoji}>🚓</Text>
          <Text style={styles.mapLabel}>Police Station and Saferide Service</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.emoji}>🚑</Text>
          <Text style={styles.mapLabel}>Hospitals and Clinics</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.emoji}>💊</Text>
          <Text style={styles.mapLabel}>Overdose Relief (Narcan)</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.emoji}>🩹</Text>
          <Text style={styles.mapLabel}>Substance Abuse Rehab Centers</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  content: {
    padding: 20,
    gap: 20,
  },
  header: {
    color: '#DCDCDC',
    fontSize: 30,
    fontFamily: 'Quicksand-Bold',
    textAlign: 'center',
  },
  section: {
    backgroundColor: '#333',
    borderRadius: 20,
    padding: 16,
  },
  sectionTitle: {
    color: '#DCDCDC',
    fontSize: 25,
    fontFamily: 'Quicksand-SemiBold',
    textAlign: 'center',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
    gap: 12,
  },
  emoji: {
    fontSize: 20,
  },
  eventLabel: {
    color: '#DCDCDC',
    fontSize: 20,
    fontFamily: 'Quicksand-Medium',
  },
  mapLabel: {
    color: '#DCDCDC',
    fontSize: 16,
    fontFamily: 'Quicksand-Medium',
  },
});
