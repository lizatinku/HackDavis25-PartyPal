import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EventsScreen from './src/screens/EventsScreen';
import MapScreen from './src/screens/MapScreen';
import AddEventScreen from './src/screens/AddEventScreen';
// import InfoScreen from './src/screens/InfoScreen;
import ProfileScreen from './src/screens/EventsScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
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
        {/* <Tab.Screen name="Info" component={InfoScreen} /> */}
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
