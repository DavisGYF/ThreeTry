import React,{Component} from 'react'
import {StyleSheet,Text,View,Image,TouchableOpacity,Dimensions,ScrollView,FlatList} from "react-native";
import newGoods from '../mobx/newGoods'
import { inject, observer } from 'mobx-react/native';

let widths=Dimensions.get('window').width

@inject('rootStore')
// @observer
export default class Category3 extends Component{
    static navigationOptions={
        header:null
    }
    constructor(props) {
        super(props);
        
    }
    componentDidMount() {
        console.log(this.props)
        // console.log(newGoods)
        // console.log(nav)
    }
    
    itemClick(item){
        this.props.nav.navigate('ItemDetailR',item)
        console.log(item)
        console.log('这是list列表')
    }

    renderFlatItem({item}){
        // console.log(item)
        return(
                <TouchableOpacity
                        onPress={this.itemClick.bind(this,{item})}
                        style={styles.item}
                >

                    <Image source={item.image} style={styles.imgItem} />
                    <Text>{item.name}</Text>
                    <Text>{item.price}</Text>
                </TouchableOpacity>
            
        )
    }

    render(){
        let dataLength=this.props.rootStore.NewGoodsStore.allDatas.data
        // let datas=this.props.rootStore.NewGoodsStore.allDatas.data.splice(0,6)//这个步骤是因为mbox监控的数组会显示最大的监控长度999,后面没有的都是undefined,这个处理是只让他显示有数据的数组
        console.log(dataLength)
        return(
            <ScrollView style={{flexWrap:'wrap',}} >
                <FlatList 
                    // data={[{title:{title1:'你好',title2:'2你好'},price:{price1:'1',price2:'2'},key:1},{title:{title1:'好',title2:'2好'},price:{price1:'11',price2:'22'},key:2},{title:{title1:'你好',},price:{price1:'1',},key:3}]} 
                    // data={newGoods.data}
                    data={dataLength}
                    renderItem={this.renderFlatItem.bind(this)} 
                    keyExtractor={(item,index)=>index}
                    style={{flexDirection:'row',backgroundColor:'red'}}
                    // horizontal={true}//横向排布
                    numColumns={2}
                />
            </ScrollView>
        )
    }
}


const styles=StyleSheet.create({
    imgBanner:{height:200,width:widths,},
    item:{width:widths/2-10,height:widths/2-10,backgroundColor:'#fff',justifyContent:'center',alignItems:'center',margin:5,borderRadius:5},
    imgItem:{height:50,width:50,},
})