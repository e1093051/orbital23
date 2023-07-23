module.exports = function(api) {
  api.cache(true);
  return {
    presets: [['@babel/preset-env', {targets: {node: 'current'}}],['babel-preset-expo']],
  };
};




//1//0eLoovvC-TaLvCgYIARAAGA4SNwF-L9IrFRoUgc_Ktk-KUiHCUozcyuDlHc-0SZON0cZUOXIlRNz9QUr_Gxnv-Fk9zizHG89YlcE