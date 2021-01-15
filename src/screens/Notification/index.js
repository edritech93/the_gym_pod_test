import React, { useState, useEffect } from 'react';
import { View, FlatList, Loader } from '../../components';
import ItemNotification from './ItemNotification';

export default function Notification(props) {

    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        _loadDataSource();
    }, []);

    function _loadDataSource() {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            let dataTest = []
            for (let i = 0; i < 10; i++) {
                dataTest.push({
                    title: `Title Notification ${i + 1}`,
                    description: `Description Notification ${i + 1}`,
                })
            }
            setDataSource(dataTest);
        }, 3000);
    }

    const _renderItem = ({ item }) => {
        return (<ItemNotification item={item} />)
    }

    return (
        <View style={{
            paddingHorizontal: 0,
        }}>

            <FlatList
                data={dataSource}
                keyExtractor={(item, index) => index.toString()}
                renderItem={_renderItem}
            />

            <Loader visible={loading} />

        </View>
    );
}
