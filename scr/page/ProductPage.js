import React,{Component} from 'react'
import {StyleSheet,View,DeviceEventEmitter,WebView,TouchableOpacity,Text,Image} from 'react-native'
import {SafeAreaView} from 'react-navigation';
import {getTitlePixel,NavigationHeadView,getData,getPixel,WebViewTitle} from '../communal';
import {Lottie} from '../communal'
import *as api from '../netWork/api';
let url =  api.webProduct;

class ProductPage extends Component {
    
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
            url = api.webProduct;
        }
        this.setState({
               phoneNumber:data
           })
       });
       this.productLoad = DeviceEventEmitter.addListener('productLoad',()=>{
            this.web && this.web.reload();
       });
   }

   componentWillUnmount(){
       this.loginAction && this.loginAction.remove();
       this.productLoad && this.productLoad.remove();


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
               this.state.request.url!=url ?
                <NavigationHeadView title={''} backClick={()=>{
                    this.web.goBack();
                }}/> :
                <NavigationHeadView title={'产品大全'}/>
            } 
            <SafeAreaView style={[{
                    backgroundColor: 'white', flex: 1},{marginTop:getTitlePixel(64)}]}
                 forceInset={{top:'never', bottom: 'never'}}>
                 <WebViewTitle ref='webviewtitle'/>
                 <WebView ref={(ref)=>{this.web=ref}} source = { { uri:url} } 
                 onShouldStartLoadWithRequest={(request)=>{
                     if(!this.state.phoneNumber && request.url!=url){
                        this.props.navigation.push('Login');
                        this.refs.webviewtitle && this.refs.webviewtitle.lastProgress();
                        // this.lottie.show(false);
                        return false;
                     }
                     this.setState({
                        request:request
                     })
                     
                    return true;
                 }} 
                 javaScriptEnabled = {true}
                 onMessage={()=>{
                    if(!this.state.phoneNumber){
                        this.props.navigation.push('Login');
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
                     this.setState({
                        loadError:true
                    })
                    this.refs.webviewtitle && this.refs.webviewtitle.lastProgress();
                 }}
                 />
            </SafeAreaView>
            <Lottie ref={(ref) => this.lottie = ref}/>
        </View>
       
   )
}
}
export default ProductPage;
const styles = StyleSheet.create({
    background: {
        backgroundColor: 'white',
    },

    container: {
        flex: 1,
        backgroundColor:'white'
    },
   
})