import React, { useEffect, useRef, useState } from "react"
import { Key } from "readline"

import {measureTextWidth} from "../../utils/index"

interface Props {
  initTranslations:string[]
  key:Key
}

export default function Translations(props:Props) {
  const {initTranslations} = props
  const ref = useRef<HTMLUListElement>(null)
  const [translations,setTranslations] = useState(initTranslations.slice())
  useEffect(() => {
    const element = ref.current
    if (!element) return
    const ulHeight = element.offsetHeight
    //确保element高度在一定范围内
    if (ulHeight < 120) return
    //最多展现5条条目
    let newTranslations = translations.slice(0,5)
    newTranslations = newTranslations.map((text) => {
      const width = element.clientWidth
      let TextWidth = measureTextWidth(text)
      //该文本会导致换行行为发生
      while (TextWidth > width) {
        const textArr = text.split("；")
        const length = textArr.length
        text = textArr.slice(0,length/2).join("；")
        TextWidth = measureTextWidth(text)
      }
      return text
    })
    setTranslations(newTranslations)
  })
  
    return (
      <ul ref={ref} className="text-base">
        {
          translations.map((item,index) => {
            return (
              <li key={index}>
                {item}
              </li>
            )
          })
        }
      </ul>
    )
}
