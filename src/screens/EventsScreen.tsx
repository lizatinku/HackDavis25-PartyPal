import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import * as Location from 'expo-location';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  ImageBackground,
} from 'react-native';

type Event = {
  id: string;
  title: string;
  start_time: string;
  location: string;
  latitude: number;
  longitude: number;
  has_alcohol: boolean;
  byob: boolean;
  narcan: boolean;
  vibe: 'chill' | 'rowdy' | 'rager';
  activities: string;
};

const distanceOptions = [5, 15, 25, 50];

function haversine(lat1: number, lon1: number, lat2: number, lon2: number) {
  const toRad = (x: number) => (x * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) * 0.621371;
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

function getEventImage(title: string) {
  const lower = title.toLowerCase();
  if (lower.includes('theta')) return require('../../assets/images/theta-chi.png');
  if (lower.includes('wine')) return require('../../assets/images/wine.png');
  if (lower.includes('lawn')) return require('../../assets/images/lawntopia.png');
  if (lower.includes('larry')) return require('../../assets/images/larry.png');
  // return require('../../assets/images/default.png'); // fallback image
}

export default function EventsScreen() {
  const [filters, setFilters] = useState({ alcohol: false, byob: false, narcan: false });
  const [search, setSearch] = useState('');
  const [events, setEvents] = useState<Event[]>([]);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [selectedDistance, setSelectedDistance] = useState(5);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleFilter = (key: keyof typeof filters) =>
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));

  const filtered = events.filter((event) => {
    if (event.title.toLowerCase().includes('bbq with bros')) return false;

    if (!event.latitude || !event.longitude || !userLocation) return false;

    const distance = haversine(userLocation.latitude, userLocation.longitude, event.latitude, event.longitude);
    if (selectedDistance !== 5 && distance > selectedDistance) return false;

    if (filters.alcohol && !event.has_alcohol) return false;
    if (filters.byob && !event.byob) return false;
    if (filters.narcan && !event.narcan) return false;
    if (!event.title.toLowerCase().includes(search.toLowerCase())) return false;

    return true;
  });

  useEffect(() => {
    const fetchLocationAndEvents = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.warn('Permission to access location was denied');
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      setUserLocation({ latitude: loc.coords.latitude, longitude: loc.coords.longitude });

      const { data, error } = await supabase.from('events').select('*');
      if (error) console.error('❌ Supabase fetch error:', error.message);
      else setEvents(data as Event[]);
    };

    fetchLocationAndEvents();
  }, []);

  return (
    <View style={styles.container}>
      {/* 🔍 Search */}
      <TextInput
        style={styles.searchInput}
        placeholder="🔍 Search events"
        placeholderTextColor="#aaa"
        value={search}
        onChangeText={setSearch}
      />

      {/* 📍 Distance + Filters */}
      <View style={styles.rowInline}>
        <View>
          <TouchableOpacity
            style={styles.distancePill}
            onPress={() => setDropdownVisible(!dropdownVisible)}
          >
            <Text style={styles.pillText}>📍 {selectedDistance} miles ▼</Text>
          </TouchableOpacity>
          {dropdownVisible && (
            <View style={styles.dropdown}>
              {distanceOptions.map((option) => (
                <TouchableOpacity
                  key={option}
                  onPress={() => {
                    setSelectedDistance(option);
                    setDropdownVisible(false);
                  }}
                >
                  <Text
                    style={[
                      styles.dropdownItem,
                      option === selectedDistance && styles.selectedDropdownItem,
                    ]}
                  >
                    within {option} miles
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Filters */}
        <View style={styles.emojiFilterRow}>
          {['alcohol', 'byob', 'narcan'].map((key) => (
            <TouchableOpacity
              key={key}
              onPress={() => toggleFilter(key as keyof typeof filters)}
            >
              <Text style={styles.filterBtn}>
                {filters[key as keyof typeof filters] ? '✅' : '⬜'}{' '}
                {key === 'alcohol' ? '🍻' : key === 'byob' ? '🍾' : '💊'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 📅 Events */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => {
          const image = getEventImage(item.title);
          return (
            <TouchableOpacity style={styles.card}>
              <ImageBackground
                source={image}
                style={styles.imageBackground}
                imageStyle={styles.imageRadius}
              >
                <View style={styles.overlay}>
                  <View style={styles.eventHeader}>
                    <View style={styles.leftBlock}>
                      <Text style={styles.title}>{item.title}</Text>
                      <Text style={styles.meta}>{formatDate(item.start_time)}</Text>
                    </View>
                    <Text style={styles.location}>{item.location}</Text>
                  </View>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  searchInput: {
    backgroundColor: '#111',
    padding: 15,
    marginHorizontal: 22,
    marginTop: 30,
    borderRadius: 12,
    color: '#fff',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  rowInline: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  distancePill: {
    backgroundColor: '#1e1e1e',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#444',
  },
  pillText: {
    color: '#fff',
    fontSize: 13,
  },
  dropdown: {
    backgroundColor: '#222',
    borderRadius: 10,
    marginTop: 10,
    padding: 6,
    position: 'absolute',
    zIndex: 1000,
  },
  dropdownItem: {
    color: '#fff',
    padding: 8,
    fontSize: 13,
    borderRadius: 8,
  },
  selectedDropdownItem: {
    fontWeight: 'bold',
    backgroundColor: '#333',
    borderRadius: 6,
  },
  emojiFilterRow: {
    flexDirection: 'row',
    gap: 12,
    marginLeft: 8,
  },
  filterBtn: {
    color: '#fff',
    fontSize: 18,
  },
  card: {
    marginBottom: 16,
    borderRadius: 20,
    overflow: 'hidden',
  },
  imageBackground: {
    width: '100%',
    height: 140,
    justifyContent: 'flex-end',
  },
  imageRadius: {
    borderRadius: 20,
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.45)',
    padding: 12,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  leftBlock: {
    flex: 1,
    paddingRight: 10,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  meta: {
    color: '#ccc',
    fontSize: 13,
  },
  location: {
    color: '#ccc',
    fontSize: 13,
    textAlign: 'right',
    maxWidth: 100,
  },
});
