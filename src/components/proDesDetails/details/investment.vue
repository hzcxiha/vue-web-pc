<template>
  <div tab-id="3" class="tab">
    <div class='proportionWrap'>
      <!--<img src='images/proportion(1).png' alt=''>-->
      <div id="main" class="" style="width: 600px;height: 360px;margin:0 auto;"></div>
    </div>
    <div class="textCnter borderBottom" style="font-size: 16px;padding-bottom: 20px">用户资金去向比例分布</div>
    <div class="txtMarquee-top">
      <div id="box1" class="box" style="position:relative;height: 400px;overflow: hidden">
        <ul class="infoList" id="ul11">
          <li class="flex" v-for="item in items.phone">
            <div class="flex1">{{item}}</div>
            <div class="flex1"><span class="proTime">{{items.date[0]}}</span>&nbsp;<span class="">{{items.hour[Math.floor((Math.random() * items.hour.length))]}}</span>:<span class="">{{items.min[Math.floor((Math.random() * items.min.length))]}}</span></div>
            <div class="flex1"><span class=''>{{items.proName[Math.floor((Math.random() * items.proName.length))]}}</span><span class=''>{{parseFloat(Math.random()*(10000-100)+100).toFixed(2)}}</span>元</div>
          </li>
        </ul>
        <ul id='ul12'></ul>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        items: {
          phone: [],
          date: [],
          dayTime: [],
          proName: [],
          money: [],
          hour: [],
          min: []
        }
      }
    },
    mounted () {
      this.$nextTick(function () {
        this.creatPhone()
        this.creatProName()
        this.creatDate()
        this.createHour()
        this.createMin()
        setTimeout(() => {
          this.discoloration()
          this.roll()
          this.drawPie()
        }, 10)
        setInterval(this.rollStart, 150)
      })
    },
    methods: {
      drawPie () {
//        console.log(1)
        if (this.$route.path.indexOf('hqj') >= 0) {
//          console.log(2)
          let xiaoShou = parseFloat(Math.random() * (70 - 60) + 60).toFixed(2)
          let chuZu = parseFloat(Math.random() * (30 - 20) + 20).toFixed(2)
          let shiPin = parseFloat(Math.random() * (20 - 0) + 0).toFixed(2)
          let myChart = this.$echarts.init(document.getElementById('main'))
          myChart.setOption({
            tooltip: {
              height: 1,
              trigger: 'item',
              formatter: '{a} <br/>{b} : {d}%'
            },
            legend: {
              show: false,
              orient: 'vertical',
              x: 'left',
              data: ['黄金销售', '黄金出租', '金饰生产']
            },
            toolbox: {
              show: false,
              feature: {
                mark: {show: true},
                dataView: {show: true, readOnly: false},
                magicType: {
                  show: true,
                  type: ['pie', 'funnel'],
                  option: {
                    funnel: {
                      x: '25%',
                      width: '50%',
                      funnelAlign: 'left',
                      max: 1548
                    }
                  }
                },
                restore: {show: true},
                saveAsImage: {show: true}
              }
            },
            calculable: false,
            series: [
              {
                name: '活期金',
                type: 'pie',
                radius: ['30%', '65%'],
                itemStyle: {
                  fontSize: '14',
                  normal: {
                    label: {
                      show: true,
                      normal: {
                        textStyle: {
                          fontSize: '14',
                          textAlign: 'left'
                        }
                      }
                    },
                    labelLine: {
                      show: true,
                      length: 0.01
                    }
                  },
                  emphasis: {
                    label: {
                      show: false,
                      position: 'left',
                      textStyle: {
                        fontSize: '14',
                        fontWeight: 'bold',
                        textAlign: 'left'
                      }
                    }
                  }
                },
                data: [
                  {value: xiaoShou, name: '黄金销售'},
                  {value: chuZu, name: '黄金出租'},
                  {value: shiPin, name: '金饰生产'}
                ]
              }
            ]
          })
        } else if (this.$route.path.indexOf('wzj') >= 0) {
          let one = parseFloat(Math.random() * (50 - 30) + 30).toFixed(2)
          let two = parseFloat(Math.random() * (30 - 20) + 20).toFixed(2)
          let three = parseFloat(Math.random() * (20 - 10) + 10).toFixed(2)
          let four = parseFloat(Math.random() * (10 - 0) + 0).toFixed(2)
          let myChart = this.$echarts.init(document.getElementById('main'))
          myChart.setOption({
            tooltip: {
              height: 1,
              trigger: 'item',
              formatter: '{a} <br/>{b} : {d}%'
            },
            legend: {
              show: false,
              orient: 'vertical',
              x: 'left',
              data: ['金创赢量化对冲1号', '金创赢量化对冲2号', '其他量化对冲产品', '低杠杆黄金T+D产品']
            },
            toolbox: {
              show: false,
              feature: {
                mark: {show: true},
                dataView: {show: true, readOnly: false},
                magicType: {
                  show: true,
                  type: ['pie', 'funnel'],
                  option: {
                    funnel: {
                      x: '25%',
                      width: '50%',
                      funnelAlign: 'left',
                      max: 1548
                    }
                  }
                },
                restore: {show: true},
                saveAsImage: {show: true}
              }
            },
            calculable: false,
            series: [
              {
                name: '稳赚金                                                                                                                                                         ',
                type: 'pie',
                radius: ['30%', '65%'],
                itemStyle: {
                  fontSize: '14',
                  normal: {
                    label: {
                      show: true,
                      normal: {
                        textStyle: {
                          fontSize: '14',
                          textAlign: 'left'
                        }
                      }
                    },
                    labelLine: {
                      show: true,
                      length: 0.01
                    }
                  },
                  emphasis: {
                    label: {
                      show: false,
                      position: 'left',
                      textStyle: {
                        fontSize: '14',
                        fontWeight: 'bold',
                        textAlign: 'left'
                      }
                    }
                  }
                },
                data: [
                  {value: one, name: '金创赢量化对冲1号'},
                  {value: two, name: '金创赢量化对冲2号'},
                  {value: three, name: '其他量化对冲产品'},
                  {value: four, name: '低杠杆黄金T+D产品'}
                ]
              }
            ]
          })
        }
      },
      creatPhone () {
        let arr = ['130', '159', '176', '189', '136', '131', '150', '177', '182', '137', '132', '152', '147', '183', '157', '133', '151', '173', '187', '181', '134', '153', '178', '188', '138', '135', '158', '180', '139', '184']
        for (let i = 0; i < 100; i++) {
          let a = Math.floor((Math.random() * arr.length))
          let phone = arr[a] + '********'
          this.items.phone.push(phone)
        }
      },
      creatDate () {
        let dayTime = -1 * 24 * 60 * 60 * 1000
        let nowTime = new Date().getTime()
        var t = new Date(nowTime + dayTime).toLocaleString()
        console.log('其他')
        let timeStr = t.substr(0, 10).replace(/[\u4E00-\u9FA5]/g, '')
        let arr = timeStr.split('/')
        let year = arr[0]
        let month = arr[1]
        let day2 = arr[2]
        var interestTime
        if (day2 < 10) {
          day2 = '0' + day2
          interestTime = year + '-' + month + '-' + day2
        } else {
          interestTime = year + '-' + month + '-' + day2
        }
        this.items.date.push(interestTime)
      },
      createHour () {
        for (let i = 0; i < 100; i++) {
          var hour = parseInt(Math.random() * (23 - 0) + 0)
          if (hour < 10) {
            var hours = '0' + hour
          } else {
            hours = hour
          }
          this.items.hour.push(hours)
          this.items.hour.sort().reverse()
        }
      },
      creatProName () {
        let arrPrt = ['活期金', '稳赚金60天', '稳赚金90天', '稳赚金180天', '稳赚金360天']
        for (let i = 0; i < 100; i++) {
          let pa = Math.floor((Math.random() * arrPrt.length))
          let product = arrPrt[pa]
          this.items.proName.push(product)
        }
      },
      createMin () {
        for (let i = 0; i < 100; i++) {
          var min = parseInt(Math.random() * (59 - 0) + 0)
          if (min < 10) {
            var mins = '0' + min
          } else {
            mins = min
          }
          this.items.min.push(mins)
          this.items.min.sort().reverse()
        }
      },
      discoloration () {
        var item = document.getElementById('ul11').childNodes
        for (var i = 0; i < item.length; i++) {
          if (i % 2 === 0) {
            item[i].style.backgroundColor = '#eff3f9'
          } else {
            item[i].style.backgroundColor = '#f7f9fc'
          }
        }
      },
      roll () {
        var ul11 = document.getElementById('ul11')
        var ul12 = document.getElementById('ul12')
//        var box1 = document.getElementById('box1')
        ul12.innerHTML = ul11.innerHTML
//        box1.scrollTop = 0
      },
      rollStart () {
        var ul11 = document.getElementById('ul11')
        var box1 = document.getElementById('box1')
        if (this.$route.path.indexOf('investment') >= 0) {
          if (box1.scrollTop < ul11.scrollHeight) {
            box1.scrollTop++
          } else {
            box1.scrollTop = 0
          }
        }
      }
    }
  }
</script>
