import React, { Component } from 'react';
import {StyleSheet,Text,View,Image,FlatList,TouchableOpacity,DeviceEventEmitter} from 'react-native';

import { observer } from 'mobx-react/native';
import { observable, action, computed, autorun  } from 'mobx';

// import MobxStore from './selfMobxStore';
import MobxShopItemComponent from './selfMobxShopItem';

let jsonData = require('./shopingShot.json');

@observer
export default class MobxShoppingCarPage extends Component {
    static navigationOptions = {
        headerTitle : '基于MobX购物车',
    };

    constructor(props) {
        super(props);
        //data对象
        // this.data = new MobxStore();
        this.data = jsonData
        // console.log('mobx')
        console.log(this.data)
    };

    componentDidMount() {
        // this.data.replace(jsonData)
        // console.log('mobx component,上面jsonData下面data')
        // console.log(this.data)
    };

    // @action
    allSelect = () => {
        DeviceEventEmitter.emit('allSelect', !this.data.itemData.isAllSelect);
        this.data.selectAll();
    };
    @action
    reduce=(i)=>{
        this.data.datas.count-=1;
        console.log(i.nativeEvent)
    }
    @action
    increase=(index)=>{
        this.data.datas.count+=1;
        console.log(index)
    }

    renderItem = (item) => {
        return (<MobxShopItemComponent itemData={ item } data={ this.data }/> )
    };
    renderItem1({item}) {
        console.log(item)
        return (
            <View style={ styles.container }>
                <Text style={ styles.nameStyle } numberOfLines={ 2 }>{ item.name }</Text>
                <Text style={ styles.moneyStyle }>￥{ item.money }</Text>
                <View style={ styles.numControllStyle }>
                    <TouchableOpacity style={  styles.reduceStyle } onPress={ this.reduce }>
                        <Text style={{ color : item.count <= 1 ? 'red' : 'black' } }>-</Text>
                    </TouchableOpacity>
                    <View style={ styles.numberViewStyle }>
                        <Text style={ styles.numberStyle }>{ item.count }</Text>
                    </View>
                    <TouchableOpacity style={  styles.increaseStyle } onPress={ this.increase.bind(this,item.count) }>
                        <Text>+</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
        );
    }

    separatorView = () => {
        return (
            <View style={{ height : 10, backgroundColor : '#e9e9e9' }}/>
        )
    };

    keyExtractor = (item) => item.name;

    render() {
        return (
            <View style={ styles.containerout }>
                <FlatList data={ this.data.datas }
                        //   ItemSeparatorComponent={ this.separatorView }
                          renderItem={ this.renderItem1.bind(this) }
                          keyExtractor={ this.keyExtractor }
                />
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containerout : {
        flex : 1,
    },
    tool : {
        height : 44,
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'center',
        borderTopWidth : 1,
        borderTopColor : '#D3D3D3'
    },
    select : {
        flexDirection : 'row',
        justifyContent : 'center',
        alignItems : 'center',
        marginLeft : 15,
    },
    balance : {
        width : 100,
        height : 44,
        backgroundColor : 'red',
        alignItems : 'center',
        justifyContent : 'center'
    },
    allMoneyText : {
        fontSize : 20,
        marginLeft : 15
    },
    balanceText : {
        fontSize : 20,
        color : 'white'
    },
    container : {
        flex : 1,margin:10,
        flexDirection : 'row',
        alignItems : 'center',justifyContent:'space-between',
        backgroundColor : 'white'
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