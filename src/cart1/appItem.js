import React, { Component } from 'react';
import {StyleSheet,Text,View,Image,FlatList,TouchableOpacity,DeviceEventEmitter} from 'react-native';

import { observer } from 'mobx-react/native';
import { observable, action, computed, autorun  } from 'mobx';


export default class ListItem1 extends Component{
    render() {
        
        const {item}=this.props;
        const {store}=this.props;
        console.log(this)

        return (
            <View style={ styles.container }>
                <Text style={ styles.nameStyle } numberOfLines={ 2 }>测试数据1561</Text>
                <Text style={ styles.nameStyle } numberOfLines={ 2 }>{ item.type }</Text>
                <Text style={ styles.moneyStyle }>￥{ item.price }</Text>
                <View style={ styles.numControllStyle }>
                    <TouchableOpacity style={  styles.reduceStyle } onPress={ store.sub.bind(item.id) }>
                        <Text style={{ color : item.buyNum <= 1 ? 'red' : 'black' } }>-</Text>
                    </TouchableOpacity>
                    <View style={ styles.numberViewStyle }>
                        <Text style={ styles.numberStyle }>{ item.buyNum }</Text>
                    </View>
                    <TouchableOpacity style={  styles.increaseStyle } onPress={ ()=>{store.add(item)} }>
                        <Text>+</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container : {
        // flex : 1,
        flexDirection : 'row',
        alignItems : 'center',
        backgroundColor : 'red'
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