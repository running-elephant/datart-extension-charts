(function(){"use strict";var t='<?xml version="1.0" encoding="utf-8"?>\n<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\n<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\n\t width="192px" height="192px" viewBox="0 0 192 192" enable-background="new 0 0 192 192" xml:space="preserve">\n<path d="M161.271,96.556c-22.368,0.439-17.709,14.599-33.473,18.18c-16.014,3.638-18.542-39.111-34.552-39.111\n\tc-16.012,0-19.559,41.526-39.608,70.034l-0.572,0.807l42.985,24.813l65.22-37.651V96.556z"/>\n<path  d="M161.271,95.267c-7.488-9.61-12.567-20.658-23.494-20.658c-19.337,0-14.249,31.545-35.62,31.545\n\tc-21.373,0-23.62-33.931-47.832-2.035c-7.715,10.163-13.925,21.495-18.803,32.218l60.529,34.943l65.22-37.651V95.267z"/>\n<path opacity="0.8"  d="M30.829,108.334c7.338-20.321,10.505-36.779,24.514-36.779\n\tc21.371,0,26.458,60.039,44.779,53.931c18.318-6.105,16.282-38.669,44.779-38.669c5.424,0,10.962,3.323,16.371,8.698v38.113\n\tl-65.22,37.651l-65.222-37.651V108.334z"/>\n<path d="M96,176l-69.292-39.999V56L96,16l69.292,40v80L96,176z M34.849,131.301L96,166.602l61.151-35.301V60.7\n\tL96,25.399L34.849,60.7V131.301z"/>\n</svg>';function e({dHelper:e}){const n={labels:["Red","Blue","Yellow","Green","Purple","Orange"],datasets:[{label:"# of Votes",data:[12,19,3,5,2,3],backgroundColor:["rgba(255, 99, 132, 0.2)","rgba(54, 162, 235, 0.2)","rgba(255, 206, 86, 0.2)","rgba(75, 192, 192, 0.2)","rgba(153, 102, 255, 0.2)","rgba(255, 159, 64, 0.2)"],borderColor:["rgba(255, 99, 132, 1)","rgba(54, 162, 235, 1)","rgba(255, 206, 86, 1)","rgba(75, 192, 192, 1)","rgba(153, 102, 255, 1)","rgba(255, 159, 64, 1)"],borderWidth:1}]};return{config:{datas:[{label:"dimension",key:"dimension",actions:["sortable","alias"]},{label:"metrics",key:"metrics",rows:[],actions:["format","aggregate"]}],styles:[],settings:[],i18ns:[{lang:"zh-CN",translation:{chartName:"ChartJS"}},{lang:"en-US",translation:{chartName:"ChartJS"}}]},isISOContainer:"experiment-chartjs-chart",dependency:["https://cdn.jsdelivr.net/npm/chart.js@2.8.0"],meta:{id:"experiment-chartjs-chart",name:"chartName",icon:t,requirements:[{group:null,aggregate:null}]},onMount(t,e){if(void 0===t.containerId||!e.document)return;const{Chart:a}=e.window.Chart;if(!a)return;const r=e.document.createElement("canvas");r.id="chartjs-canvas-container";e.document.getElementById(t.containerId).appendChild(r);var o=e.document.getElementById("chartjs-canvas-container").getContext("2d");new a(o,{type:"bar",data:n,options:{scales:{yAxes:[{ticks:{beginAtZero:true}}]}}})},onUpdated(t,e){},onUnMount(){},onResize(t,e){}}}return e})();
