import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { v4 as uuidv4 } from 'uuid';

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
};

export default function EventsScreen() {
  const [filters, setFilters] = useState({
    alcohol: false,
    byob: false,
    narcan: false,
  });

  const [events, setEvents] = useState<Event[]>([
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
      name: 'Sycamore Game Night',
      date: 'Fri, Apr 26 • 6PM',
      location: 'Sycamore Apartments',
      hasAlcohol: false,
      byob: true,
      narcan: false,
      vibe: 'chill',
      activities: ['Cards', 'Snacks'],
    },
  ]);

  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleFilter = (key: keyof typeof filters) =>
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));

  const filtered = events.filter((event) => {
    if (filters.alcohol && !event.hasAlcohol) return false;
    if (filters.byob && !event.byob) return false;
    if (filters.narcan && !event.narcan) return false;
    return true;
  });

  // Add Event Form State
  const [form, setForm] = useState({
    name: '',
    date: '',
    location: '',
    vibe: 'chill',
    hasAlcohol: false,
    byob: false,
    narcan: false,
    activities: '',
  });

  const handleAddEvent = () => {
    const newEvent: Event = {
      id: uuidv4(),
      name: form.name,
      date: form.date,
      location: form.location,
      vibe: form.vibe as 'chill' | 'rowdy' | 'rager',
      hasAlcohol: form.hasAlcohol,
      byob: form.byob,
      narcan: form.narcan,
      activities: form.activities.split(',').map((a) => a.trim()),
    };

    setEvents([newEvent, ...events]);
    setForm({
      name: '',
      date: '',
      location: '',
      vibe: 'chill',
      hasAlcohol: false,
      byob: false,
      narcan: false,
      activities: '',
    });
  };

  return (
    <View className="flex-1 bg-black px-4 pt-4">
      {/* Filters */}
      <View className="flex-row justify-around bg-zinc-900 py-2 rounded-lg mb-4">
        {['alcohol', 'byob', 'narcan'].map((key) => (
          <TouchableOpacity key={key} onPress={() => toggleFilter(key as keyof typeof filters)}>
            <Text className="text-white font-semibold text-xs">
              {filters[key as keyof typeof filters] ? '✅' : '⬜'} {key === 'alcohol' ? 'Alcohol 🍻' : key === 'byob' ? 'BYOB 🍾' : 'Narcan 💊'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Add New Event */}
      <View className="mb-4 border border-zinc-700 rounded-xl p-4 space-y-2">
        <Text className="text-white font-bold">➕ Add New Event</Text>
        <TextInput
          className="bg-zinc-800 text-white px-3 py-2 rounded-md"
          placeholder="Name"
          placeholderTextColor="#aaa"
          value={form.name}
          onChangeText={(text) => setForm({ ...form, name: text })}
        />
        <TextInput
          className="bg-zinc-800 text-white px-3 py-2 rounded-md"
          placeholder="Date"
          placeholderTextColor="#aaa"
          value={form.date}
          onChangeText={(text) => setForm({ ...form, date: text })}
        />
        <TextInput
          className="bg-zinc-800 text-white px-3 py-2 rounded-md"
          placeholder="Location"
          placeholderTextColor="#aaa"
          value={form.location}
          onChangeText={(text) => setForm({ ...form, location: text })}
        />
        <TextInput
          className="bg-zinc-800 text-white px-3 py-2 rounded-md"
          placeholder="Activities (comma separated)"
          placeholderTextColor="#aaa"
          value={form.activities}
          onChangeText={(text) => setForm({ ...form, activities: text })}
        />
        <View className="flex-row justify-between">
          {['hasAlcohol', 'byob', 'narcan'].map((key) => (
            <TouchableOpacity
              key={key}
              onPress={() =>
                setForm((prev) => ({
                  ...prev,
                  [key]: !prev[key as keyof typeof form],
                }))
              }
            >
              <Text className="text-white text-sm">
                {form[key as keyof typeof form] ? '✅' : '⬜'} {key}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity
          className="bg-white rounded-md py-2 items-center mt-2"
          onPress={handleAddEvent}
        >
          <Text className="text-black font-bold">Add Event</Text>
        </TouchableOpacity>
      </View>

      {/* Event List */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="bg-zinc-900 p-4 rounded-lg mb-3 border border-zinc-700"
            onPress={() => setExpandedId(expandedId === item.id ? null : item.id)}
          >
            <Text className="text-white font-bold text-lg">{item.name}</Text>
            <Text className="text-zinc-300 text-sm">{item.date}</Text>
            <Text className="text-zinc-300 text-sm">{item.location}</Text>
            <Text className="text-zinc-300 text-sm">🔥 {item.vibe.toUpperCase()}</Text>

            {expandedId === item.id && (
              <View className="mt-2 border-t border-zinc-700 pt-2 space-y-1">
                <Text className="text-white">🍻 Alcohol: {item.hasAlcohol ? 'Yes' : 'No'}</Text>
                <Text className="text-white">🍾 BYOB: {item.byob ? 'Yes' : 'No'}</Text>
                <Text className="text-white">💊 Narcan: {item.narcan ? 'Yes' : 'No'}</Text>
                <Text className="text-white">🎮 Activities: {item.activities.join(', ')}</Text>
              </View>
            )}
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
