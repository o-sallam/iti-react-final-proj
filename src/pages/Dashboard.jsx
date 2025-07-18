import React from 'react';
import ReactApexChart from 'react-apexcharts';

const barOptions = {
  chart: {
    type: 'bar',
    height: 180,
    fontFamily: 'Outfit, sans-serif',
    toolbar: { show: false },
  },
  colors: ['#465fff'],
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '39%',
      borderRadius: 5,
      borderRadiusApplication: 'end',
    },
  },
  dataLabels: { enabled: false },
  stroke: { show: true, width: 4, colors: ['transparent'] },
  xaxis: {
    categories: [
      'يناير', 'فبراير', 'مارس', 'إبريل', 'مايو', 'يونيو',
      'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
    ],
    axisBorder: { show: false },
    axisTicks: { show: false },
  },
  legend: {
    show: true,
    position: 'top',
    horizontalAlign: 'left',
    fontFamily: 'Outfit',
    markers: { radius: 99 },
  },
  yaxis: { title: { text: '' } },
  grid: { yaxis: { lines: { show: true } } },
  fill: { opacity: 1 },
  tooltip: {
    x: { show: false },
    y: { formatter: (val) => val },
  },
};
const barSeries = [{ name: 'المبيعات', data: [168, 385, 201, 298, 187, 195, 291, 110, 215, 390, 280, 112] }];

const radialOptions = {
  chart: {
    type: 'radialBar',
    height: 330,
    fontFamily: 'Outfit, sans-serif',
    sparkline: { enabled: true },
  },
  colors: ['#465FFF'],
  plotOptions: {
    radialBar: {
      startAngle: -90,
      endAngle: 90,
      hollow: { size: '80%' },
      track: { background: '#E4E7EC', strokeWidth: '100%', margin: 5 },
      dataLabels: {
        name: { show: false },
        value: {
          fontSize: '36px',
          fontWeight: '600',
          offsetY: 60,
          color: '#1D2939',
          formatter: (val) => val + '%',
        },
      },
    },
  },
  fill: { type: 'solid', colors: ['#465FFF'] },
  stroke: { lineCap: 'round' },
  labels: ['نسبة الإنجاز'],
};
const radialSeries = [75.55];

const areaOptions = {
  chart: {
    type: 'area',
    height: 310,
    fontFamily: 'Outfit, sans-serif',
    toolbar: { show: false },
  },
  colors: ['#465FFF', '#9CB9FF'],
  fill: { gradient: { enabled: true, opacityFrom: 0.55, opacityTo: 0 } },
  stroke: { curve: 'straight', width: [2, 2] },
  markers: { size: 0 },
  grid: {
    xaxis: { lines: { show: false } },
    yaxis: { lines: { show: true } },
  },
  dataLabels: { enabled: false },
  tooltip: { x: { format: 'dd MMM yyyy' } },
  xaxis: {
    type: 'category',
    categories: [
      'يناير', 'فبراير', 'مارس', 'إبريل', 'مايو', 'يونيو',
      'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
    ],
    axisBorder: { show: false },
    axisTicks: { show: false },
    tooltip: false,
  },
  yaxis: { title: { style: { fontSize: '0px' } } },
  legend: { show: false },
};
const areaSeries = [
  { name: 'المبيعات', data: [180, 190, 170, 160, 175, 165, 170, 205, 230, 210, 240, 235] },
  { name: 'الإيرادات', data: [40, 30, 50, 40, 55, 40, 70, 100, 110, 120, 150, 140] },
];

const Dashboard = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50 dark:bg-gray-900 min-h-screen" dir="rtl">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">لوحة التحكم</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">إحصائيات المبيعات الشهرية</h2>
          <ReactApexChart options={barOptions} series={barSeries} type="bar" height={220} />
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">نسبة الإنجاز</h2>
          <ReactApexChart options={radialOptions} series={radialSeries} type="radialBar" height={330} />
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 md:col-span-2 lg:col-span-1">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">المبيعات والإيرادات السنوية</h2>
          <ReactApexChart options={areaOptions} series={areaSeries} type="area" height={310} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 