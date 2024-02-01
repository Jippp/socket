import { useRef } from 'react'
import { useMemoizedFn } from 'ahooks'

import useWs from './useWs'
import DetailPage from './module/detail'

function App() {
  const wrapRef = useRef<HTMLInputElement>(null)
  const { selfMessage, allUsers, currentUser, handleLogin } = useWs()

  const toLogin = useMemoizedFn(() => {
    handleLogin(wrapRef.current!.value)
  })

  return (
    <>
      {
        selfMessage ? (
          <DetailPage 
            allUsers={allUsers}
            currentUser={currentUser}
            selfMessage={selfMessage}
          />
        ) : (
          <>
            <input type="text" placeholder='输入用户名称！' ref={wrapRef} />
            <button onClick={toLogin}>启动！</button>
          </>
        )
      }
    </>
  )
}

export default App
