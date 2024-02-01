import { FC, memo } from 'react'

import useStartPoker from '../poker/useStartPoker'

interface Props {
  selfMessage: string;
  currentUser: string;
  allUsers: string[];
  children: React.ReactNode
}

const DetailPage: FC<Props> = ({ selfMessage, currentUser, allUsers, children }) => {
  useStartPoker()
  return (
    <>
      <p>{selfMessage}</p>
      {allUsers && allUsers.length ? (
        allUsers.map(user => {
          return <div key={user} className={currentUser === user ? 'self' : ''}>{user}</div>
        })
      ) : null}
      {children}
    </>
  )
}

export default memo(DetailPage)