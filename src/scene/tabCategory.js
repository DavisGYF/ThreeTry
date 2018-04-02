import React,{Component} from 'react'
import {StyleSheet,Text,View,Image,TouchableOpacity,Dimensions,ScrollView,FlatList} from "react-native";
//引入第三方插件
import ScrollableTabView, { ScrollableTabBar, DefaultTabBar } from 'react-native-scrollable-tab-view';
// 引入页面
import Cate from './category1'
import Category2 from './category2'
import Cate3 from './category3'
import Flatlist from './flatSelf'

import { inject, observer } from 'mobx-react/native';

let widths=Dimensions.get('window').width

@inject('rootStore')
@observer
export default class Home extends Component{
    static navigationOptions={
        header:null
    }
    constructor(props) {
        super(props);
        
    }
    componentDidMount() {
        // console.log(this.props.rootStore.NewGoodsStore.allDatas.data.splice(0,6))
        console.log(this.props)
    }

    render(){
        let dataLength=this.props.rootStore.NewGoodsStore.allDatas.data.length
        // let datas=this.props.rootStore.NewGoodsStore.allDatas.data.splice(0,dataLength)//这个步骤是因为mbox监控的数组会显示最大的监控长度999,后面没有的都是undefined,这个处理是只让他显示有数据的数组
        console.log('================tabcate')
        console.log(dataLength)
        return(
            <View style={{flex:1}}>
                <ScrollableTabView
                    // initialPage={0}
                    renderTabBar={() => <ScrollableTabBar  />}
                    tabBarActiveTextColor='#339eff'
                    tabBarUnderlineStyle={{backgroundColor:'#339eff',height:2}}
                >
                    <View tabLabel='美味水果'>
                        <Cate3
                            nav={this.props.navigation}
                            // itemData={datas}
                         />
                    </View>

                    <View tabLabel='新品首发'>
                        <Flatlist />
                    </View>
                    <View tabLabel='敬请期待'>
                        <Cate />
                    </View>
                </ScrollableTabView>
            </View>
        )
    }
}


const styles=StyleSheet.create({
                // 
    imgBanner:{height:200,width:widths,},
    item:{width:widths/2-10,height:widths/2-10,backgroundColor:'#fff',justifyContent:'center',alignItems:'center',margin:5,borderRadius:5},
    imgItem:{height:50,width:50,},
})