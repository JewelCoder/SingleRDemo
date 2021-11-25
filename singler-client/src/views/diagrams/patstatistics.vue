<template>
    <div>
        <div id="patshow"> </div>
    </div>
</template>
<script>
import * as signalr from '@microsoft/signalr'
export default{
name:'patstatistics',
  data(){
    return{
        chartData:{
            obj:Object,
            option:Object
        },
        deffoo:[23,22,23,24,23,25,23,24,23,22,23,24,25,23,25,25,24,22,21,22,24,25,22,20,22,23,22,23,25,23,24],
        defbar:[1,0,1,2,0,2,1,1,0,1,1,1,2,0,3,2,1,1,0,2,2,2,0,0,3,1,2,1,3,1,2]
    }
  },
  methods:{
      start(){
           this.$signalr.start().then(() => console.log('SignarlR Connected')).catch(err => console.log('SignalR Established : ' + err));
      },
      createChart(){
          this.chartData.obj = null
          this.chartData.obj = this.$echarts.init(document.getElementById('patshow'));
          this.initOption()
          this.chartData.obj.setOption(this.chartData.option)
      },
      initOption(){
          var _this = this
          var timeArr = this.$func.getEveryDayInMonth(2020,10)
          var deffooData = this.deffoo.map(x => Object.assign({},{value:x},{label:{show:true}}))
          var defbarData = this.defbar.map(x => Object.assign({},{value:x},{label:{show:true}}))
          this.chartData.option = {
              title:{
                  text:'TitleText',
                  left:'200px'
              },
              legend:{
                data:['Cat1','Cat2']
              },
              xAxis:{
                  type:'category',
                  name:'日数',
                  data: timeArr,
                  axisLabel:{
                      formatter:function(value){
                          var time = new Date(value)
                          return (time.getMonth() + 1) + '-' + _this.$func.zeroFill(time.getDate())
                      }
                  }
              },
              tooltip:{
                  trigger:'item',
                  axisPointer:{
                      type:'cross',
                      label:{
                          background:'#283b56',
                          show:false
                      }
                  },
                  show:true
                  // formatter:function(params){
                      // var day = new Date(params.name)
                      // return day.getFullYear() + '-' + (day.getMonth() + 1) + '-' + day.getDate()
                  // }
              },
              yAxis:{
                  type:'value'
              },
              series:[
                  {
                     data:deffooData,
                     type:'bar',
                      stack:'x',
                      name:'Cat1',
                      itemStyle:{
                          color:'lightblue',
                          borderWidth:1
                      },
                      markLine:{
                          lineStyle:{
                              width:2,
                              color:'black',
                              type:'solid'
                          },
                          data:[
                              {
                                name:'平均线',
                                type:'average',
                                x:100       //x表示屏幕坐标
                              },
                              {
                                  name:'就是画一条水平线',
                                  yAxis:20
                              },
                              [
                                {
                                    name:'最小值与最大值',
                                    type:'min',
                                },
                                {
                                    type:'max'
                                }
                              ],
                              [
                                  // 这里的coord里的x,y是横坐标，纵坐标，横坐标从0开始，纵坐标为yAxis数值
                                  {
                                      name:'两个坐标之间的标线',
                                      coord:[0,20]
                                  },
                                  {
                                      coord:[20,30]
                                  }
                              ]
                          ]
                      }
                  },
                  {
                      color:'green',
                      data:defbarData,
                      type:'bar',
                      stack:'x',
                      name:'Cat2',
                      itemStyle:{
                          borderColor:'lightblue',
                          borderWidth:1
                      },
                      markArea:{
                          data:[
                              [
                                  {
                                      name:'平均值到最大值',
                                      type:'average'
                                  },
                                  {
                                      type:'max'
                                  }
                              ]
                          ]
                      }
                  }
              ],
              graphic:{
                  elements:[
                      {
                          type:'group',
                          right:60,
                          top:20,
                          children:[
                              {
                                  type:'text',
                                  left:'center',
                                  top:'middle',
                                  style:{
                                      fill:'#f00',
                                      text:'SomeText1  \nSomeText2  \nSomeText3 '
                                  }
                              }
                          ]
                      }
                  ]
              }
          }  
      },
      ChangeData(zk,xr){
          this.deffoo = zk
          this.defbar = xr
          this.createChart();
      }
  },
  mounted(){
      this.createChart()
      if(this.$signalr.state == signalr.HubConnectionState.Disconnected)
            this.start()
  },
  created(){
      if(this.$signalr.state != signalr.HubConnectionState.Disconnected)
            this.start()
        this.$signalr.off('ChangeData')
        // 此为本地方法，用于服务端调用
        this.$signalr.on('ChangeData',this.ChangeData)
  }
}
</script>
<style scoped>
#patshow{
    min-width: 1000px;
    min-height: 500px;
}
</style>
