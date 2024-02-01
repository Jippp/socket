import { FC, memo } from 'react'

import useStartPoker from './useStartPoker'
import './poker.css'

const Poker: FC = () => {
  useStartPoker()

  return (
    <div id='poker-container'>
      <div id="topbar">
        <button id="shuffle">洗牌</button>
        {/* <button id="poker">发牌</button> */}
      </div>
      <div id="container"></div>
    </div>
  )
}

export default memo(Poker)