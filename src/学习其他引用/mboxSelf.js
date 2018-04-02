import React,{Component} from 'react'
import {StyleSheet,Text,View,Image,TouchableOpacity,Dimensions,ScrollView} from "react-native";

//@observable: 使用此标签监控要检测的数据；
// @action:使用此标签监控数据改变的自定义方法(当在需要数据改变的时候执行此自定义方法，那么View层也会跟着自动变化，默认此View层已经使用@observer标签监控)
import { observable, autorun,computed,action,useStrict } from 'mobx'; 
// useStrict(true);

// @observer: 使用此标签监控当数据变化是要更新的Component（组件类）
import {observer} from 'mobx-react/native';


// const value = observable(10);
// @observable value = 10;//这样的写法必须是在类里面

const number = observable(100); 
const plus = computed(() => value.get() > 14);
const allPrice = computed(() => value.get() * number.get());



// autorun(() => { console.log(value.get()); }); 
// value.set(15); 
// value.set(9); 
// number.set(101);

 class Store {
    @observable
    number = 0;
    // @action 
    add = () => {
        this.number++;
        console.log(this)
        console.log(this.number)
    };

    // console.log(55),//不能console
}

const newStore = new Store();
console.log('@observer组建打开')

@observer
export default class Mobx extends Component{

    render(){
       
        
        return(
            <View>
                <Text onPress={()=>{
                    newStore.add();
                    console.log(`组建中${newStore.number}`)
                    // console.log(1)
                }}>mobx</Text>
                <Text>{newStore.number}</Text>
            </View>
        )
    }
}


