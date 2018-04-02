/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Animated
} from 'react-native';

import {ListItemData,Test} from './cartItem';
import ListItemView from './cart';
import {observer} from 'mobx-react/native';
import {action,autorun} from 'mobx';

const viewabilityConfig = {
  minimumViewTime: 0,
  viewAreaCoveragePercentThreshold: 10,
  waitForInteraction: true,
};

@observer
export default class MobxListView extends Component {
  constructor(props){
    super(props);
    this.data = new ListItemData();
    console.log(this.data.itemData.itemMoney);
    
  }

  _renderItem = ({item,index}) =>{
    return (
      <ListItemView itemData={item} id={index} data={this.data}/>
    );
  }

  @action
  _onPress = (i) =>{
    this.data.itemData.TotalAmount = 0;
    this.data.toggerSelectAll();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text onPress={this._onPress} style={{color:'purple',fontSize:20}}>
          点我全选
        </Text>

        {/* 总金额 */}
        <Text>
          {this.data.itemData.TotalAmount}
        </Text>

        <FlatList
          // viewabilityConfig={viewabilityConfig}
          data={this.data.itemData.itemMoney}
          renderItem={this._renderItem}
          debug={true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:20
  },
});