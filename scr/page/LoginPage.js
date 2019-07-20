import React,{Component} from 'react'
import {StyleSheet,View,Text,Image,TouchableOpacity,TextInput,ScrollView,DeviceEventEmitter} from 'react-native'
import {SafeAreaView} from 'react-navigation';
import {getPixel,screenWidth,screenHeight,showTitle,Lottie,saveData} from '../communal'
import *as fetch from '../netWork/fetch';
import *as api from '../netWork/api';

let url =  api.webProtol;
class LoginPage extends Component {

    constructor(props){
        super(props)
        this.state={
            checkImage:'',
        }
    }

    componentDidMount(){
        this.getCheckImageAction();
    }

    getCheckImageAction=()=>{
        fetch.getCheckImage().then((res)=>{
            console.log('------------',res);
            this.token = res.token;
            this.setState({
                checkImage:res.base64Str
            })
    }).catch((error)=>{
        showTitle(error);

    });
    }

    getSendCodeAction=(action)=>{

        if(!this.phoneNumber || this.phoneNumber.length<11){
            showTitle('请输入正确手机号');
            return;
        }
        if(!this.imgCode){
            showTitle('请输入图片验证码');
            return;
        }

        action();
        fetch.sendCode(this.phoneNumber,this.imgCode).then((res)=>{
           
        }).catch((error)=>{
            showTitle(error);
        })
    }

    loginAction=()=>{

        if(!this.phoneNumber || this.phoneNumber.length<11){
            showTitle('请输入正确手机号');
            return;
        }
        if(!this.imgCode){
            showTitle('请输入图片验证码');
            return;
        }

        if(!this.code){
            showTitle('请输入短信验证码');
            return;
        }

        this.lottie.show(true,'登录中...');
        fetch.login(this.phoneNumber,this.imgCode,this.code,this.token).then((res)=>{
            this.lottie.show(false);
            showTitle('登录成功');
            saveData('loginKey',this.phoneNumber).then(()=>{
                DeviceEventEmitter.emit('loginAction',this.phoneNumber);
                this.props.navigation.goBack();
            })

        }).catch((error)=>{
            this.lottie.show(false);
            showTitle(error);

        })
    }

       render(){
            return(
            <SafeAreaView style={[StyleSheet.absoluteFill, styles.background]}>
            <View style={styles.container}>
               <ScrollView keyboardDismissMode="on-drag">
                <View style={{width:screenWidth,alignItems:'center'}}>
                    <Image style={{width:getPixel(137),height:getPixel(38),marginVertical:getPixel(50)}} source={require('../image/zhuye-logo.png')}/>
                    <LoginItemView title="请输入手机号" onChangeText={(text)=>{
                        this.phoneNumber = text;
                    }} image={require('../image/phoneNum.png')} maxLength={11} keyboardType="number-pad"/>
                    <LoginItemView title="请输入图片验证码" renderRight={(text)=>{
                        return(
                        <TouchableOpacity style={{backgroundColor:'#fdd40f',width:getPixel(90),height:getPixel(30)}} onPress={this.getCheckImageAction}>
                            <Image style={{width:getPixel(90),height:getPixel(30)}} source={{uri: `data:image/png;base64,${this.state.checkImage}`}}></Image>
                        </TouchableOpacity>)
                    }} onChangeText={(text)=>{
                        this.imgCode = text;

                    }} image={require('../image/ImageCode.png')} keyboardType="number-pad"/>
                    <LoginItemView title="请输入短信验证码" renderRight={()=>{
                        return(
                            <SendCodeBtn click={(action)=>this.getSendCodeAction(action)}/>
                       )
                    }}
                    onChangeText={(text)=>{
                        this.code = text;
                    }} image={require('../image/code.png')} keyboardType="number-pad"/>
                    <TouchableOpacity style={{marginTop:getPixel(50)}} onPress={this.loginAction}>
                        <View style={{
                                alignItems:'center',
                                justifyContent:'center',
                                backgroundColor:'#fdd40f',
                                height:getPixel(42),
                                borderRadius:getPixel(21),
                                width:screenWidth-getPixel(52)}}>
                            <Text style={{color:'#000000',fontSize:getPixel(15)}}>下一步</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                </ScrollView>
                <TouchableOpacity style={{flexDirection:'row',alignItems:'center',marginBottom:getPixel(10)}} onPress={()=>{
                    this.props.navigation.push('Web',{webURL:url});
                }}>
                    <Text style={{fontSize:getPixel(12),color:'#999999'}}>登录即代表同意</Text>
                    <Text style={{fontSize:getPixel(12),color:'#1facec'}}>{"《安心花平台服务协议》"}</Text>
                </TouchableOpacity>           
            </View>
            <Lottie ref={(ref) => this.lottie = ref}/>
            </SafeAreaView>
       )
    }
}

export default LoginPage;

class LoginItemView extends Component{
    render(){
        return(
            <View style={{
                height:getPixel(47),
                marginHorizontal:getPixel(26),
                alignItems:'center',
                flexDirection:'row',justifyContent:'space-between',borderBottomWidth:getPixel(1),borderBottomColor:'#f5f5f5'}}>
                <View style={{flexDirection:'row',alignItems:'center',flex:1}}>
                    <Image style={{width:getPixel(20),height:getPixel(25)}} source={this.props.image} resizeMode="contain"></Image>
                    <TextInput style={{width:getPixel(150),height:getPixel(40),padding:0,marginLeft:getPixel(11)}} 
                            placeholder={this.props.title} onChangeText={(text)=>{
                                this.props.onChangeText(text)
                            }} maxLength={this.props.maxLength} keyboardType={this.props.keyboardType||'email-address'}/>
                </View>
                <View>
                    {
                       this.props.renderRight && this.props.renderRight()
                    }
                </View>
            </View>
        )
    }
}

class SendCodeBtn extends Component{
    constructor(props){
        super(props)
        this.state={
            timerNumber:60
        }
       
    }

    render(){
        return(
        <Text style={{fontSize:getPixel(14),color:'#1facec'}} onPress={this.sendCodeClick}>
           {this.state.timerNumber==60?'获取验证码':`${this.state.timerNumber}s`} 
        </Text>
        )
    }
    startTime=()=>{
        this.timer && clearTimeout(this.timer);
            this.timer = setInterval(()=>{
                if(this.state.timerNumber<=1){
                    this.setState({
                        timerNumber:60
                    })
                    this.timer && clearTimeout(this.timer);

                }else{
                    this.setState({
                        timerNumber:this.state.timerNumber-1
                     })
                }
               
           },500);
    }
    sendCodeClick=()=>{
        if(this.state.timerNumber==60){
            
           this.props.click(()=>{
               this.startTime();
           });

        }
    }
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: 'white',
    },

    container: {
        flex: 1,
        backgroundColor:'white',
        justifyContent: 'space-between',
        alignItems: 'center',
        height:screenHeight

    },
   
})