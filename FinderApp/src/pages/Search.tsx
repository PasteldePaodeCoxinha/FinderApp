import React from 'react';
import { Button, Text, View } from 'react-native';
import Nav from '../components/Nav';

interface Props {
    navigation: any;
}

export default function Search({ navigation }: Props) {
    return (
        <View>
            <Text>Search</Text>
            <Nav navigation={navigation}/>
            <Button
                title="Login"
                onPress={() => navigation.navigate('Landing')}
            />
        </View>
    );
}
