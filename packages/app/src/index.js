import './assets/fonts/PTSans/font.css'
import '@ursip/design-system/build/index.es.css'

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@ursip/design-system'
import Normalize from 'react-normalize'

import store from './store'
import theme from './theme'
import Routes from './routes'

render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Normalize />
      <Routes history={store.history} />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root'),
)
