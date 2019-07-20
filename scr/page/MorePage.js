import React,{Component} from 'react'
import {StyleSheet,View,ScrollView,TouchableOpacity,Text,DeviceEventEmitter} from 'react-native'
import {SafeAreaView} from 'react-navigation';
import {getPixel,NavigationHeadView,CellItemView,getTitlePixel,moveData,getData} from '../communal'
import *as api from '../netWork/api';
let url =  api.webAbout;

class MorePage extends Component {

    constructor(props){
        super(props)
        this.state={
            isShowBtn:false,
        }
    }

    componentDidMount(){

         getData('loginKey').then(data=>{
            this.setState({
                isShowBtn:data?true:false
            })
        });
        
    }
       render(){
            return(
            <SafeAreaView style={[StyleSheet.absoluteFill, styles.background]}  forceInset={{top: 'never', bottom: 'never'}}>
            <NavigationHeadView title="更多" backClick={()=>{
                    this.props.navigation.goBack();
                }}/>
            <View style={styles.container}>
                <ScrollView>
                 <View style={{marginVertical:getPixel(20),backgroundColor:'white'}}>
                        <CellItemView title="关于我们"  imag={require('../image/gengduo-1.png')} click={()=>{
                            this.props.navigation.push('Web',{webURL:url,title:'关于我们'})
                        }}/>
                        <View style={{marginLeft:getPixel(23),height:getPixel(1),backgroundColor:'#f5f5f5',flex:1}}/>
                        <CellItemView title="当前版本" imag={require('../image/gengduo-2.png')} content="v1.0" hide={true}/>
                </View>
                {
                    this.state.isShowBtn && (
                        <TouchableOpacity style={{flex:1,height:getPixel(60),backgroundColor:'white',alignItems:'center',justifyContent:'center',marginTop:getPixel(20)}}
                        onPress={()=>{
                           moveData('loginKey');
                           DeviceEventEmitter.emit('loginAction','');
                           this.props.navigation.goBack();
                        }}>
                           <Text style={{fontSize:getPixel(15),color:'#1facec'}}>安全退出</Text>
                       </TouchableOpacity>
                    )
                }
               
                </ScrollView>
            </View>
            </SafeAreaView>
       )
    }
}
export default MorePage;
const styles = StyleSheet.create({
    background: {
        backgroundColor: 'white',
    },

    container: {
        flex: 1,
        backgroundColor:'#f5f5f5',
        marginTop:getTitlePixel(64)
    },
   
})