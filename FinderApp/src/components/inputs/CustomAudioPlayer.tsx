import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import useTheme from '../../hooks/UseTheme';
import Sound from 'react-native-sound';

const RNFS = require('react-native-fs');

interface Props {
    audio: string;
    usuario: boolean;
};

const audioRecorderPlayer = new AudioRecorderPlayer();

export default function CustomAudioPlayer(props: Props) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [playTime, setPlayTime] = useState(0);
    const { theme } = useTheme();

    const styles = StyleSheet.create({
        tocarImage: {
            width: 40,
            height: 40,
        },
        audioImage: {
            width: 80,
            height: 25,
        },
        durationText: {
            color: theme.colors.text,
        },
        msgUsuario: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            alignSelf: "flex-end",
            backgroundColor: theme.colors.msgBG,
            borderWidth: 2,
            borderColor: theme.colors.border,
            borderTopLeftRadius: 15,
            borderBottomRightRadius: 15,
            borderBottomLeftRadius: 15,
            padding: 5,
            paddingHorizontal: 10,
            maxWidth: "60%",
        },
        msgMatch: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            alignSelf: "flex-start",
            backgroundColor: "white",
            borderWidth: 2,
            borderColor: theme.colors.border,
            borderTopRightRadius: 15,
            borderBottomRightRadius: 15,
            borderBottomLeftRadius: 15,
            padding: 5,
            paddingHorizontal: 10,
            maxWidth: "60%",
        },
    });

    async function playAudioFromBase64(base64String: string) {
        try {
            const filePath = `${RNFS.DocumentDirectoryPath}/audio_tocando.mp3`;
            await RNFS.writeFile(filePath, base64String, 'base64');

            audioRecorderPlayer.addPlayBackListener((e: any) => {
                setPlayTime(e.currentPosition / 1000);
                if (e.isFinished) {
                    stopAudio();
                }
            });

            const sound = new Sound(filePath, '', (error) => {
                if (error) {
                    console.log('Failed to load sound', error);
                    return;
                }
                const durationInSeconds = sound.getDuration();
                setDuration(durationInSeconds);
            });


            try {
                await audioRecorderPlayer.startPlayer(filePath);
                setIsPlaying(true);
            } catch (error) {
                console.error('Erro tocando áudio:', error);
            }
        }
        catch (error) {
            console.error('Erro tocando áudio:', error);
        }
    };

    async function stopAudio() {
        try {
            audioRecorderPlayer.removePlayBackListener();
            await audioRecorderPlayer.stopPlayer();
            setIsPlaying(false);
            setPlayTime(0);
        } catch (error) {
            console.error('Erro parando áudio:', error);
        }
    };

    return (
        <View style={props.usuario ? styles.msgUsuario : styles.msgMatch}>
            <TouchableOpacity
                onPress={() => {
                    if (isPlaying) {
                        stopAudio();
                    } else {
                        playAudioFromBase64(props.audio);
                    }
                }}
            >
                <Image
                    style={styles.tocarImage}
                    source={isPlaying ? require('../../../assets/images/chat/pause.png') : require('../../../assets/images/chat/play.png')}
                />
            </TouchableOpacity>
            <Image
                style={styles.audioImage}
                source={require('../../../assets/images/chat/audio.png')}
            />
            <Text style={styles.durationText}>{duration >= 1 ? `${(duration - playTime).toFixed(0)}s` : ""}</Text>
        </View>
    );
}