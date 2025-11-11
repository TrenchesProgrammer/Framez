
// import {  useEffect } from 'react';
// import { supabase } from '../lib/supabase';
// import { Session } from '@supabase/supabase-js';
// useEffect(() => {
//   const fetchProfile = async (session) => {
//     if (session) {
//       const { data, error } = await supabase
//         .from('profiles')
//         .select('username, full_name, avatar_url') // Select what you need
//         .eq('id', session.user.id) // Get the profile for the logged-in user
//         .single(); // You expect only one row

//       if (error) {
//         console.warn('Error fetching profile:', error.message);
//       } else if (data) {
//         console.log('User profile:', data);
//         // Set this data to your app's state
//         // (e.g., setUsername(data.username))
//       }
//     }
//   };

//   // Get the initial session and fetch profile
//   supabase.auth.getSession().then(({ data: { session } }) => {
//     fetchProfile(session);
//   });

//   // Listen for auth changes and fetch profile
//   const { data: authListener } = supabase.auth.onAuthStateChange(
//     (_event, session) => {
//       fetchProfile(session);
//     }
//   );

//   return () => {
//     authListener.subscription.unsubscribe();
//   };
// }, []);