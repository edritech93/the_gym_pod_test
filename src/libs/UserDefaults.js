import AsyncStorage from '@react-native-community/async-storage';

let UserDefaults = {
    set: async(key, value) => {
        const jsonValue = JSON.stringify(value);
        return await AsyncStorage.setItem(key, jsonValue, (error) => {
            // console.log(key + jsonValue + ' setOrRemoveObject error: ' + error);
        });
    },

    get: async(key) => {
        return await AsyncStorage.getItem(key)
            .then((data, error) => {
                if (data) return JSON.parse(data);
                console.log(key + ' cachedObject error: ' + error);
                return null;
            })
    },

    remove: async(key) => {
        return await AsyncStorage.removeItem(key);
    },

    multiRemove: async(keys) => {
        return await AsyncStorage.multiRemove(keys,(err)=>{
            if(err){
                console.log('------------------------------------');
                console.log('err',err);
                console.log('------------------------------------');
                return false
            }
            return true
        });
    },

}

export default UserDefaults;