import React,{Component} from 'react'
import {StyleSheet,View,Image,TouchableOpacity,Text,ScrollView,DeviceEventEmitter} from 'react-native'
import {SafeAreaView} from 'react-navigation';
import {getPixel,screenWidth,getData,CellItemView,showPhone} from '../communal'
import *as api from '../netWork/api';
let url =  api.webHelp;

class MePage extends Component {
    
    constructor(props){
        super(props)
        this.state={
            phoneNumber:''
        };
    }

    componentDidMount(){

         getData('loginKey').then(data=>{
            this.setState({
                phoneNumber:data
            })
        });
        
        this.loginAction = DeviceEventEmitter.addListener('loginAction', (msg) => {
            this.setState({
                phoneNumber:msg
            })
        });
    }

    componentWillUnmount(){
        this.loginAction && this.loginAction.remove();

    }
       render(){
            return(
            <SafeAreaView style={[StyleSheet.absoluteFill, styles.background]}>
            <View style={styles.container}>
               <ScrollView>
                <HeadView click={()=>{
                 ! this.state.phoneNumber &&  this.props.navigation.push('Login');
                }} phoneNumber={this.state.phoneNumber}/>
                <View style={{marginVertical:getPixel(20)}}>
                        <CellItemView title="浏览记录" content="走过，但别错过" imag={require('../image/wode-2.png')} click={()=>{
                           if(!this.state.phoneNumber){
                                this.props.navigation.push('Login')
                           }else{
                                this.props.navigation.push('BrowseList');
                           }
                        }}/>
                    </View>
                    <View style={{marginVertical:getPixel(20),backgroundColor:'white'}}>
                        <CellItemView title="帮助与反馈"  imag={require('../image/wode-3.png')} click={()=>{
                            this.props.navigation.push('Web',{webURL:url,title:'帮助与反馈'})
                        }}/>
                        <View style={{marginLeft:getPixel(23),height:getPixel(1),backgroundColor:'#f5f5f5',flex:1}}/>
                        <CellItemView title="更多" imag={require('../image/wode-4.png')} click={()=>{
                            this.props.navigation.push('More');
                        }}/>
                    </View>
               </ScrollView>
            </View>
            </SafeAreaView>
       )
    }
}

export default MePage;

class HeadView extends Component{

    render(){
        return(
            <View style={{width:screenWidth,height:getPixel(140),flexDirection:'row',alignItems:'center',paddingLeft:getPixel(23),backgroundColor:'white'}}>
                <Image style={{width:getPixel(66),height:getPixel(66),borderRadius:getPixel(33)}} source={require('../image/wode.png')}></Image>
                <TouchableOpacity onPress={this.props.click} style={{marginLeft:getPixel(11),justifyContent:'center'}} activeOpacity={1}>
                   {
                       this.props.phoneNumber?(
                           <View>
                               <Text style={{fontSize:getPixel(16),color:'#000000'}}>你好！</Text>
                               <Text style={{fontSize:getPixel(16),color:'#000000',marginTop:getPixel(10)}}>{showPhone(this.props.phoneNumber,3,4)}</Text>
                           </View>
                       ):(<Text style={{fontSize:getPixel(16),color:'#1facec'}}>点击登录</Text>)
                   } 
                </TouchableOpacity>
            </View>
        )
    }
}



const styles = StyleSheet.create({
    background: {
        backgroundColor: 'white',
    },

    container: {
        flex: 1,
        backgroundColor:'#f5f5f5'
    },
   
})