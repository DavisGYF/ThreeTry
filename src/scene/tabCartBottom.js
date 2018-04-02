
import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Alert,
    Dimensions,
} from 'react-native'

import { observer } from 'mobx-react'
import { action, autorun, computed } from 'mobx'
import Toast from 'react-native-root-toast';
import Spinner from 'react-native-loading-spinner-overlay'

let {widthScreen}=Dimensions.get('window').width

@observer
export default class CheckOutTest extends Component {
    constructor(props){
        super(props) 
        
        // 根据mobx文档，不应该在本地缓存mobx
        // this.mobx = this.props.mobx
        this.state = {
            visible: false,
            loadText: '正在支付...'
        }
    }
     // 付款
    pay() {
        Alert.alert(
            '您好',
            `总计:￥ ${this.props.mobx.CartStore.totalMoney}`,
            [
              {text: '确认支付', onPress: () => this.clear()},
              {text: '下次再买', onPress: () => null}
            ],
            { cancelable: false }
          )
    }
    
    @action
    _allSelect() {
        Toast.show('全选')
        console.log(this.props.mobx.CartStore.allDatas)

        this.props.mobx.CartStore.allDatas.isAllSelected = !this.props.mobx.CartStore.allDatas.isAllSelected 
        if(this.props.mobx.CartStore.allDatas.isAllSelected) {
            this.props.mobx.CartStore.allDatas.data.forEach(e=> {
                e.isSelected = true
            })
        }else {
            this.props.mobx.CartStore.allDatas.data.forEach(e=> {
                e.isSelected = false
            })
        }
        // 更新totalMoney
        // this.props.mobx.CartStore.allSelect()
    }
    
    
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.right}>
                    <TouchableOpacity onPress={()=> this._allSelect()}>
                        <Image
                            source={
                                this.props.mobx.CartStore.allDatas.isAllSelected ? 
                                // 2>1 ? 
                                require('../img/r2.png') :
                                require('../img/r1.png')
                            }
                            style={styles.image} />
                    </TouchableOpacity>
                    <Text style={{ marginLeft: 5, fontSize: 16 }}>全选</Text>
                </View>
                <View style={styles.right}>

                    <Text style={{ fontSize: 22, color: '#000' }}>￥  {this.props.mobx.CartStore.totalMoney}</Text>
                    <TouchableOpacity 
                        style={{ paddingLeft: 15, paddingRight: 15, alignItems: 'center',borderWidth: 1,}}
                        onPress={()=>this.pay()}    
                        >
                        <Text style={{ fontSize: 16 }}>付款</Text>
                    </TouchableOpacity>
                    <Spinner visible={this.state.visible} textContent={this.state.loadText} textStyle={{fontSize: 15,color: '#FFF'}} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: 'pink',
        justifyContent: 'flex-end',
      },
      image: {
        width: 30,
        height: 30, 
        marginLeft: 10
      },
      right: {
        // flex: 1, 
        flexDirection: 'row', 
        // borderWidth: 1,
        width:150,
      }
})