import React from 'react'
import Header from './components/Header/index'
import Select from './components/Select/index'

interface Props {

}

function BasisConfig(props:Props) {
  return (
    <section>
      <Header>基础配置</Header>
      <Select
        name="connectionMethod"
        title="数据导出"
        options={["AnkiConnect"]}
        initValue="AnkiConnect"
      ></Select>
    </section>
  )
}

export default BasisConfig
