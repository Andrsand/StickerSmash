import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { GestureHandlerRootView } from "react-native-gesture-handler";

import Button from './components/Button';
import ImageViewer from './components/ImageViewer';
import CircleButton from './components/CircleButton';
import IconButton from './components/IconButton';
import EmojiPicker from "./components/EmojiPicker";
import EmojiList from './components/EmojiList';
import EmojiSticker from './components/EmojiSticker';

const PlaceholderImage = require('./assets/images/background-image.png'); // переменная с путем к изображению

export default function App() {
  const [pickedEmoji, setPickedEmoji] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false); // значение по умолчанию falseчтобы модальное окно было скрыто до тех пор, пока пользователь не нажмет кнопку, чтобы открыть его. 
  const [showAppOptions, setShowAppOptions] = useState(false); // Значение этой переменной будет установлено равным true когда пользователь выбирает изображение из медиа-библиотеки или решает использовать изображение-заполнитель. 
  const [selectedImage, setSelectedImage] = useState(null);

  const onReset = () => {       // onReset()Функция вызывается, когда пользователь нажимает кнопку сброса. При нажатии этой кнопки мы снова отобразим кнопку выбора изображения. 
    setShowAppOptions(false);
  };

  const onAddSticker = () => {
    setIsModalVisible(true);   // когда пользователь нажимает кнопку. Откроется окно выбора смайлов. 
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const onSaveImageAsync = async () => {
    // we will implement this later
  };


  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({ // получает объект, в котором указаны разные параметры. Этот объект представляет собой ImagePickerOptionsобъект . Мы можем передать объект, чтобы указать различные параметры при вызове метода. 
      allowsEditing: true,                                   // Когда allowsEditingустановлено на true, пользователь может обрезать изображение в процессе выбора на Android и iOS
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      alert('You did not select any image.');
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer
          placeholderImageSource={PlaceholderImage} //свойство ссылающееся на переменную с путем изображения 
          selectedImage={selectedImage}
        />
        {pickedEmoji && <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />}
      </View>
      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="Reset" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button theme="primary" label="Choose a photo" onPress={pickImageAsync} /> {/* pickImageAsync()функция отвечает за вызов ImagePicker.launchImageLibraryAsync()и затем обработка результата. launchImageLibraryAsync()Метод возвращает объект, содержащий информацию о выбранном изображении.  */}
          <Button label="Use this photo" onPress={() => setShowAppOptions(true)} />
        </View>
      )}
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} /> {/* onSelectопора на <EmojiList>компонент выбирает эмодзи и onCloseModalprop закрывает модальное окно после выбора эмодзи. */}
      </EmojiPicker>
      <StatusBar style="auto" />
    </GestureHandlerRootView>
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
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
