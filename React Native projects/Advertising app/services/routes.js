import  { createAppContainer, createSwitchNavigator } from 'react-navigation'

import Login from '../screens/Login'
import List from '../screens/List'
import NewAd from '../screens/NewAd'


export default createAppContainer(
  createSwitchNavigator({
    Login,
    List,
    NewAd
  })
)
