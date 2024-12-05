import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

const RNFS = require('react-native-fs');

interface Props {
    audio: string;
};

export default function CustomAudioPlayer(props: Props) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [playTime, setPlayTime] = useState('');
    const [audioRecorderPlayer, _] = useState(new AudioRecorderPlayer());

    const styles = StyleSheet.create({
        enviarImage: {
            width: 40,
            height: 40,
        },
    });

    async function playAudioFromBase64(base64String: string) {
        try {
            console.log(base64String, props.audio);
            const filePath = `${RNFS.DocumentDirectoryPath}/audio_tocando.mp3`;
            await RNFS.writeFile(filePath, base64String, 'base64');

            audioRecorderPlayer.addPlayBackListener((e: any) => {
                setPlayTime(e.current_position);
            });

            try {
                await audioRecorderPlayer.startPlayer(filePath);
                setIsPlaying(true);
            } catch (error) {
                console.error('Error playing audio:', error);
            }
        }
        catch (error) {
            console.error('Error playing audio:', error);
        }

        // if (isPlaying) {
        //     const res = await audioRecorderPlayer.stopPlayer();
        //     console.log("stopPlayer: ", res);
        //     setIsPlaying(false);
        // } else {
        //     const res = await audioRecorderPlayer.startPlayer(audioUri);
        //     console.log("startPlayer: ", res);
        //     audioRecorderPlayer.addPlayBackListener((e) => {
        //         console.log('Tocando...', e);
        //     });
        //     setIsPlaying(true);
        // }
    };

    const stopAudio = async () => {
        try {
            await audioRecorderPlayer.stopPlayer();
            setIsPlaying(false);
            setPlayTime('');
        } catch (error) {
            console.error('Error stopping audio:', error);
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Button
                title={isPlaying ? 'Stop Audio' : 'Play Audio'}
                onPress={() => {
                    if (isPlaying) {
                        stopAudio();
                    } else {
                        playAudioFromBase64(props.audio);
                    }
                }}
            />
            <Text>Playback Time: {playTime}</Text>
        </View>
        // <View>
        //     <TouchableOpacity
        //         onPress={isRecording ? stopRecording : startRecording}
        //     >
        //         <Image
        //             source={isRecording ? require("../../../assets/images/chat/voice.png") : require("../../../assets/images/chat/mic.png")}
        //             style={styles.enviarImage}
        //         ></Image>
        //     </TouchableOpacity>
        //     {/* <Button
        //         title={isRecording ? 'Parar' : 'Gravar'}
        //         onPress={isRecording ? stopRecording : startRecording}
        //     /> */}
        //     {/* <Button title={isPlaying ? 'Parar' : 'Tocar'} onPress={playAudio} /> */}
        //     {audioUri && <Text>Audio Path: {audioUri}</Text>}
        // </View>
    );
}