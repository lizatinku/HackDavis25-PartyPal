import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { supabase } from '../lib/supabase';
import { v4 as uuidv4 } from 'uuid';

export default function AddEventScreen({ navigation }: any) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    location: '',
    latitude: '',
    longitude: '',
    start_time: '',
    public: true,
    has_alcohol: false,
    byob: false,
    vibe: '',
    activities: '',
  });

  const handleChange = (key: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const submitEvent = async () => {
    const { error } = await supabase.from('events').insert({
      id: uuidv4(),
      ...form,
      latitude: parseFloat(form.latitude),
      longitude: parseFloat(form.longitude),
      start_time: new Date(form.start_time),
      activities: form.activities.split(',').map((a) => a.trim()),
    });

    if (error) {
      Alert.alert('Error', error.message);
    } else {
      Alert.alert('Success', 'Event added!');
      navigation.goBack();
    }
  };

  return (
    <ScrollView className="flex-1 bg-black px-5 py-6">
      <Text className="text-white text-xl font-bold mb-4">Create New Event</Text>

      <TextInput
        placeholder="Event Name"
        placeholderTextColor="#aaa"
        value={form.title}
        onChangeText={(t) => handleChange('title', t)}
        className="bg-zinc-900 text-white p-3 rounded mb-3"
      />
      <TextInput
        placeholder="Description"
        placeholderTextColor="#aaa"
        value={form.description}
        onChangeText={(t) => handleChange('description', t)}
        className="bg-zinc-900 text-white p-3 rounded mb-3"
      />
      <TextInput
        placeholder="Location"
        placeholderTextColor="#aaa"
        value={form.location}
        onChangeText={(t) => handleChange('location', t)}
        className="bg-zinc-900 text-white p-3 rounded mb-3"
      />
      <View className="flex-row gap-2 mb-3">
        <TextInput
          placeholder="Latitude"
          placeholderTextColor="#aaa"
          keyboardType="numeric"
          value={form.latitude}
          onChangeText={(t) => handleChange('latitude', t)}
          className="bg-zinc-900 text-white p-3 rounded flex-1"
        />
        <TextInput
          placeholder="Longitude"
          placeholderTextColor="#aaa"
          keyboardType="numeric"
          value={form.longitude}
          onChangeText={(t) => handleChange('longitude', t)}
          className="bg-zinc-900 text-white p-3 rounded flex-1"
        />
      </View>
      <TextInput
        placeholder="Start Time (e.g., 2025-04-20T20:00:00)"
        placeholderTextColor="#aaa"
        value={form.start_time}
        onChangeText={(t) => handleChange('start_time', t)}
        className="bg-zinc-900 text-white p-3 rounded mb-3"
      />
      <TextInput
        placeholder="Vibe (chill, rowdy, rager)"
        placeholderTextColor="#aaa"
        value={form.vibe}
        onChangeText={(t) => handleChange('vibe', t)}
        className="bg-zinc-900 text-white p-3 rounded mb-3"
      />
      <TextInput
        placeholder="Activities (comma separated)"
        placeholderTextColor="#aaa"
        value={form.activities}
        onChangeText={(t) => handleChange('activities', t)}
        className="bg-zinc-900 text-white p-3 rounded mb-3"
      />

      <View className="flex-row items-center justify-between mb-3">
        <Text className="text-white">Has Alcohol</Text>
        <TouchableOpacity
          onPress={() => handleChange('has_alcohol', !form.has_alcohol)}
        >
          <Text className="text-white text-lg">
            {form.has_alcohol ? '✅' : '⬜'}
          </Text>
        </TouchableOpacity>
      </View>

      <View className="flex-row items-center justify-between mb-3">
        <Text className="text-white">BYOB</Text>
        <TouchableOpacity
          onPress={() => handleChange('byob', !form.byob)}
        >
          <Text className="text-white text-lg">
            {form.byob ? '✅' : '⬜'}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={submitEvent}
        className="bg-white mt-5 py-3 rounded"
      >
        <Text className="text-black text-center font-bold text-lg">
          Submit Event
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
