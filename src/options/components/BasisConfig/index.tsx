import React, { ChangeEvent } from 'react'
import Header from '../Header/index'
import Select from '../Select/index'

interface Props {
  ankiConnectionURL:string
  updateAnkiConnectionURL:(event?:ChangeEvent<HTMLInputElement>) => void
}

function BasisConfig(props:Props) {
  const {ankiConnectionURL,updateAnkiConnectionURL} = props
  return (
    <section>
      <Header>基础配置</Header>
      <Select
        name="connectionMethod"
        title="数据导出"
        options={["AnkiConnect"]}
        initValue="AnkiConnect"
      ></Select>
      <div className="basis_config_container">
        <label htmlFor="AnkiConnect_URL" className="basis_config_label">AnkiConnect_URL</label>  
        <input id="AnkiConnect_URL" type="url" className="basis_config_url" value={ankiConnectionURL} onChange={updateAnkiConnectionURL}/> 
        <button type="button" className="basis_config_button" onClick={()=>updateAnkiConnectionURL()}>重置</button>  
      </div>	
    </section>
  )
}

export default BasisConfig
