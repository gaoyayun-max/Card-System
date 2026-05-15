const content = '<svg>你好</svg>';
const base64 = btoa(unescape(encodeURIComponent(content)));
console.log(base64);
const decoded = decodeURIComponent(escape(atob(base64)));
console.log(decoded);
