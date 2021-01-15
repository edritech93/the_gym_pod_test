import { StyleSheet } from 'react-native';
import { moderateScale } from '../../../libs/scaling';
import { Colors, Fonts } from '../../../themes';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        paddingHorizontal: moderateScale(16),
    },
})