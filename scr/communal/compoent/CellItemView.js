import React,{Component} from 'react'
import {View,Text,TouchableOpacity,Image} from 'react-native'
import {getPixel} from '../utils'

export class CellItemView extends Component{
    render(){
        return(
            <TouchableOpacity style={{
                height:getPixel(44),
                backgroundColor:'white',
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'space-between'}} onPress={()=>{
                    this.props.click && this.props.click();
                }}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                  <Image style={{width:getPixel(20),height:getPixel(20),marginLeft:getPixel(23)}} source={this.props.imag}></Image>
                  <Text style={{fontSize:getPixel(15),color:'#000000',marginLeft:getPixel(14)}}>{this.props.title}</Text>
                </View>
                <View style={{marginRight:getPixel(18),flexDirection:'row',alignItems:'center'}}>
                    <Text style={[{fontSize:getPixel(14),color:'#b9b9b9',marginRight:getPixel(10)},this.props.hide && {marginRight:getPixel(0)}]}>{this.props.content}</Text>
                   {
                      !this.props.hide && <Image style={{width:getPixel(15),height:getPixel(10)}} source={require('../../image/youjiantou.png')} resizeMode='contain'></Image>
                   } 
                </View>

            </TouchableOpacity>
        )
    }
}