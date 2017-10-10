import React from 'react'
import './Header.css'
import { Layout, Row, Col, Avatar, Popconfirm, Button, Popover } from 'antd'

const { Header, Sider, Content } = Layout

const renderLogoutButton = (userOnLogout) => (
  <Popconfirm
    placement="bottomRight"
    title="Вы действительно хотите выйти из системы?"
    onConfirm={ userOnLogout }
    okText="Да"
    cancelText="Нет"
  >
    <Button
      className="layout-header-logout"
      shape="circle"
      icon="export"
    />
  </Popconfirm>
)

const renderUser = (userAvatar, userName, userOnLogout) => {

  const calculatePadding = () => {
    switch (true) {
      case Boolean(userAvatar) && Boolean(userOnLogout) : return 80
      case Boolean(userAvatar) || Boolean(userOnLogout) : return 40
      default : return 0
    }
  }

  return (
    <div className="layout-header-user">
      <span
        className="layout-header-user-name"
        style={{ right: calculatePadding() }}
      >
        { userName || 'Username' }
      </span>
      { userAvatar ? <Avatar src={userAvatar} icon="user" shape="square" /> : null }
      { userOnLogout ? renderLogoutButton(userOnLogout) : null }
    </div>
  )
}

export default ({
  moduleName = 'Шаблон модуля',
  logoSrc,
  logoOnClick,
  logoStyle,
  leftWidth,
  rightWidth,
  userAvatar,
  userName,
  userOnLogout,
  printDropdown,
  settingsDropdown,
  children,
  ...rest
}) => (
  <Header className="layout-header">
    <Layout>
      <Sider className="layout-header-left" width={ leftWidth }>
        <Row type="flex" align="middle">
          <Col width={100}>
            <img
              className="layout-header-logo"
              alt="app logo"
              src={ logoSrc }
              onClick={ logoOnClick }
              style={ logoStyle }
            />
          </Col>
          <Col>
            <strong
              className="layout-header-module-name"
              onClick={ logoOnClick }
            >
              { moduleName }
            </strong>
          </Col>
        </Row>
      </Sider>
      <Content className="layout-header-center">
        <Row type="flex" align="middle">
          <Col>{ children }</Col>
        </Row>
      </Content>
      <Sider className="layout-header-right" width={ rightWidth }>
        <Row type="flex" align="middle">
          <Col span={8}>
            <Popover
              trigger="click"
              title="Печатные формы"
              placement="bottom"
              content={ printDropdown }
            >
              <Button icon="printer" style={{ marginRight: 11 }}/>
            </Popover>
            <Popover
              trigger="click"
              title="Настройки"
              placement="bottom"
              content={ settingsDropdown }
            >
              <Button icon="setting" />
            </Popover>
          </Col>
          <Col span={16}>
            { renderUser(userAvatar, userName, userOnLogout) }
          </Col>
        </Row>
      </Sider>
    </Layout>
  </Header>
)
