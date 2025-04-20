import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';

type Event = {
  id: string;
  title: string;
  start_time: string;
  location: string;
  has_alcohol: boolean;
  byob: boolean;
  narcan: boolean;
  vibe: 'chill' | 'rowdy' | 'rager';
  activities: string;
};

export default function EventsScreen() {
  const [filters, setFilters] = useState({
    alcohol: false,
    byob: false,
    narcan: false,
  });

  const [events, setEvents] = useState<Event[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleFilter = (key: keyof typeof filters) =>
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));

  // const filtered = events.filter((event) => {
  //   if (filters.alcohol && !event.has_alcohol) return false;
  //   if (filters.byob && !event.byob) return false;
  //   if (filters.narcan && !event.narcan) return false;
  //   return true;
  // });

  
  useEffect(() => {
    const fetchEvents = async () => {
      console.log('Supabase client:', supabase);

      console.log('📡 Fetching events from Supabase...');
      const { data, error } = await supabase.from('events').select('*');
  
      if (error) {
        console.error('❌ Supabase fetch error:', error.message);
      } else {
        console.log('✅ Supabase fetch successful');
        console.log('📦 Raw event data:', data);
        setEvents(data as Event[]);
      }
    };
  
    fetchEvents();
  }, []);
  

  return (
    <View style={styles.container}>
      {/* Filters */}
      <View style={styles.filterBar}>
        {['alcohol', 'byob', 'narcan'].map((key) => (
          <TouchableOpacity key={key} onPress={() => toggleFilter(key as keyof typeof filters)}>
            <Text style={styles.filterBtn}>
              {filters[key as keyof typeof filters] ? '✅' : '⬜'} {key === 'alcohol' ? 'Alcohol 🍻' : key === 'byob' ? 'BYOB 🍾' : 'Narcan 💊'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Event List */}
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              setExpandedId(expandedId === item.id ? null : item.id)
            }
          >
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.meta}>{item.start_time}</Text>
            <Text style={styles.meta}>{item.location}</Text>
            <Text style={styles.meta}>🔥 {item.vibe.toUpperCase()}</Text>

            {expandedId === item.id && (
              <View style={styles.details}>
                <Text>🍻 Alcohol: {item.has_alcohol ? 'Yes' : 'No'}</Text>
                <Text>🍾 BYOB: {item.byob ? 'Yes' : 'No'}</Text>
                <Text>💊 Narcan On-Site: {item.narcan ? 'Yes' : 'No'}</Text>
                <Text>🎮 Activities: {item.activities}</Text>
              </View>
            )}
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  filterBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#111',
    paddingVertical: 10,
    borderBottomColor: '#222',
    borderBottomWidth: 1,
  },
  filterBtn: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#111',
    padding: 14,
    marginBottom: 12,
    borderRadius: 8,
    borderColor: '#333',
    borderWidth: 1,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  meta: {
    color: '#ccc',
    fontSize: 13,
  },
  details: {
    marginTop: 8,
    borderTopColor: '#333',
    borderTopWidth: 1,
    paddingTop: 8,
    gap: 4,
  },
});
