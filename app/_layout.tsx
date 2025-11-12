import { Stack, useRouter, useSegments } from 'expo-router';
import React, { useEffect } from 'react';
import { AuthProvider, useAuth } from '../context/AuthContext'; // Import your context
import { ActivityIndicator, View } from 'react-native';

// This is the "traffic cop" component.
// It checks auth and renders the correct Stack.
const InitialLayout = () => {
  const { session, profile, loading } = useAuth();
  const router = useRouter();
  const segments = useSegments(); // Gets the current URL path

  useEffect(() => {
    // Wait until the auth state is loaded
    if (loading) {
      return;
    }

    const inAuthGroup = segments[0] === 'login' || segments[0] === 'Register';
    const inAppGroup = segments[0] === '(tabs)';

    // 1. If user is not logged in (no session)
    if (!session) {
      // If they are not in the (auth) group,
      // redirect them to the login screen.
      if (!inAuthGroup) {
        router.replace('/login'); // Adjust if your login path is different
      }
      return;
    }

    // 2. If user is logged in, but has no profile
    if (session && !profile?.username) {
      // If they are not on the create-profile page,
      // redirect them there.
      if (segments[0] !== 'CreateProfile') {
        router.replace('/CreateProfile');
      }
      return;
    }

    // 3. If user is logged in AND has a profile
    if (session && profile?.username) {
      // If they are on any auth screen (like login)
      // or the create-profile screen,
      // redirect them to the main app.
      if (inAuthGroup || segments[0] === 'CreateProfile') {
        router.replace('/(tabs)/home'); // Adjust if your home path is different
      }
      return;
    }
  }, [session, profile, loading, segments, router]);

  // While loading auth, show a spinner
  // (Your app/index.tsx also does this, which is good redundancy)
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#01b964" />
      </View>
    );
  }

  // Once loaded, render the Stack navigator.
  // This Stack will manage all your app screens.
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* Define the "groups" of screens your app has */}
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="create-profile" />
      {/* The 'index.tsx' file is automatically included */}
    </Stack>
  );
};

// This is the Root Layout component
export default function RootLayout() {
  return (
    // Wrap the entire app in the AuthProvider
    <AuthProvider>
      <InitialLayout />
    </AuthProvider>
  );
}