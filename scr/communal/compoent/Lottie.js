
// Lottie.js
import React, {Component} from 'react';
import {StyleSheet, View, Dimensions,ActivityIndicator} from 'react-native';
import {getPixel, getTitlePixel} from '../utils'
const {width, height} = Dimensions.get('window');
import {WModal} from 'react-native-smart-tip'

export class Lottie extends Component {

    constructor(props){
        super(props)
        this.state={
            isShow:false
        }
    }

    show=(bool,text)=>{
        this.setState({
            isShow:bool
        })

        if(bool){
                const modalOpts = {
                    data:text||'加载中...',
                    textColor: '#fff',
                    backgroundColor: '#444444',
                    position: WModal.position.CENTER,
                    icon: <ActivityIndicator color='#fff' size={'large'} style={{marginVertical:getPixel(20)}}/>
                }
                WModal.show(modalOpts)
        }else{
            WModal.hide();
        }
    }

    render() {
       
        if(!this.state.isShow){
            return(<View></View>)
        }

        return (
            <View style={styles.content}>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    content: {
        width,
        height,
        backgroundColor: '#00000000',
        alignItems: 'center',
        position: 'absolute',
    },
    container: {
        width: getPixel(100),
        height: getPixel(100),
        backgroundColor: '#00000000',
        marginTop: getTitlePixel(64),
    },
});
