
  console.log('hello there');
  var xhrOverrideScript = document.createElement('script');
  xhrOverrideScript.type = 'text/javascript';
  xhrOverrideScript.src = 'test.js';
  document.head.prepend(xhrOverrideScript);

