import { useState, useEffect } from 'react'
//import { Auth } from 'aws-amplify'

const useCurrentUserIsAuthor = (entityToCheck) => {
  const [userIsAuthor, setUserIsAuthor] = useState(false)

  useEffect(() => {
    let sub

    const isCurrentUserAuthor = async () => {
      if (!sub) {
        //sub = (await Auth.currentAuthenticatedUser()).attributes.sub
      }
      if ((entityToCheck?.authorId === sub) !== userIsAuthor) {
        setUserIsAuthor(entityToCheck?.authorId === sub)
      }
    }

    if (entityToCheck && entityToCheck.hasOwnProperty('authorId')) {
      isCurrentUserAuthor()
    }
  }, [entityToCheck, userIsAuthor])

  return { userIsAuthor }
}

export { useCurrentUserIsAuthor }
