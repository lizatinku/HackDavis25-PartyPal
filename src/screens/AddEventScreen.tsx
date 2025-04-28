import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { v4 as uuidv4 } from 'uuid';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Platform,
} from 'react-native';

type EventForm = {
  title: string;
  description: string;
  location: string;
  latitude: string;
  longitude: string;
  start_time: string;
  has_alcohol: boolean;
  has_weed: boolean;
  narcan_availability: boolean;
  vibe: string;
  activities: string;
};

export default function AddEventScreen({ navigation }: any) {
  const [form, setForm] = useState<EventForm>({
    title: '',
    description: '',
    location: '',
    latitude: '',
    longitude: '',
    start_time: '',
    has_alcohol: false,
    has_weed: false,
    narcan_availability: false,
    vibe: '',
    activities: '',
  });

  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleChange = (key: keyof EventForm, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleAddEvent = async () => {
    const newEvent = {
      id: uuidv4(),
      ...form,
      latitude: parseFloat(form.latitude),
      longitude: parseFloat(form.longitude),
      public: true,
    };

    const { error } = await supabase.from('events').insert(newEvent);

    if (error) {
      Alert.alert('Error', error.message);
    } else {
      Alert.alert('Event added!');
      navigation.goBack();
    }
  };

  const textFields: { key: keyof EventForm; label: string }[] = [
    { key: 'title', label: 'Title' },
    { key: 'description', label: 'Description' },
    { key: 'location', label: 'Location' },
    { key: 'latitude', label: 'Latitude' },
    { key: 'longitude', label: 'Longitude' },
    { key: 'start_time', label: 'Start time (YYYY-MM-DD HH:MM)' },
    { key: 'vibe', label: 'Vibe (chill, rowdy, rager)' },
    { key: 'activities', label: 'Activities (comma separated)' },
  ];

  const toggleFields: { key: keyof EventForm; label: string }[] = [
    { key: 'has_alcohol', label: 'Has Alcohol' },
    { key: 'has_weed', label: 'Has Weed' },
    { key: 'narcan_availability', label: 'Narcan Available' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formCard}>
        <Text style={styles.title}>➕ Add New Event</Text>

        {textFields.map(({ key, label }) =>
          key === 'start_time' ? (
            <View key={key}>
              <TouchableOpacity
                onPress={() => setShowDatePicker(true)}
                style={styles.input}
              >
                <Text style={{ color: form.start_time ? '#DCDCDC' : '#aaa', fontSize: 14 }}>
                  {form.start_time ? form.start_time : label}
                </Text>
              </TouchableOpacity>

              {showDatePicker && (
                <View style={{ backgroundColor: '#fff', borderRadius: 10, marginTop: 10 }}>
                  <DateTimePicker
                    value={form.start_time ? new Date(form.start_time) : new Date()}
                    mode="datetime"
                    {...(Platform.OS !== 'web' ? { is24Hour: true } : {})}
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    themeVariant="light"
                    onChange={(event, selectedDate) => {
                      setShowDatePicker(false);
                      if (selectedDate) {
                        const isoString = selectedDate.toISOString().slice(0, 16).replace('T', ' ');
                        handleChange('start_time', isoString);
                      }
                    }}
                  />
                </View>
              )}
            </View>
          ) : (
            <TextInput
              key={key}
              style={styles.input}
              placeholder={label}
              placeholderTextColor="#aaa"
              value={form[key]?.toString()}
              onChangeText={(text) => handleChange(key, text)}
            />
          )
        )}

        <View style={styles.toggleRow}>
          {toggleFields.map(({ key, label }) => (
            <TouchableOpacity
              key={key}
              onPress={() => handleChange(key, !form[key])}
              style={styles.toggleItem}
            >
              <Text style={styles.toggleText}>
                {form[key] ? '✅' : '⬜'} {label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.addButton} onPress={handleAddEvent}>
          <Text style={styles.addButtonText}>Add Event</Text>
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
    borderRadius: 12,
    borderColor: '#333',
    borderWidth: 1,
    gap: 10,
  },
  title: {
    color: '#DCDCDC',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12,
  },
  input: {
    backgroundColor: '#1e1e1e',
    color: '#DCDCDC',
    padding: 10,
    borderRadius: 10,
    fontSize: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#333',
  },
  toggleRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 12,
  },
  toggleItem: {
    marginBottom: 8,
  },
  toggleText: {
    color: '#DCDCDC',
    fontSize: 13,
  },
  addButton: {
    marginTop: 16,
    backgroundColor: '#B581CD',
    padding: 14,
    borderRadius: 999,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
