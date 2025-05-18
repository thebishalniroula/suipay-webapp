import { useQuery } from '@tanstack/react-query'
import { differenceInSeconds, parseISO } from 'date-fns'

function getDifferenceInMinutesSeconds(date1Str: string, date2Str: string): string {
  const date1 = parseISO(date1Str)
  const date2 = parseISO(date2Str)

  const totalSeconds = Math.abs(differenceInSeconds(date1, date2))
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

const useCountDown = (date: string) => {
  return useQuery({
    queryKey: ['countdown'],
    queryFn: async () => {
      const difference = getDifferenceInMinutesSeconds(date, new Date().toJSON())
      return difference
    },
    refetchInterval: 1000,
  })
}

export default useCountDown
