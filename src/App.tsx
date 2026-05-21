import React, { useState, useRef, useEffect } from 'react';
import { 
  Plus, 
  Download, 
  Send, 
  RotateCcw, 
  Phone, 
  Mail, 
  MapPin, 
  Globe,
  Settings2,
  CheckCircle2,
  Layout,
  Upload,
  Info,
  X,
  FileUp,
  Copy,
  Check,
  AlertCircle,
  AlertTriangle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import JSZip from 'jszip';

// Constants for the business card
const HI_RES_WIDTH = 1050; 
const HI_RES_HEIGHT = 600; 

const COLORS = {
  text: '#4D4D4D',
  orange: '#F08200',
  red: '#C8102E',
  nyse: '#7A7570',
};

interface CardData {
  company: string;
  name: string;
  englishName: string;
  title: string;
  englishTitle: string;
  phone: string;
  email: string;
  address: string;
  englishAddress: string;
  website: string;
}

interface Template {
  id: string;
  name: string;
  frontSvgString?: string; // Raw SVG text for Front
  backSvgString?: string;  // Raw SVG text for Back
}

const DEFAULT_TEMPLATES: Template[] = [
  {
    id: 'standard',
    name: '标准模板',
    frontSvgString: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1050 600" width="1050" height="600">
  <defs>
    <style>
      .cls-1, .cls-2 { font-family: ArialMT, Arial, sans-serif; font-size: 5.67px; }
      .cls-1, .cls-2, .cls-3, .cls-4, .cls-5 { fill: #595757; }
      .cls-6, .cls-2 { letter-spacing: .02em; }
      .cls-7 { fill: #333; }
      .cls-9 { fill: #b60005; }
      .cls-10 { fill: #262626; font-family: Arial-BoldMT, Arial, sans-serif; font-size: 14.17px; font-weight: 700; letter-spacing: -.08em; }
      .cls-11 { fill: #4c4948; font-size: 11.34px; font-family: SimHei, "Microsoft YaHei", sans-serif; }
      .cls-4 { font-size: 8.5px; letter-spacing: .2em; font-family: SimHei, "Microsoft YaHei", sans-serif; }
      .cls-12 { fill: #ed6c00; }
      .cls-5 { font-size: 4.78px; letter-spacing: .04em; font-family: SimHei, "Microsoft YaHei", sans-serif; }
      .cls-13 { fill: #e8380d; }
      .cls-14 { fill: #f39800; }
      .cls-15 { fill: none; stroke: #333; stroke-miterlimit: 10; stroke-width: .25px; }
    </style>
  </defs>
  
  <rect width="1050" height="600" fill="#ffffff"/>
  
  <g transform="translate(0, 8.35) scale(4.1157)">
  
    <!-- 底层固定标志 - CANG LISTED NYSE -->
    <g>
      <polygon class="cls-3" points="216.96 127.78 214.34 123.63 214.34 127.78 213.08 127.78 213.08 121.48 214.35 121.48 216.86 125.45 216.86 121.48 218.12 121.48 218.12 127.78 216.96 127.78"/>
      <polygon class="cls-3" points="222.58 125.06 222.58 127.78 221.31 127.78 221.31 125.06 219.02 121.48 220.54 121.48 221.94 123.77 223.33 121.48 224.85 121.48 222.58 125.06"/>
      <path class="cls-3" d="M227.5,127.85c-.95,0-1.71-.33-2.38-.93l.66-1.05c.47.44,1.08.76,1.72.76.52,0,.84-.29.84-.6,0-.45-.49-.55-1.43-.9-1.27-.47-1.64-1.27-1.64-1.84,0-.93.64-1.89,2.04-1.89.86,0,1.59.33,2.11.8l-.66,1.04c-.37-.31-1.05-.62-1.47-.62-.38,0-.73.19-.73.56,0,.6.72.59,1.61.96.98.41,1.42,1,1.42,1.74,0,1.05-.9,1.96-2.09,1.96"/>
      <polygon class="cls-3" points="230.74 127.78 230.74 121.48 234.84 121.48 234.84 122.59 232 122.59 232 124.07 234.44 124.07 234.44 125.19 232 125.19 232 126.67 234.84 126.67 234.84 127.78 230.74 127.78"/>
      <polygon class="cls-3" points="213.08 112.42 213.54 112.42 213.54 116.11 215.86 116.11 215.86 116.54 213.08 116.54 213.08 112.42"/>
      <rect class="cls-3" x="217.03" y="112.42" width=".46" height="4.12"/>
      <path class="cls-3" d="M218.71,115.94l.29-.34c.43.39.84.58,1.41.58s.92-.29.92-.7h0c0-.39-.21-.61-1.07-.79-.95-.21-1.38-.51-1.38-1.19h0c0-.66.57-1.13,1.35-1.13.6,0,1.03.17,1.45.51l-.27.36c-.38-.31-.76-.45-1.19-.45-.53,0-.88.29-.88.67h0c0,.4.21.62,1.12.81.92.2,1.34.54,1.34,1.17h0c0,.71-.59,1.17-1.4,1.17-.65,0-1.19-.22-1.68-.66"/>
      <polygon class="cls-3" points="224.02 112.85 222.64 112.85 222.64 112.42 225.87 112.42 225.87 112.85 224.49 112.85 224.49 116.54 224.02 116.54 224.02 112.85"/>
      <polygon class="cls-3" points="227.02 112.42 229.99 112.42 229.99 112.84 227.48 112.84 227.48 114.25 229.72 114.25 229.72 114.67 227.48 114.67 227.48 116.11 230.02 116.11 230.02 116.54 227.02 116.54 227.02 112.42"/>
      <path class="cls-3" d="M231.22,112.42h1.43c1.29,0,2.19.89,2.19,2.04h0c0,1.17-.89,2.07-2.19,2.07h-1.43v-4.12ZM232.65,116.11c1.04,0,1.71-.7,1.71-1.62h0c0-.92-.66-1.64-1.71-1.64h-.96v3.26h.96Z"/>
      <rect class="cls-3" x="213.08" y="109.83" width="21.76" height=".23"/>
      <rect class="cls-3" x="213.08" y="118.98" width="21.76" height=".23"/>
      <path class="cls-3" d="M212.03,104.07v-.02c0-1.81,1.29-3.29,3.15-3.29,1.14,0,1.82.4,2.38.98l-.85,1.03c-.47-.45-.94-.72-1.54-.72-1.02,0-1.76.89-1.76,1.98v.02c0,1.09.72,2,1.76,2,.69,0,1.11-.29,1.59-.74l.85.9c-.62.7-1.31,1.14-2.48,1.14-1.78,0-3.1-1.45-3.1-3.27"/>
      <path class="cls-3" d="M220.06,100.82h1.23l2.59,6.41h-1.39l-.55-1.43h-2.56l-.55,1.43h-1.36l2.59-6.41ZM221.46,104.56l-.8-2.06-.8,2.06h1.61Z"/>
      <polygon class="cls-3" points="224.11 100.87 225.34 100.87 228.17 104.78 228.17 100.87 229.48 100.87 229.48 107.23 228.35 107.23 225.43 103.18 225.43 107.23 224.11 107.23 224.11 100.87"/>
      <path class="cls-3" d="M230.03,104.07v-.02c0-1.81,1.34-3.29,3.17-3.29,1.09,0,1.75.31,2.38.87l-.83,1.06c-.47-.41-.88-.65-1.58-.65-.97,0-1.73.9-1.73,1.98v.02c0,1.16.76,2.02,1.83,2.02.48,0,.92-.13,1.25-.38v-.91h-1.34v-1.21h2.62v2.77c-.62.55-1.48,1.01-2.58,1.01-1.88,0-3.18-1.39-3.18-3.27"/>
    </g>

    <!-- 底层固定标志 - CANGO Logo -->
    <g>
      <path class="cls-12" d="M193.94,22.17l-3.19-8.2h-2.2l-6.03,15.49h2.2l1.35-3.47h7.12l.76,1.92v-5.73ZM186.82,24.04l2.81-7.24,2.82,7.24h-5.63Z"/>
      <g>
        <path class="cls-13" d="M207.97,15.72v-1.74h-2.08v4.89c.43-1.32,1.17-2.41,2.08-3.14Z"/>
        <path class="cls-13" d="M205.89,24.44v1.55l-9.1-12.02h-2.22v15.49h2.22v-11.99l9.1,11.99h2.08v-1.88c-.91-.73-1.65-1.83-2.08-3.14Z"/>
      </g>
      <g>
        <path class="cls-14" d="M182.96,26.6c-1.03.66-2.2,1-3.51,1-1.72,0-3.19-.58-4.42-1.74-1.24-1.16-1.86-2.56-1.86-4.2s.62-3.04,1.86-4.2c1.23-1.16,2.7-1.74,4.42-1.74s3.21.57,4.42,1.72l1.41-1.29c-1.6-1.51-3.55-2.27-5.83-2.27s-4.22.77-5.83,2.29c-1.6,1.54-2.4,3.37-2.4,5.49s.8,3.96,2.4,5.51c1.63,1.53,3.57,2.29,5.83,2.29.9,0,1.74-.12,2.54-.36l.97-2.5Z"/>
        <rect class="cls-14" x="177.82" y="20.24" width="3.45" height="3.45" transform="translate(37.07 133.4) rotate(-45.01)"/>
      </g>
      <path class="cls-9" d="M233.37,16.15c-1.6-1.51-3.54-2.27-5.83-2.27s-4.23.76-5.83,2.27c-1.36,1.31-2.14,2.84-2.35,4.58h-5.12v1.87h4.94v2.75c-1.26,1.5-2.9,2.25-4.94,2.25-1.72,0-3.19-.58-4.42-1.74-1.24-1.16-1.86-2.56-1.86-4.2s.62-3.04,1.86-4.2c1.23-1.16,2.7-1.74,4.42-1.74.99,0,1.92.21,2.81.63.87.4,1.59.97,2.16,1.69.31-.6.7-1.14,1.14-1.61-.68-.71-1.47-1.29-2.38-1.72-1.17-.55-2.41-.83-3.72-.83-2.27,0-4.22.77-5.84,2.29-1.6,1.54-2.4,3.37-2.4,5.49s.8,3.96,2.4,5.51c1.63,1.53,3.58,2.29,5.84,2.29,1.4,0,2.71-.31,3.92-.93,1.09-.56,2-1.32,2.72-2.26.24.31.52.61.82.91,1.62,1.53,3.56,2.29,5.83,2.29s4.22-.76,5.83-2.29c1.61-1.52,2.42-3.36,2.42-5.51s-.81-3.98-2.42-5.51ZM231.98,25.86c-1.23,1.16-2.7,1.74-4.44,1.74s-3.19-.58-4.42-1.74c-1.24-1.16-1.86-2.56-1.86-4.2s.62-3.04,1.86-4.2c1.23-1.16,2.7-1.74,4.42-1.74s3.21.58,4.44,1.74c1.23,1.16,1.84,2.56,1.84,4.2s-.61,3.04-1.84,4.2ZM225.22,21.96l2.44,2.44,2.44-2.44-2.44-2.44-2.44,2.44Z"/>
    </g>

    <!-- 固定联系方式图标 -->
    <path class="cls-7" d="M24.36,112.68h-2.45s-.08.04-.08.08v.16s.03.08.08.08h2.45s.08-.04.08-.08v-.16s-.04-.08-.08-.08h0ZM23.14,107.24c1.93,0,3.51,1.57,3.51,3.51s-1.57,3.51-3.51,3.51-3.51-1.57-3.51-3.51,1.57-3.51,3.51-3.51h0ZM23.14,106.93c-2.11,0-3.81,1.71-3.81,3.81s1.71,3.81,3.81,3.81,3.81-1.71,3.81-3.81-1.71-3.81-3.81-3.81h0ZM23.14,108.5c.71,0,1.28.53,1.28,1.19,0,.54-.86,1.77-1.27,2.22-.41-.48-1.3-1.7-1.3-2.22,0-.66.58-1.19,1.28-1.19h0ZM23.14,110.63c.52,0,.95-.42.95-.93s-.43-.93-.95-.93-.95.42-.95.93.43.93.95.93h0ZM21.53,109.69c0,.83,1.53,2.66,1.6,2.66.15,0,1.6-1.83,1.6-2.66s-.72-1.51-1.6-1.51-1.6.67-1.6,1.51h0ZM23.14,110.31c-.35,0-.63-.27-.63-.61s.28-.61.63-.61.63.27.63.61-.28.61-.63.61h0ZM23.14,110.31"/>
    <g>
      <path class="cls-7" d="M22.64,126.25c-.41-.6-.64-1.26-.67-1.99h-1.2s-.03,0-.04,0c-.09,0-.16-.06-.16-.15,0-.06,0-.12,0-.17.03-.46.17-.87.43-1.25.4-.57.94-.92,1.62-1.04,1.17-.21,2.33.44,2.76,1.55.03.06.02.12-.03.17-.04.05-.1.06-.16.04-.05-.02-.08-.05-.1-.1-.07-.19-.17-.36-.29-.52-.33-.44-.77-.72-1.31-.83,0,0,0,0-.02,0,.41.6.63,1.26.67,1.99h1.21s.04,0,.06,0c.08.01.14.08.14.16,0,1.05-.67,2-1.68,2.35-1.26.44-2.66-.21-3.14-1.45-.04-.11.01-.21.12-.23.07,0,.13.03.16.11.06.15.14.3.23.44.33.48.78.78,1.35.91,0,0,.02,0,.03,0h0ZM23.06,126.29c.28-.34.49-.73.62-1.15.09-.28.14-.57.15-.87h-1.55c.04.76.3,1.43.78,2.02h0ZM23.07,121.93c-.47.57-.74,1.28-.78,2.02h1.55c-.04-.76-.3-1.43-.78-2.02h0ZM23.49,126.24c.52-.1.94-.36,1.27-.77.29-.35.45-.76.48-1.22h-1.09c-.03.72-.25,1.38-.66,1.98h0ZM22.64,121.96c-1.01.19-1.71,1.09-1.75,1.98h1.08c.04-.72.26-1.38.67-1.98h0ZM22.64,121.96"/>
      <path class="cls-15" d="M26.81,124.11c0,2.07-1.68,3.74-3.74,3.74s-3.74-1.67-3.74-3.74,1.67-3.74,3.74-3.74,3.74,1.67,3.74,3.74Z"/>
    </g>
    <g>
      <path class="cls-7" d="M24.12,86.11s-.07,0-.11,0c-.23-.03-.56-.16-.92-.36-.38-.21-.75-.48-1.04-.75-.29-.27-.57-.62-.79-.99-.21-.35-.35-.66-.38-.88-.02-.17.01-.35.11-.52.08-.15.2-.29.34-.4l.02-.02c.1-.08.2-.17.37-.23.12-.05.27-.06.4,0,.03.01.06.03.07.04.04.02.2.1.36.32.05.06.13.18.18.27.1.17.16.31.16.31l.02.05c.06.15.03.32-.09.44,0,0,0,0-.01.01l-.04.04s-.03.02-.03.03c-.07.04-.09.05-.11.06-.01,0-.02.01-.04.03-.06.04-.12.06-.17.08-.02,0-.05.02-.08.03.08.17.23.35.47.58.22.21.44.35.63.46,0,0,0,0-.01-.02.02-.04.04-.08.06-.11.02-.04.04-.07.05-.1.04-.07.07-.12.08-.14.01-.02.03-.04.04-.06.05-.07.13-.12.21-.15.11-.04.25-.03.35.02l.17.09s.08.05.14.09l.03.02.31.24c.13.11.19.18.2.19l.05.05s.01.02.02.03l.05.08v.02c.05.14.02.31-.03.42-.09.18-.24.33-.29.38-.19.17-.45.37-.79.37h0ZM21.93,82.27s-.05,0-.07.02c-.12.04-.19.1-.28.18l-.02.02c-.11.09-.2.19-.26.3-.06.11-.08.21-.07.3.02.17.15.45.33.75.21.34.47.66.74.92.27.25.61.5.97.7.32.18.61.29.79.32.24.03.46-.13.61-.27.07-.06.16-.17.21-.27.02-.05.04-.12.02-.16l-.03-.04-.02-.03s-.04-.05-.16-.14l-.05-.04-.26-.19c-.06-.04-.11-.07-.14-.09l-.06-.03-.08-.04s-.07,0-.08,0c-.02,0-.03.02-.04.03l-.02.02s0,.01-.01.02c-.01.02-.04.06-.07.12-.01.02-.02.04-.04.07-.03.05-.05.1-.07.14-.05.1-.18.2-.32.2-.06,0-.11-.01-.16-.04-.21-.12-.46-.27-.71-.51-.29-.28-.46-.5-.57-.72-.05-.12-.02-.32.14-.4.06-.03.1-.05.14-.06.05-.02.08-.03.12-.05.03-.02.05-.02.06-.03.02,0,.03-.02.07-.04l.03-.03s.03-.05.02-.08v-.03s-.08-.14-.15-.27c-.05-.08-.12-.18-.16-.24-.12-.17-.23-.22-.24-.22-.01,0-.04-.02-.05-.03-.02,0-.04-.01-.05-.01h0ZM21.93,82.27"/>
      <path class="cls-15" d="M26.81,84.02c0,2.07-1.68,3.74-3.74,3.74s-3.74-1.67-3.74-3.74,1.68-3.74,3.74-3.74,3.74,1.68,3.74,3.74Z"/>
    </g>
    <g>
      <path class="cls-15" d="M26.81,97.38c0,2.07-1.68,3.74-3.74,3.74s-3.74-1.67-3.74-3.74,1.68-3.74,3.74-3.74,3.74,1.68,3.74,3.74Z"/>
      <path class="cls-7" d="M25.27,95.68h-4.41c-.22,0-.4.18-.4.4v2.59c0,.22.18.4.4.4h4.41c.22,0,.4-.18.4-.4v-2.59c0-.22-.18-.4-.4-.4h0ZM25.45,96.08v2.59s-.01.07-.04.1l-1.46-1.36,1.49-1.39s.01.03.01.05h0ZM20.68,98.68v-2.59s0-.03.01-.05l1.49,1.39-1.46,1.36s-.04-.06-.04-.1h0ZM23.07,97.95l-2.2-2.05h4.4l-2.2,2.05ZM22.33,97.56l.73.68.73-.68,1.39,1.29h-4.24l1.39-1.29ZM22.33,97.56"/>
    </g>

    <!-- 【纯净文本图层：完美防重叠布局，精确 1.5 个数字字符宽度】 -->
    <text class="cls-10" transform="translate(19.32 26.05)">{{company}}</text>
    
    <!-- 姓名与职位：使用 1个数字等宽空格(&#8199;) + 1个常规不间断空格(&#160;) -->
    <text transform="translate(19.32 58.4)">
      <tspan class="cls-11">{{name}}</tspan>
      <tspan class="cls-4">&#8199;&#160;{{title}}</tspan>
    </text>

    <!-- 联系方式信息 -->
    <text class="cls-2" transform="translate(31.77 85.53)">{{phone}}</text>
    <text class="cls-2" transform="translate(31.77 98.89)">{{email}}</text>
    <text class="cls-5" transform="translate(32.28 112.09)">{{address}}</text>
    <text class="cls-1" transform="translate(32.28 125.62)">{{website}}</text>
  </g>
</svg>`,
    backSvgString: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1050 600" width="1050" height="600">
  <defs>
    <style>
      .cls-1, .cls-2 { font-family: ArialMT, Arial, sans-serif; font-size: 5.67px; }
      .cls-1, .cls-2, .cls-3, .cls-4, .cls-5 { fill: #595757; }
      .cls-6, .cls-2 { letter-spacing: .02em; }
      .cls-7 { fill: #333; }
      .cls-9 { fill: #b60005; }
      .cls-10 { fill: #262626; font-family: Arial-BoldMT, Arial, sans-serif; font-size: 14.17px; font-weight: 700; letter-spacing: -.08em; }
      .cls-11-en { fill: #4c4948; font-size: 11.34px; font-family: Arial-BoldMT, Arial, sans-serif; font-weight: 700; }
      .cls-4-en { font-size: 8.5px; font-family: ArialMT, Arial, sans-serif; fill: #595757; }
      .cls-12 { fill: #ed6c00; }
      .cls-5-en { font-size: 4.78px; font-family: ArialMT, Arial, sans-serif; fill: #595757; }
      .cls-13 { fill: #e8380d; }
      .cls-14 { fill: #f39800; }
      .cls-15 { fill: none; stroke: #333; stroke-miterlimit: 10; stroke-width: .25px; }
    </style>
  </defs>
  
  <rect width="1050" height="600" fill="#ffffff"/>
  
  <g transform="translate(0, 8.35) scale(4.1157)">
  
    <!-- 底层固定标志 - CANG LISTED NYSE -->
    <g>
      <polygon class="cls-3" points="216.96 127.78 214.34 123.63 214.34 127.78 213.08 127.78 213.08 121.48 214.35 121.48 216.86 125.45 216.86 121.48 218.12 121.48 218.12 127.78 216.96 127.78"/>
      <polygon class="cls-3" points="222.58 125.06 222.58 127.78 221.31 127.78 221.31 125.06 219.02 121.48 220.54 121.48 221.94 123.77 223.33 121.48 224.85 121.48 222.58 125.06"/>
      <path class="cls-3" d="M227.5,127.85c-.95,0-1.71-.33-2.38-.93l.66-1.05c.47.44,1.08.76,1.72.76.52,0,.84-.29.84-.6,0-.45-.49-.55-1.43-.9-1.27-.47-1.64-1.27-1.64-1.84,0-.93.64-1.89,2.04-1.89.86,0,1.59.33,2.11.8l-.66,1.04c-.37-.31-1.05-.62-1.47-.62-.38,0-.73.19-.73.56,0,.6.72.59,1.61.96.98.41,1.42,1,1.42,1.74,0,1.05-.9,1.96-2.09,1.96"/>
      <polygon class="cls-3" points="230.74 127.78 230.74 121.48 234.84 121.48 234.84 122.59 232 122.59 232 124.07 234.44 124.07 234.44 125.19 232 125.19 232 126.67 234.84 126.67 234.84 127.78 230.74 127.78"/>
      <polygon class="cls-3" points="213.08 112.42 213.54 112.42 213.54 116.11 215.86 116.11 215.86 116.54 213.08 116.54 213.08 112.42"/>
      <rect class="cls-3" x="217.03" y="112.42" width=".46" height="4.12"/>
      <path class="cls-3" d="M218.71,115.94l.29-.34c.43.39.84.58,1.41.58s.92-.29.92-.7h0c0-.39-.21-.61-1.07-.79-.95-.21-1.38-.51-1.38-1.19h0c0-.66.57-1.13,1.35-1.13.6,0,1.03.17,1.45.51l-.27.36c-.38-.31-.76-.45-1.19-.45-.53,0-.88.29-.88.67h0c0,.4.21.62,1.12.81.92.2,1.34.54,1.34,1.17h0c0,.71-.59,1.17-1.4,1.17-.65,0-1.19-.22-1.68-.66"/>
      <polygon class="cls-3" points="224.02 112.85 222.64 112.85 222.64 112.42 225.87 112.42 225.87 112.85 224.49 112.85 224.49 116.54 224.02 116.54 224.02 112.85"/>
      <polygon class="cls-3" points="227.02 112.42 229.99 112.42 229.99 112.84 227.48 112.84 227.48 114.25 229.72 114.25 229.72 114.67 227.48 114.67 227.48 116.11 230.02 116.11 230.02 116.54 227.02 116.54 227.02 112.42"/>
      <path class="cls-3" d="M231.22,112.42h1.43c1.29,0,2.19.89,2.19,2.04h0c0,1.17-.89,2.07-2.19,2.07h-1.43v-4.12ZM232.65,116.11c1.04,0,1.71-.7,1.71-1.62h0c0-.92-.66-1.64-1.71-1.64h-.96v3.26h.96Z"/>
      <rect class="cls-3" x="213.08" y="109.83" width="21.76" height=".23"/>
      <rect class="cls-3" x="213.08" y="118.98" width="21.76" height=".23"/>
      <path class="cls-3" d="M212.03,104.07v-.02c0-1.81,1.29-3.29,3.15-3.29,1.14,0,1.82.4,2.38.98l-.85,1.03c-.47-.45-.94-.72-1.54-.72-1.02,0-1.76.89-1.76,1.98v.02c0,1.09.72,2,1.76,2,.69,0,1.11-.29,1.59-.74l.85.9c-.62.7-1.31,1.14-2.48,1.14-1.78,0-3.1-1.45-3.1-3.27"/>
      <path class="cls-3" d="M220.06,100.82h1.23l2.59,6.41h-1.39l-.55-1.43h-2.56l-.55,1.43h-1.36l2.59-6.41ZM221.46,104.56l-.8-2.06-.8,2.06h1.61Z"/>
      <polygon class="cls-3" points="224.11 100.87 225.34 100.87 228.17 104.78 228.17 100.87 229.48 100.87 229.48 107.23 228.35 107.23 225.43 103.18 225.43 107.23 224.11 107.23 224.11 100.87"/>
      <path class="cls-3" d="M230.03,104.07v-.02c0-1.81,1.34-3.29,3.17-3.29,1.09,0,1.75.31,2.38.87l-.83,1.06c-.47-.41-.88-.65-1.58-.65-.97,0-1.73.9-1.73,1.98v.02c0,1.16.76,2.02,1.83,2.02.48,0,.92-.13,1.25-.38v-.91h-1.34v-1.21h2.62v2.77c-.62.55-1.48,1.01-2.58,1.01-1.88,0-3.18-1.39-3.18-3.27"/>
    </g>
    <!-- 底层固定标志 - CANGO Logo -->
    <g>
      <path class="cls-12" d="M193.94,22.17l-3.19-8.2h-2.2l-6.03,15.49h2.2l1.35-3.47h7.12l.76,1.92v-5.73ZM186.82,24.04l2.81-7.24,2.82,7.24h-5.63Z"/>
      <g>
        <path class="cls-13" d="M207.97,15.72v-1.74h-2.08v4.89c.43-1.32,1.17-2.41,2.08-3.14Z"/>
        <path class="cls-13" d="M205.89,24.44v1.55l-9.1-12.02h-2.22v15.49h2.22v-11.99l9.1,11.99h2.08v-1.88c-.91-.73-1.65-1.83-2.08-3.14Z"/>
      </g>
      <g>
        <path class="cls-14" d="M182.96,26.6c-1.03.66-2.2,1-3.51,1-1.72,0-3.19-.58-4.42-1.74-1.24-1.16-1.86-2.56-1.86-4.2s.62-3.04,1.86-4.2c1.23-1.16,2.7-1.74,4.42-1.74s3.21.57,4.42,1.72l1.41-1.29c-1.6-1.51-3.55-2.27-5.83-2.27s-4.22.77-5.83,2.29c-1.6,1.54-2.4,3.37-2.4,5.49s.8,3.96,2.4,5.51c1.63,1.53,3.57,2.29,5.83,2.29.9,0,1.74-.12,2.54-.36l.97-2.5Z"/>
        <rect class="cls-14" x="177.82" y="20.24" width="3.45" height="3.45" transform="translate(37.07 133.4) rotate(-45.01)"/>
      </g>
      <path class="cls-9" d="M233.37,16.15c-1.6-1.51-3.54-2.27-5.83-2.27s-4.23.76-5.83,2.27c-1.36,1.31-2.14,2.84-2.35,4.58h-5.12v1.87h4.94v2.75c-1.26,1.5-2.9,2.25-4.94,2.25-1.72,0-3.19-.58-4.42-1.74-1.24-1.16-1.86-2.56-1.86-4.2s.62-3.04,1.86-4.2c1.23-1.16,2.7-1.74,4.42-1.74.99,0,1.92.21,2.81.63.87.4,1.59.97,2.16,1.69.31-.6.7-1.14,1.14-1.61-.68-.71-1.47-1.29-2.38-1.72-1.17-.55-2.41-.83-3.72-.83-2.27,0-4.22.77-5.84,2.29-1.6,1.54-2.4,3.37-2.4,5.49s.8,3.96,2.4,5.51c1.63,1.53,3.58,2.29,5.84,2.29,1.4,0,2.71-.31,3.92-.93,1.09-.56,2-1.32,2.72-2.26.24.31.52.61.82.91,1.62,1.53,3.56,2.29,5.83,2.29s4.22-.76,5.83-2.29c1.61-1.52,2.42-3.36,2.42-5.51s-.81-3.98-2.42-5.51ZM231.98,25.86c-1.23,1.16-2.7,1.74-4.44,1.74s-3.19-.58-4.42-1.74c-1.24-1.16-1.86-2.56-1.86-4.2s.62-3.04,1.86-4.2c1.23-1.16,2.7-1.74,4.42-1.74s3.21.58,4.44,1.74c1.23,1.16,1.84,2.56,1.84,4.2s-.61,3.04-1.84,4.2ZM225.22,21.96l2.44,2.44,2.44-2.44-2.44-2.44-2.44,2.44Z"/>
    </g>
    <!-- 固定联系方式图标 -->
    <path class="cls-7" d="M24.36,112.68h-2.45s-.08.04-.08.08v.16s.03.08.08.08h2.45s.08-.04.08-.08v-.16s-.04-.08-.08-.08h0ZM23.14,107.24c1.93,0,3.51,1.57,3.51,3.51s-1.57,3.51-3.51,3.51-3.51-1.57-3.51-3.51,1.57-3.51,3.51-3.51h0ZM23.14,106.93c-2.11,0-3.81,1.71-3.81,3.81s1.71,3.81,3.81,3.81,3.81-1.71,3.81-3.81-1.71-3.81-3.81-3.81h0ZM23.14,108.5c.71,0,1.28.53,1.28,1.19,0,.54-.86,1.77-1.27,2.22-.41-.48-1.3-1.7-1.3-2.22,0-.66.58-1.19,1.28-1.19h0ZM23.14,110.63c.52,0,.95-.42.95-.93s-.43-.93-.95-.93-.95.42-.95.93.43.93.95.93h0ZM21.53,109.69c0,.83,1.53,2.66,1.6,2.66.15,0,1.6-1.83,1.6-2.66s-.72-1.51-1.6-1.51-1.6.67-1.6,1.51h0ZM23.14,110.31c-.35,0-.63-.27-.63-.61s.28-.61.63-.61.63.27.63.61-.28.61-.63.61h0ZM23.14,110.31"/>
    <g>
      <path class="cls-7" d="M22.64,126.25c-.41-.6-.64-1.26-.67-1.99h-1.2s-.03,0-.04,0c-.09,0-.16-.06-.16-.15,0-.06,0-.12,0-.17.03-.46.17-.87.43-1.25.4-.57.94-.92,1.62-1.04,1.17-.21,2.33.44,2.76,1.55.03.06.02.12-.03.17-.04.05-.1.06-.16.04-.05-.02-.08-.05-.1-.1-.07-.19-.17-.36-.29-.52-.33-.44-.77-.72-1.31-.83,0,0,0,0-.02,0,.41.6.63,1.26.67,1.99h1.21s.04,0,.06,0c.08.01.14.08.14.16,0,1.05-.67,2-1.68,2.35-1.26.44-2.66-.21-3.14-1.45-.04-.11.01-.21.12-.23.07,0,.13.03.16.11.06.15.14.3.23.44.33.48.78.78,1.35.91,0,0,.02,0,.03,0h0ZM23.06,126.29c.28-.34.49-.73.62-1.15.09-.28.14-.57.15-.87h-1.55c.04.76.3,1.43.78,2.02h0ZM23.07,121.93c-.47.57-.74,1.28-.78,2.02h1.55c-.04-.76-.3-1.43-.78-2.02h0ZM23.49,126.24c.52-.1.94-.36,1.27-.77.29-.35.45-.76.48-1.22h-1.09c-.03.72-.25,1.38-.66,1.98h0ZM22.64,121.96c-1.01.19-1.71,1.09-1.75,1.98h1.08c.04-.72.26-1.38.67-1.98h0ZM22.64,121.96"/>
      <path class="cls-15" d="M26.81,124.11c0,2.07-1.68,3.74-3.74,3.74s-3.74-1.67-3.74-3.74,1.67-3.74,3.74-3.74,3.74,1.67,3.74,3.74Z"/>
    </g>
    <g>
      <path class="cls-7" d="M24.12,86.11s-.07,0-.11,0c-.23-.03-.56-.16-.92-.36-.38-.21-.75-.48-1.04-.75-.29-.27-.57-.62-.79-.99-.21-.35-.35-.66-.38-.88-.02-.17.01-.35.11-.52.08-.15.2-.29.34-.4l.02-.02c.1-.08.2-.17.37-.23.12-.05.27-.06.4,0,.03.01.06.03.07.04.04.02.2.1.36.32.05.06.13.18.18.27.1.17.16.31.16.31l.02.05c.06.15.03.32-.09.44,0,0,0,0-.01.01l-.04.04s-.03.02-.03.03c-.07.04-.09.05-.11.06-.01,0-.02.01-.04.03-.06.04-.12.06-.17.08-.02,0-.05.02-.08.03.08.17.23.35.47.58.22.21.44.35.63.46,0,0,0,0-.01-.02.02-.04.04-.08.06-.11.02-.04.04-.07.05-.1.04-.07.07-.12.08-.14.01-.02.03-.04.04-.06.05-.07.13-.12.21-.15.11-.04.25-.03.35.02l.17.09s.08.05.14.09l.03.02.31.24c.13.11.19.18.2.19l.05.05s.01.02.02.03l.05.08v.02c.05.14.02.31-.03.42-.09.18-.24.33-.29.38-.19.17-.45.37-.79.37h0ZM21.93,82.27s-.05,0-.07.02c-.12.04-.19.1-.28.18l-.02.02c-.11.09-.2.19-.26.3-.06.11-.08.21-.07.3.02.17.15.45.33.75.21.34.47.66.74.92.27.25.61.5.97.7.32.18.61.29.79.32.24.03.46-.13.61-.27.07-.06.16-.17.21-.27.02-.05.04-.12.02-.16l-.03-.04-.02-.03s-.04-.05-.16-.14l-.05-.04-.26-.19c-.06-.04-.11-.07-.14-.09l-.06-.03-.08-.04s-.07,0-.08,0c-.02,0-.03.02-.04.03l-.02.02s0,.01-.01.02c-.01.02-.04.06-.07.12-.01.02-.02.04-.04.07-.03.05-.05.1-.07.14-.05.1-.18.2-.32.2-.06,0-.11-.01-.16-.04-.21-.12-.46-.27-.71-.51-.29-.28-.46-.5-.57-.72-.05-.12-.02-.32.14-.4.06-.03.1-.05.14-.06.05-.02.08-.03.12-.05.03-.02.05-.02.06-.03.02,0,.03-.02.07-.04l.03-.03s.03-.05.02-.08v-.03s-.08-.14-.15-.27c-.05-.08-.12-.18-.16-.24-.12-.17-.23-.22-.24-.22-.01,0-.04-.02-.05-.03-.02,0-.04-.01-.05-.01h0ZM21.93,82.27"/>
      <path class="cls-15" d="M26.81,84.02c0,2.07-1.68,3.74-3.74,3.74s-3.74-1.67-3.74-3.74,1.68-3.74,3.74-3.74,3.74,1.68,3.74,3.74Z"/>
    </g>
    <g>
      <path class="cls-15" d="M26.81,97.38c0,2.07-1.68,3.74-3.74,3.74s-3.74-1.67-3.74-3.74,1.68-3.74,3.74-3.74,3.74,1.68,3.74,3.74Z"/>
      <path class="cls-7" d="M25.27,95.68h-4.41c-.22,0-.4.18-.4.4v2.59c0,.22.18.4.4.4h4.41c.22,0,.4-.18.4-.4v-2.59c0-.22-.18-.4-.4-.4h0ZM25.45,96.08v2.59s-.01.07-.04.1l-1.46-1.36,1.49-1.39s.01.03.01.05h0ZM20.68,98.68v-2.59s0-.03.01-.05l1.49,1.39-1.46,1.36s-.04-.06-.04-.1h0ZM23.07,97.95l-2.2-2.05h4.4l-2.2,2.05ZM22.33,97.56l.73.68.73-.68,1.39,1.29h-4.24l1.39-1.29ZM22.33,97.56"/>
    </g>
    <!-- 【纯净文本图层：完美防重叠布局，精确 1.5 个数字字符宽度】 -->
    <text class="cls-10" transform="translate(19.32 26.05)">{{company}}</text>
    <text transform="translate(19.32 58.4)"><tspan class="cls-11-en">{{englishName}}</tspan><tspan class="cls-4-en">&#8199;&#160;{{englishTitle}}</tspan></text>
    <text class="cls-2" transform="translate(31.77 85.53)">{{phone}}</text>
    <text class="cls-2" transform="translate(31.77 98.89)">{{email}}</text>
    <text class="cls-5-en" transform="translate(32.28 112.09)">{{englishAddress}}</text>
    <text class="cls-1" transform="translate(32.28 125.62)">{{website}}</text>
  </g>
</svg>`
  }
];

const ADDRESS_OPTIONS = [
  { zh: '上海市浦东新区海阳西路556号前滩东方广场二期8楼', en: '8F, 556 West Haiyang Road, Pudong, Shanghai, China' },
  { zh: '香港湾仔港湾道25号海港中心2605室', en: 'Room 2605, Harbour Centre, 25 Harbour Road, Wan Chai, Hong Kong' },
  { zh: '美国德克萨斯州达拉斯市麦金尼大道3131号', en: '3131 McKinney Avenue，Dallas, Texas, USA' }
];

function escapeHtml(unsafe: string) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function resolveSvgPlaceholders(svg: string, data: CardData) {
  if (!svg) return '';
  return svg
    .replace(/\{\{company\}\}/g, escapeHtml(data.company || 'Cango Inc.'))
    .replace(/\{\{name\}\}/g, escapeHtml(data.name))
    .replace(/\{\{englishName\}\}/g, escapeHtml(data.englishName))
    .replace(/\{\{title\}\}/g, escapeHtml(data.title))
    .replace(/\{\{englishTitle\}\}/g, escapeHtml(data.englishTitle))
    .replace(/\{\{phone\}\}/g, escapeHtml(data.phone))
    .replace(/\{\{email\}\}/g, escapeHtml(data.email))
    .replace(/\{\{address\}\}/g, escapeHtml(data.address))
    .replace(/\{\{englishAddress\}\}/g, escapeHtml(data.englishAddress))
    .replace(/\{\{website\}\}/g, escapeHtml(data.website || 'ir.cangoonline.com'));
}

function CopyableTag({ label, tag }: { key?: string, label: string, tag: string }) {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(tag);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
        className="bg-slate-100/50 p-3 rounded-lg border border-slate-200 flex justify-between items-center group cursor-pointer hover:bg-slate-100 transition-colors" 
        onClick={handleCopy}
    >
        <div>
            <div className="text-xs text-slate-500 mb-1">{label}</div>
            <code className="text-sm font-bold text-slate-800 bg-white px-2 py-0.5 rounded border border-slate-200">{tag}</code>
        </div>
        <button 
           className={`p-1.5 rounded-md transition-colors ${copied ? 'bg-green-100 text-green-600' : 'bg-white text-slate-400 opacity-0 group-hover:opacity-100 border border-slate-200 hover:text-slate-600 hover:bg-slate-50'}`}
           title="点击复制"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
        </button>
    </div>
  );
}

export default function App() {
  const [data, setData] = useState<CardData>({
    company: 'Cango Inc.',
    name: '',
    englishName: '',
    title: '',
    englishTitle: '',
    phone: '',
    email: '',
    address: '上海市浦东新区海阳西路556号前滩东方广场二期8楼',
    englishAddress: '8F, 556 West Haiyang Road, Pudong, Shanghai, China',
    website: 'ir.cangoonline.com',
  });

  const [templates, setTemplates] = useState<Template[]>(() => {
    try {
      const saved = localStorage.getItem('cango_custom_templates');
      if (saved && saved !== 'undefined') {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // 只保留不叫“标准模板”的自定义模板，因为标准模板已经内置在代码(DEFAULT_TEMPLATES)中
          const finalParsed = parsed.filter((t: any) => !t.name.includes('标准模板') && t.id.startsWith('custom_'));
          return [...DEFAULT_TEMPLATES, ...finalParsed];
        }
      }
    } catch (e) {
      console.error('Failed to load custom templates', e);
    }
    return DEFAULT_TEMPLATES;
  });

  useEffect(() => {
    const customTemplates = templates.filter(t => t.id.startsWith('custom_'));
    if (customTemplates.length > 0) {
      localStorage.setItem('cango_custom_templates', JSON.stringify(customTemplates));
    } else {
      localStorage.removeItem('cango_custom_templates');
    }
  }, [templates]);

  const [selectedTemplate, setSelectedTemplate] = useState(() => {
    return templates.length > 0 ? templates[0].id : '';
  });
  
  const [showGuide, setShowGuide] = useState(false);
  const [guideCopied, setGuideCopied] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const handleCopyGuide = () => {
    const text = `模板制作规范说明

【图片格式】SVG (支持无损矢量放大印刷)
【设计分辨率】1050 × 600 (对应 3.5:2 比例视窗)

【全新自动排版（占位符替换机制）】
系统现在采用全新的文本占位符机制！为了保证名片的排版效果完美符合您的设计，请直接在您的矢量设计软件（如 Illustrator、Figma）中，在需要出现信息的对应位置创建一个文本框，填入以下占位符。系统会自动检测并替换为对应的实际内容！并且完全保留您设定的文本样式（字体、字号、颜色、对齐方式）。

占位符列表：
- 姓名: {{name}}
- 英文名: {{englishName}}
- 职位: {{title}}
- 英文职位: {{englishTitle}}
- 公司: {{company}}
- 电话: {{phone}}
- 邮箱: {{email}}
- 办公地址: {{address}}
- 英文办公地址: {{englishAddress}}
- 网址: {{website}}

【防重叠绝招（非常重要）】
如果同一行有多个占位符（例如：英文名和英文职位），为了防止名字过长导致重叠，**请务必将它们排版在同一个文本元素内**！
例如，直接在一个文本框输入：「{{englishName}}       {{englishTitle}}」（中间使用空格隔开以预留间隔）。这样无论名字多长，后面的职位都会自动被推移，绝对不会发生重叠。切忌将它们拆分成两个独立的、固定位置的文本图层。

【导出须知（非常重要）】
1. 正反两面：支持上传包含文字、图案和标志在内的两份完整 SVG（正面和背面）。系统不再限制必须为空白底图！
2. 绝对不可转曲文本：在导出 SVG 时，带有占位符的文本图层绝对“不能”进行轮廓化（Create Outlines）或转曲操作，必须保持为可编辑文本。
3. 保证文本图层完整性：在软件内编辑占位符时，不要在占位符（比如 {{name}} 内部）单独给某几个字母加粗或改变颜色，这会导致系统识别不到完整的占位符文本。

提示：点击“上传定制模板”可以上传正面与背面的 SVG 进行拼合。系统将自动添加至上方模板列表供您随时切换。`;
    navigator.clipboard.writeText(text);
    setGuideCopied(true);
    setTimeout(() => setGuideCopied(false), 2000);
  };

  
  const [uploadFrontFile, setUploadFrontFile] = useState<File | null>(null);
  const [uploadBackFile, setUploadBackFile] = useState<File | null>(null);
  const [uploadTemplateName, setUploadTemplateName] = useState('');

  const [isFinalized, setIsFinalized] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [notification, setNotification] = useState<{
    show: boolean;
    type: 'success' | 'error' | 'warning';
    title: string;
    message: React.ReactNode;
  }>({ show: false, type: 'success', title: '', message: '' });

  const showNotification = (type: 'success' | 'error' | 'warning', title: string, message: React.ReactNode, duration = 3000) => {
    setNotification({ show: true, type, title, message });
    setTimeout(() => {
      setNotification(prev => ({ ...prev, show: false }));
    }, duration);
  };
  
  useEffect(() => {
    setIsFinalized(false);
  }, [data]);
  
  const frontSvgRef = useRef<SVGSVGElement>(null);
  const backSvgRef = useRef<SVGSVGElement>(null);
  const frontContainerRef = useRef<HTMLDivElement>(null);
  const backContainerRef = useRef<HTMLDivElement>(null);

  // Helper to extract the actual SVG element from ref or container
  const getSvgElement = (ref: React.RefObject<SVGSVGElement | null>, container: React.RefObject<HTMLDivElement | null>) => {
      if (container.current) {
          return container.current.querySelector('svg');
      }
      return ref.current;
  };

  const handleConfirmUpload = async () => {
    if (!uploadFrontFile || !uploadBackFile) {
        showNotification('error', '上传失败', '请同时上传正面和背面 SVG 文件');
        return;
    }
    
    // Validate file types
    if (uploadFrontFile.type !== 'image/svg+xml' || uploadBackFile.type !== 'image/svg+xml') {
        showNotification('error', '格式错误', '上传的文件必须是 SVG 格式');
        return;
    }

    const readSVG = (file: File) => new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.onerror = reject;
      reader.readAsText(file);
    });

    try {
      const front = await readSVG(uploadFrontFile);
      const back = await readSVG(uploadBackFile);

      const newEntry: Template = {
          id: `custom_${Date.now()}`,
          name: uploadTemplateName || uploadFrontFile.name.replace('.svg', '').substring(0, 8),
          frontSvgString: front,
          backSvgString: back,
      };

      setTemplates(prev => [...prev, newEntry]);
      setSelectedTemplate(newEntry.id);
      
      setShowUploadModal(false);
      setUploadFrontFile(null);
      setUploadBackFile(null);
      setUploadTemplateName('');
    } catch(err) {
      console.error(err);
      showNotification('error', '上传失败', '处理 SVG 文件时发生错误');
    }
  };

  const handleDownload = async () => {
    if (!isFinalized) {
      showNotification('warning', '未确认定稿', '请先确认定稿后再下载 SVG。');
      return;
    }
    
    try {
      const frontEl = getSvgElement(frontSvgRef, frontContainerRef);
      const backEl = getSvgElement(backSvgRef, backContainerRef);
      
      if (!frontEl || !backEl) {
        showNotification('error', '下载失败', `缺失 ${!frontEl ? '正面' : ''} ${!backEl ? '背面' : ''} SVG内容。\n请确保您上传的模板中包含了有效格式的SVG。`);
        return;
      }
      
      const serializer = new XMLSerializer();
      
      const getSvgSource = (svgElement: SVGSVGElement) => {
        let source = serializer.serializeToString(svgElement);
        source = source.replace(/&nbsp;/ig, '&#160;');
        if(!source.match(/^<\?xml[^>]+>/)){
            source = '<?xml version="1.0" standalone="no"?>\r\n' + source;
        }
        return source;
      };

      const frontSource = getSvgSource(frontEl as SVGSVGElement);
      const backSource = getSvgSource(backEl as SVGSVGElement);

      const zip = new JSZip();
      zip.file(`BusinessCard_${data.name || 'Untitled'}_Front.svg`, frontSource);
      zip.file(`BusinessCard_${data.name || 'Untitled'}_Back.svg`, backSource);

      const content = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(content);
      
      const link = document.createElement("a");
      link.href = url;
      link.download = `BusinessCard_${data.name || 'Untitled'}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Download error:', err);
      showNotification('error', '下载出错', String(err));
    }
  };

  const handleFinalize = async () => {
    const requiredFields = [
      { key: 'company', label: '公司名称' },
      { key: 'name', label: '姓名' },
      { key: 'englishName', label: '英文名' },
      { key: 'title', label: '职位' },
      { key: 'englishTitle', label: '英文职位' },
      { key: 'phone', label: '电话' },
      { key: 'email', label: '邮箱' },
      { key: 'address', label: '办公地址' },
      { key: 'englishAddress', label: '英文办公地址' },
      { key: 'website', label: '官方网址' },
    ];
    
    const emptyFields = requiredFields.filter(f => !(data as any)[f.key]?.trim());
    if (emptyFields.length > 0) {
      showNotification('warning', '信息不完整', `请补充以下未填写的信息：\n${emptyFields.map(f => `- ${f.label}`).join('\n')}`, 4000);
      return;
    }
    
    setIsSending(true);
    try {
      // Get SVG contents
      const frontEl = getSvgElement(frontSvgRef, frontContainerRef);
      const backEl = getSvgElement(backSvgRef, backContainerRef);
      const serializer = new XMLSerializer();
      
      let frontContent = frontEl ? serializer.serializeToString(frontEl) : '';
      let backContent = backEl ? serializer.serializeToString(backEl) : '';
      
      frontContent = frontContent.replace(/&nbsp;/ig, '&#160;');
      backContent = backContent.replace(/&nbsp;/ig, '&#160;');
      
      const frontBase64 = btoa(unescape(encodeURIComponent(frontContent)));
      const backBase64 = btoa(unescape(encodeURIComponent(backContent)));

      const emails = ["guochunxiu@ecohash.com", "gaoyayun@ecohash.com"];
      
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          to_emails: emails,
          front_attachment: `data:image/svg+xml;base64,${frontBase64}`,
          back_attachment: `data:image/svg+xml;base64,${backBase64}`,
        }),
      });

      if (!response.ok) {
        let errMsg = 'Failed to send email';
        try {
          const errJson = await response.json();
          errMsg = errJson.error || errMsg;
        } catch(e) {}
        throw new Error(errMsg);
      }
      
      setIsFinalized(true);
      showNotification('success', '定稿成功', '已发起制作申请，预计一周内完成，后续请留意Slack领用通知，谢谢！', 5000);
      
      // Optionally reset form after confirming finalization if required
      // resetData(); // I won't reset immediately so they see the success state, but the page doesn't store data across reloads
    } catch (error: any) {
      console.error("Email sending failed:", error);
      showNotification('error', '发送通知邮件失败', error?.text || error?.message || '未知错误，请检查EmailJS配置');
    } finally {
      setIsSending(false);
    }
  };

  const resetData = () => {
    setData({
      company: 'Cango Inc.',
      name: '',
      englishName: '',
      title: '',
      englishTitle: '',
      phone: '',
      email: '',
      address: '上海市浦东新区海阳西路556号前滩东方广场二期8楼',
      englishAddress: '8F, 556 West Haiyang Road, Pudong, Shanghai, China',
      website: 'ir.cangoonline.com',
    });
  };

  const handleDeleteTemplate = (id: string) => {
    setTemplates(prev => {
      const newTemplates = prev.filter(t => t.id !== id);
      if (selectedTemplate === id) {
        setSelectedTemplate(newTemplates.length > 0 ? newTemplates[0].id : '');
      }
      return newTemplates;
    });
  };

  const currentTemplate = templates.find(t => t.id === selectedTemplate) || templates[0] || { id: 'empty', name: '无模板' };
  const isModern = currentTemplate.id === 'modern';
  const padding = 120; // 40px * 3 for scale

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-slate-800">
      {/* Top Header / Template Selector */}
      <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-10 w-full overflow-x-auto">
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white">
            <Layout size={20} />
          </div>
          <h1 className="text-xl font-bold tracking-tight">Cango名片自助生成系统</h1>
        </div>

        <div className="flex items-center gap-4 shrink-0 pl-8">
          {["guochunxiu@ecohash.com", "gaoyayun@ecohash.com"].includes(data.email?.trim().toLowerCase()) && (
            <>
              <button 
                onClick={() => setShowGuide(true)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all"
                title="查看模板制作说明"
              >
                <Info size={20} />
              </button>
              <div className="h-6 w-px bg-slate-200 mx-1" />
            </>
          )}

          <span className="text-sm font-medium text-slate-500 mr-2">选择模板:</span>
          {templates.length === 0 ? (
            <span className="text-sm font-medium text-slate-400 italic mr-2">
              {["guochunxiu@ecohash.com", "gaoyayun@ecohash.com"].includes(data.email?.trim().toLowerCase()) 
                ? '暂无定制模板，请点击"上传定制模板"开始创建' 
                : '暂无定制模板'}
            </span>
          ) : (
            templates.map((t) => (
              <div key={t.id} className={`flex items-center rounded-full transition-all border ${
                  selectedTemplate === t.id 
                    ? 'bg-slate-900 border-slate-900 shadow-md' 
                    : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
                }`}>
                <button
                  onClick={() => setSelectedTemplate(t.id)}
                  className={`pl-4 pr-2 py-2 rounded-l-full text-sm font-medium transition-all ${
                    selectedTemplate === t.id 
                      ? 'text-white' 
                      : 'text-slate-600'
                  }`}
                >
                  {t.name}
                </button>
                <button
                  onClick={() => handleDeleteTemplate(t.id)}
                  className={`pr-3 pl-1 py-2 rounded-r-full text-xs font-medium transition-all outline-none flex items-center ${
                    selectedTemplate === t.id 
                      ? 'text-slate-300 hover:text-white' 
                      : 'text-slate-400 hover:text-red-500'
                  }`}
                  title="删除模板"
                >
                  <X size={14} />
                </button>
              </div>
            ))
          )}
          
          {["guochunxiu@ecohash.com", "gaoyayun@ecohash.com"].includes(data.email?.trim().toLowerCase()) && (
            <button 
              onClick={() => setShowUploadModal(true)}
              className="cursor-pointer px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 bg-orange-50 text-orange-600 hover:bg-orange-100"
            >
              <Upload size={14} />
              上传定制模板
            </button>
          )}
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        {/* Sidebar Inputs */}
        <aside className="w-[400px] bg-white border-r border-slate-200 flex flex-col shrink-0">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50">
            <div className="flex items-center gap-2 text-slate-500 mb-1">
              <Settings2 size={16} />
              <span className="text-xs font-bold uppercase tracking-wider">信息录入</span>
            </div>
            <p className="text-sm text-slate-500">填写您的职业信息，实时预览名片效果</p>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 grid grid-cols-2 gap-x-4 gap-y-4 content-start">
            {[
              { label: '姓名', key: 'name', icon: null },
              { label: '英文名', key: 'englishName', icon: null },
              { label: '职位', key: 'title', icon: null },
              { label: '英文职位', key: 'englishTitle', icon: null },
              { label: '电话', key: 'phone', icon: <Phone size={14} /> },
              { label: '邮箱', key: 'email', icon: <Mail size={14} /> },
              { label: '公司名称', key: 'company', icon: <Plus size={14} /> },
              { label: '官方网址', key: 'website', icon: <Globe size={14} /> },
              { label: '办公地址', key: 'address', icon: <MapPin size={14} />, span: 2 },
              { label: '英文办公地址', key: 'englishAddress', icon: <MapPin size={14} />, span: 2 },
            ].map((field) => (
              <div key={field.key} className={`space-y-1.5 ${field.span === 2 ? 'col-span-2' : 'col-span-1'}`}>
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  {field.label}
                </label>
                {field.key === 'address' || field.key === 'englishAddress' ? (
                  <select
                    value={(data as any)[field.key]}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (field.key === 'address') {
                        const opt = ADDRESS_OPTIONS.find(o => o.zh === val);
                        if (opt) {
                          setData({ ...data, address: opt.zh, englishAddress: opt.en });
                        } else {
                          setData({ ...data, address: val });
                        }
                      } else {
                        const opt = ADDRESS_OPTIONS.find(o => o.en === val);
                        if (opt) {
                          setData({ ...data, englishAddress: opt.en, address: opt.zh });
                        } else {
                          setData({ ...data, englishAddress: val });
                        }
                      }
                    }}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all outline-none text-slate-700 bg-white"
                  >
                    <option value="" disabled>请选择{field.label}</option>
                    {field.key === 'address' ? ADDRESS_OPTIONS.map(opt => (
                      <option key={opt.zh} value={opt.zh}>{opt.zh}</option>
                    )) : ADDRESS_OPTIONS.map(opt => (
                      <option key={opt.en} value={opt.en}>{opt.en}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    value={(data as any)[field.key]}
                    onChange={(e) => setData({ ...data, [field.key]: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all outline-none text-slate-700 placeholder:text-slate-400"
                    placeholder={
                      field.key === 'website' ? '默认: ir.cangoonline.com' :
                      field.key === 'company' ? '默认: Cango Inc.' :
                      `输入${field.label}`
                    }
                  />
                )}
              </div>
            ))}
          </div>

          <div className="p-6 border-t border-slate-100 grid grid-cols-2 gap-3 shrink-0">
            <button 
              onClick={resetData}
              className="px-4 py-3 rounded-xl border border-slate-200 text-slate-600 font-semibold text-sm flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors"
            >
              <RotateCcw size={16} />
              重新输入
            </button>
            <button 
               onClick={handleFinalize}
              disabled={isSending || isFinalized}
              className={`px-4 py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-colors disabled:opacity-50 ${isFinalized ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-slate-900 text-white hover:bg-slate-800'}`}
            >
              {isSending ? '定稿中...' : isFinalized ? '已定稿' : '确认定稿'}
              <Send size={16} />
            </button>
          </div>
        </aside>

        {/* Preview Area (Shows both front and back) */}
        <section className="flex-1 bg-slate-100 flex flex-col items-center justify-start p-12 relative overflow-y-auto">
          {/* Decorative backgrounds */}
          <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
            <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-400/20 blur-[120px] rounded-full" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[30%] bg-orange-400/20 blur-[100px] rounded-full" />
          </div>

          <div className="flex flex-col gap-12 w-full items-center pb-12">
            {/* FRONT CARD */}
            <div className="relative group w-full max-w-[600px]">
              <div className="absolute -inset-4 bg-gradient-to-r from-slate-200 to-slate-300 rounded-[24px] blur opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200 pointer-events-none"></div>
              <div className="absolute -left-12 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-bold tracking-widest uppercase rotate-180" style={{ writingMode: 'vertical-rl' }}>正面 (Front)</div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative bg-white shadow-2xl overflow-hidden rounded-[8px]"
                style={{ width: '100%', aspectRatio: '3.5/2' }}
              >
                {/* Native SVG Renderer (FRONT) */}
                {currentTemplate.frontSvgString ? (
                    <div 
                        ref={frontContainerRef}
                        dangerouslySetInnerHTML={{ __html: resolveSvgPlaceholders(currentTemplate.frontSvgString, data) }}
                        style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}
                        className="[&>svg]:w-full [&>svg]:h-full"
                    />
                ) : (
                  <svg 
                    ref={frontSvgRef}
                    xmlns="http://www.w3.org/2000/svg"
                    width="1050" 
                    height="600" 
                    viewBox="0 0 1050 600"
                    style={{ width: '100%', height: '100%', display: 'block' }}
                  >
                    <defs>
                      <style>
                        {`
                          .cango-text { font-family: 'Inter', Helvetica, Arial, sans-serif; font-weight: bold; font-size: 72px; fill: ${COLORS.text}; }
                          .cango-nyse { font-family: 'Inter', Helvetica, Arial, sans-serif; font-weight: bold; font-size: 42px; fill: ${COLORS.nyse}; }
                          .name-text { font-family: 'Inter', Helvetica, Arial, sans-serif; font-weight: bold; font-size: 78px; fill: ${COLORS.text}; }
                          .title-text { font-family: 'Inter', Helvetica, Arial, sans-serif; font-weight: 300; font-size: 60px; fill: ${COLORS.text}; }
                          .contact-text { font-family: 'Inter', Helvetica, Arial, sans-serif; font-size: 42px; fill: ${COLORS.text}; }
                          .icon { font-size: 42px; fill: ${COLORS.text}; }
                        `}
                      </style>
                    </defs>

                    {/* Base Background */}
                    <rect width="1050" height="600" fill={isModern ? "#F8FAFC" : "#ffffff"} />

                    {/* Left Top Logo Placeholder for fallback since we removed them */}
                    <circle cx={1050 - padding - 240} cy={padding + 60} r={45} fill={COLORS.orange} />
                    <text x={1050 - padding} y={padding + 90} className="cango-text" textAnchor="end">CANGO</text>

                    {/* Company Name */}
                    <text x={padding} y={padding + 90} className="cango-text">
                      {data.company || 'Cango Inc.'}
                    </text>

                    {/* Name and Title */}
                    <text x={padding} y={padding + 300} className="name-text">
                      {data.name}
                      {data.englishName && (
                        <tspan dx={30} style={{ fontSize: '48px', fontWeight: '500' }}>{data.englishName}</tspan>
                      )}
                      <tspan dx={45} className="title-text">{data.title}</tspan>
                    </text>

                    {/* Contact Info lines */}
                    {(() => {
                      const items = [
                        data.phone,
                        data.email,
                        data.address,
                        data.website || 'ir.cangoonline.com',
                      ].filter(Boolean);
                      
                      return items.map((text, index) => (
                        <text key={index} x={padding} y={600 - padding - 300 + index * 90} className="contact-text">
                          {text}
                        </text>
                      ));
                    })()}
                  </svg>
                )}
              </motion.div>
            </div>

            {/* BACK CARD */}
            <div className="relative group w-full max-w-[600px]">
              <div className="absolute -inset-4 bg-gradient-to-r from-slate-200 to-slate-300 rounded-[24px] blur opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200 pointer-events-none"></div>
              <div className="absolute -left-12 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-bold tracking-widest uppercase rotate-180" style={{ writingMode: 'vertical-rl' }}>背面 (Back)</div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative bg-white shadow-2xl overflow-hidden rounded-[8px]"
                style={{ width: '100%', aspectRatio: '3.5/2' }}
              >
                {/* Native SVG Renderer (BACK) */}
                {currentTemplate.backSvgString ? (
                    <div 
                        ref={backContainerRef}
                        dangerouslySetInnerHTML={{ __html: resolveSvgPlaceholders(currentTemplate.backSvgString, data) }}
                        style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}
                        className="[&>svg]:w-full [&>svg]:h-full"
                    />
                ) : (
                  <svg 
                    ref={backSvgRef}
                    xmlns="http://www.w3.org/2000/svg"
                    width="1050" 
                    height="600" 
                    viewBox="0 0 1050 600"
                    style={{ width: '100%', height: '100%', display: 'block' }}
                  >
                    <defs>
                      <style>
                        {`
                          .cango-text-large { font-family: 'Inter', Helvetica, Arial, sans-serif; font-weight: bold; font-size: 100px; fill: ${COLORS.text}; }
                        `}
                      </style>
                    </defs>

                    {/* Base Background */}
                    <rect width="1050" height="600" fill={isModern ? "#F8FAFC" : "#ffffff"} />

                    {/* Default Back Placeholder (If no custom background uploaded) */}
                    <circle cx={525 - 180} cy={300 - 30} r={60} fill={COLORS.orange} />
                    <text x={525 + 180} y={300} className="cango-text-large" textAnchor="end" dominantBaseline="middle">CANGO</text>

                    {/* Empty Back - Keep Only Template Design */}
                  </svg>
                )}
              </motion.div>
            </div>

            <div className="flex flex-col items-center gap-4 mt-8">
              <p className="text-slate-400 text-sm font-medium">纯矢量 SVG 渲染，完美支持无损放大及专业印刷</p>
              <button 
                onClick={handleDownload}
                className="group flex items-center gap-3 bg-white text-slate-900 px-8 py-4 rounded-2xl shadow-sm hover:shadow-md transition-all border border-slate-200 font-bold"
              >
                <Download size={20} className="group-hover:translate-y-0.5 transition-transform" />
                下载正反面打印级 SVG
              </button>
            </div>
          </div>

          {/* Success Notification */}
          <AnimatePresence>
            {notification.show && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 50 }}
                className={`absolute bottom-10 text-white px-6 py-4 rounded-2xl flex items-center gap-3 shadow-xl z-50 ${
                  notification.type === 'error' ? 'bg-red-600' : 
                  notification.type === 'warning' ? 'bg-amber-600' : 'bg-green-600'
                }`}
              >
                {notification.type === 'success' && <CheckCircle2 size={24} />}
                {notification.type === 'error' && <AlertCircle size={24} />}
                {notification.type === 'warning' && <AlertTriangle size={24} />}
                <div className="flex flex-col">
                  {notification.title && <span className="font-bold">{notification.title}</span>}
                  <span className="text-sm opacity-90 whitespace-pre-line">{notification.message}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </main>

      {/* Upload Custom Template Modal */}
      <AnimatePresence>
        {showUploadModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden relative"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <h2 className="text-xl font-bold">新增名片模板</h2>
                <button 
                  onClick={() => setShowUploadModal(false)}
                  className="p-2 hover:bg-white rounded-full transition-all text-slate-400 hover:text-slate-600"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 space-y-5">
                <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700">模板名称 (选填)</label>
                    <input 
                        className="w-full px-4 py-2 rounded-lg border border-slate-200 outline-none focus:border-slate-400 placeholder:text-slate-300" 
                        value={uploadTemplateName}
                        onChange={e => setUploadTemplateName(e.target.value)}
                        placeholder="例如：2026版企业模板"
                    />
                </div>
                <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700">正面 SVG</label>
                    <label className="flex items-center gap-3 px-4 py-3 rounded-lg border border-dashed border-slate-300 hover:bg-slate-50 cursor-pointer transition-colors">
                        <FileUp size={18} className="text-slate-400 shrink-0" />
                        <span className="text-sm text-slate-600 flex-1 truncate">{uploadFrontFile ? uploadFrontFile.name : '选择正面文件...'}</span>
                        <input type="file" className="hidden" accept="image/svg+xml" onChange={e => {
                          if (e.target.files && e.target.files[0]) setUploadFrontFile(e.target.files[0]);
                          e.target.value = '';
                        }} />
                    </label>
                </div>
                <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700">背面 SVG</label>
                    <label className="flex items-center gap-3 px-4 py-3 rounded-lg border border-dashed border-slate-300 hover:bg-slate-50 cursor-pointer transition-colors">
                        <FileUp size={18} className="text-slate-400 shrink-0" />
                        <span className="text-sm text-slate-600 flex-1 truncate">{uploadBackFile ? uploadBackFile.name : '选择背面文件...'}</span>
                        <input type="file" className="hidden" accept="image/svg+xml" onChange={e => {
                          if (e.target.files && e.target.files[0]) setUploadBackFile(e.target.files[0]);
                          e.target.value = '';
                        }} />
                    </label>
                </div>
              </div>

              <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
                <button 
                  onClick={() => setShowUploadModal(false)}
                  className="px-5 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl font-semibold hover:bg-slate-50 transition-all"
                >
                  取消
                </button>
                <button 
                  onClick={handleConfirmUpload}
                  disabled={!uploadFrontFile || !uploadBackFile}
                  className="px-5 py-2.5 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  确认上传
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Guide Modal */}
      <AnimatePresence>
        {showGuide && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden"
            >
              <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white">
                    <Layout size={20} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">模板制作规范说明</h2>
                    <p className="text-sm text-slate-500">请按照以下规格准备您的名片背侧图</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowGuide(false)}
                  className="p-2 hover:bg-white rounded-full transition-all text-slate-400 hover:text-slate-600"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto">
                {/* Specs Grid */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100">
                    <h4 className="text-sm font-bold text-blue-900 mb-1">图片格式</h4>
                    <p className="text-2xl font-black text-blue-600">SVG</p>
                    <p className="text-xs text-blue-700 mt-1">支持无损矢量放大印刷</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-orange-50 border border-orange-100">
                    <h4 className="text-sm font-bold text-orange-900 mb-1">设计分辨率</h4>
                    <p className="text-2xl font-black text-orange-600">1050 × 600</p>
                    <p className="text-xs text-orange-700 mt-1">对应 3.5:2 比例视窗</p>
                  </div>
                </div>

                {/* Instructions List */}
                <div className="space-y-4">
                  <h3 className="font-bold text-slate-800 flex items-center gap-2">
                    <div className="w-1.5 h-6 bg-slate-900 rounded-full" />
                    全新自动排版（占位符替换机制）
                  </h3>
                  <div className="text-sm text-slate-600 leading-relaxed mb-4">
                    系统现在采用全新的<strong>文本占位符机制</strong>！为了保证名片的排版效果完美符合您的设计，请直接在您的矢量设计软件（如 Illustrator、Figma）中，在需要出现信息的对应位置创建一个文本框，填入以下**占位符**。系统会自动检测并替换为对应的实际内容！并且完全保留您设定的文本样式（字体、字号、颜色、对齐方式）。
                  </div>
                  
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                    {Object.entries({
                        '姓名': '{{name}}',
                        '英文名': '{{englishName}}',
                        '职位': '{{title}}',
                        '英文职位': '{{englishTitle}}',
                        '公司': '{{company}}',
                        '电话': '{{phone}}',
                        '邮箱': '{{email}}',
                        '办公地址': '{{address}}',
                        '英文办公地址': '{{englishAddress}}',
                        '网址': '{{website}}'
                    }).map(([label, tag]) => (
                        <CopyableTag key={label} label={label} tag={tag} />
                    ))}
                  </div>

                  <h3 className="font-bold text-slate-800 flex items-center gap-2 mt-6">
                    <div className="w-1.5 h-6 bg-slate-900 rounded-full" />
                    技巧与导出须知（非常重要）
                  </h3>
                  <ul className="space-y-3 mt-4">
                    {[
                      { title: '防重叠排版（重点）', desc: '同一行排列的占位符（如英文名+英文职位），必须写在【同一个文本框】内（例如「{{englishName}}    {{title}}」）。渲染时后方文字会自动根据长度向后推移，千万不要拆分为不同图层！' },
                      { title: '正反两面', desc: '支持上传包含文字、图案和标志在内的两份完整 SVG（正面和背面）。系统不再限制必须为空白底图！' },
                      { title: '绝对不可转曲文本', desc: '在导出 SVG 时，带有占位符的文本图层绝对“不能”进行轮廓化（Create Outlines）或转曲操作，必须保持为可编辑文本。' },
                      { title: '保证文本图层完整性', desc: '在软件内编辑占位符时，不要在占位符（比如 {{name}} 内部）单独给某几个字母加粗或改变颜色，这会导致系统识别不到完整的占位符文本。' },
                    ].map((item, i) => (
                      <li key={i} className="flex gap-4">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">
                          {i + 1}
                        </div>
                        <div>
                          <p className="font-bold text-slate-700 text-sm">{item.title}</p>
                          <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tips Box */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="flex gap-3">
                    <Info size={18} className="text-slate-400 mt-0.5" />
                    <p className="text-xs text-slate-500 leading-relaxed italic">
                      提示：点击“上传定制模板”可以上传正面与背面的 SVG 进行拼合。系统将自动添加至上方模板列表供您随时切换。
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
                <button
                  onClick={handleCopyGuide}
                  className={`px-6 py-3 border rounded-xl font-bold transition-all flex items-center gap-2 ${guideCopied ? 'bg-green-50 text-green-600 border-green-200' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
                >
                  {guideCopied ? <Check size={18} /> : <Copy size={18} />}
                  {guideCopied ? '已复制规范全文' : '一键复制规范全文'}
                </button>
                <button 
                  onClick={() => setShowGuide(false)}
                  className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
                >
                  知道了
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
