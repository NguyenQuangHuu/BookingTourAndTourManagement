import { Component,signal, viewChildren,ElementRef, effect, afterNextRender } from '@angular/core';
import { NgxEchartsDirective } from 'ngx-echarts';
import { first } from 'rxjs';
import * as echarts from "echarts";
import type {EChartsOption} from "echarts"
@Component({
  selector: 'app-visitors-chart',
  imports: [NgxEchartsDirective],
  templateUrl: './visitors-chart.html',
  styleUrl: './visitors-chart.css',
})
export class VisitorsChart {
  buttons = signal([
    {id:"today",label:"Hôm nay",enable:true},
    {id:"7days" ,label:"7 Ngày",enable:true},
    {id:"30days" ,label:"30 Ngày",enable:true}
  ]);
  selectedButton = signal('today')
  sliderStyle = signal({left:0,width:0})
  btnRef = viewChildren<ElementRef>("btnRef");
// 1. Khai báo options cho ECharts dưới dạng Signal
  chartOption = signal<EChartsOption>({});
  private dataMap: any = {
    today: {
      x: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '23:59'],
      y: [120, 132, 101, 134, 90, 230, 210]
    },
    '7days': {
      x: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
      y: [820, 932, 901, 934, 1290, 1330, 1320]
    },
    '30days': {
      x: ['W1', 'W2', 'W3', 'W4'],
      y: [3000, 3500, 2800, 4200]
    }
  };

  constructor(){
    afterNextRender(()=>{
      const buttons = this.btnRef();
      const currentId = this.selectedButton();
      const index = this.buttons().findIndex(x=>x.id===currentId && x.enable===true)
      this.updateSliderStyle(buttons[index].nativeElement);
    });
    effect(() => {
      const period = this.selectedButton();
      this.updateChartData(period);
    });
  }
  buttonClick(id:string,e:HTMLElement){
    this.selectedButton.set(id);
    this.updateSliderStyle(e)
  }

  private updateSliderStyle(e:HTMLElement){
    this.sliderStyle.set({
      width:e.offsetWidth,
      left:e.offsetLeft
    })
  }
  private updateChartData(period: string) {
    const data = this.dataMap[period] || this.dataMap['today'];
    const option: EChartsOption = {
      // 1. Tooltip: Vẫn giữ để xem số liệu, nhưng làm gọn lại
      tooltip: {
        trigger: 'axis',
        confine: true, // Quan trọng: Giữ tooltip nằm trong khung chart nhỏ, không bị che mất
        formatter: '{b}: <b>{c}</b>', // Format ngắn gọn
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        textStyle: { fontSize: 12 }
      },
      grid: {
      left: 4,    // Sát lề trái (Full width)
      right: 4,   // Sát lề phải (Full width)
      bottom: 4,  // Sát đáy (để curve chạm đáy)
      top: 10,    // Chừa 1 chút xíu bên trên để đỉnh biểu đồ không bị cắt
      containLabel: true // Bắt buộc: false (Không tính label vào vùng vẽ)
    },
      // 3. Ẩn toàn bộ trục X và Y
      xAxis: {
        type: 'category',
        data: data.x,
        show: true, // Ẩn trục X
        boundaryGap: true // Line bắt đầu từ mép
      },
      yAxis: {
        type: 'value',
        show: true, // Ẩn trục Y
      },
      series: [
        {
          data: data.y,
          type: 'line',
          smooth: true,
          lineStyle: {
        width: 2,
        color: '#ef4444' // Màu đỏ theo theme của bạn
      },
          areaStyle: {
            opacity: 0.5,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(59, 130, 246, 0.4)' },
              { offset: 1, color: 'rgba(59, 130, 246, 0.05)' } // Màu nhạt hơn ở dưới
            ])
          }
        }
      ]
    };

    this.chartOption.set(option);
} 
}
