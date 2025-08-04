import React from 'react';
import { Stack } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';
import { useAuth } from '@/hooks/useAuth';

/**
 * RootNavigator component that determines which navigator to show based on authentication state
 * - Shows AuthNavigator when user is not authenticated
 * - Shows AppNavigator when user is authenticated
 * - Shows loading indicator while determining auth state
 */
export function RootNavigator() {
  const { user, isLoadingUser } = useAuth();

  // Show loading indicator while determining auth state
  if (isLoadingUser) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack>
      {user ? (
        // User is signed in - show app screens
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      ) : (
        // No user - show auth screens
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      )}
      {/* Common screens that should be accessible from anywhere */}
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}