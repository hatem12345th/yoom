import StreamVideoProvider from '@/providers/StreamClientProvider'
import React from 'react'

const MeetingLayout = ({children}) => {
  return (
    <div>
      <StreamVideoProvider>
        {children}
      
        </StreamVideoProvider>
    </div>
  )
}

export default MeetingLayout