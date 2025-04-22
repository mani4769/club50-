import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import * as Linking from 'expo-linking';
import { supabase } from '../lib/supabase';

export default function AuthScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    const handleDeepLink = async ({ url }) => {
      console.log('Deep link received:', url);
      if (!url) return;

      // parse magic‑link tokens from URL
      const { data, error } = await supabase.auth.getSessionFromUrl({ url });
      if (error) {
        Alert.alert('Error', error.message);
      } else if (data?.session) {
        navigation.replace('Home');
      }
    };

    // subscribe to incoming links
    const sub = Linking.addEventListener('url', handleDeepLink);

    // handle cold‑launch
    Linking.getInitialURL().then((initialUrl) => {
      if (initialUrl) handleDeepLink({ url: initialUrl });
    });

    return () => sub.remove();
  }, []);

  const handleAuth = async () => {
    if (!email || !password) {
      return Alert.alert('Error', 'Please fill in all fields');
    }
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        navigation.replace('Home');
      } else {
        // Expo Go–compatible magic‑link redirect
        const redirectTo = Linking.createURL('/auth', { useProxy: true });
        const { error } = await supabase.auth.signUp(
          { email, password },
          { redirectTo }
        );
        if (error) throw error;
        Alert.alert(
          'Success',
          'A confirmation link has been sent to your email.'
        );
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <TouchableOpacity
        onPress={handleAuth}
        style={styles.button}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Loading…' : isLogin ? 'Sign In' : 'Sign Up'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
        <Text style={styles.switchText}>
          {isLogin
            ? "Don’t have an account? Sign Up"
            : "Already have an account? Sign In"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  input: { width: '100%', padding: 12, marginVertical: 6, backgroundColor: '#f0f0f0', borderRadius: 6 },
  button: { width: '100%', padding: 14, backgroundColor: '#006aff', borderRadius: 6, alignItems: 'center', marginTop: 12 },
  buttonText: { color: '#fff', fontWeight: '600' },
  switchText: { color: '#006aff', marginTop: 16 },
});