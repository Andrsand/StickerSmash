import { useState } from 'react';
import { StyleSheet, FlatList, Image, Platform, Pressable } from 'react-native';

export default function EmojiList({ onSelect, onCloseModal }) {
    const [emoji] = useState([
        require('../assets/images/emoji1.png'),
        require('../assets/images/emoji2.png'),
        require('../assets/images/emoji3.png'),
        require('../assets/images/emoji4.png'),
        require('../assets/images/emoji5.png'),
        require('../assets/images/emoji6.png'),
    ]);

    return (
        <FlatList
            horizontal
            showsHorizontalScrollIndicator={Platform.OS === 'web'}
            data={emoji}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item, index }) => (
                <Pressable
                    onPress={() => {
                        onSelect(item);
                        onCloseModal();
                    }}>
                    <Image source={item} key={index} style={styles.image} />
                </Pressable>
            )}
        />
    );
}

const styles = StyleSheet.create({
    listContainer: {
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    image: {
        width: 100,
        height: 100,
        marginRight: 20,
    },
});

/*
The <FlatList>Компонент выше отображает все изображения эмодзи, используя <Image>компонент, обернутый <Pressable>компонент. Позже мы улучшим его, чтобы пользователь мог коснуться смайлика на экране, чтобы он появился в виде наклейки на изображении.

The <FlatList>Компонент принимает массив элементов, который в приведенном выше фрагменте предоставляется emojiпеременная массива как значение dataреквизит. Затем renderItemprop берет элемент из dataи возвращает элемент в списке. Наконец, мы добавляем <Image>и <Pressable>компоненты для отображения этого элемента.

The horizontalprop отображает список горизонтально, а не вертикально. showsHorizontalScrollIndicatorпроверяет платформу с помощью Platformмодуль из React Native и отображает горизонтальную полосу прокрутки только в Интернете. 
*/