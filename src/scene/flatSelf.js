
import React,{ Component } from 'react';
import {StyleSheet,Text,View,AppRegistry,Image,ScrollView,FlatList,SectionList,Dimensions,ActivityIndicator,TouchableOpacity   } from 'react-native';

// 取得屏幕的宽高Dimensions
const { swidth, sheight } = Dimensions.get('window');
const widths = Dimensions.get('window').width;

//获取数据
const URL_LEFT = "http://test.hubangyoushang.com/mobile/index.php?act=goods_class&op=index"; 

export default class Flatlist extends Component {
    static navigationOptions={
        header:null
    }

    constructor(props) {
        super(props);
        this.state = {
            tabShow: false,
            leftData:[],
            rightData:[],
            isLoading:true,
        };
    }

    componentDidMount(){
        this.getData()
    }
    //获取左边数据
    getData(){
        fetch(URL_LEFT)
        .then((res)=>res.json())
        .then(resData=>{
            let datas=resData.data.class_list
            let dataTemp=[]
            // console.log(this.state.leftData)
            //给元数据每一项加一个key值
            datas.map(function(itemData,index){
                dataTemp.push({
                    key:index,
                    value:itemData
                })
            })
            console.log(dataTemp)
            //调用右边的数据加载第一项对应的数据
            this.getRightData(dataTemp[0].value.gc_id)
            this.setState({leftData:this.state.leftData.concat(dataTemp),isLoading:false,})

            // console.log(this.state.isLoading)
        })
        .catch((error)=>{
            console.log(error)
            this.setState({
                isLoading:false,
            })
        })
        .done()

    }
    
    //头部
    renderHeader(){
        return(
            <Text style={{height:50}}>头部</Text>
        )
    }
    //左边数据整体,
    renderLeft(){
        datas=[{title:'农副产品',key:1,gc_id:"1058"},{title:'礼品箱包',key:2,gc_id:"2"},{title:'纺织',key:3,gc_id:"3"}]

        return(
            <FlatList 
                // data={this.state.leftData}
                data={datas}
                renderItem={
                    this.renderItemLeft.bind(this)
                    // 一定要绑定this,不然下面item不能用
                }
                style={styles.left}
            />
        )
    }
   
    //左边每一项的数据形式
    renderItemLeft({item,index}){//item参数名字不能乱写
        // console.log(item)
        return(
           <TouchableOpacity 
                style={{height:50}}
                onPress={this.getRightData.bind(this,item.gc_id)}//需要的参数写在后面
                // onPress={()=>{
                //     // console.log(this)
                //     this.getRightData(item.value.gc_id)
                //     // alert(item.value.gc_id)
                // }}//需要传参的话必须这么写
           >
                <Text style={{color:(index==item.key?'#339eff':'red')}}>{item.title}==>{index}</Text>
           </TouchableOpacity>
       ) 
    }
    
    getRightData(gc_id){

        this.setState({  
                    isLoading:true,  
        });  
        fetch('http://test.hubangyoushang.com/mobile/index.php?act=goods_class&op=index&gc_id='+gc_id)
        .then((res)=>res.json())
        .then((resData)=>{
            let datas = resData.data.class_list;  
            let dataTemp = [];  
            // console.log(resData)
            //添加key值
            for (let i = 0; i < datas.length; i++) {
                let mdata = datas[i];
                dataTemp.push({
                    key:mdata.gc_name,
                    data:mdata.next_class_list
                })
            }
            this.setState({rightData:dataTemp,isLoading:false})
            // console.log(dataTemp)
        })
        
    }
    //右边数据整体
    //右边加载等待页面
    renderLoadingView(){
        return(
            <View style={{flex:1,}}>
                <ActivityIndicator
                    style={{flex:1,}}
                    // animating={false}//默认为真,为false的话什么都不显示了
                    color='red'
                    size='large'
                 />
            </View>
        )
    }
    
    render() {
        return (
            <View style={{alignItems:'center',flex:1}}>
                {this.renderHeader()}
                <View style={{flex:1,flexDirection:'row'}}>
                    <View style={{flex:1,}}>
                        {this.renderLeft()}
                    </View>
                    <View style={{flex:3}}>
                        {this.state.isLoading?this.renderLoadingView():this.renderRight()}
                    </View>
                </View>
            </View>
        );
    }

    //右边section整个数据
    renderRight(){
        return(
            <SectionList
                renderItem={this.renderRightItems}
                sections={this.state.rightData}
                keyExtractor={this._keyExtractor}
                renderSectionHeader={this.renderRightItemsHeader}
                style={styles.right}
            />
        )
    }
    //每一项数据单独的key值
    _keyExtractor(item,index){//{section,index},参数不存在,item和index名字随便取,
        // console.log(i)
        // console.log(index)
        // console.log({section})
        return 'index'+index
    }

    //右边每一项数据
    renderRightItemsHeader({section}){

        return(
            <View style={{marginBottom:10,backgroundColor:'#fff',paddingLeft:25}}><Text>{section.key}</Text></View>
        )
    }
    renderRightItems=({section,index})=>{//section这个参数必须是这个名字,大范围
        
        // console.log(section)
        return(
        <View style={{flexDirection:'row',flexWrap:'wrap',}}>
            {section.data.map((item,i)=>this.renderRightItem(item,i,index))}
       
        </View>
    )}

    renderRightItem(item, i,index){//小范围
        if(index!=0){return}
        return(
            <TouchableOpacity
                style={{height:40,width:widths*0.75/3-12,height:widths*0.75/3-12,marginLeft:8,marginBottom:10,alignItems:'center',justifyContent:'center'}}
                key={i}
             >
                <Image source={require('../img/i3.png')} style={styles.imgItem} />
                <Text style={{fontSize:10}}>{item.gc_name}</Text>
            </TouchableOpacity >
        )
    }

}
const styles = StyleSheet.create({
    container:{},
    bot:{},
    left:{borderRightWidth:1,},
    leftItem:{},
    imgItem:{height:50,width:50,borderRadius:50,marginBottom:5},
    
    right:{},
});