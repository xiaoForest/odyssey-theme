import {
    createApp
} from 'vue'
import App from './App.vue'

// 引入路由
import router from './router'
import '@/utils/Rem.js'
import '@/assets/css/reset'
import '@/assets/css/demo'
import 'animate.css' //https://animate.style/
import {
    Icon,
    Popover,
    Popup,
    Area,
    Swipe,
    SwipeItem,
    NoticeBar,
    List,
    Tab,
    Tabs,
    Button,
    PullRefresh,
    Sticky,
    Field,
    CellGroup,
    Checkbox,
    CheckboxGroup,
    RadioGroup,
    Radio,
    Dialog,
    Stepper,
    Calendar,
    ConfigProvider,
    Picker,
    Uploader,
    Empty,
    Loading,
    Skeleton
} from 'vant';

createApp(App).use(Skeleton).use(Uploader).use(Loading).use(Empty).use(Sticky).use(Picker).use(ConfigProvider).use(Dialog).use(Calendar).use(Icon).use(Stepper).use(Radio).use(RadioGroup).use(Checkbox).use(CheckboxGroup).use(Button).use(Field).use(CellGroup).use(Popover).use(Popup).use(Area).use(PullRefresh).use(Swipe).use(SwipeItem).use(NoticeBar).use(List).use(Tab).use(Tabs).use(router).mount('#app')