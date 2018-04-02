import React, { Component, PropTypes } from 'react';
import {StyleSheet,Text,View,Image,TouchableOpacity,DeviceEventEmitter} from 'react-native';

import { observer } from 'mobx-react/native';
import { action, autorun, observe } from 'mobx';

@observer
export default class MobxShopItemComponent extends Component {

    // static propTypes = {
    //     itemData : PropTypes.object.isRequired,
    //     data : PropTypes.object.isRequired,
    // };

    constructor(props) {
        super(props);
        this.itemData = this.props.itemData;//把大组建数据传给小组件
        console.log(this)//this指的当前MobxShopItemComponent这个组件
    }

    componentDidMount() {
        this.subscription = DeviceEventEmitter.addListener('allSelect', (isSelAll) => {
            this.itemData.isSelect = isSelAll;
        })
    };

    componentWillUnmount() {
        this.subscription && this.subscription.remove();
    };

    @action
    selectPress = () => {
        this.itemData.isSelect = !this.itemData.isSelect;
        let money = this.itemData.money * this.itemData.count;
        if (this.itemData.isSelect) {
            this.props.data.increase(money);
        }
        else {
            this.props.data.reduce(money)
        }
        this.props.data.itemPress();
    };

    @action
    increase = () => {
        console.log(54)
        this.itemData.count += 1;
        if (this.itemData.isSelect) {
            this.props.data.increase(this.itemData.money);
        }else{
            this.itemData.isSelect = !this.itemData.isSelect;
            this.props.data.increase(this.itemData.money * this.itemData.count);
        }

    };

    @action
    reduce = () => {
        if (this.itemData.count <= 1) {
            if(this.itemData.isSelect){
                this.itemData.isSelect = !this.itemData.isSelect;
                this.props.data.reduce(this.itemData.money);
            }
            return;
        }
        this.itemData.count -= 1;
        if (this.itemData.isSelect) {
            this.props.data.reduce(this.itemData.money);
        }
    };

    render() {
        return (
            <View style={ styles.container }>
                <TouchableOpacity
                    style={{ marginLeft : 15 }}
                    onPress={ this.selectPress }>
                    <Image source={ this.itemData.isSelect ?
                        require('../imgs/login_radio_selected.png')
                        : require('../imgs/login_radio_normall.png') }/>
                </TouchableOpacity>
                <Image style={ styles.icon } source={{ uri : 'https://img10.360buyimg.com/n7/jfs/t4063/153/323373745/444727/87c24f22/58b11156N9be178c2.jpg' }}/>
                <View style={ styles.right }>
                    <Text style={ styles.nameStyle } numberOfLines={ 2 }>{ this.itemData.name }</Text>
                    <Text style={ styles.descriptionStyle } numberOfLines={1}> { this.itemData.description }</Text>
                    <View style={ styles.right_bot}>
                        < Text style={ styles.moneyStyle }>￥{ this.itemData.money }</Text>
                        <View style={ styles.numControllStyle }>
                            <TouchableOpacity style={  styles.reduceStyle } onPress={ this.reduce }>
                                <Text style={{ color : this.itemData.count <= 1 ? 'red' : 'black' } }>-</Text>
                            </TouchableOpacity>
                            <View style={ styles.numberViewStyle }>
                                <Text style={ styles.numberStyle }>{ this.itemData.count }</Text>
                            </View>
                            <TouchableOpacity style={  styles.increaseStyle } onPress={ this.increase }>
                                <Text>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container : {
        flex : 1,
        flexDirection : 'row',
        alignItems : 'center',
        backgroundColor : 'white'
    },
    icon : {
        height : 80,
        width : 80,
        marginTop : 10,
        marginBottom : 10,
        marginLeft : 15,
        borderWidth : 1,
        borderColor : '#999999'
    },
    right : {
        marginLeft : 15,
        flex : 1,
        marginTop : 10,
        marginBottom : 10,
    },
    nameStyle : {
        fontSize : 17,
        color : '#000000'
    },
    descriptionStyle : {
        marginTop : 3,
        fontSize : 13,
        color : '#A9A9A9'
    },
    right_bot : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        marginTop : 10,
        alignItems : 'center',
    },
    moneyStyle : {
        fontSize : 13,
        color : 'red'
    },
    numControllStyle : {
        flexDirection : 'row',
        borderWidth : 1,
        borderColor : '#e9e9e9',
        marginRight : 10,
        justifyContent : 'center',
        alignItems : 'center'
    },
    reduceStyle : {
        height : 35,
        width : 35,
        alignItems : 'center',
        justifyContent : 'center',
        borderRightWidth : 1,
        borderColor : '#e9e9e9',
    },
    numberViewStyle : {
        height : 35,
        width : 60,
        alignItems : 'center',
        justifyContent : 'center',
    },
    numberStyle : {
        fontSize : 19,
    },
    increaseStyle : {
        height : 35,
        width : 35,
        alignItems : 'center',
        justifyContent : 'center',
        borderLeftWidth : 1,
        borderColor : '#e9e9e9',
    }
});
