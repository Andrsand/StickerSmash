import { View, Image } from 'react-native';

export default function EmojiSticker({ imageSize, stickerSource }) {
    return (
        <View style={{ top: -350 }}>
            <Image
                source={stickerSource}
                resizeMode="contain"
                style={{ width: imageSize, height: imageSize }}
            />
        </View>
    );
}

/*
imageSize: значение, определенное внутри <App>компонент.

stickerSource: источник выбранного изображения эмодзи. 
*/