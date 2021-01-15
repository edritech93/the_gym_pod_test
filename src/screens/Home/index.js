import React, { useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { moderateScale } from '../../libs/scaling';
import { Colors } from '../../themes';
import Avatar from '../../components/Avatar';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: Colors.green,
        paddingHorizontal: moderateScale(16),
    },
});

export default function Home(props) {

    useEffect(() => {
        props.navigation.setParams({ profile: null });
        props.navigation.setParams({ onPressProfile: () => {_onPressProfile()} });
    }, []);

    function _onPressProfile() {
        props.navigation.navigate('Profile');
    }

    return (
        <View style={styles.container}>

        </View>
    );
}

Home.navigationOptions = ({ route }) => ({
    headerLeft: () => {
        const profile = route.params?.profile ?? null;
        const onPressProfile = route.params?.onPressProfile ?? null;
        return (
            <TouchableOpacity style={{ marginLeft: moderateScale(12) }} onPress={onPressProfile}>
                <Avatar
                    source={profile && profile.avatar ? { uri: profile.avatar } :
                        require('../../assets/images/profile_placeholder-100.png')}
                    nameTag={profile && profile.name ? profile.name : null}
                    size={moderateScale(28)} />
            </TouchableOpacity>
        )
    },
});