/* 前端 */
import { useEffect, useState, useRef } from 'react'
import { io } from "socket.io-client";

const PORT = 9170
const socket = io(`ws://localhost:${PORT}`);

export default () => {
  // const [message, setMessage] = useState('')
  const [selfMessage, setSelfMessage] = useState('')
  const [allUsers, setAllUsers] = useState<string[]>([])
  const userNameRef = useRef('')

  const handleLogin = (user?: string) => {
    userNameRef.current = user!
    socket.emit('login', {
      user
    })
  }

  const handleReload = () => {
    socket.emit('reload', {
      user: userNameRef.current
    })
  }

  useEffect(() => {
    if(socket) {
      // 自己加入
      socket.on('success', (data: any) => {
        setSelfMessage(`${data.user}进来了嗷，小宰治`)
      })
      // 自己离开
      socket.on('error', () => {
        setSelfMessage('')
      })
      // 其他人加入
      socket.on('join', (data: any) => {
        console.log(`${data.user}加入了这场战斗`)
      })
      // 其他人离开
      socket.on('leave', (data: any) => {
        console.log(`${data.user}离开了这场战斗`)
      })

      // 用户变化
      socket.on('userChange', (data: string[]) => {
        setAllUsers(data)
      })      
    }
  }, [socket])

  useEffect(() => {
    const handleBeforeUnload = (e: any) => {
      e.preventDefault()
      handleReload()
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [handleReload])

  return { handleLogin, handleReload, selfMessage, allUsers, currentUser: userNameRef.current }
}
