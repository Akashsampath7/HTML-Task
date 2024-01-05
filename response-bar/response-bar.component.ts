import { Component, OnInit, ViewChild, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { ApiService } from '../api.service';
import { Chart } from 'chart.js';
import { forkJoin } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-response-bar',
  templateUrl: './response-bar.component.html',
  styleUrls: ['./response-bar.component.css']
})
export class ResponseBarComponent implements OnInit {
  jsonData1: any[] = [];
  jsonData2: any[] = [];
  jsonData3: any[] = [];

  chart1: any;
  chart2: any;
  chart3: any;

  combinedData: any[] = [];
  combinedChart: any;
  @ViewChild('combinedCanvas') combinedCanvas!: ElementRef;

  constructor(
    private apiService: ApiService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit() {
    const api1 = this.apiService.getJsonData1();
    const api2 = this.apiService.getJsonData2();
    const api3 = this.apiService.getJsonData3();

    forkJoin([api1, api2, api3]).subscribe(
      ([data1, data2, data3]) => {
        this.jsonData1 = data1;
        this.jsonData2 = data2;
        this.jsonData3 = data3;

        this.formatDataForChart(this.jsonData1);
        this.formatDataForChart(this.jsonData2);
        this.formatDataForChart(this.jsonData3);

        this.createChart('canvas1', this.jsonData1, 'rgba(0, 123, 255, 0.2)','rgba(0, 123, 255, 0.2)', 'Api response 1');
        this.createChart('canvas2', this.jsonData2, 'rgba(255, 0, 123, 0.2)','rgba(255, 0, 123, 0.2)', 'Api response 2');
        this.createChart('canvas3', this.jsonData3, 'rgba(123, 255, 0, 0.2)','rgba(123, 255, 0, 0.2)', 'Api response 3');
      },
      (error) => {
        console.error('Error fetching JSON data:', error);
      }
    );

    const api1Combined = this.apiService.getJsonData1();
    const api2Combined = this.apiService.getJsonData2();
    const api3Combined = this.apiService.getJsonData3();

    forkJoin([api1Combined, api2Combined, api3Combined]).subscribe(
      ([data1, data2, data3]) => {
        this.combineData(data1, data2, data3);
        if (isPlatformBrowser(this.platformId)) {
          this.createCombinedChart();
        }
      },
      (error) => {
        console.error('Error fetching combined JSON data:', error);
      }
    );
  }

  formatDataForChart(jsonData: any[]) {
    jsonData.forEach(entry => {
      const date = new Date(entry.eventTime);
      entry.eventTime = date.toLocaleTimeString();
    });
  }

  combineData(data1: any[], data2: any[], data3: any[]) {
    const uniqueEventTimes = new Set<string>();

    data1.forEach(entry => uniqueEventTimes.add(entry.eventTime));
    data2.forEach(entry => uniqueEventTimes.add(entry.eventTime));
    data3.forEach(entry => uniqueEventTimes.add(entry.eventTime));

    this.combinedData = Array.from(uniqueEventTimes).map(eventTime => {
      const entry1 = data1.find(entry => entry.eventTime === eventTime);
      const entry2 = data2.find(entry => entry.eventTime === eventTime);
      const entry3 = data3.find(entry => entry.eventTime === eventTime);

      return {
        eventTime: eventTime,
        responseTime1: entry1 ? entry1.responseTime : 0,
        responseTime2: entry2 ? entry2.responseTime : 0,
        responseTime3: entry3 ? entry3.responseTime : 0,
      };
    });
  }

  createChart(canvasId: string, jsonData: any[], backgroundColor: string, borderColor: string, apiLabel: string) {
    const labels = jsonData.map((entry) => entry.eventTime);
    const data = jsonData.map((entry) => entry.responseTime);

    const dataset = {
      data: data,
      backgroundColor: backgroundColor,
      borderColor: borderColor,
      borderWidth: 1,
      label: apiLabel,
    };

    const chartOptions = {
      scales: {
        x: {
          title: { display: true, text: 'Event Time' },
        },
        y: {
          title: { display: true, text: 'Response Time' },
        },
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (tooltipItem: any) => {
              const value = tooltipItem.formattedValue;
              return `${apiLabel}: ${value}`;
            },
          },
        },
      },
    };

    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    const ctx = canvas.getContext('2d')!;

    const chart = new Chart(ctx, {
      type: 'bar',
      data: { labels: labels, datasets: [dataset] },
      options: chartOptions as any,
    });

    // Save the chart reference
    if (canvasId === 'canvas1') {
      this.chart1 = chart;
    } else if (canvasId === 'canvas2') {
      this.chart2 = chart;
    } else if (canvasId === 'canvas3') {
      this.chart3 = chart;
    }
  }

  createCombinedChart() {
    const labels = this.combinedData.map(entry => entry.eventTime);
    const canvas = this.combinedCanvas.nativeElement.getContext('2d');

    this.combinedChart = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'API 1 Response Time',
            data: this.combinedData.map((entry) => entry.responseTime1),
            backgroundColor: 'rgba(0, 123, 255, 0.2)',
            borderColor: 'rgba(0, 123, 255, 0.2)',
            borderWidth: 1,
          },
          {
            label: 'API 2 Response Time',
            data: this.combinedData.map((entry) => entry.responseTime2),
            backgroundColor: 'rgba(255, 0, 123, 0.2)',
            borderColor: 'rgba(255, 0, 123, 0.2)',
            borderWidth: 1,
          },
          {
            label: 'API 3 Response Time',
            data: this.combinedData.map((entry) => entry.responseTime3),
            backgroundColor: 'rgba(123, 255, 0, 0.2)',
            borderColor: 'rgba(123, 255, 0, 0.2)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          x: {
            type: 'category',
            title: {
              display: true,
              text: 'Event Time',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Response Time',
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: (tooltipItem: any) => {
                const dataLabel = labels[tooltipItem.index];
                const value = tooltipItem.formattedValue;
                const apiLabel = `API ${tooltipItem.datasetIndex + 1} Response`;
                return `${apiLabel}: ${value}`;
              },
            },
          },
        },
      },
    });
  }
}

