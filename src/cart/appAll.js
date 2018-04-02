import React,{Component} from 'react'
import {StyleSheet,Text,View,Image,TouchableOpacity,Dimensions,ScrollView} from "react-native";

//@observable: 使用此标签监控要检测的数据；
// @action:使用此标签监控数据改变的自定义方法(当在需要数据改变的时候执行此自定义方法，那么View层也会跟着自动变化，默认此View层已经使用@observer标签监控)
import { observable, autorun,computed,action,useStrict } from 'mobx'; 
// useStrict(true);

// @observer: 使用此标签监控当数据变化是要更新的Component（组件类）
import {observer} from 'mobx-react/native';

import CartItem from './cartItem';
import CartFooter from './cartFooter';
import CartState from './cartState';
// import Provider from './provider';

const store = new CartState();

@observer
export default class extends Component {

    static navigationOptions = ({navigation,screenProps}) => ({  
        headerTitle: 'Mobx实现购物车', 
        headerTitleStyle: {
            color: 'white',
            alignSelf: 'center'  // 设置安卓端导航栏标题不居中显示
        },
        headerStyle: {
            backgroundColor: 'pink'  // 设置导航栏的背景颜色,headerTintColor设置无效
        },
    }); 

    render() {
        return (
            <View style={styles.container}>
                {store.list.map((z, i) => <CartItem data={z} key={i} store={store}/>)}
                
                <CartFooter store={store}></CartFooter>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
});

