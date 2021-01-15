import { StyleSheet } from 'react-native';
import { moderateScale } from '../../../libs/scaling';
import { Colors, Fonts } from '../../../themes';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    wrapHeader: {
        alignItems: 'center',
        padding: moderateScale(16),
        borderBottomWidth: 1,
        borderBottomColor: Colors.grayShadow,
        paddingTop: moderateScale(3),
        paddingBottom: moderateScale(33)
    },
    txtDescProfile: {
        fontFamily: Fonts.type.regular,
        fontSize: moderateScale(10),
        lineHeight: moderateScale(16),
        color: Colors.textDark,
        opacity: 0.6
    },
    wrapItem: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: moderateScale(18),
        paddingVertical: moderateScale(13),
    },
});