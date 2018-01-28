import React from 'react'
import './Sider.less'
import { Layout } from 'antd'

const { Sider } = Layout

//https://ant.design/components/layout/#Layout.Sider
const CustomizedSider = ({ children, ...rest }) => (
  <Sider className="layout-sider" { ...rest }>
    { children }
  </Sider>
)

CustomizedSider.__ANT_LAYOUT_SIDER = true

export default CustomizedSider
