import { StyleSheet } from 'react-native';
import { moderateScale } from '../../../libs/scaling';
import { Colors, Fonts } from '../../../themes';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: Colors.white,
        paddingHorizontal: moderateScale(16),
    },
    forgotContainer: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
        marginTop: moderateScale(14),
        marginBottom: moderateScale(20)
    },
    clickHere: {
        fontFamily: Fonts.type.regular,
        fontSize: moderateScale(14),
        lineHeight: moderateScale(21),
        marginBottom: moderateScale(2),
    },
    loginButton: {
        width: '100%',
        marginBottom: moderateScale(20)
    },
    registerButton: {
        width: '100%',
        backgroundColor: 'transparent'
    },
    registerButtonText: {
        color: Colors.primary
    },
})