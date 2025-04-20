import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EventsScreen from './src/screens/EventsScreen';
import MapScreen from './src/screens/MapScreen';
import AddEventScreen from './src/screens/AddEventScreen';
import InfoScreen from './src/screens/InfoScreen';
import ProfileScreen from './src/screens/EventsScreen';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import { useFonts } from 'expo-font';

const Tab = createBottomTabNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    'Quicksand-Bold': require('./assets/fonts/Quicksand-Bold.ttf'),
    'Quicksand-SemiBold': require('./assets/fonts/Quicksand-SemiBold.ttf'),
    'Quicksand-Medium': require('./assets/fonts/Quicksand-Medium.ttf'),
  });

  if (!fontsLoaded) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: '#fff' }}>Loading fonts...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarStyle: { backgroundColor: '#111' },
            tabBarActiveTintColor: '#fff',
            tabBarInactiveTintColor: '#999',
            headerShown: false,
            tabBarIcon: ({ color, size }) => {
              let iconName: any;
              if (route.name === 'Events') iconName = 'home';
              if (route.name === 'Map') iconName = 'location';
              if (route.name === 'Add') iconName = 'add-circle';
              if (route.name === 'Info') iconName = 'information-circle';
              if (route.name === 'Profile') iconName = 'person';
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen name="Events" component={EventsScreen} />
          <Tab.Screen name="Map" component={MapScreen} />
          <Tab.Screen name="Add" component={AddEventScreen} />
          <Tab.Screen name="Info" component={InfoScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 50,
  },
});
