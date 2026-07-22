import type { Config } from 'tailwindcss';
const config: Config = { content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './data/**/*.{ts,tsx}'], theme: { extend: { colors: { ink:'#0e0e0e', coal:'#151515', bone:'#ede8e0', muted:'#b8aea1', amber:'#c47a4a', line:'rgba(237,232,224,.18)' }, fontFamily: { serif:['var(--font-cormorant)'], sans:['var(--font-inter)'] } } }, plugins: [] };
export default config;
