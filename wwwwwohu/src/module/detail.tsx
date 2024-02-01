import { FC } from 'react'

import useStartPoker from './../useStartPoker'

interface Props {
  selfMessage: string;
  currentUser: string;
  allUsers: string[];
}

const DetailPage: FC<Props> = ({ selfMessage, currentUser, allUsers }) => {
  useStartPoker()
  return (
    <>
      <p>{selfMessage}</p>
      {allUsers && allUsers.length ? (
        allUsers.map(user => {
          return <div key={user} className={currentUser === user ? 'self' : ''}>{user}</div>
        })
      ) : null}
    </>
  )
}

export default DetailPage