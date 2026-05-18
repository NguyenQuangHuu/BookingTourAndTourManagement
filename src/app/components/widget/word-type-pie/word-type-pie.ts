import { Component } from '@angular/core';
import { NgxEchartsDirective } from 'ngx-echarts';
import * as echarts from "echarts";
import type {EChartsOption} from "echarts"
@Component({
  selector: 'app-word-type-pie',
  imports: [NgxEchartsDirective],
  templateUrl: './word-type-pie.html',
  styleUrl: './word-type-pie.css',
})
export class WordTypePie {
chartOption: EChartsOption = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center'
    },
    series: [
      {
        name: 'Nguồn truy cập',
        type: 'pie',
        // [Bán kính trong, Bán kính ngoài] -> Tạo hình bánh Doughnut
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        
        // --- CHÌA KHÓA ĐỂ BO GÓC TRÒN ---
        itemStyle: {
          borderRadius: 10,       // Độ bo góc (px)
          borderColor: '#fff',    // Màu viền (trùng màu nền để tạo khoảng cách)
          borderWidth: 2          // Độ dày viền ngăn cách
        },
        
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 1048, name: 'Google Search', itemStyle: { color: '#3b82f6' } }, // Xanh dương
          { value: 735, name: 'Direct', itemStyle: { color: '#ef4444' } },        // Đỏ
          { value: 580, name: 'Email', itemStyle: { color: '#fbbf24' } },         // Vàng
          { value: 484, name: 'Ads', itemStyle: { color: '#10b981' } },           // Xanh lá
          { value: 300, name: 'Social', itemStyle: { color: '#8b5cf6' } }         // Tím
        ]
      }
    ]
  };
}
