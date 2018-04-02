import React,{Component} from 'react'
import {StyleSheet,Text,View,Image,TouchableOpacity,Dimensions,ScrollView,FlatList} from "react-native";

import Swiper from "react-native-swiper";
let widths=Dimensions.get('window').width

export default class Home extends Component{
    static navigationOptions={
        header:null,
    }

    constructor(props){
        super(props);
        nav=props.navigation;
        this.state={showSwiper:false}
    }
    componentDidMount(){
        setTimeout(() => {
            this.setState({showSwiper:true})
        }, 1000);
        console.log(this)
    }

    renderSwiper(){
        if(this.state.showSwiper){
            return(
                <View style={{borderWidth:2,height:200}}>
                    <Swiper
                        autoplay={true}
                        // height={200}  width={widths}//宽高这个是给组建设的,用处不大,要给图片设置宽高,才能保证突变不变形,只给组建搞不给包裹他的组建view设置高的话不显示
                        autoplayTimeout={5}//默认为2
                    >
                        <Image source={require('../img/i1.png')} style={styles.imgBanner} />
                        <Image source={require('../img/i2.png')} style={styles.imgBanner} />
                        <Image source={require('../img/i3.png')} style={styles.imgBanner} />
                    </Swiper>
                </View>
            )
        }else{
            return(<Text style={{borderWidth:2,height:200}}>加载失败</Text>)
        }
    }
    renderFlatItem({item}){
        return(
            <TouchableOpacity
                    onPress={()=>{nav.navigate('ItemDetailR')}}
                    style={styles.item}
            >

                <Image source={require('../img/i3.png')} style={styles.imgItem} />
                <Text>{item.title}</Text>
                <Text>{item.price}</Text>
            </TouchableOpacity>
        )
    }

    render(){
        return(
            <View>
                {this.renderSwiper()}
                <Text>home主页</Text>
                <FlatList 
                    data={[{title:'你好',price:'2元',key:1},{title:'你不好',price:'2元',key:2},]} 
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