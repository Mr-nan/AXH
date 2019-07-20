import {createStackNavigator,createAppContainer} from 'react-navigation';
import HomeTabBar from '../tab/AppTabBar';
import LoginPage from '../page/LoginPage';
import MorePage from '../page/MorePage';
import BrowseListPage from '../page/BrowseListPage';
import WebPage from '../page/WebPage'

const AppNavigator = createStackNavigator({
    Home:{
        screen: HomeTabBar
    },
    Login:{
        screen:LoginPage,
    },
    More:{
        screen:MorePage
    },
    BrowseList:{
        screen:BrowseListPage
    },
    Web:{
        screen:WebPage,
    }
},{   
     headerMode: 'none',
})

export default createAppContainer (AppNavigator);