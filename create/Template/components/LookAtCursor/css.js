const css = `
  c-look-at-cursor {
    display:flex;
    flex-direction:column;
    overflow: visible; 
    transition-property:all;
    transition-duration: 0.05s;
  }
  
  c-look-at-cursor.mouseleave {
    transition-property:all;
    transition-duration: 0.25s
  }
`;

export default css;