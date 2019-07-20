import {WToast} from 'react-native-smart-tip'

export function showTitle(text){
    WToast.show({data: text,position: WToast.position.CENTER});
}

