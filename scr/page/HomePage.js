import React,{Component} from 'react'
import {StyleSheet,View,DeviceEventEmitter,WebView,Text,Image,TouchableOpacity} from 'react-native'
// import { WebView } from 'react-native-webview';
import {SafeAreaView} from 'react-navigation';
import {getTitlePixel,NavigationHeadView,getData, getPixel,WebViewTitle} from '../communal';
import {Lottie} from '../communal';
import *as api from '../netWork/api';
import { clone } from '@babel/types';

let url =  api.webHome;

class HomePage extends Component {
        constructor(props){
            super(props);
            this.state={
                request:{},
                phoneNumber:'',
                loadError:false,
            }
        }
        componentDidMount(){
          
            getData('loginKey').then(data=>{
                if(data){
                    url+="?mobile="+data;
                }
                this.setState({
                   phoneNumber:data
               })
               
           });
           
           this.loginAction = DeviceEventEmitter.addListener('loginAction', (data) => {
            if(data){
                url+="?mobile="+data;
            }else{
                url = api.webHome;
            }
            this.setState({
                   phoneNumber:data
               })
           });

           this.homeLoad = DeviceEventEmitter.addListener('homeLoad',()=>{
                this.web && this.web.reload();

           })
       }
   
       componentWillUnmount(){
           this.homeLoad && this.homeLoad.remove();
           this.loginAction && this.loginAction.remove();

   
       }
       render(){
           if(this.state.loadError){
                return(
                    <TouchableOpacity style={[styles.container,{alignItems:'center',justifyContent:'center'}]} 
                        onPress={()=>{
                            this.setState({
                                loadError:false
                            })
                        }}>
                        <Image style={{width:getPixel(30),height:getPixel(30),marginBottom:getPixel(20)}} source={require('../image/loadError.png')}></Image>
                        <Text>点击重新加载</Text>
                    </TouchableOpacity>
                )
            
           }
            return(
            <View style={styles.container}>
               {
                   this.state.request.url!=url && 
                    <NavigationHeadView title={''} backClick={()=>{
                        this.web.goBack();
                    }}/>
                } 
               
                <SafeAreaView style={[{
                        backgroundColor: 'white', flex: 1},this.state.request.url!=url &&{marginTop:getTitlePixel(64)}]}
                     forceInset={{top: this.state.request.url!=url?'never':'always', bottom: 'never'}}>
                
                    <WebViewTitle ref='webviewtitle'/>
                     <WebView ref={(ref)=>{this.web=ref}} 
                            source={{uri:url}}
                            onShouldStartLoadWithRequest={(request)=>{
                                if(!this.state.phoneNumber && request.url!=url){
                                   this.props.navigation.push('Login');
                                   return false;
                                }
           
                                this.setState({
                                   request:request
                                })
                                
                               return true;
                            }} 
                     javaScriptEnabled = {true}
                     onMessage={(event)=>{
                         console.log('------------event',event.nativeEvent.data);
                         if(event.nativeEvent.data && (event.nativeEvent.data.indexOf("/product/all") != -1 )){
                            this.props.navigation.navigate('Product')
                         }else if(!this.state.phoneNumber){
                            this.props.navigation.push('Login');
                            this.refs.webviewtitle && this.refs.webviewtitle.lastProgress();
                            // this.lottie.show(false);
                            return false;
                         }
                     }}
                     onLoadStart={() => {
                        // this.lottie.show(true);
                        this.refs.webviewtitle && this.refs.webviewtitle.firstProgress();
                    }}
                    
                     onLoadEnd={()=>{
                        // this.lottie.show(false);
                        this.setState({
                            loadError:false
                        })
                        this.refs.webviewtitle && this.refs.webviewtitle.lastProgress();

                     }}
                     onError={()=>{
                        this.refs.webviewtitle && this.refs.webviewtitle.lastProgress();
                        // this.lottie.show(false);
                         this.setState({
                            loadError:true
                        })
                     }}
                     />
                    
                </SafeAreaView>
                <Lottie ref={(ref) => this.lottie = ref}/>
            </View>
           
       )
    }
}
export default HomePage;
const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor:'white',
    },

})