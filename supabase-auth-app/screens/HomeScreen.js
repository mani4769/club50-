import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  SafeAreaView,
  Image
} from 'react-native';
import { supabase } from '../lib/supabase';

export default function HomeScreen({ navigation }) {
  const [userEmail, setUserEmail] = useState('');
  
  useEffect(() => {
    // Get current user info
    const getUserInfo = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserEmail(user.email);
      }
    };
    
    getUserInfo();
  }, []);
  
  const logout = async () => {
    await supabase.auth.signOut();
    navigation.navigate('Auth');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Image 
            source={{uri: 'https://via.placeholder.com/60'}} 
            style={styles.profileImage}
          />
          <View style={styles.headerTextContainer}>
            <Text style={styles.welcomeText}>Welcome to</Text>
            <Text style={styles.appName}>Club 50+</Text>
            <Text style={styles.appName} >Hii guys</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>My Profile</Text>
          <View style={styles.divider} />
          <View style={styles.userInfo}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{userEmail || 'Loading...'}</Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={() => {}}>
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Activities</Text>
          <View style={styles.divider} />
          <View style={styles.activitiesContainer}>
            <TouchableOpacity style={styles.activityItem}>
              <View style={[styles.activityIcon, {backgroundColor: '#FFD166'}]}>
                <Text style={styles.activityIconText}>🏃</Text>
              </View>
              <Text style={styles.activityText}>Fitness</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.activityItem}>
              <View style={[styles.activityIcon, {backgroundColor: '#06D6A0'}]}>
                <Text style={styles.activityIconText}>🎨</Text>
              </View>
              <Text style={styles.activityText}>Arts</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.activityItem}>
              <View style={[styles.activityIcon, {backgroundColor: '#118AB2'}]}>
                <Text style={styles.activityIconText}>🍴</Text>
              </View>
              <Text style={styles.activityText}>Dining</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.activityItem}>
              <View style={[styles.activityIcon, {backgroundColor: '#EF476F'}]}>
                <Text style={styles.activityIconText}>🎯</Text>
              </View>
              <Text style={styles.activityText}>Games</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Upcoming Events</Text>
          <View style={styles.divider} />
          
          <View style={styles.eventItem}>
            <View style={styles.eventDate}>
              <Text style={styles.eventDay}>25</Text>
              <Text style={styles.eventMonth}>APR</Text>
            </View>
            <View style={styles.eventDetails}>
              <Text style={styles.eventTitle}>Morning Yoga Session</Text>
              <Text style={styles.eventLocation}>🕘 8:00 AM • Community Center</Text>
            </View>
          </View>
          
          <View style={styles.eventItem}>
            <View style={styles.eventDate}>
              <Text style={styles.eventDay}>28</Text>
              <Text style={styles.eventMonth}>APR</Text>
            </View>
            <View style={styles.eventDetails}>
              <Text style={styles.eventTitle}>Book Club Meeting</Text>
              <Text style={styles.eventLocation}>🕒 2:00 PM • Library Hall</Text>
            </View>
          </View>
        </View>
        
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  scrollContent: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#4d7cfe',
  },
  headerTextContainer: {
    marginLeft: 12,
  },
  welcomeText: {
    fontSize: 16,
    color: '#666',
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    //come to center
    textAlign: 'center',
    marginBottom: 4,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginBottom: 16,
  },
  userInfo: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#4d7cfe',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  activitiesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  activityItem: {
    width: '48%',
    marginBottom: 12,
    alignItems: 'center',
  },
  activityIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  activityIconText: {
    fontSize: 24,
  },
  activityText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  eventItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  eventDate: {
    width: 50,
    height: 50,
    backgroundColor: '#4d7cfe',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  eventDay: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  eventMonth: {
    fontSize: 12,
    color: '#fff',
  },
  eventDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  eventLocation: {
    fontSize: 14,
    color: '#666',
  },
  logoutButton: {
    backgroundColor: '#ff5252',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});