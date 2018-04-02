import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
    TouchableOpacity,
    DeviceEventEmitter
} from 'react-native';

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
        //实例化data对象
        this.data = new MobxStore();
        console.log('mobx')
        console.log(this.data)
    };

    componentDidMount() {
        this.data.replace(jsonData)
        console.log('mobx component')
        console.log(this.data)
    };

    @action
    allSelect = () => {
        DeviceEventEmitter.emit('allSelect', !this.data.itemData.isAllSelect);
        this.data.selectAll();
    };

    renderItem = (item) => {
        return (
            <MobxShopItemComponent itemData={ item } data={ this.data }/>
        )
    };

    separatorView = () => {
        return (
            <View style={{ height : 10, backgroundColor : '#e9e9e9' }}/>
        )
    };

    keyExtractor = (item) => item.name;

    render() {
        return (
            <View style={ styles.container }>
                <FlatList data={ this.data.itemData.datas }
                          ItemSeparatorComponent={ this.separatorView }
                          renderItem={ ({ item }) => this.renderItem(item) }
                          keyExtractor={ this.keyExtractor }
                />
                
                <View style={ styles.tool }>
                    <View style={{ flex : 1, flexDirection : 'row', alignItems : 'center' }}>
                        <TouchableOpacity style={ styles.select } onPress={ this.allSelect }>
                            <Image source={ this.data.itemData.isAllSelect ?
                                require('../imgs/login_radio_selected.png')
                                : require('../imgs/login_radio_normall.png') }/>
                            <Text style={{ marginLeft : 3 }}>全选</Text>
                        </TouchableOpacity>
                        <Text style={ styles.allMoneyText }>
                            ￥{ this.data.itemData.totalMoney }
                        </Text>
                    </View>
                    <TouchableOpacity style={ styles.balance } onPress={ this.allSelect }>
                        <Text style={ styles.balanceText }>去结算</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

class MobxStore {
    @observable
    itemData = {}

    //设置数据
    replace = (data) => {
        this.itemData = data;
    }

    //按下的反选
    itemPress = () => {
        let i = 0;
        this.itemData.datas.map((item) => {
            if (item.isSelect != true) {
                i += 1;
            }
        });
        if (i == 0) {
            this.itemData.isAllSelect = true;
        }
        else {
            this.itemData.isAllSelect = false;
        }
    }

    //加
    increase = (money) => {
        this.itemData.totalMoney += money;
    }

    //减
    reduce = (money) => {
        this.itemData.totalMoney -= money;
    }

    //全选
    selectAll = () => {
        this.itemData.isAllSelect = !this.itemData.isAllSelect;
        this.itemData.totalMoney = 0;
        if (this.itemData.isAllSelect) {
            for (let i = 0;
                i < this.itemData.datas.length;
                i++) {
                this.itemData.totalMoney += this.itemData.datas[ i ].money * this.itemData.datas[ i ].count;
            }
        }
    }
}

const styles = StyleSheet.create({
    container : {
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
    }
});