import { useEffect } from "react";
import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { registerBackgroundSync } from "../services/syncTask";

const queryClient = new QueryClient();

export default function Layout() {
  useEffect(() => {
    registerBackgroundSync();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </QueryClientProvider>
  );
}