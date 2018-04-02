import { observable, action, computed, autorun } from 'mobx';

export default class MobxStore {
    @observable
    itemData = {}

    //设置数据
    replace = (data) => {
        this.itemData = data;
    }

    //按下的反选
    itemPress = () => {
        let i = 0;
        this.itemData.datas.map((item) => {
            if (item.isSelect != true) {
                i += 1;
            }
        });
        if (i == 0) {
            this.itemData.isAllSelect = true;
        }
        else {
            this.itemData.isAllSelect = false;
        }
    }

    //加
    increase = (money) => {
        this.itemData.totalMoney += money;
    }

    //减
    reduce = (money) => {
        this.itemData.totalMoney -= money;
    }

    //全选
    selectAll = () => {
        this.itemData.isAllSelect = !this.itemData.isAllSelect;
        this.itemData.totalMoney = 0;
        if (this.itemData.isAllSelect) {
            for (let i = 0;
                i < this.itemData.datas.length;
                i++) {
                this.itemData.totalMoney += this.itemData.datas[ i ].money * this.itemData.datas[ i ].count;
            }
        }
    }
}