import React,{Component} from 'react'
import {StyleSheet,Text,View,Image,TouchableOpacity,Dimensions,ScrollView,Animated} from "react-native";
import Toast from 'react-native-root-toast';
import { inject, observer } from 'mobx-react/native'
import { computed,action,observable } from 'mobx'

@inject('rootStore')
@observer
export default class Home extends Component{
    static navigationOptions={
        gesturesEnabled:true,//是否支持滑动返回收拾，iOS默认支持，安卓默认关闭
        headerTitle:'进销存',
        tabBarVisible:false,

    }
    constructor(props) {
        super(props);
        this.state = {
            num: 0,
            bounceValue: new Animated.Value(1),
          //  allNum: count
        }
    }

     // 用Mobx的computed方法更加方便 
    @computed 
    get cartCount() {
        return this.props.rootStore.CartStore.allDatas.data.length
    }

    addNum(){
        this.setState({
            num : this.state.num += 1
        })
    }
    reduceNum(){
        if(this.state.num <= 0)
        return 
        this.setState({
            num : this.state.num -= 1
        })
    }
    @action
    addCart(value){
        if(this.state.num == 0) {
            Toast.show('添加数量不能为0哦~')
            return;
        }
         // 点一次，购物车数据同步刷新
        this.state.bounceValue.setValue(1.5);
        Animated.spring(                          // 可选的基本动画类型: spring, decay, timing
            this.state.bounceValue,                 // 将`bounceValue`值动画化
            {
              toValue: 1,                         // 将其值以动画的形式改到一个较小值
              friction: 1,                          // Bouncier spring
            }
          ).start();                                // 开始执行动画
        // console.log(value)

        Toast.show('加入购物车',{
            // duration: Toast.durations.LONG,
            duration: Toast.durations.SHORT,
        },)
        this.updateCartScreen(value)
    }
     // 同步更新购物车页面的数据
    updateCartScreen (value) {
        let name = this.props.navigation.state.params.item.name;
        // 判断购物车页面是否存在同样名字的物品
        console.log('=======下面是value值')
        console.log(value)
        console.log('=======购物车数据')
        console.log(this.props.rootStore.CartStore.allDatas.data.slice())
        let index;
        console.log(name)
        if(this.props.rootStore.CartStore)
         index = this.props.rootStore.CartStore.allDatas.data.findIndex(e => ( e.name === name ) )

         console.log(index)
         
        // // 不存在
        if(index == -1) {
            console.log('this.state.num')
            console.log(this.state.num)
            this.props.rootStore.CartStore.allDatas.data.push(value)
            // 并让购物车icon更新
            let length = this.props.rootStore.CartStore.allDatas.data.length
            this.props.rootStore.CartStore.allDatas.data[length - 1].count += this.state.num
            console.log(length)
            console.log('购物车没有这个东西,走true的路线')
            // console.log(this.props.rootStore.CartStore.allDatas.data[length - 1].count)
        }else {
            // 增加对应name的count
            console.log('this.state.num')
            console.log(this.state.num)
            this.props.rootStore.CartStore.allDatas.data[index].count += this.state.num
            // console.log(this.props.rootStore.CartStore.allDatas.data[index])
            console.log(',走if false的路线,购物车已经很有啦')
            console.log(this.props.rootStore.CartStore.allDatas.data[index].count)
        }
    }
    goCartPage(){
        Toast.show('qu购物车')
        this.props.navigation.navigate('TabCartR')
        console.log(this.props)
    }

    render(){
        let {name, price, image} = this.props.navigation.state.params.item;
        // console.log(name)
        // console.log('=======================================')
        // console.log(image)
        let count = this.cartCount
        
        return(
            <View style={{flex:1}} >
                <View style={{flex:1,backgroundColor: '#fff',marginBottom: 20,justifyContent: 'center',alignItems: 'center',}}>
                    <Animated.View style={[styles.cart2,{transform:[{scale: this.state.bounceValue}]}]}>
                        <TouchableOpacity onPress={()=> this.goCartPage()}>
                        <Image source={require('../img/cart2.png')} 
                        style={{height: 45,width: 45,}}/>
                    </TouchableOpacity>     
                    </Animated.View>
                    {/* 购物车商品数量为0不出现,提示数字 */}

                    {
                        count === 0 ? null : 
                        <View style={styles.circle}>
                            <Text style={{fontSize: 16, alignSelf: 'center' ,color: '#fff'}}>{count}</Text>    
                        </View>
                    }

                    <Image source={image} style={{height: 150,width: 150,}}/>
                     <View style={styles.chooseLine}>
                        
                        <TouchableOpacity style={styles.button} onPress={this.addNum.bind(this)}>
                            <Text style={styles.buttonText}>+</Text>
                        </TouchableOpacity>
                        <Text style={styles.number}> {this.state.num} </Text>
                        <TouchableOpacity style={styles.button} onPress={this.reduceNum.bind(this)}>
                            <Text style={styles.buttonText}>-</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button,{paddingLeft: 24,paddingRight: 10,marginLeft:10}]} onPress={()=>this.addCart(this.props.navigation.state.params.item)}>
                            <Text style={styles.buttonText}>加入购物车 ☝</Text>
                        </TouchableOpacity>
                    </View>
                    <Text>品种 {name}</Text>
                    <Text>价格 {price}</Text>


                </View>
                <View style={{flex:1,backgroundColor: '#fff',}}>
                    <Text>详情页</Text>
                </View>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    chooseLine: {
        marginTop: 20,
        height: 65,
        backgroundColor: 'pink',
        borderRadius: 30,
        marginLeft: 10,
        marginRight: 10,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
    },
    number: {
        fontSize: 16,
        color: '#fff',
    },
    button: {
        paddingLeft: 20,
        paddingRight: 20,
        borderColor: '#fff',
        borderWidth: 1,
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
    circle: {
        width: 25,
        height: 25,
        borderRadius: 12.5,
        backgroundColor: 'red',
        position: 'absolute',
        top: 18,
        right: 60
    },
})