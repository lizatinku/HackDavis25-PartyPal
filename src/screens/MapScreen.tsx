import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
  TouchableOpacity,
} from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE, Region } from 'react-native-maps';

const EventPins = [
  {
    id: 'event-1',
    title: '🎉 Theta Chi White Lies Party',
    description: 'April 26, 8 PM\n501 Russell Blvd, Davis CA',
    latitude: 38.5465,
    longitude: -121.7553,
  },
  {
    id: 'event-2',
    title: '🎉 Lawntopia',
    description: 'May 4, 6:40 PM\n750 Orchard Rd, Davis, CA',
    latitude: 38.5416,
    longitude: -121.7596,
  },
  {
    id: 'event-3',
    title: '🎉 Rutherford Wine Tasting',
    description: 'April 24, 6 PM\nDixon, CA',
    latitude: 38.4467,
    longitude: -121.8235,
  },
  {
    id: 'event-4',
    title: "🎉 Larry's Kickback",
    description: 'May 18, 10 PM\nBeamer Park, Woodland CA',
    latitude: 38.6786,
    longitude: -121.7779,
  },
];

const narcanPins = [
  {
    id: 'narcan-1',
    title: '💊 Memorial Union (MU)',
    description: 'Grab Narcan at the Info Desk. No ID needed.\nOpen: MTWThF \n7 AM - 11PM',
    latitude: 38.5424,
    longitude: -121.7494,
  },
  {
    id: 'narcan-2',
    title: '💊 Student Community Centre',
    description: 'Narcan locker near main entrance.',
    latitude: 38.5396,
    longitude: -121.7518,
  },
  {
    id: 'narcan-3',
    title: '💊 Activities and Recreation Centre (ARC)',
    description: 'Available near front desk. Open: MTWThF \n5 AM - 11PM',
    latitude: 38.5431,
    longitude: -121.7597,
  },
];

const erPins = [
  {
    id: 'er-1',
    title: '🚑 UC Davis Health',
    description: 'Student urgent care. \nOpen: MTWThF \n9 AM - 5PM',
    latitude: 38.5427,
    longitude: -121.7618,
  },
  {
    id: 'er-2',
    title: '🚑 Sutter Davis Hospital ER',
    description: 'Emergency room for all.\nOpen: 24/7',
    latitude: 38.5621,
    longitude: -121.7715,
  },
  {
    id: 'er-3',
    title: '🚑 UC Davis Fire Department',
    description: 'Fire and emergency services.\nOpen: 24/7',
    latitude: 38.5405,
    longitude: -121.7579,
  },
];

const alcoholSupportPins = [
  {
    id: 'alcohol-1',
    title: '🩹 ATOD Intervention Services',
    description: 'Free alcohol education and risk counseling.\nOpen: M–F\n10 AM - 5 PM',
    latitude: 38.5439,
    longitude: -121.7510,
  },
  {
    id: 'alcohol-2',
    title: '🩹 Health Education & Promotion (HEP)',
    description: 'Party Smart kits and alcohol safety resources.\nOpen: M-F\n9 AM - 4 PM',
    latitude: 38.5410,
    longitude: -121.7501,
  },
  {
    id: 'alcohol-3',
    title: '🩹 The Pantry @ UC Davis',
    description: 'Hydration kits and wellness supplies.\nOpen: M-F\n10 AM - 5:30 PM',
    latitude: 38.5423,
    longitude: -121.7489,
  },
];

const policePins = [
  {
    id: 'police-1',
    title: '🚓 Davis Police Department',
    description: 'Open: MTWThF\n10 AM - 5:30 PM',
    latitude: 38.5513,
    longitude: -121.7193,
  },
  {
    id: 'police-2',
    title: '🚓 Saferide @ Kearney Hall',
    description: 'Call for SafeRide service.\nAvailable everyday 8 PM - 2 AM.',
    latitude: 38.5360,
    longitude: -121.7586,
  },
  {
    id: 'police-3',
    title: '🚓 ARC Security Desk',
    description: 'ARC assistance + SafeRide info.\nOpen: M-F\n5 AM - 12 PM',
    latitude: 38.5432,
    longitude: -121.7597,
  },
];


export default function MapScreen() {
  const mapRef = useRef<MapView>(null);
  const [region, setRegion] = useState<Region>({
    latitude: 38.5420,
    longitude: -121.7450,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const [selectedFilters, setSelectedFilters] = useState({
    alcohol: true,
    narcan: true,
    er: true,
    police: true,
    social: true,
  });

  const toggleFilter = (key: keyof typeof selectedFilters) =>
    setSelectedFilters((prev) => ({ ...prev, [key]: !prev[key] }));

  const zoom = (zoomIn: boolean) => {
    const factor = zoomIn ? 0.5 : 2;
    const newRegion = {
      ...region,
      latitudeDelta: region.latitudeDelta * factor,
      longitudeDelta: region.longitudeDelta * factor,
    };
    setRegion(newRegion);
    mapRef.current?.animateToRegion(newRegion, 200);
  };

  const focusOnGroup = (pins: { latitude: number; longitude: number }[]) => {
    const avgLat = pins.reduce((sum, p) => sum + p.latitude, 0) / pins.length;
    const avgLon = pins.reduce((sum, p) => sum + p.longitude, 0) / pins.length;
    const newRegion = {
      latitude: avgLat,
      longitude: avgLon,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
    setRegion(newRegion);
    mapRef.current?.animateToRegion(newRegion, 200);
  };

  const focusPolice = () => {
    focusOnGroup(policePins);
  };  

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
        style={styles.map}
        initialRegion={region}
        region={region}
        zoomEnabled
        zoomControlEnabled
      >
        {[...(selectedFilters.narcan ? narcanPins : []),
          ...(selectedFilters.social ? EventPins : []),
          ...(selectedFilters.er ? erPins : []),
          ...(selectedFilters.alcohol ? alcoholSupportPins : []),
          ...(selectedFilters.police ? policePins : [])]
          .map((pin) => (
            <Marker key={pin.id} coordinate={{ latitude: pin.latitude, longitude: pin.longitude }}>
              <View style={styles.emojiMarker}>
                <Text style={styles.emoji}>{pin.title.slice(0, 2)}</Text>
              </View>
              <Callout tooltip>
                <View style={styles.calloutBox}>
                  <Text style={styles.title}>{pin.title}</Text>
                  <Text>{pin.description}</Text>
                </View>
              </Callout>
            </Marker>
          ))}
      </MapView>

      {/* Sidebar Navigation */}
      <View style={styles.sidebar}>
        {[
          { key: 'social', icon: '🎉', onPress: () => focusOnGroup(EventPins) },
          { key: 'police', icon: '🚓', onPress: focusPolice },
          { key: 'er', icon: '🚑', onPress: () => focusOnGroup(erPins) },
          { key: 'narcan', icon: '💊', onPress: () => focusOnGroup(narcanPins) },
          { key: 'alcohol', icon: '🩹', onPress: () => focusOnGroup(alcoholSupportPins) },
        ].map(({ key, icon, onPress }) => (
          <TouchableOpacity key={key} onPress={() => {
            toggleFilter(key as keyof typeof selectedFilters);
            onPress();
          }}>
            <View
              style={[
                styles.iconWrapper,
                selectedFilters[key as keyof typeof selectedFilters] && styles.iconSelected,
              ]}
            >
              <Text style={styles.icon}>{icon}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Zoom Buttons */}
      <View style={styles.zoomControls}>
        <TouchableOpacity onPress={() => zoom(true)} style={styles.zoomButton}>
          <Text style={styles.zoomText}>＋</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => zoom(false)} style={styles.zoomButton}>
          <Text style={styles.zoomText}>－</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  emojiMarker: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 24,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 2,
  },
  calloutBox: {
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 6,
    minWidth: 180,
  },
  zoomControls: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    flexDirection: 'column',
    gap: 10,
  },
  zoomButton: {
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 10,
    elevation: 5,
  },
  zoomText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  sidebar: {
    position: 'absolute',
    top: 100,
    right: 10,
    backgroundColor: '#111',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 6,
    gap: 12,
    alignItems: 'center',
    elevation: 8,
  },
  iconWrapper: {
    borderRadius: 20,
    padding: 6,
  },
  iconSelected: {
    backgroundColor: '#B581CD',
  },
  icon: {
    fontSize: 24,
    color: '#fff',
  },
});