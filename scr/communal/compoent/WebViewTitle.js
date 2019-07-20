/**
 * Created by lhc on 2017/2/15.
 */
import React, {PureComponent} from 'react';
import {Animated} from 'react-native';
// 图片加文字
import {getWidth, getPixel, getTitlePixel} from '../utils';
export class WebViewTitle extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            fadeAnim: new Animated.Value(0),
            height: getPixel(4),
        };
    }

    /**
     * from @zhaojian
     *
     * 首次加载进度条
     * */
    firstProgress = () => {
        this.setState({
            height: getPixel(3),
        });
        Animated.timing( // Uses easing functions
            this.state.fadeAnim, // The value to drive
            {toValue: getWidth() - getWidth() / 5, duration: 2000}, // Configuration
        ).start(); // Don't forget start!
    }


    /**
     * from @zhaojian
     *
     * 二次加载进度条
     * */
    lastProgress = () => {
        Animated.timing( // Uses easing functions
            this.state.fadeAnim, // The value to drive
            {
                toValue: getWidth(),
            }, // Configuration
        ).start(() => {
            this.setState({
                height: 0,
                fadeAnim: new Animated.Value(0),
            });
        }); // Don't forget start!
    }

    render() {
        return (<Animated.View style={{
            width: this.state.fadeAnim,
            height: this.state.height,
            backgroundColor: '#fdd40f',
        }}/>);
    }
}
