<template lang="pug">
#app
  #left-navbar
    .btns(v-b-toggle.sidebar-1 @click='fold1' :style='{background: bgColor1}')
      img(src='./assets/icon/icon-list.svg')
    .btns(v-b-toggle.sidebar-2 @click='fold2' :style='{background: bgColor2, fontSize: active2}')
      img(src='./assets/icon/icon-analysis.svg')
  div#sidebar-list
    b-sidebar#sidebar-1(shadow width='50%' v-model='visible1')
      .text-color.d-flex.align-items-center.justify-content-center.list-outer
        h1.mr-auto.text-center.my-auto 待辦清單
        p.my-auto.mr-5.todotab(@click="opentodolist" :style='{fontSize: active1, opacity: opacity1}') 未完成
        p.my-auto.opacity-50.finishedtab(@click="openfinishedlist" :style='{fontSize: active2, opacity: opacity2}') 已完成
      div.text-outer.mb-5
        b-form-input(v-model='newinput' placeholder='新增待辦事項' maxlength="20" @keydown.enter='additem')
        b-button.submit(pill @click='additem' title='新增')
          b-icon-plus.plus
      div.d-flex.flex-column-reverse
        div.list-row(v-for='(item, i) in items' :style="{display: todoliststatus }")
          div.h-line
          div.w-100.row.py-3.mx-0
            div.circle(title='完成' @click="complete(i)")
            //- p(v-if="editstatus").mr-auto.text-e8.ml-3
            b-form-input.col-8.mr-auto.text-e8.ml-3.editinput(v-if="item.edit" placeholder='修改待辦事項' maxlength="20" v-model="item.model"  @keydown.enter="submitedit(i)")
            p(v-else).mr-auto.text-e8.ml-3 {{ item.name }}
            div.mx-1.btns-outer(v-if="!item.edit" title='修改' @click="edititem(i)")
              img(src="./assets/icon/icon-edit.svg")
            div.mx-1.btns-outer(v-if="!item.edit" title='刪除' @click="delitem(i)")
              img(src="./assets/icon/icon-delete.svg")
            div.mx-1.btns-outer(v-if="item.edit" title='確認' @click="submitedit(i)")
              b-icon-check2.text-e8.check2
            div.mx-1.btns-outer(v-if="item.edit" title='取消' @click="canceledit(i)")
              b-icon-arrow-counterclockwise.text-e8
      div.d-flex.flex-column-reverse
        div.list-row(v-for='(item, i) in finishedlist' :style="{display: finishedliststatus }")
          div.h-line
          div.w-100.row.py-3.mx-0
            div.circle.circle-com(title='清除')
              b-icon-check2
            //- p(v-if="editstatus").mr-auto.text-e8.ml-3
            b-form-input.col-8.mr-auto.text-e8.ml-3.editinput(v-if="item.edit" placeholder='修改待辦事項' maxlength="20" v-model="item.model"  @keydown.enter="submitedit(i)")
            del(v-else).mr-auto.text-e8_opacity.ml-3 {{ item.name }}
  div#sidebar-analysis
    b-sidebar#sidebar-2(shadow width='50%' v-model='visible2')
      .text-color.d-flex.align-items-center.justify-content-center.flex-column.list-outer
        h1.mr-auto.text-center.my-auto 專注度分析
        .doneNumber.d-flex.justify-content-between.mt-5
          .today
            h6 今日
            .box.d-flex.align-items-center
              .box-child
                h1.number 9
                h6.description 待辦事項
              .line
              .box-child
                h1.number.finishedNumber 7
                h6.description 已完成
          .thisWeek
            h6 本週
            .box.d-flex.align-items-center
              .box-child
                h1.number 54
                h6.description 待辦事項
              .line
              .box-child
                h1.number.finishedNumber 48
                h6.description 已完成
        .calendar
        .chart
  b-row#row-content.position-relative(:style='{marginLeft: whilefold}')
    b-col.vh-50.d-flex.align-items-center.justify-content-center.flex-column(cols='6')
      h1.time {{ timeText }}
      div.mt-3
        b-button.mute.time-btn
          img(src='./assets/icon/icon-bell.svg')
        b-button.playStop.time-btn(v-if="status === 1" title='靜音' @click="pause")
          img( src='./assets/icon/icon-pause--orange.svg')
        b-button.playStop.time-btn(v-else @click="start")
          img(src='./assets/icon/icon-play--orange.svg')
        b-button.delete.time-btn(v-if="!breaker" title='跳過' @click="finish(true)")
          img(src='./assets/icon/icon-cancel.svg')
        b-button.delete.time-btn(v-else title='跳過' @click="skipbreak")
          img(src='./assets/icon/icon-cancel.svg')
    b-col.vh-50(cols='6' :style='{display: takeabreak}') 22
    b-col.vh-50.bgtomato.d-flex.justify-content-center.align-items-end(cols='12')
      img(src='./assets/icon/tomato--orange.svg' :style='{marginRight: moveToRight}')
</template>

<script>
const time = parseInt(process.env.VUE_APP_TIME)
const timebreak = parseInt(process.env.VUE_APP_TIMEBREAK)
export default {
  data () {
    return {
      status1: false,
      bgColor1: '',
      status2: false,
      bgColor2: '',
      visible1: false,
      visible2: false,
      whilefold: '',
      moveToRight: '',
      newinput: '',
      items: [],
      itemslength: 0,
      editstatus: false,
      edited: '',
      finishedlist: [],
      todoliststatus: 'block',
      finishedliststatus: 'none',
      active1: '1.3rem',
      active2: '1rem',
      opacity1: '1',
      opacity2: '0.5',
      timeleft: time,
      breaker: false,
      takeabreak: 'block',
      // timer status
      // 0 = 停止
      // 1 = 倒數中
      // 2 = 暫停
      status: 0,
      timer: 0
    }
  },
  methods: {
    fold1 () {
      this.status1 = !this.status1
      if (this.status1) {
        this.bgColor1 = '#FFFFFF'
      } else {
        this.bgColor1 = ''
      }
      if (this.status2) {
        this.status2 = false
        this.bgColor2 = ''
      }
      if (this.visible2) {
        this.visible2 = false
      }
      if (!this.visible1) {
        this.whilefold = '50%'
        this.moveToRight = '110px'
      } else {
        this.whilefold = ''
        this.moveToRight = ''
      }
    },
    fold2 () {
      this.status2 = !this.status2
      if (this.status2) {
        this.bgColor2 = '#FFFFFF'
      } else {
        this.bgColor2 = ''
      }
      if (this.status1) {
        this.status1 = false
        this.bgColor1 = ''
      }
      if (this.visible1) {
        this.visible1 = false
      }
      if (!this.visible2) {
        this.whilefold = '50%'
        this.moveToRight = '110px'
      } else {
        this.whilefold = ''
        this.moveToRight = ''
      }
    },
    additem () {
      // this.items.push(this.newinput)
      // this.newinput = ''
      if (this.newinput.length > 0) {
        this.items.push({
          name: this.newinput,
          edit: false,
          model: this.newinput
        })
        this.newinput = ''
      }
    },
    delitem (index) {
      this.items.splice(index, 1)
    },
    edititem (index) {
      this.items[index].edit = true
    },
    submitedit (index) {
      if (this.items[index].model.length > 0) {
        this.items[index].name = this.items[index].model
        this.items[index].edit = false
      }
    },
    canceledit (index) {
      this.items[index].edit = false
      this.items[index].model = this.items[index].name
    },
    complete (index) {
      this.finishedlist.push(this.items[index])
      this.items.splice(index, 1)
    },
    opentodolist () {
      this.todoliststatus = 'block'
      this.finishedliststatus = 'none'
      this.active1 = '1.2rem'
      this.active2 = '1rem'
      this.opacity1 = '1'
      this.opacity2 = '0.5'
    },
    openfinishedlist () {
      this.todoliststatus = 'none'
      this.finishedliststatus = 'block'
      this.active2 = '1.2rem'
      this.active1 = '1rem'
      this.opacity1 = '0.5'
      this.opacity2 = '1'
    },
    start () {
      // if (this.status === 0 && this.items.length > 0) {
      //   this.
      // }
      if (this.items.length > 0) {
        this.status = 1
        this.timer = setInterval(() => {
          this.timeleft--
          if (this.timeleft <= -1) {
            this.finish(false)
          }
        }, 1000)
      }
    },
    pause () {
      this.status = 2
      clearInterval(this.timer)
    },
    finish (skip) {
      clearInterval(this.timer)
      this.status = 0
      if (this.items.length > 0) {
        this.break = !this.break
      }
      this.timeleft = this.break ? timebreak : time

      if (!skip) {
        const audio = new Audio()
        audio.src = require('@/assets/alarm.mp3')
        audio.play()
        audio.volume = 0.1
      }

      if (this.items.length > 0) {
        this.start()
      }
      if (this.break) {
        this.items.pop()
      }
    },
    skipbreak () {
      clearInterval(this.timer)
      this.status = 0
      if (this.items.length > 0) {
        this.break = !this.break
      }
      this.timeleft = time
      if (this.items.length > 0) {
        this.start()
      }
    }
  },
  computed: {
    // timeleft () {
    //   return this.$store.state.timeleft
    // },
    timeText () {
      const m = Math.floor(this.timeleft / 60).toString().padStart(2, '0')
      const s = Math.floor(this.timeleft % 60).toString().padStart(2, '0')
      return `${m} : ${s}`
    }
  }
}
</script>
