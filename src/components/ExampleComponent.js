import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';

const ExampleComponent = (props) => {
    const [text, setText] = useState('');
    return (
        <View style={{padding: 10, backgroundColor: 'white'}}>
            <TextInput
                style={{height: 40}}
                placeholder="Type here to translate!"
                onChangeText={text => setText(text)}
                defaultValue={text}
            />
            <Text style={{padding: 10, fontSize: 42}}>
            {text.split(' ').map((word) => word && '🍕').join(' ')}
            </Text>
        </View>
);
}

export default ExampleComponent;