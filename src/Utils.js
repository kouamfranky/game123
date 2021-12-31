export const getRandomColor = ()=> {
    var letters = '6789ABCD';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 8)];
    } 
    return color;
  }