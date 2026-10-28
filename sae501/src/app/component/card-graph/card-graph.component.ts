import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as echarts from 'echarts';
import { TransformArrayPipe } from 'src/app/pipe/transform-array.pipe';

interface DataGraph{
  name: string,
  value: string
}

@Component({
  selector: 'app-card-graph',
  templateUrl: './card-graph.component.html',
  styleUrls: ['./card-graph.component.scss']
})
export class CardGraphComponent implements OnInit{

  @ViewChild('chart', { static: true }) chartElement!: ElementRef;

  @Input() chartData: DataGraph[] = [];
  @Input() index!: number;
  @Input() title!: string;

  ngOnInit() {
    this.initChart();
  }

  initChart() {
    const pipe = new TransformArrayPipe();
    const transformedChartData: any = pipe.transform(this.chartData);
    const chart = echarts.init(this.chartElement.nativeElement);

    const options = {
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)',
      },
      legend: {
        orient: 'vertical',
        type: 'scroll',
        right: '5%',
        top: 'center',
        itemWidth: 15,
        itemHeight: 15,
        itemStyle: {
          borderRadius: '50px'
        },
        formatter: function(name: any) {
          var dataItem = options.series[0].data.find((item: { name: any; }) => item.name === name);
          if (dataItem) {
            var total = options.series[0].data.reduce((sum: any, item: { value: any; }) => sum + item.value, 0);
            var percentage = ((dataItem.value / total) * 100).toFixed(2);
            return `${name} - ${percentage} %`;
          } else {
            return name;
          }
        }
      },
      series: [
        {
          name: '',
          type: 'pie',
          center: ['25%', '50%'],
          radius: ['35%', '75%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 5,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: false,
              fontSize: 40,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: transformedChartData
        }
      ]
      }
      chart.setOption(options);
    };
}