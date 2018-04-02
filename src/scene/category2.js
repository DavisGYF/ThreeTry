import React,{Component} from 'react'
import {StyleSheet,Text,View,Image,TouchableOpacity,Dimensions,ScrollView,FlatList} from "react-native";

let widths=Dimensions.get('window').width

export default class Category2 extends Component{
    static navigationOptions={
        header:null
    }
    renderFlatItem({item}){
        return(
            <TouchableOpacity
                    onPress={()=>{nav.navigate('ItemDetailR')}}
                    style={styles.item}
            >

                <Image source={require('../img/i3.png')} style={styles.imgItem} />
                <Text>2</Text>
                <Text>2</Text>
            </TouchableOpacity>
        )
    }

    render(){
        return(
            <View>
                <FlatList 
                    data={[{title:'你好',price:'2元',key:1},]} 
                    renderItem={this.renderFlatItem} 
                    // style={{flexDirection:'row',backgroundColor:'red'}}
                    horizontal={true}//横向排布
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