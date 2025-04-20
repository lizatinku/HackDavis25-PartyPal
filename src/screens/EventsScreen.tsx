import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';

type Event = {
  id: string;
  name: string;
  date: string;
  location: string;
  hasAlcohol: boolean;
  byob: boolean;
  narcan: boolean;
  vibe: 'chill' | 'rowdy' | 'rager';
  activities: string[];
  expanded?: boolean;
};

const sampleEvents: Event[] = [
  {
    id: '1',
    name: 'Theta Chi Land',
    date: 'Sat, Apr 26 • 1PM - 4PM',
    location: '501 Russell Blvd',
    hasAlcohol: true,
    byob: false,
    narcan: true,
    vibe: 'rager',
    activities: ['Water Guns', 'Wristbands', 'Music'],
  },
  {
    id: '2',
    name: 'Parkside Bar Night',
    date: 'Fri, Apr 25 • 9PM - 2AM',
    location: 'Parkside Bar Davis',
    hasAlcohol: true,
    byob: false,
    narcan: false,
    vibe: 'rowdy',
    activities: ['DJ', 'Dancing'],
  },
  {
    id: '3',
    name: 'Phi Gamma Delta (FIJI) BBQ',
    date: 'Sun, Apr 27 • 12PM - 3PM',
    location: 'FIJI House',
    hasAlcohol: false,
    byob: true,
    narcan: true,
    vibe: 'chill',
    activities: ['BBQ', 'Games', 'Hydration Station'],
  },
  {
    id: '4',
    name: 'Sycamore Lane Game Night',
    date: 'Sat, Apr 26 • 7PM - 10PM',
    location: 'Sycamore Lane Apts',
    hasAlcohol: false,
    byob: true,
    narcan: false,
    vibe: 'chill',
    activities: ['Board Games', 'Snacks', 'RSVP Required'],
  },
  {
    id: '5',
    name: 'The U Apartment Kickback',
    date: 'Fri, Apr 25 • 8PM - 11PM',
    location: 'The U Apartments',
    hasAlcohol: true,
    byob: true,
    narcan: true,
    vibe: 'rowdy',
    activities: ['Beer Pong', 'Lowkey Music', 'Contact Host to Join'],
  },
  {
    id: '6',
    name: 'G Street Bar Crawl',
    date: 'Thu, Apr 24 • 10PM - Late',
    location: 'G Street Bar Davis',
    hasAlcohol: true,
    byob: false,
    narcan: false,
    vibe: 'rager',
    activities: ['Shots', 'Dancing', 'Bar Crawl Wristbands'],
  },
];

export default function EventsScreen() {
  const [filters, setFilters] = useState({
    alcohol: false,
    byob: false,
    narcan: false,
  });

  const toggleFilter = (key: keyof typeof filters) => {
    setFilters({ ...filters, [key]: !filters[key] });
  };

  const filtered = sampleEvents.filter((event) => {
    if (filters.alcohol && !event.hasAlcohol) return false;
    if (filters.byob && !event.byob) return false;
    if (filters.narcan && !event.narcan) return false;
    return true;
  });

  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <View style={styles.container}>
      {/* Filters */}
      <View style={styles.filterBar}>
        <TouchableOpacity onPress={() => toggleFilter('alcohol')}>
          <Text style={styles.filterBtn}>
            {filters.alcohol ? '✅' : '⬜'} Alcohol 🍻
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleFilter('byob')}>
          <Text style={styles.filterBtn}>
            {filters.byob ? '✅' : '⬜'} BYOB 🍾
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleFilter('narcan')}>
          <Text style={styles.filterBtn}>
            {filters.narcan ? '✅' : '⬜'} Narcan Available💊
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              setExpandedId(expandedId === item.id ? null : item.id)
            }
          >
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.meta}>{item.date}</Text>
            <Text style={styles.meta}>{item.location}</Text>
            <Text style={styles.meta}>🔥 {item.vibe.toUpperCase()}</Text>

            {expandedId === item.id && (
              <View style={styles.details}>
                <Text>🍻 Alcohol: {item.hasAlcohol ? 'Yes' : 'No'}</Text>
                <Text>🍾 BYOB: {item.byob ? 'Yes' : 'No'}</Text>
                <Text>💊 Narcan On-Site: {item.narcan ? 'Yes' : 'No'}</Text>
                <Text>🎮 Activities: {item.activities.join(', ')}</Text>
              </View>
            )}
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
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
