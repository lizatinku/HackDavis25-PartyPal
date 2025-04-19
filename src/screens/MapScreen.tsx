// src/screens/MapScreen.tsx
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

const narcanPins = [
  {
    id: 'narcan-1',
    title: '💊 Memorial Union (MU)',
    description: 'Grab Narcan at the Info Desk. No ID needed.',
    latitude: 38.5433,
    longitude: -121.7415,
  },
  {
    id: 'narcan-2',
    title: '💊 Student Community Centre',
    description: 'Public Narcan locker near main entrance.',
    latitude: 38.5414,
    longitude: -121.7516,
  },
  {
    id: 'narcan-3',
    title: '💊 Shields Library',
    description: 'Narcan access in 24/7 study room.',
    latitude: 38.5397,
    longitude: -121.7492,
  },
];

const erPins = [
  {
    id: 'er-1',
    title: '🚑 UC Davis Health',
    description: 'Student urgent care. Walk-ins welcome.',
    latitude: 38.5384,
    longitude: -121.7602,
  },
  {
    id: 'er-2',
    title: '🚑 Sutter Davis Hospital ER',
    description: '24/7 emergency room for all.',
    latitude: 38.5536,
    longitude: -121.7732,
  },
  {
    id: 'er-3',
    title: '🚑 Dignity Health – Davis Specialty Care',
    description: 'Specialty care services in Davis.',
    latitude: 38.5534,
    longitude: -121.7631,
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

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
        style={styles.map}
        initialRegion={region}
        region={region}
        zoomEnabled={true}
        zoomControlEnabled={true}
      >
        {[...narcanPins, ...erPins].map((pin) => (
          <Marker
            key={pin.id}
            coordinate={{ latitude: pin.latitude, longitude: pin.longitude }}
          >
            <View style={styles.emojiMarker}>
              <Text style={styles.emoji}>
                {pin.title.startsWith('💊') ? '💊' : '🚑'}
              </Text>
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
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 2,
  },
  emojiMarker: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 24,
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
    flexDirection: 'row',
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
});
