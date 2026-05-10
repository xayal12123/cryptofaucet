import React from 'react';
import ReactDOM from 'react-dom';

try {
  // Əgər uygulama.js-də xəta varsa, aşağıdakı catch bloku işləyəcək
  import App from './uygulama.js';
  ReactDOM.render(<App />, document.getElementById('app'));
} catch (error) {
  // Xətanı ekranda göstər
  document.body.innerHTML = `<div style="color:red; background:black; padding:20px;">
    <h1>XƏTA TAPILDI! ❌</h1>
    <pre>${error.message}</pre>
  </div>`;
}
