const fs = require('fs');
const path = require('path');

const root = process.cwd();
const appFile = path.join(root, 'App.js');
const appJsx = `import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
`;

fs.mkdirSync(path.dirname(appFile), { recursive: true });
fs.writeFileSync(appFile, appJsx, 'utf8');

console.log('Reset project template complete.');
