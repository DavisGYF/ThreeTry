import React,{Component} from 'react'
import {StyleSheet,Text,View,Image,TouchableOpacity,Dimensions,ScrollView,FlatList} from "react-native";

let widths=Dimensions.get('window').width

export default class Category1 extends Component{
    static navigationOptions={
        header:null
    }
    renderFlatItem({item}){
        return(
            <View style={{flexDirection:'row'}}>
                <TouchableOpacity
                        onPress={()=>{nav.navigate('ItemDetailR')}}
                        style={styles.item}
                >

                    <Image source={require('../img/i2.png')} style={styles.imgItem} />
                    <Text>{item.title.title1}</Text>
                    <Text>{item.price.price1}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                        onPress={()=>{nav.navigate('ItemDetailR')}}
                        style={styles.item}
                >

                    <Image source={require('../img/i3.png')} style={styles.imgItem} />
                    <Text>{item.title.title2}</Text>
                    <Text>{item.price.price2}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    render(){
        return(
            <View>
                <FlatList 
                    data={[{title:{title1:'你好',title2:'2你好'},price:{price1:'1',price2:'2'},key:1},{title:{title1:'好',title2:'2好'},price:{price1:'11',price2:'22'},key:2},{title:{title1:'你好',},price:{price1:'1',},key:3}]} 
                    renderItem={this.renderFlatItem} 
                    style={{flexDirection:'row',backgroundColor:'red'}}
                    // horizontal={true}//横向排布
                />
            </View>
        )
    }
}


const styles=StyleSheet.create({
    imgBanner:{height:200,width:widths,},
    item:{width:widths/2-10,height:widths/2-10,backgroundColor:'#fff',justifyContent:'center',alignItems:'center',margin:5,borderRadius:5},
    imgItem:{height:50,width:50,},
})