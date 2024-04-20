import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image } from 'react-native';

import ImageViewer from './components/ImageViewer';

const PlaceholderImage = require('./assets/images/background-image.png'); // переменная с путем к изображению

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer placeholderImageSource={PlaceholderImage} /> {/** свойство ссылающееся на переменную с путем изображеня */}
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
});