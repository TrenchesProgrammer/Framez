import { useState } from "react";
import { Alert, Button, View,Text, Image, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system/legacy"; // <-- This line is updated
import { supabase } from "../../lib/supabase";
import { router } from "expo-router";
// FIX 1: Import Buffer. You may need to run `npm install buffer` in your project
import { Buffer } from "buffer"; 


export default function UploadPostImage() {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [isUploading, setIsUploading] = useState(false); // Added for loading state

  const pickImage = async () => {
    try {
      // Request gallery permission
      const { granted } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!granted) {
        Alert.alert("Permission required", "You need to allow gallery access.");
        return;
      }

      // Open gallery
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 0.7,
      });

      // If user picked an image
      if (!result.canceled) {
        const uri = result.assets[0].uri;
        setImageUri(uri);
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Error", "Something went wrong while picking the image.");
    }
  };

  const handlePost = async () => {
    // Prevent multiple uploads and posts without an image
    if (isUploading || !imageUri) return; 
    
    setIsUploading(true);

    try {
      const imageUrl = await uploadPostImage(imageUri);
      console.log("imageUrl:", imageUrl);
      if (imageUrl) {
        const { data, error } = await supabase
          .from("posts")
          .insert([{ image_url: imageUrl, content: text }]);

        if (error) {
          throw error;
        }

        Alert.alert("Success", "Post created successfully!");
        console.log("Inserted:", data);
        setImageUri(null);
        setText("");
      } else {
        Alert.alert("Error", "Failed to upload image. Please try again.");
      }
    } catch (err) {
      console.error("Post error:", err);
      Alert.alert("Error", "Failed to create post.");
    } finally {
      setIsUploading(false); // Re-enable button
    }
  };

const uploadPostImage = async (uri: string) => {
  try {
    // Get file info
    const fileExtension = uri.split(".").pop() || "jpg";
    const fileName = `${Date.now()}.${fileExtension}`;
    const contentType = `image/${fileExtension}`;

    // Read the file as a base64 string
    // FIX 2: Use the string 'base64' directly
    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: 'base64', 
    });

    // Convert base64 string to binary (React Native–safe)
    const binary = Buffer.from(base64, "base64");

    // Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("posts")
      .upload(fileName, binary, {
        contentType,
        upsert: false,
      });

    if (uploadError) throw uploadError;

    // Get the public URL
    const { data: publicUrlData } = supabase.storage
      .from("posts")
      .getPublicUrl(uploadData.path);

    return publicUrlData?.publicUrl || null;
  } catch (err) {
    console.error("Upload error:", err);
    Alert.alert("Error", "Failed to upload image.");
    return null;
  }
};


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Post</Text>
      <TextInput
        style={styles.textarea}
        onChangeText={setText}
        value={text}
        placeholder="Write a caption..."
        multiline={true}
      />
      {imageUri && <Image source={{ uri: imageUri! }} style={styles.image} />}
      <TouchableOpacity 
        style={styles.btnPick} 
        onPress={pickImage} 
        disabled={isUploading}
      >
        <Text style={styles.textPick}>Pick an image</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        // Disable button and change style while uploading or if no image
        style={[styles.btn, (isUploading || !imageUri) && styles.btnDisabled]} 
        onPress={handlePost} 
        disabled={isUploading || !imageUri}
      >
        <Text style={styles.text}>{isUploading ? "Posting..." : "Post"}</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  textarea: {
    height: 100,
    borderColor: 'gray',
    width: '100%',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  title:{
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  container:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
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
  // Added style for disabled button
  btnDisabled: {
    backgroundColor: "#a1e3c7",
  },
  btnPick:{
    borderWidth: 1,
    color: "#01b964",
    borderColor: "#01b964",
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
  },
  textPick:{
    textAlign: "center",
    color: "#01b964",
    width: '100%',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  }
})