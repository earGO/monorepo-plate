import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { LocaleProvider } from 'antd'
import ruRU from 'antd/lib/locale-provider/ru_RU'
import moment from 'moment'
import 'moment/locale/ru'
import store from './store'
import Root from './components/Root'
import registerServiceWorker from './registerServiceWorker'

moment.locale('ru')

const node = document.getElementById('root')
const app = (
  <Provider store={ store }>
    <LocaleProvider locale={ ruRU }>
      <Root />
    </LocaleProvider>
  </Provider>
)

render(app, node)
registerServiceWorker()
