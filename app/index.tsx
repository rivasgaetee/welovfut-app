import { Redirect } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';
import { View, ActivityIndicator } from 'react-native';

export default function Page() {
  const { user, isLoadingUser } = useAuth();

  // Show loading indicator while determining auth state
  if (isLoadingUser) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Redirect based on authentication state
  return user ? <Redirect href="/(tabs)" /> : <Redirect href="/(auth)" />;
}
