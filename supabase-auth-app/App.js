import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Linking from 'expo-linking';
import AuthScreen from './screens/AuthScreen';
import HomeScreen from './screens/HomeScreen';
import { supabase } from './lib/supabase';

const Stack = createNativeStackNavigator();

export default function App() {
  const [session, setSession] = useState(null);

  const linking = {
    prefixes: [Linking.createURL('/'), 'supabaseauthapp://'],
    config: {
      screens: { Auth: 'auth', Home: 'home' },
    },
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    supabase.auth.onAuthStateChange((_, session) => setSession(session));
  }, []);

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator
        initialRouteName={session ? 'Home' : 'Auth'}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}