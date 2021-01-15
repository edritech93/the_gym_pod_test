import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { STORAGE } from './../../actions/types';
import { Colors, } from '../../themes';
import AsyncStorage from '@react-native-community/async-storage';
import NavigationService from './../../libs/NavigationService';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.white,
    },
})

export default class Splash extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    async componentDidMount() {
        const token = await AsyncStorage.getItem(STORAGE.TOKEN);
        if (token) {
            setTimeout(() => {
                NavigationService.resetRoot("Dashboard");
            }, 3000);
        } else {
            setTimeout(() => {
                NavigationService.resetRoot("Login");
            }, 3000);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Image
                    source={require('../../assets/images/arrow_left.png')}
                />
            </View>
        );
    }
}
