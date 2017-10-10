import React from 'react'
import Layout from '../Layout'
import './Root.css'
import logo from '../../static/images/logo.svg'

const { Header, Footer, Content, Sider } = Layout

export default () => (
  <Layout>
    <Header
      moduleName="шаблон модуля"

      leftWidth={ 200 }
      rightWidth={ 240 }

      logoSrc={ logo }
      logoOnClick={ () => console.log('logo click') }
      logoStyle={{
        position: 'relative',
        width: 70,
        top: 2
      }}

      userAvatar=""
      userName="userName"
      userOnLogout={ () => console.log('logout') }

      printDropdown={ <p>Список печатных форм</p> }
      settingsDropdown={ <p>Список настроек</p> }
    >
      Header
    </Header>
    <Layout>
      <Sider width={ 300 }>
        Left Sider
      </Sider>
      <Content>
        Content
      </Content>
      <Sider width={ 300 }>
        Right Sider
      </Sider>
    </Layout>
    <Footer helpdeskContent={<p>helpdeskContent</p>} >
      Footer
    </Footer>
  </Layout>
)
