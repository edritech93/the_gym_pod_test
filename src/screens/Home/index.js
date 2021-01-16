import React, { useEffect, useState } from 'react';
import { View, Loader, FlatList, } from '../../components'
import { USER_TEST } from '../../constants/data';
import ItemPod from './ItemPod';

export default function Home(props) {

    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        _loadDataSource();
        _loadProfile();
    }, []);

    function _loadProfile() {
        //NOTE: for testing only
        const dataTest = {
            name: USER_TEST,
            email: 'test@gmail.com'
        }
        props.profileChange(dataTest);
    }

    function _loadDataSource() {
        //NOTE: for testing only
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            let dataTest = []
            for (let i = 0; i < 10; i++) {
                dataTest.push({
                    imageUrl: 'https://picsum.photos/200/300',
                    title: `The Gym Pod ${i + 1}`
                })
            }
            setDataSource(dataTest);
        }, 100);
    }

    function _onPressItem(item) {
        props.navigation.navigate('BookingPod', {
            item: item,
            onPassProps: () => {
                _loadDataSource();
            }
        })
    }

    const _renderItem = ({ item }) => {
        return (<ItemPod item={item} onPress={() => _onPressItem(item)} />)
    }

    return (
        <View>

            <FlatList
                data={dataSource}
                keyExtractor={(item, index) => index.toString()}
                renderItem={_renderItem}
            />

            <Loader visible={loading} />

        </View>
    );
}