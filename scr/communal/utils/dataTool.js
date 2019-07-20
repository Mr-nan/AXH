import AsyncStorage from '@react-native-community/async-storage';

export  function saveData(key,data){
    return new Promise((resolve, reject)=>{
        AsyncStorage.setItem(key, data, (error) => {
    if (error) {
        reject()
        }else{
        resolve()
    }
  });});

}

export async function getData(key){
        const value = await AsyncStorage.getItem(key);
        if(value !== null) {
            console.log('------------value',value);
            return value;
        }else{
            return '';
        }
}

export function moveData(key){
    AsyncStorage.removeItem(key);
}


export function showPhone (str,frontLen,endLen) {
    let len = str.length-frontLen-endLen;
    let xing = '';
    for (let i=0;i<len;i++) {
    xing+='*';
    }
    return str.substring(0,frontLen)+xing+str.substring(str.length-endLen);
}