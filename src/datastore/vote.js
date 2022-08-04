import { useEffect, useState } from 'react'

const useVotesPerIdea = (ideaId) => {
  const [votes, setVotes] = useState([])

  useEffect(() => {
    /*********************************
     * Todo: Add real implementation *
     *********************************/

    return () => {}
  }, [ideaId])

  return { votes }
}

const toggleVote = async (ideaId) => {
  /*********************************
   * Todo: Add real implementation *
   *********************************/
}

export { useVotesPerIdea, toggleVote }
