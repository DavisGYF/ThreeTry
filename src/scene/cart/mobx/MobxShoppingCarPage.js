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
import { action, autorun } from 'mobx';

import MobxStore from './MobxStore';
import MobxShopItemComponent from './MobxShopItemComponent';

let jsonData = require('./shopingShot.json');

@observer
export default class MobxShoppingCarPage extends Component {
    static navigationOptions = {
        headerTitle : '基于MobX购物车',
    };

    constructor(props) {
        super(props);
        this.data = new MobxStore();
    };

    componentDidMount() {
        this.data.replace(jsonData)
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