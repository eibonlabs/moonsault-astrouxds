const css = `
  :root {
    --border-color: #285766;
  }

  c-window {
    position:fixed;
    display:flex;
    overflow: hidden;
    box-shadow:0px 0px 20px 10px rgba(0,0,0,0.5);
  }

  c-window.resizable {
    resize: both;
    min-height:110px;
    min-width:200px;
  }
  
  c-window.transtionWindowState {
    transition-property: top, left, width, height, opacity, transform;
    transition-duration: 0.25s;
  }

  c-window.close {
    opacity: 0;
    transform: scale(0);
    transform-origin: top center;
    transition-duration:0.5s;
  }
  
  c-window .window {
    width:100%;
    height:100%;
    display:flex;
    flex-direction:column;
  }

  c-window .window .window-title-bar {
    display:flex;
    align-items:center;
    background-color:#172635;
    cursor: default;
    border-top:1px solid var(--border-color);
    border-right:1px solid var(--border-color);
    border-left:1px solid var(--border-color);
  }

  c-window .window .window-title-bar h3 {
    font-size:16px;
    font-weight:bold;
    margin:0px;
    width:100%;
    padding:8px 16px 8px 8px;
    text-overflow:ellipsis;
  }

  c-window .window .window-title-bar .window-controls {
    margin-left:auto;
    z-index:1;
    padding:4px 6px;
    display:flex;
    gap:4px;
  }

  c-window .window .window-content {
    padding:6px;
    flex:1;
    border-left:1px solid var(--border-color);
    border-right:1px solid var(--border-color);
    background-color:#1b2d3e;
    position:relative;
    display:block;
    overflow: auto;
  }

  c-window .window .window-content iframe {
    border:0px;
    position: absolute;
    top:0px;
    right:0px;
    bottom:0px;
    left:0px;
    width:100%;
    height:100%;
  }

  c-window .window .window-footer {
    border-left:1px solid var(--border-color);
    border-right:1px solid var(--border-color);
    border-bottom:1px solid var(--border-color);
    font-size:12px;
    display:flex;
    align-items:center;
    background-color:#172635;
    cursor: default;
  }

  c-window .window .window-footer .window-footer-message {
    margin:0px;
    width:100%;
    padding:4px 16px 4px 8px;
  }
`;

export default css;