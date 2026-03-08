import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AlarmProvider } from './src/context/AlarmContext';
import HomeScreen from './src/screens/HomeScreen';
import AlarmFormScreen from './src/screens/AlarmFormScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <AlarmProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="AlarmForm" component={AlarmFormScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </AlarmProvider>
      <StatusBar style="light" />
    </SafeAreaProvider>
  );
}
