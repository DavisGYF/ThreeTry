import React, { Component } from 'react';
import {StyleSheet,Text,View,Image,FlatList,TouchableOpacity,DeviceEventEmitter,Animated} from 'react-native';

import { observer } from 'mobx-react/native';
import { observable, action, computed, autorun  } from 'mobx';

import ListItem1 from './appItem';
import Toast from 'react-native-root-toast';


const data = [
  {
    id: 100,
    name: "i7 7700k",
    type: "数码类产品",
    description: "CPU",
    price: 50,
    buyNum: 1,
  },
  {
    id: 101,
    name: "R7 1800X",
    type: "数码类产品",
    description: "CPU",
    price: 100,
    buyNum: 2,
  },
];
const dataList=data.map((item)=>{
    // console.log(item);
    return{//注意return后面是{}不是()
        checked:true,
        ...item
    }
})

class CartState{
    @observable
    list=dataList

    // 加
    @action 
    add(id) {
        console.log(`add 的id= ${id}`);
        console.log(this);
        console.log(id);
        
        this.list.forEach(item => item.id === id && item.buyNum++);
    }

    // 减
    @action 
    sub(id) {
        // console.log('sub = '+ id);
        console.log(id)
        // this.list.forEach(item => (item.id === id && item.buyNum > 0) && item.buyNum--);
    };
}

const store=new CartState();


class ListItem extends Component{
    render() {
        
        const {item}=this.props;
        const {store}=this.props;

        // console.log(this)

        return (
            <View style={ styles.container }>
                <Text style={ styles.nameStyle } numberOfLines={ 2 }>测试数据</Text>
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


export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            num: 0,
            bounceValue: new Animated.Value(1),
          //  allNum: count
        }
    }
    add(){
        console.log('dina ')
         // 加入购物车页面的列表上
        // 点一次，购物车数据同步刷新
        this.state.bounceValue.setValue(1.5);
        console.log('dianji')
        console.log(this.state.bounceValue)

        Animated.spring(                          // 可选的基本动画类型: spring, decay, timing
            this.state.bounceValue,                 // 将`bounceValue`值动画化
            {
              toValue: 1,                         // 将其值以动画的形式改到一个较小值
              friction: 1,                          // Bouncier spring
            }
          ).start();                                // 开始执行动画
        
    }
    
    addC() {
        if(this.state.num == 0) {
            // this.refs.toast.show('添加数量不能为0哦~')
            return;
        }
        // 加入购物车页面的列表上
        // 点一次，购物车数据同步刷新
        this.state.bounceValue.setValue(1.5);
        console.log('dianji')
        console.log(this.state.bounceValue)

        Animated.spring(                          // 可选的基本动画类型: spring, decay, timing
            this.state.bounceValue,                 // 将`bounceValue`值动画化
            {
              toValue: 1,                         // 将其值以动画的形式改到一个较小值
              friction: 1,                          // Bouncier spring
            }
          ).start();                                // 开始执行动画
        
        // this.updateCartScreen(value)
        // this.refs.toast.show('添加成功^_^请前往购物车页面查看')
        
    }
    goCartPage(){
        Toast.show('toast',{
            // duration: Toast.durations.LONG,
            duration: Toast.durations.SHORT,
        },)
            console.log('gouwuche ')
    }

    render(){
        var newList=store.list.splice(0)
        // console.log(newList)//就是这个splice()改变了原数组,导致我搞了一下午
        // console.log(store.list)//经过splice以后,这个list前两个有用的数组被劫走储存在newList里面了..
        return(
            <View>
                <Text>万般艰难始出现mbox</Text>
                {newList.map((v,i) => {
                    // console.log(v);
                    return <ListItem store={store} item={v} key={i} />}) }

                <Text>底部</Text>

                <View>
                    <Animated.View style={[styles.cart2,{transform:[{scale: this.state.bounceValue}]}]}>
                        <TouchableOpacity onPress={()=> this.goCartPage()}>
                            <Image source={require('../img/cart2.png')} 
                            style={{height: 45,width: 45,}}/>
                        </TouchableOpacity> 
                    </Animated.View>
                    <TouchableOpacity style={[styles.button,{paddingLeft: 24,paddingRight: 10}]} 
                        // onPress={this.addC.bind(this)}
                        onPress={()=> this.add()}
                    >
                        <Text style={styles.buttonText}>加入购物车 ☝</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container : {
        // flex : 1,
        flexDirection : 'row',marginBottom:10,
        alignItems : 'center',
        backgroundColor : 'pink',
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
    },
     button: {
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: '#339eff',
    },
    buttonText: {
        fontSize: 16,
        color: '#fff'
    },
     cart2: {
        height: 45,
        width: 45,
        position: 'absolute',
        top: 20,
        right: 30
    },
});
