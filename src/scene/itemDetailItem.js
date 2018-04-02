import React, { Component } from 'react'
import { View, Text } from 'react-native'
import ScrollableTabView from 'react-native-scrollable-tab-view'

const theme = {color: '#AB956D',background: '#f3f3f3',fontColor: '#F7F7F7'}


const List = ({ message }) => (
    <View style={{ flex: 1 }}>
        <Text>{message}</Text>
    </View>
)

export default ({ message }) => {
    return (
        <ScrollableTabView
            style={{ flex: 1, height: 300 }}
            tabBarBackgroundColor='white'
            tabBarActiveTextColor={theme.color}
            tabBarTextStyle={{ fontSize: 14, marginTop: 13 }}
            tabBarUnderlineStyle={{ backgroundColor: theme.color }}
            initialPage={0}
        >
            {
                ['商品详情', '产品参数', '售后保障'].map((v, i) => (
                    <List
                        tabLabel={v}
                        message={v}
                        key={i}
                    />
                ))
            }

        </ScrollableTabView>
    )
}