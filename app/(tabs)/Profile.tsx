import { View, Text, StyleSheet, FlatList, Image, Button, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'expo-router';

type Post = {
  id: number;
  image_url: string;
  created_at: string;
};

const Profile = () => {
  const { profile } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchUserPosts = async () => {
      if (profile) {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('user_id', profile.id)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching user posts:', error);
        } else {
          setPosts(data);
        }
      }
    };

    fetchUserPosts();
  }, [profile]);

  return (
    <View style={styles.container}>
      <View style={styles.profileCard}>
        <Image
          source={{ uri: profile?.avatar_url || 'https://via.placeholder.com/150' }}
          style={styles.avatar}
        />
        <Text style={styles.username}>{profile?.username}</Text>
        <Text style={styles.fullName}>{profile?.full_name}</Text>
        <Text style={styles.bio}>{profile?.bio}</Text>
        <TouchableOpacity style={styles.btn} onPress={() => router.push('/editProfile')}><Text style={styles.text}>Edit Profile</Text></TouchableOpacity>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        renderItem={({ item }) => (
          <View style={styles.postContainer}>
            <Image source={{ uri: item.image_url }} style={styles.postImage} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  profileCard: {
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  fullName: {
    fontSize: 16,
    color: 'gray',
  },
  bio: {
    marginTop: 10,
    textAlign: 'center',
  },
  postContainer: {
    flex: 1 / 3,
    aspectRatio: 1,
  },
  postImage: {
    width: '100%',
    height: '100%',
  },
  btn:{
    backgroundColor: "#01b964",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop:20,
    width: '100%',
  },
  text:{
    textAlign: "center",
    color: "#fff",
    width: '100%',
  }
});

export default Profile;
