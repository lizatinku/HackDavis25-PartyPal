import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { supabase } from '../lib/supabase';
import { v4 as uuidv4 } from 'uuid';

export default function AddEventScreen({ navigation }: any) {
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

  const handleChange = (key: string, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleAddEvent = async () => {
    const newEvent = {
      id: uuidv4(),
      title: form.name,
      start_time: form.date,
      location: form.location,
      public: true,
      has_alcohol: form.hasAlcohol,
      byob: form.byob,
      vibe: form.vibe,
      activities: form.activities.split(',').map((a) => a.trim()).join(', '),
    };

    const { error } = await supabase.from('events').insert(newEvent);

    if (error) {
      Alert.alert('Error', error.message);
    } else {
      Alert.alert('Event added!');
      navigation.goBack();
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formCard}>
        <Text style={styles.title}>➕ Add New Event</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#aaa"
          value={form.name}
          onChangeText={(text) => handleChange('name', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Date"
          placeholderTextColor="#aaa"
          value={form.date}
          onChangeText={(text) => handleChange('date', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Location"
          placeholderTextColor="#aaa"
          value={form.location}
          onChangeText={(text) => handleChange('location', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Activities (comma separated)"
          placeholderTextColor="#aaa"
          value={form.activities}
          onChangeText={(text) => handleChange('activities', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Vibe (chill, rowdy, rager)"
          placeholderTextColor="#aaa"
          value={form.vibe}
          onChangeText={(text) => handleChange('vibe', text)}
        />

        <View style={styles.toggleRow}>
          {['hasAlcohol', 'byob', 'narcan'].map((key) => (
            <TouchableOpacity
              key={key}
              onPress={() =>
                handleChange(key, !form[key as keyof typeof form])
              }
            >
              <Text style={styles.toggleText}>
                {form[key as keyof typeof form] ? '✅' : '⬜'} {key}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.addButton} onPress={handleAddEvent}>
          <Text style={{ color: '#000', fontWeight: 'bold' }}>Add Event</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  formCard: {
    backgroundColor: '#111',
    margin: 16,
    padding: 16,
    borderRadius: 10,
    borderColor: '#333',
    borderWidth: 1,
    gap: 8,
  },
  input: {
    backgroundColor: '#1e1e1e',
    color: '#fff',
    padding: 10,
    borderRadius: 6,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  toggleText: {
    color: '#fff',
    fontSize: 12,
  },
  addButton: {
    marginTop: 8,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
});
