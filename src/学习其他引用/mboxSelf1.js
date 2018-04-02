import React,{Component} from 'react'
import {StyleSheet,Text,View,Image,TouchableOpacity,Dimensions,ScrollView} from "react-native";

import { observable, useStrict, action,computed } from 'mobx'; 
import { observer } from 'mobx-react'; 
useStrict(true); 

class MyState { 
    @observable num = 0; 

    @observable num1 = 0;
    @observable num2 = 100;

    @action addNum = () => { this.num++; }; 
    @action addNum1 = () => {
        this.num1 ++;
    };
    @action addNum2 = () => {
        this.num2 ++;
    };

    @computed get total() {
        return this.num1 + this.num2;
    }

} 
//需要的时候实例化
const newState = new MyState();
// 注册组建一
const AllNum = observer((props) => <Text>num1 + num2 = {props.store.total}</Text>);
// 注册组件二

@observer
class Main extends Component{
    constructor(props){
        super(props)

    }

    render(){
        return(
            <View> 
                <Text onPress={this.props.store.addNum1}>点我num1 + 1</Text> 
                <Text onPress={this.props.store.addNum2}>点我num2 + 1</Text> 
                <Text>{this.props.store.num1}</Text> 
                <Text>{this.props.store.num2}</Text> 
                
            </View> 
        )
    }

}

@observer 
export default class App extends React.Component { 
    
    render() { 
        return ( 
             <View> 
                <Text onPress={newState.addNum}>点我</Text> 
                <Text>{newState.num}</Text> 
                <View style={{borderWidth:1}}> 
                    <Text>组建一Main</Text> 
                    <Main store={newState} />
                </View> 
                <View> 
                    <Text>组建二AllNum</Text> 
                    <AllNum store={newState} />
                </View> 
             </View> 
        ) 
    } 
}
