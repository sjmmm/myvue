<template>
  <div class="IndeterminateCheckList">
    <div class="" v-for="(item, i) in list" :key="i">
      <mt-checklist
        class="mainList"
        v-model="checkedItem"
        :value="value"
        :options="[{label: item.main, value: 'main_'+item.main_id}]">
      </mt-checklist>
      <mt-checklist
        v-if="item.child && item.child.length > 0 && item.child[0].value"
        class="subList"
        v-model="checkedItem"
        :options="item.child.map(c =>  ({ label: c.label, value: 'sub_'+ c.value }))">
      </mt-checklist>
    </div>
  </div>
</template>

<script>
import { isEqual, remove, difference } from 'lodash'

export default {
  name: 'IndeterminateCheckList',
  created: function() {
  },
  data: () => {
    return {
      checkedItem: [],
    }
  },
  props: {
    list: Array,
    onChange: Function,
    value: Array
  },
  computed: {
    formatList: function() {
      let formatList = {}
      this.list.map((item) => {
        formatList[item.main_id] = item.child.map(c => c.value )
      })
      return formatList
    }
  },
  watch: {
    checkedItem: function(val, old) {
      if(!isEqual(val, old)) {
        this.checkIndeterminate(val, old)
      }
    },
    value: function(val) {
      if(!isEqual(this.checkedItem, val)) {
        this.checkedItem = val
      }
    },

  },
  methods: {
    checkIndeterminate: function(val, old) {
      let _val = [...val]
      if(_val.length > old.length) {
        // 选中
        const added = difference(val, old)[0]
        if(/main/.test(added)) {
          // 选中主级
          let mainId = added.split('_').pop()
          let subs = this.formatList[mainId].map(subId => `sub_${subId}`)
          _val = [...new Set([..._val, ...subs])]
        } else {
          // 选中次级
        }
      } else if(_val.length < old.length){
        // 取消选中
        console.log(_val,old);
        const deleted = difference(old, val)[0]
        console.log(deleted,'deleted');
        if(/main/.test(deleted)) {
          // 取消主级
          let mainId = deleted.split('_').pop()
          remove(_val, (n) => {
            let subs = this.formatList[mainId].map(subId => `sub_${subId}`)
            return subs.indexOf(n) > -1
          })
          console.log(_val,'======');
        } else {
          // 取消次级

        }
      }
      this.onChange(_val)
    }
  }

}
</script>

<style lang='less'>
.IndeterminateCheckList {
  .subList {
    margin-left: 40px;
  }
}
</style>

