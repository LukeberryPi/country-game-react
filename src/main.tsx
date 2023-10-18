import React from 'react'
import ReactDOM from 'react-dom/client'
import { default as App } from './App.tsx'

declare global {
  interface Array<T> {
    shuffle(): T[];
  }
}

// fisher-yates/knuth shuffle
Array.prototype.shuffle = function () {
  for (let i = this.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [this[i], this[j]] = [this[j], this[i]];
  }
  return this;
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
