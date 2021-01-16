import React, { useRef, useState, useEffect } from 'react';
import { View as DefaultView, StyleSheet } from 'react-native';
import { PrimaryButton, SecondaryButton, } from './Buttons';
import { Text, Title } from './Text';
import { CardView } from './Card';
import { moderateScale } from '../libs/scaling';
import { Colors, Metrics } from '../themes';
import { Helper } from '../libs/Helper';
import Calendar from './Calendar';
import ModalContent from './ModalContent';
import Modal from 'react-native-modalbox';

const styles = StyleSheet.create({
    container: {
        height: Metrics.screenHeight * 0.95,
        borderTopLeftRadius: moderateScale(10),
        borderTopRightRadius: moderateScale(10),
        paddingTop: moderateScale(10),
        backgroundColor: Colors.white,
    },
    divider: {
        borderColor: Colors.dividerColor,
        borderBottomWidth: 1,
        marginVertical: moderateScale(10)
    },
    textContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingVertical: moderateScale(12),
        paddingHorizontal: moderateScale(16)
    },
    selectedDateContainer: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    label: {
        fontSize: moderateScale(12),
        lineHeight: moderateScale(14),
    },
    wrapButton: {
        flexDirection: 'row',
        backgroundColor: Colors.white,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'flex-end',
        padding: moderateScale(16),
    }
});

export default function ModalCalendar(props) {

    const {
        initialRange,
        title,
        isSingle = false,
        onSubmit,
        booked = [],
    } = props

    const [startDate, setStartDate] = useState(initialRange[0]);
    const [endDate, setEndDate] = useState(initialRange[1]);

    const modalRef = useRef("MODAL_CALENDAR");

    useEffect(() => {
        props.modalRef(modalRef.current);
    }, []);

    function _onPressSubmit() {
        modalRef.current.close();

        if (endDate != null) {
            onSubmit(startDate, endDate);
        } else {
            onSubmit(startDate, startDate);
        }
    }

    return (
        <Modal
            style={styles.container}
            ref={modalRef}
            swipeToClose={true}
            backdrop={true}
            coverScreen={true}
            backdropPressToClose={true}
            transparent={true}
            position='bottom'
            entry={'bottom'}
            backdropColor={'black'}
            swipeArea={50}>

            <ModalContent />

            <Title style={{
                marginLeft: moderateScale(16)
            }}>{title}</Title>

            <DefaultView style={styles.divider} />

            <DefaultView style={styles.textContainer}>

                <DefaultView style={styles.selectedDateContainer}>
                    <Text style={styles.label}>{endDate != null ? 'Start Date' : 'Selected Date'}</Text>
                    <Text>{Helper.datePicker(startDate)}</Text>
                </DefaultView>

                {endDate && (
                    <DefaultView style={styles.selectedDateContainer}>
                        <Text style={styles.label}>End Date</Text>
                        <Text>{Helper.datePicker(endDate)}</Text>
                    </DefaultView>
                )}

            </DefaultView>

            <Calendar
                initialRange={initialRange}
                style={{
                    height: '78%'
                }}
                isSingle={isSingle}
                onStartDateSelected={(start) => {
                    setStartDate(start)
                    setEndDate(null)
                }}
                onSuccess={(start, end) => {
                    setStartDate(start)
                    setEndDate(end)
                }}
                theme={{
                    markColor: Colors.primary,
                    markTextColor: Colors.white
                }}
                booked={booked}
            />

            <CardView style={styles.wrapButton}>

                <SecondaryButton
                    title={'Cancel'}
                    style={{
                        marginRight: moderateScale(16),
                    }}
                    onPress={() => modalRef.current.close()} />

                <PrimaryButton
                    title={'Ok'}
                    onPress={() => _onPressSubmit()} />

            </CardView>

        </Modal>
    )
}