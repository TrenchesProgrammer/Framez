import { View, Text, StyleSheet, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

type Post = {
  id: number;
  image_url: string;
  content: string;
  created_at: string;
};

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching posts:', error);
      } else {
        setPosts(data);
        console.log('posts:', data);
      }
    };

    fetchPosts();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Framez</Text>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.postContainer}>
            <Text>{item.content}</Text>
            <Image source={{ uri: item.image_url }} style={styles.postImage} />
          </View>
        )}
      />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontWeight: '700',
    fontSize: 24,
    marginBottom: 10,
  },
  postContainer: {
    marginBottom: 10,
  },
  postImage: {
    width: '100%',
    height: 300,
    borderRadius: 10,
  },
});