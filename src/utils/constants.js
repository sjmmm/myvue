const debug = process.env.NODE_ENV === 'development'
const menus = {
  'calculator': 'Calculator',
  'githubusers': 'github 码农'
}

const buttonMaps = [7,8,9,'/','<--','C',4,5,6,'*','(',')',1,2,3,'-','x²','√',0,'.','%','+','=']

export {
  debug,
  menus,
  buttonMaps,
}
