import { View, Image } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const scaleImage = useSharedValue(imageSize);

const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
        if (scaleImage.value !== imageSize * 2) {
            scaleImage.value = scaleImage.value * 2;
        }
    });

const imageStyle = useAnimatedStyle(() => {
    return {
        width: withSpring(scaleImage.value),
        height: withSpring(scaleImage.value),
    };
});


export default function EmojiSticker({ imageSize, stickerSource }) {
    return (
        <View style={{ top: -350 }}>
            <GestureDetector gesture={doubleTap}>
                <Animated.Image                      // компонент, обеспечивающий работу жеста двойного касания. 
                    source={stickerSource}
                    resizeMode="contain"
                    style={[imageStyle, { width: imageSize, height: imageSize }]}
                />
            </GestureDetector>
        </View>
    );
}

/*
imageSize: значение, определенное внутри <App>компонент.

stickerSource: источник выбранного изображения эмодзи. 

 Animatedкомпонент смотрит на styleопора компонента. Он также определяет, какие значения нужно анимировать, и применяет обновления для создания анимации. 
*/