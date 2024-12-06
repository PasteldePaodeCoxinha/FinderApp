import React, { useState } from 'react';
import { View, Alert, Image, TouchableOpacity, StyleSheet } from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const RNFS = require('react-native-fs');

interface Props {
    setAudio: (audio: string) => void;
};

const audioRecorderPlayer = new AudioRecorderPlayer();

export default function CustomAudioInput(props: Props) {
    const [isRecording, setIsRecording] = useState(false);
    const [audioUri, setAudioUri] = useState('');

    const styles = StyleSheet.create({
        enviarImage: {
            width: 40,
            height: 40,
        },
    });

    async function checkPermissions() {
        const permissionStatus = await request(PERMISSIONS.ANDROID.RECORD_AUDIO);

        if (permissionStatus !== RESULTS.GRANTED) {
            Alert.alert('Permita acesso ao microfone!');
            return false;
        }
        return true;
    }

    async function startRecording() {
        const hasPermission = await checkPermissions();
        if (!hasPermission) return;

        const uri = `${RNFS.DocumentDirectoryPath}/audio_gravando.mp3`;

        try {
            await audioRecorderPlayer.startRecorder(uri);
            audioRecorderPlayer.addRecordBackListener((e) => {
                console.log('Gravando...', e);
            });
            setIsRecording(true);
            setAudioUri(uri);
        } catch (error) {
            console.error('Erro iniciando recorder:', error);
        }
    }

    async function stopRecording() {
        if (!isRecording) {
            console.log('Gravação já parou.');
            return;
        }

        try {
            await audioRecorderPlayer.stopRecorder();
            audioRecorderPlayer.removeRecordBackListener();
            setIsRecording(false);

            const base64Audio = await convertToBase64(audioUri);
            props.setAudio(base64Audio);
        } catch (error) {
            console.error('Erro parando recorder:', error);
        }
    }

    async function convertToBase64(uri: string): Promise<string> {
        try {
            const base64 = await RNFS.readFile(uri, 'base64');
            return base64;
        } catch (error) {
            console.error('Erro convertendo para base64:', error);
            return '';
        }
    }

    return (
        <View>
            <TouchableOpacity
                onPress={isRecording ? stopRecording : startRecording}
            >
                <Image
                    source={isRecording ? require("../../../assets/images/chat/voice.png") : require("../../../assets/images/chat/mic.png")}
                    style={styles.enviarImage}
                ></Image>
            </TouchableOpacity>
        </View>
    );
}