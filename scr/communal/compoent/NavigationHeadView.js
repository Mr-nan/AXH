import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StatusBar,
    StyleSheet,
    Image
} from 'react-native';
import {getTitlePixel, getPixel} from '../utils';

export class NavigationHeadView extends Component {
      
    render() {
        const {
            statusBarStyle,
        } = this.props;

        return (
            <View style={styles.rootStyle}>
                {
                    
                    this.renderNavigationContent()

                }
                <StatusBar barStyle={statusBarStyle || 'default'}/>
            </View>

        );
    }

    renderNavigationContent=() => {
        const {
            title,
            backClick,
            renderRightComponent,
            titleStyle,
            navigationColor,
        } = this.props;
        return (
        
            <View style={[styles.rootStyle, navigationColor && {backgroundColor: navigationColor}]}>
                <View style={[styles.contentStyle, navigationColor && {backgroundColor: navigationColor}]}>
                    {
                        backClick && (
                            <TouchableOpacity activeOpacity={1}
                                onPress={backClick}
                                style={styles.leftContainer}>
                                 <Image style={{width:getPixel(10),height:getPixel(15),marginRight:getPixel(35)}} source={require('../../image/ZUOJIANTOU.png')} resizeMode='contain'></Image>
                            </TouchableOpacity>
                        )
                    }
                    <Text style={[styles.titleStyle, titleStyle && titleStyle]}>{title}</Text>
                    <View style={styles.rightContainer}>
                        {
                            renderRightComponent && renderRightComponent()
                        }
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    rootStyle: {
        height: getTitlePixel(64),
        justifyContent: 'center',
        top: 0,
        left: 0,
        right: 0,
        position: 'absolute',
        backgroundColor:'white'

    },
    contentStyle: {
        marginTop: getTitlePixel(20),
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        height: getPixel(44),
        backgroundColor:'white',
        borderBottomColor:'#999999',
        borderBottomWidth:StyleSheet.hairlineWidth
    },
    leftContainer: {
        paddingLeft: getPixel(20),
        left: 0,
        top: 0,
        bottom: 0,
        position: 'absolute',
        justifyContent: 'center',
    },
    titleStyle: {
        fontWeight: '600',
        fontSize: getPixel(18),
    },
    rightContainer: {
        right: 0,
        top: 0,
        bottom: 0,
        position: 'absolute',
        justifyContent: 'center',
    },

});
