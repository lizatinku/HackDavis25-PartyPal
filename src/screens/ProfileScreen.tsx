import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';

const tabs = ['Going', 'Hosting', 'Saved'];

const sampleEvents = [
  {
    id: '1',
    title: 'Lawntopia',
    date: 'May 4th @ 6:40pm',
    location: 'Davis, CA',
    image: require('../../assets/images/lawntopia.png'),
    tags: ['🍻', '🌿', '💊'],
  },
  {
    id: '2',
    title: 'Theta Chi White Lies Party',
    date: 'April 26th @ 6:40pm',
    location: 'Davis, CA',
    image: require('../../assets/images/theta-chi.png'),
    tags: ['🍻', '🌿', '💊'],
  },
];

export default function ProfileScreen() {
  const [selectedTab, setSelectedTab] = useState('Going');

  return (
    <View style={styles.container}>
      {/* Top Profile Section */}
      <View style={styles.profileBox}>
        <Image
          source={require('../../assets/images/user1.png')}
          style={styles.profileImage}
        />
        <TouchableOpacity style={styles.settingsIcon}>
          <Text style={styles.settingsText}>⚙️</Text>
        </TouchableOpacity>
        <Text style={styles.name}>Rebeca Clark</Text>
        <Text style={styles.handle}>@rebecaaa</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setSelectedTab(tab)}
            style={[
              styles.tab,
              selectedTab === tab && styles.activeTab,
            ]}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Events */}
      <FlatList
        data={sampleEvents}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.eventsList}
        renderItem={({ item }) => (
          <View style={styles.eventCard}>
            <Image source={item.image} style={styles.imagePlaceholder} />

            <View style={styles.eventOverlay}>
              <View style={styles.eventTags}>
                {item.tags.map((emoji, idx) => (
                  <Text key={idx} style={styles.tag}>
                    {emoji}
                  </Text>
                ))}
              </View>
              <Text style={styles.eventTitle}>{item.title}</Text>
              <Text style={styles.eventDetails}>{item.date}</Text>
              <Text style={styles.eventDetails}>{item.location}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  profileBox: {
    alignItems: 'center',
    paddingVertical: 24,
    backgroundColor: '#111',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderColor: '#a972f9',
    borderWidth: 2,
  },
  settingsIcon: {
    position: 'absolute',
    top: 30,
    right: 20,
    backgroundColor: '#444',
    borderRadius: 50,
    padding: 8,
  },
  settingsText: { fontSize: 20, color: '#DCDCDC' },
  name: {
    fontSize: 22,
    color: '#DCDCDC',
    fontWeight: '700',
    marginTop: 12,
  },
  handle: {
    fontSize: 14,
    color: '#aaa',
    marginTop: 4,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderBottomColor: '#333',
    borderBottomWidth: 1,
  },
  tab: {
    paddingBottom: 6,
  },
  tabText: {
    color: '#aaa',
    fontSize: 16,
    fontWeight: '500',
  },
  activeTab: {
    borderBottomColor: '#DCDCDC',
    borderBottomWidth: 2,
  },
  activeTabText: {
    color: '#DCDCDC',
    fontWeight: '700',
  },
  eventsList: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  eventCard: {
    marginBottom: 16,
    backgroundColor: '#222',
    borderRadius: 20,
    overflow: 'hidden',
  },
  imagePlaceholder: {
    width: '100%',
    height: 180,
    backgroundColor: '#444',
    position: 'relative',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  eventOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: 1,
  },
  eventTags: {
    position: 'absolute',
    top: 8,
    right: 8,
    flexDirection: 'row',
    gap: 6,
    zIndex: 2,
  },
  tag: {
    fontSize: 16,
    backgroundColor: '#0009',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 12,
    color: '#DCDCDC',
  },
  eventTitle: {
    color: '#DCDCDC',
    fontSize: 16,
    fontWeight: '700',
  },
  eventDetails: {
    color: '#ccc',
    fontSize: 12,
  },
});
