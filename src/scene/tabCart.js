
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  Dimensions
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import CartList from './tabCartList'
import CheckOutTest from './tabCartBottom'

import { observer, inject } from 'mobx-react'
import { action, autorun, computed } from 'mobx'


// 获取数据
//import cartDatas from './CartJson'
// let {widthScreen,heightScreen}=Dimensions.get('window')
const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;

@inject('rootStore')
@observer
export default class CartScreen extends Component {
  
    static navigationOptions = ({navigation,screenProps}) => (
        navigation.state.params && navigation.state.params.headerStyle ? 
        {
        title: '购物车',
        headerTitleStyle: navigation.state.params.headerStyle,
        headerStyle: styles.headerStyle,
        } :
        {
        title: '购物车',
        headerTitleStyle: styles.headerTitleStyle,
        headerStyle: styles.headerStyle,
        }
    );

    constructor(props){
        super(props)
        this.state={visible:false}
    
    // console.log(this.props.rootStore.CartStore);
    // 获取购物车mobx数据实例
    // this.mobx = this.props.rootStore.CartStore
    }
    componentDidMount() {
        console.log('tabcart数据cmd=======')
        console.log(this.props.rootStore.CartStore.allDatas.data.slice())
    }



  @computed 
  get dataSource() {
    return this.props.rootStore.CartStore.allDatas.data.slice();
    // return [{name:5,}]
  }

  _renderItem = ({item}) => {
    // console.log('=======tabcart数据_renderItem中item')
    // console.log(item)
    return(
      // 传入CartStore实例
      <CartList data={item} mobx={this.props.rootStore.CartStore}/>
        // <Text>测试item</Text>
    )
  }

  _keyExtractor = (item,index)=> {
    // 千万别用index，不然在删购物车数据时，如果从第一个item开始删会产生节点渲染错乱的bug
    // return item.name
    return index
  }

  show(){
    this.setState({ visible: !this.state.visible });
    setTimeout(() => {
      this.setState({
        visible: !this.state.visible
      });
    }, 5000);
  }

  render() {
        console.log('=======tabcart数据render')
        console.log(this.dataSource)
    return (
        <View style={styles.container}>
            {
              this.dataSource.length ? 
                // 2>1 ? 
                <View style={{flex: 1}}>
                  <View style={{height: heightScreen - 38 - 50 - 65}}>
                    <FlatList
                    data={[{name:'nihao'}]}
                    data={this.dataSource}
                    renderItem={this._renderItem}
                    keyExtractor={this._keyExtractor}
                    />  
                  </View>
                
                  {/* 结账View,传入navigation，mobx实例 */}
                  <CheckOutTest mobx={this.props.rootStore} navigation={this.props.navigation} />
                </View>
              :
                <View style={{flex: 1,justifyContent: 'center',alignItems: 'center'}}>
                    <Text>购物车是空的哦~请到首页或者分类页添加哈๑乛◡乛๑</Text>
                    <TouchableOpacity style={[styles.button,{paddingLeft: 24,paddingRight: 10,borderWidth: 1,}]} onPress={()=>this.show()}>
                          <Text style={styles.buttonText}>点我加载 ☝Spinner测试</Text>
                    </TouchableOpacity>

                    <View style={{ flex: 1 }}>
                      <Spinner visible={this.state.visible} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
                    </View>
                </View>
            }
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  lastView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: widthScreen,
    height: 50,
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: 'pink'
  },
  headerTitleStyle: {
    alignSelf: 'center', 
    fontSize: 15, 
    color: 'yellow'
  },
  headerStyle: {
    height: 38, 
    backgroundColor: 'pink'
  }
});

