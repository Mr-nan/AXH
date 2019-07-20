import React,{Component} from 'react'
import {StyleSheet,View,FlatList,TouchableOpacity,Text,Image} from 'react-native'
import {SafeAreaView} from 'react-navigation';
import *as fetch from '../netWork/fetch'
import *as api from '../netWork/api'
import {showTitle,Lottie} from '../communal'
import {getPixel,NavigationHeadView,getTitlePixel,getData,screenWidth} from '../communal'

class BrowseListPage extends Component {

    constructor(props){
        super(props)
        this.state={
            data:[],
        }
       
    }

    componentDidMount(){

         getData('loginKey').then(data=>{
            if(data){
                this.lottie.show(true);
                fetch.getBrowseData(data).then(res=>{
                    this.lottie.show(false);
                    this.setState({
                        data:res
                    });
                }).catch(error=>{
                    this.lottie.show(false);
                    showTitle(error);
                });
            }
        });
    }
       render(){
            return(
            <SafeAreaView style={[StyleSheet.absoluteFill, styles.background]}  forceInset={{top: 'never', bottom: 'never'}}>
            <NavigationHeadView title="浏览记录" backClick={()=>{
                    this.props.navigation.goBack();
                }}/>
            <View style={styles.container}>
                <FlatList data={this.state.data}
                    renderItem={({item,index}) => <BrowseItemView key={`index=${index}`} item={item} click={()=>{
                        if(item.thirdUrl){
                            this.props.navigation.push('Web',{webURL:item.thirdUrl});
                        }
                    }}/>} 
                    ListHeaderComponent={()=>{
                        return(
                            <View style={{width:screenWidth,height:getPixel(27),justifyContent:'center',paddingLeft:getPixel(20)}}>
                                <Text style={{fontSize:getPixel(12),color:'#666666'}}>
                                    最近浏览
                                    <Text style={{fontSize:getPixel(12),color:'#ff3f3c'}}>{this.state.data.length}款</Text>
                                    产品
                                </Text>
                            </View>
                        )
                    }}/>
            </View>
            <Lottie ref={(ref) => this.lottie = ref}/>
            </SafeAreaView>
       )
    }
}
export default BrowseListPage;

class BrowseItemView extends Component{
    render(){
        const {item,click} = this.props;
        return(
            <TouchableOpacity onPress={()=>{
                click && click();
            }} style={{width:screenWidth,height:getPixel(150),backgroundColor:'white',alignItems:'center',padding:getPixel(20),marginBottom:getPixel(1),justifyContent:'space-between'}}>
                <View style={{width:screenWidth-getPixel(40),alignItems:'flex-end',justifyContent:'space-between',flexDirection:'row'}}>
                   <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Image style={{backgroundColor:'#4444',width:getPixel(25),height:getPixel(25),borderRadius:getPixel(5)}} source={{uri:api.baseURL+item.recommendImage}}/>
                        <Text style={{marginLeft:getPixel(10),fontSize:getPixel(22),fontWeight: 'bold'}}>{item.name}</Text>
                   </View>
                    <Text style={{color:'#666666',fontSize:getPixel(12)}}>{''}</Text>
                </View>
                <View style={{width:screenWidth-getPixel(40),flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginVertical:getPixel(15)}}>
                    <View>
                        <Text style={{fontSize:getPixel(17),color:'#ff3f3c',fontWeight: 'bold'}}>{item.loanLimitBegin}-{item.loanLimitEnd}</Text>
                        <Text style={{fontSize:getPixel(13),color:'#666666',marginTop:getPixel(5)}}>{'额度范围(元)'}</Text>
                    </View>
                    <View style={{paddingLeft:getPixel(15),borderLeftColor:'#f5f5f5',borderLeftWidth:getPixel(1.5)}}>
                        <Text style={{fontSize:getPixel(13),color:'#666666'}}>放款时长:{item.loanLength}{item.loanLengthUnit}</Text>
                        <Text style={{fontSize:getPixel(13),color:'#666666'}}>利率:{item.loanRate}{item.loanRateUnit}</Text>
                        <Text style={{fontSize:getPixel(13),color:'#666666'}}>贷款期限:{item.loanPeriodUp}-{item.loanPeriodDown}{item.loanPeriodUnit}</Text>
                    </View>
                    <View style={{width:getPixel(80),height:getPixel(30),borderRadius:getPixel(15),backgroundColor:'#fdd40f',alignItems:'center',justifyContent:'center'}}>
                        <Text>立即申请</Text>
                    </View>
                </View>
                <View style={{width:screenWidth-getPixel(40),height:getPixel(20),backgroundColor:'#f5f5f5',justifyContent:'center',borderRadius:getPixel(10),paddingLeft:getPixel(20)}}>
                    <Text style={{fontSize:getPixel(12),color:'#666666'}}>{item.loanDesc}</Text>
                </View>  
            </TouchableOpacity>
        )
    }
}

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