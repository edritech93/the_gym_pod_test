import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, } from 'react-native';
import { moderateScale } from '../libs/scaling';
import { PrimaryButton } from './Buttons';
import { Colors, } from '../themes';
import { Title } from './Text';
import strings from '../constants/localize';
import ModalContent from './ModalContent';
import Modal from 'react-native-modalbox';
import ItemList from './ItemList';

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        paddingTop: moderateScale(8),
        paddingBottom: moderateScale(16),
    },
    wrapButton: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingHorizontal: moderateScale(16),
        marginBottom: moderateScale(16)
    }
});

export default function ModalRadioButton(props) {

    let [dataSource, setDataSource] = useState(props.dataSource);
    let [selected, setSelected] = useState([]);
    let [modalHeight, setModalHeight] = useState(null);

    const modalRef = useRef("MODAL_RADIO_BUTTON");

    useEffect(() => {
        props.modalRef(modalRef.current);
    }, []);

    useEffect(() => {
        setDataSource(props.dataSource);
    }, [props.dataSource]);

    useEffect(() => {
        setSelected(props.selected ? [props.selected] : props.dataSource[0]);
    }, [props.selected]);

    function _onPressItem(item) {
        const updatedList = [item];
        setSelected(updatedList);
    }

    function _findDimension(layout) {
        const { height } = layout;
        const increasedHeight = height + 44;
        if (height > modalHeight) {
            setModalHeight(increasedHeight);
        }
    }

    const handleSubmit = _ => {
        if (selected.length > 0) {
            props.onSubmitRequest(selected[0])
        }
    }

    return (
        <Modal
            style={[styles.container, { height: modalHeight }]}
            backdropColor={Colors.black}
            backdropPressToClose={true}
            ref={modalRef}
            swipeToClose={true}
            coverScreen={true}
            transparent={true}
            position='bottom'
            entry={'bottom'}
            backdrop={true}
        >

            <ModalContent />

            <View onLayout={(event) => { _findDimension(event.nativeEvent.layout) }}>

                <Title
                    style={{
                        paddingHorizontal: moderateScale(16),
                        marginBottom: moderateScale(16)
                    }}>{props.title}</Title>

                <ItemList style={{ marginBottom: moderateScale(12) }}
                    data={dataSource}
                    selected={selected}
                    iconActive={require('./../assets/images/radiobutton_active-24.png')}
                    iconInactive={require('./../assets/images/radiobutton_inactive_24.png')}
                    onPress={(item) => { _onPressItem(item) }}
                />

                <View style={styles.wrapButton}>
                    <PrimaryButton
                        title={strings.SELECT}
                        style={{ width: '30%' }}
                        onPress={handleSubmit}
                    />
                </View>

            </View>

        </Modal>
    )
}