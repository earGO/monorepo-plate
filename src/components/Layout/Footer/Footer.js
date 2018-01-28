import React from 'react'
import './Footer.less'
import logo from './ursip-logo.svg'
import { Layout, Row, Col, Popover } from 'antd'

const { Sider, Content, Footer } = Layout

const renderHelpdesk = (helpdeskContent) => (
  <Sider width={175} className="layout-footer-helpdesk" >
    <Popover
      title="Информация о техподдержке"
      content={helpdeskContent}
      placement="topRight"
    >
      <Row type="flex" align="middle">
        <Col style={{ width: '100%' }}>
          <span className="layout-footer-helpdesk-title">
            Техподдержка &mdash;
          </span>
          <img
            className="layout-footer-helpdesk-logo"
            src={logo}
            alt="ursip"
          />
        </Col>
      </Row>
    </Popover>
  </Sider>
)

export default ({
  helpdeskContent = 'Кнопки и контактная информация',
  children,
  ...rest
}) => (
  <Footer className="layout-footer">
    <Layout>
      <Content>
        <Row type="flex" align="middle">
          <Col>
            { children }
          </Col>
        </Row>
      </Content>
      { renderHelpdesk(helpdeskContent) }
    </Layout>
  </Footer>
)
