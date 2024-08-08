import StreamVideoProvider from '@/providers/StreamClientProvider'

export const metadata = {
  title: "YOOM",
  description: " Video Calling app",
  icons:{
    icon: "/icons/logo.svg"
  }
};
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