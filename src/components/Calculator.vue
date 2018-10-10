<style scoped lang='less'>
.mode-choise {
  text-align: center;
  padding: 20px 0 50px;
}
.record-container {
  border: 1px solid #dcdfe6;
  margin: 8px 4px;
  // min-height: 200px;
  border-radius: 4px;
  padding: 4px;
  color: #555;
  height: 100px;
  overflow: auto;
  .empty {
    line-height: 200px;
  }
  .record {
    border-bottom: 1px dashed #efefef;
    padding: 0 4px;
    line-height: 28px;
    font-size: 14px;
    .que, .ans {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }
}
.calculator-container {
  width: 600px;
  margin: 0 auto !important;
  box-shadow: 0 3px 12px 1px rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  padding: 12px 8px 8px;
  text-align: center;
  .el-input {
    padding: 0 4px;
    box-sizing: border-box;
    margin-bottom: 4px;
    line-height: 40px;
    height: 40px;
  }
  .el-col {
    margin: 4px 0;
  }
  .el-button {
    width: 100%;
  }

}
</style>

<template>
  <div class="">
    <div class="mode-choise">
      <el-radio v-model="mode" label="basic" border>基础模式</el-radio>
      <el-radio v-model="mode" label="advanced" border>高级模式</el-radio>
    </div>
    <el-row :gutter='8' class="calculator-container">
      <template v-if="mode !== 'basic'">
        <div class="record-container" id='record-box'>
          <template v-if="!records.length">
            <p class="empty">暂无记录</p>
          </template>
          <template v-else>
            <el-row v-for='(r, i) in records' :key='i' class="record">
              <el-col class="que" style="text-align:left" :span='13'>{{r.que}}</el-col>
              <el-col :span='1'>=</el-col>
              <el-col class="ans" style="text-align:right" :span='10'>{{r.ans}}</el-col>
            </el-row>
          </template>
        </div>
      </template>
      <el-input v-model="inputText" :readonly="mode === 'basic'" :placeholder="mode === 'basic' ? '' : '请输入'" @keyup.enter.native="clickBtn('=')"></el-input>
      <el-col :span="colSpan(btn)" v-for='btn in buttonMaps' :key='btn'>
        <el-button :disabled="btn === '=' && !inputText.length" @click='clickBtn(btn)' :type="btn === '=' ? 'primary' : ''">{{btn}}</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { buttonMaps } from '../utils/constants'
import { isEqual } from 'lodash'
const ERR_TEXT = 'Error'
export default {
  name: 'Calculator',
  props: {

  },
  data() {
    return {
      mode: 'basic',
      buttonMaps,
      inputText: '',
      result: false,
      records: [{que: '21313',ans: '232'}],

    }
  },
  computed: {
  },
  watch: {

  },
  methods: {
    colSpan: (btn) => {
      return btn === '=' ? 8 : 4;
    },
    clickBtn: function(btn) {
      const that = this
      switch(btn) {
        case 'C':
          that.inputText = ''
          break;
        case '<--':
          if(that.inputText !== ERR_TEXT) {
            that.inputText = that.inputText.slice(0, that.inputText.length-1)
          } else {
            that.inputText = ''
          }
          break;
        case '=':
          try {
            let ipt = that.inputText;
            that.calculate(ipt);
          } catch(err) {
            that.inputText = ERR_TEXT
          }
          that.result = true
          break;
        default:
          if(that.inputText === ERR_TEXT) {
            that.inputText = String(btn)
          } else if(!that.result || isNaN(btn)) {
            if(btn === 'x²') {
              btn = '²'
            }
            that.inputText += String(btn);
          } else {
            that.inputText = String(btn)
          }
          that.result = false
          break;
      }
    },
    calculate: function(ipt) {
      let _ipt = ipt
      if(/%(?=\d)/.test(_ipt) || /²(?=\d)/.test(_ipt)){
        throw Error('err')
      }
      // 计算百分号
      let match_a = _ipt.match(/\d+(?=%)/g)
      if(match_a && match_a.length) {
        match_a.map(i => {
          let reg = new RegExp(i+'%', 'g')
          _ipt = _ipt.replace(reg, String(i/100))
        })
      }
      // 计算平方
      let match_b = _ipt.match(/\d+(?=²)/g);
      // console.log(match_b);
      if(match_b && match_b.length) {
        match_b.map(i => {
          let reg = new RegExp(i+'²', 'g')
          _ipt = _ipt.replace(reg, String(Math.pow(i,2)))
        })
      }
      // 计算根号
      let match_short = _ipt.match(/\d+(?=√)/g)
      if(match_short && match_short.length) {
        // 2√4 = 2*√4
        match_short.map(i => {
          let reg = new RegExp(i+'√', 'g')
          _ipt = _ipt.replace(reg, i+'*√')
        })
      }
      let match_c = _ipt.match(/√(\d+)/g);
      if(match_c && match_c.length) {
        match_c.map(i => {
          let reg = new RegExp(i, 'g')
          _ipt = _ipt.replace(reg, String(Math.sqrt(i.replace('√',''))))
        })
      }

      let i_a = _ipt.indexOf('%'),
          i_b = _ipt.indexOf('²'),
          i_c = _ipt.indexOf('√');
      if(i_a > -1 || i_b > -1 || i_c > -1) {
        if(ipt === _ipt) {
          throw Error('err')
        } else {
          this.calculate(_ipt)
        }
      } else {
        var que = this.inputText
        this.inputText = eval(String(_ipt))+'';
        let new_r = { que, ans: this.inputText }
        if(this.mode === 'advanced' && !isEqual(new_r, this.records[this.records.length-1])) {
          let _records = [...this.records]
          _records.push(new_r)
          this.records = _records
          this.$nextTick(function () {
             // 将回调延迟到下次 DOM 更新循环之后执行
            var div = document.getElementById('record-box')
            div.scrollTop = div.scrollHeight
          })
        }
      }
    }
  }
}
</script>

