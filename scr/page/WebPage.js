import React,{Component} from 'react'
import {StyleSheet,View,DeviceEventEmitter,WebView,TouchableOpacity,Text,Image} from 'react-native'
import {SafeAreaView} from 'react-navigation';
import {getTitlePixel,NavigationHeadView,getData,WebViewTitle} from '../communal';
import {Lottie} from '../communal'

class WebPage extends Component {
    
    constructor(props){
        super(props);
        this.state={
            request:{},
            phoneNumber:'',
            loadError:false
        }
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
       const webURL = this.props.navigation.state.params.webURL;
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
            <NavigationHeadView title={this.props.navigation.state.params.title||''} backClick={()=>{
                if(!this.state.request.canGoBack){
                    this.props.navigation.goBack();
                }else{
                    this.web.goBack();
                }
            }}/>
            <SafeAreaView style={[{
                    backgroundColor: 'white', flex: 1},{marginTop:getTitlePixel(64)}]}
                 forceInset={{top:'never', bottom: 'never'}}>
                <WebViewTitle ref='webviewtitle'/>
                 <WebView ref={(ref)=>{this.web=ref}} source = { {uri:webURL} } 
                 onShouldStartLoadWithRequest={(request)=>{
                     this.setState({
                        request:request
                     })
                    return true;
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
export default WebPage;
const styles = StyleSheet.create({
    background: {
        backgroundColor: 'white',
    },

    container: {
        flex: 1,
        backgroundColor:'#f5f5f5'
    },
   
})