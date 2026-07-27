import * as TaskManager from "expo-task-manager";
import * as BackgroundTask from "expo-background-task";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getPlats } from "./platService";

export const SYNC_TASK_NAME = "background-sync-plats";
export const PLATS_CACHE_KEY = "@plats_cache";
export const LAST_SYNC_KEY = "@plats_last_sync";

// Define the background task
TaskManager.defineTask(SYNC_TASK_NAME, async () => {
  try {
    console.log("[Background Sync] Task started...");
    const response = await getPlats();
    const platsData = response.data;

    // Save to AsyncStorage cache
    await AsyncStorage.setItem(PLATS_CACHE_KEY, JSON.stringify(platsData));
    await AsyncStorage.setItem(LAST_SYNC_KEY, new Date().toISOString());

    console.log("[Background Sync] Task completed successfully");
    return BackgroundTask.BackgroundTaskResult.Success;
  } catch (error) {
    console.error("[Background Sync] Task failed:", error);
    return BackgroundTask.BackgroundTaskResult.Failed;
  }
});

// Helper function to register the background task
export async function registerBackgroundSync() {
  try {
    const isRegistered = await TaskManager.isTaskRegisteredAsync(SYNC_TASK_NAME);
    if (!isRegistered) {
      await BackgroundTask.registerTaskAsync(SYNC_TASK_NAME, {
        minimumInterval: 15 * 60, // 15 minutes (minimum allowed by OS)
      });
      console.log("[Background Sync] Task registered successfully");
    } else {
      console.log("[Background Sync] Task already registered");
    }
  } catch (error) {
    console.error("[Background Sync] Registration failed:", error);
  }
}
