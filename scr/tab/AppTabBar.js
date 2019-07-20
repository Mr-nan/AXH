import React from 'react'
import {View,Text,Image,Platform,DeviceEventEmitter} from 'react-native'

import {createBottomTabNavigator} from 'react-navigation';
import HomePage from '../page/HomePage';
import ProductPage from '../page/ProductPage';
import MePage from '../page/MePage';

var currentPage = 'Home';
const AppTabBar = createBottomTabNavigator({
    Home:{
        screen:HomePage,
        navigationOptions:{
            tabBarIcon:({focused, horizontal, tintColor })=>{
                return(
                    <View style={{alignItems:'center'}}>
                        <Image style={{width:25,height:25}} source={focused?require('../image/home_h.png'):require('../image/home.png')}></Image>
                        <Text style={{fontSize:12,marginTop:3,color:focused?'black':'rgba(0,0,0,0.6)'}}>首页</Text>
                    </View>
                )
            },
            tabBarOnPress: ({navigation,defaultHandler}) => {
                currentPage==navigation.state && DeviceEventEmitter.emit('homeLoad');
                currentPage = navigation.state;
                defaultHandler();
            }
        },
       
    },
    Product:{
        screen:ProductPage,
        navigationOptions:{
            tabBarIcon:({focused,horizontal,tintColor})=>{
                    return(
                        <View style={{alignItems:'center'}}>
                        <Image style={{width:25,height:25}} source={focused?require('../image/product_h.png'):require('../image/product.png')}></Image>
                        <Text style={{fontSize:12,marginTop:3,color:focused?'black':'rgba(0,0,0,0.6)'}}>产品大全</Text>
                    </View> 
                    )
             },
             tabBarOnPress: ({navigation,defaultHandler}) => {
                currentPage==navigation.state && DeviceEventEmitter.emit('productLoad');
                currentPage = navigation.state
                defaultHandler();
                
            }
    }
},
    Me:{
        screen:MePage,
        navigationOptions:{
            tabBarIcon:({focused,horizontal,tintColor})=>{
                    return(
                        <View style={{alignItems:'center'}}>
                        <Image style={{width:25,height:25}} source={focused?require('../image/me_h.png'):require('../image/me.png')}></Image>
                        <Text style={{fontSize:12,marginTop:3,color:focused?'black':'rgba(0,0,0,0.6)'}}>我的</Text>
                    </View> 
                    )
            },  
            tabBarOnPress: ({navigation,defaultHandler}) => {
                currentPage = navigation.state;
                defaultHandler();
            }        
       }
    }

},
{
    tabBarOptions: {
        activeTintColor: Platform.OS === 'ios' ? '#e91e63' : '#fff',
        inactiveTintColor:'black',
        showLabel:false,// 隐藏标签
    },
   
})

export default  (AppTabBar);

