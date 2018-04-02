
import React, { Component } from 'react';
import {StyleSheet,Text,View} from 'react-native';
//引入的第三方插件
import {StackNavigator,TabNavigator,TabBarBottom} from 'react-navigation'
//引入的页面
import TabHome from './scene/tabHome'
import TabCart from './scene/tabCart'
import TabCartList from './scene/tabCartList'

import TabCategory from './scene/tabCategory'
import TabMine from './scene/tabMine'
import ItemDetail from './scene/itemDetail'
import Flat from './scene/flatSelf'
// 购物车开始
import Mbox from './学习其他引用/mbox'
import Mboxs from './学习其他引用/mboxSelf1'

import MboxSelf from './scene/mboxSelf'

import MainBoth from './scene/cart/MainPage'
// import Main from './scene/cart/selfShoppingCarPage'
import Main from './scene/cart/mobx/selfMobx1'
// import CartSimple from './scene/cart1/cartMain'

import Cart from './cart/app'

import Cart1 from './cart1/app'

// 购物车结束
// 获取store实例
import store from './mobx/store'
import {Provider} from 'mobx-react'

const  Navigation = () => {
    return (
      <Provider rootStore={store}>
        <Stack/>
      </Provider>
       
    );
}


//TabNavigator底部tab导航
const Tab=TabNavigator({
  Home:{
    screen:TabCart,
    // screen:TabHome,
    navigationOptions:{
      tabBarLabel:'主页',

    }
  },
  Category:{
    screen:TabCategory,
    navigationOptions:{
      tabBarLabel:'分类',

    }
  },
  Cart:{
    screen:MainBoth,
    navigationOptions:{
      tabBarLabel:'购物车',

    }
  },
  Mine:{
    screen:Main,
    navigationOptions:{
      tabBarLabel:'我的',

    }
  },
},{
  tabBarPosition:'bottom',
  tabBarOptions:{
    activeTintColor:'#339eff',
    inactiveTintColor:'#666',
    style:{backgroundColor:'#fff',},
    indicatorStyle:{height:0},

  }
} )

//StackNavigator跳转页面
const Stack=StackNavigator({
  StackHome:{screen:Tab},
  ItemDetailR:{screen:ItemDetail},
  TabCartR:{screen:TabCart},
})

export default Navigation;
