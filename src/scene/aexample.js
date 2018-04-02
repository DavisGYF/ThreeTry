/**
 * 样例
 * @author gyf
 * @date 2018-03-10
 */
import React,{Component} from 'react';
import {View,Image,Text,Button,TextInput,Keyboard,TouchableOpacity,StyleSheet,StatusBar,ImageBackground,FlatList,Dimensions,ScrollView} from 'react-native';
//跳转依赖
import * as RouteType from '../../constants/routeType';
import { connect } from 'react-redux'

var scrWidth=Dimensions.get('window').width

class Set extends Component{
    //top导航栏修饰
    static navigationOptions={
        // header:null,
        headerTitle:'标题',
        //top导航栏标题,背景修饰,阴影条去掉elevation:0,
        headerStyle:{height:40,elevation:0,backgroundColor:'#339eff'},
        //top导航栏标题,文字修饰
        headerTitleStyle:{color:'#fff',fontWeight:'normal'}
    }

    constructor(props){
        super(props)
        // this.state={}
		this._completed = this._completed.bind(this);//我的代办,全部订单
    }
    componentDidMount(){
        console.log('加载完成...')
        
    }

    //我的代办,已完成
    _completed(){
        this.props.dispatch({type:RouteType.ROUTE_AGENCY_ORDERALL});
    }

    render(){
        return(
            <View>
                <View style={styles.item}>

                </View>
                <View style={{}}>
                    
                </View>


                <Text style={{alignSelf:'center',margin:20,backgroundColor:'pink'}}>标题模板页</Text>
                <View style={styles.item}>
                    <TouchableOpacity  onPress={this._uncomfirmed} style={styles.head} >
                        <Text style={styles.headLeft}>我的收藏</Text>
                    </TouchableOpacity>
                    <View style={[styles.itemMain,{paddingLeft:17,paddingRight:17,justifyContent:'flex-start',marginTop:20}]}>
                        <TouchableOpacity  onPress={this._orderAll} style={{marginRight:20}} >
                            <Text style={[styles.icon,{color:'#FE5F60'}]}>&#xe620;</Text>
                            <Text style={styles.title}>商品收藏</Text>
                        </TouchableOpacity>
                        <TouchableOpacity  onPress={this._uncomfirmed} >
                            <Text style={[styles.icon,{color:'#FFA42E'}]}>&#xe640;</Text>
                            <Text style={styles.title}>供应商收藏</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={[styles.item,{paddingBottom:0}]}>
                    <TouchableOpacity  onPress={this._uncomfirmed} style={[styles.head,{borderBottomWidth:0}]} >
                        <Text style={styles.headLeft}>设置</Text>
                        <View style={styles.headRight}>
                            <Text style={[styles.icon,{color:'#999',}]}>&#xe6a7;</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    // example:{ 
    //     flexDirection:'row',height:135,width:scrWidth,backgroundColor:'#ffffff',color:'#999',justifyContent:'space-between',alignItems:'center',alignSelf:'center',
    //     paddingLeft:20,paddingRight:20,paddingTop:20,paddingBottom:10,
    //     marginLeft:17,marginRight:10,marginTop:5,marginBottom:10,
    //     borderWidth:1,borderColor:'red',borderBottomWidth:1,borderBottomColor:'#ddd',borderRadius:50,
    // },

    item:{
        backgroundColor:'#fff',
        marginBottom:10,
        paddingTop:15,
        paddingBottom:30,
    },
    itemMain:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingTop:15,
        
    },
    itemSub:{
        width:(scrWidth)/4,
        alignItems: 'center',
        paddingTop:20,
        // borderWidth:1,
    },
    head:{
        flexDirection:'row',
        paddingLeft:15,
        justifyContent:'space-between',
        borderBottomWidth:1,
        borderBottomColor:'#ddd',
        paddingBottom:10,
    },
    headLeft:{
        fontSize:19
    },
    headRight:{
        flexDirection:'row'
    },
    headRightTitle:{
        fontSize:12,
        color:'#999',
        marginTop:5,
    },
    icon:{
        fontSize: 20,		
		color: '#339EFF',
		fontFamily: 'iconfont',
        alignSelf: 'center',
    },
    iconHead:{
        marginRight:10
    },
    iconTitle:{

    },
    title:{
        // fontSize:10,
    }
})

//跳转支持
function mapStateToProps(state) {
	const {loginIn}=state;
	return {
        entCode: loginIn.get('user').defaultEnterpriseCode,
        tel:loginIn.get('user').mobile,
        enterpriseDesc:loginIn.get('enterprise').enterpriseDesc,
	};
}

export default connect(mapStateToProps)(Set)