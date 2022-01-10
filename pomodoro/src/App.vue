<template lang="pug">
#app
  #left-navbar
    .btns(v-b-toggle.sidebar-1 @click='fold1' :style='{background: bgColor1}')
      img(src='./assets/icon/icon-list.svg')
    .btns(v-b-toggle.sidebar-2 @click='fold2' :style='{background: bgColor2}')
      img(src='./assets/icon/icon-analysis.svg')
  div#sidebar-list
    b-sidebar#sidebar-1(shadow width='50%' v-model='visible1')
      .text-color.d-flex.align-items-center.justify-content-center.list-outer
        h1.mr-auto.text-center.my-auto 待辦清單
        p.my-auto.mr-5 未完成
        p.my-auto.opacity-50 已完成
      div.text-outer
        b-form-input(v-model='text' placeholder='新增待辦事項' maxlength="20")
        b-button.submit(pill )
          b-icon-plus.plus
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
      h1.time 25:00
      div.mt-3
        b-button.mute.time-btn
          img(src='./assets/icon/icon-bell.svg')
        b-button.playStop.time-btn
          img(src='./assets/icon/icon-play--orange.svg')
        b-button.delete.time-btn
          img(src='./assets/icon/icon-cancel.svg')
    b-col.vh-50(cols='6') 22

    b-col.vh-50.bgtomato.d-flex.justify-content-center.align-items-end(cols='12')
      img(src='./assets/icon/tomato--orange.svg' :style='{marginRight: moveToRight}')
</template>

<script>
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
      moveToRight: ''
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
    }
  },
  computed: {

  }
}
</script>
