import {observable,action,computed,autorun} from 'mobx';

class ListItemData {

  @observable
  itemData = {
    selectAll:false,//是否被全选
    TotalAmount:0,//购物车总金额
    itemMoney:[{money:5,itemTotalAmount:0,isSelect:false,SelectNumber:1,key:1},{money:10,itemTotalAmount:0,isSelect:false,SelectNumber:1,key:2}],
    // itemMoney:new Array(4).fill({
    // //   money:Math.round(Math.random()*1),//随机分配的金额
    //   itemTotalAmount:0,//item被选中以后的总金额
    //   isSelect:false,//item是否被选中
    //   SelectNumber:1,//item选中的数量
    //   key:1,
    // })
  }

  // 初始化
  constructor(){

    // for (var i = 0; i < this.itemData.itemMoney.length; i++) {
    //   this.itemData.itemMoney[i].money = Math.round(Math.random()*100);
    // }
  }

  // 返回全选状态
  getSelectState = () =>{
    return this.itemData.selectAll;
  }

  // 加号
  increase = (i) =>{
    this.itemData.TotalAmount +=i;
  }

  // 减号
  reduce = (i) =>{
    this.itemData.TotalAmount -=i;
  }

  // 切换全选
  toggerSelectAll = () =>{
    console.log(this.itemData.itemMoney)//显示监控的有999个,其实只有两个
    console.log(this.itemData)//打印长度的话只有两个
    if (this.itemData.selectAll == false){
      this.itemData.selectAll = true;
      for (var i = 0; i < this.itemData.itemMoney.length; i++) {
        this.itemData.TotalAmount += this.itemData.itemMoney[i].money * this.itemData.itemMoney[i].SelectNumber;
      }
    }else {
      this.itemData.selectAll = false;
    }
  }

  }

module.exports = {
  ListItemData,
}