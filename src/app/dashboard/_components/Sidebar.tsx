import React from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Zap, BookOpen, Settings, LogOut } from 'lucide-react'
import { useSession, signOut } from 'next-auth/react'
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'

interface Track {
  id: string
  title: string
  lessons: Lesson[]
}

interface Lesson {
  id: string
  title: string
  completed: boolean
}

interface MainSidebarProps {
  tracks: Track[]
  isSidebarOpen: boolean
  setIsSidebarOpen: (isOpen: boolean) => void
}

const MainSidebar: React.FC<MainSidebarProps> = ({
  tracks,
  isSidebarOpen,
  setIsSidebarOpen,
}) => {
  const { data: session } = useSession()
  const userInitial = session?.user?.name?.[0] || '?'

  const calculateTrackProgress = (track: Track) => {
    const completedLessons = track.lessons.filter((lesson) => lesson.completed).length
    return (completedLessons / track.lessons.length) * 100
  }

  return (
    <motion.div
      initial={false}
      animate={{
        width: isSidebarOpen ? '350px' : '60px',
        transition: { duration: 0.3 },
      }}
      className="h-full overflow-hidden bg-gray-900 w-full"
    >
      <Sidebar className={`h-full ${isSidebarOpen ? 'w-[350px]' : 'w-[60px]'}`}>
        <SidebarHeader className="bg-gray-800 p-4">
          <div className="flex justify-between items-center">
            {isSidebarOpen && (
              <h2 className="text-lg font-semibold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Learning Tracks</h2>
            )}
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-white hover:bg-gray-700"
          >
            {isSidebarOpen ? <ChevronLeft /> : <ChevronRight />}
          </Button>
          </div>
        </SidebarHeader>

        <SidebarContent className="bg-gray-900 py-4">
          {tracks.map((track) => (
            <SidebarGroup key={track.id}>
              {isSidebarOpen && (
                <SidebarGroupLabel className="px-4 text-sm font-semibold text-indigo-400">
                  {track.title}
                </SidebarGroupLabel>
              )}
              <SidebarGroupContent>
                <SidebarMenu>
                  {track.lessons.map((lesson) => (
                    <SidebarMenuItem key={lesson.id}>
                      <SidebarMenuButton
                        className={`flex items-center space-x-2 ${
                          !isSidebarOpen ? 'justify-center' : ''
                        }`}
                      >
                        <div
                          className={`h-2 w-2 rounded-full ${
                            lesson.completed ? 'bg-green-500' : 'bg-gray-500'
                          }`}
                        />
                        {isSidebarOpen && (
                          <span className="text-sm text-gray-300">{lesson.title}</span>
                        )}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
                {isSidebarOpen && (
                  <div className="mt-2 px-4">
                    <Progress value={calculateTrackProgress(track)} className="h-1" />
                  </div>
                )}
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>

        <SidebarFooter className="bg-gray-800 p-4 text-white">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton className="flex items-center space-x-2">
                <Zap className="h-4 w-4 text-indigo-400" />
                {isSidebarOpen && <span className="text-sm">Quick Start</span>}
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton className="flex items-center space-x-2">
                <BookOpen className="h-4 w-4 text-indigo-400" />
                {isSidebarOpen && <span className="text-sm">Resources</span>}
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton className="flex items-center space-x-2">
                <Settings className="h-4 w-4 text-indigo-400" />
                {isSidebarOpen && <span className="text-sm">Settings</span>}
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="" alt="User Avatar" />
                <span className="flex h-full w-full items-center justify-center rounded-full bg-indigo-500 text-xs font-medium text-white">
                  {userInitial}
                </span>
              </Avatar>
              {isSidebarOpen && (
                <span className="text-sm font-medium text-gray-300">
                  {session?.user?.name}
                </span>
              )}
            </div>
            {isSidebarOpen && (
              <Button
                variant="link"
                size="icon"
                onClick={() => signOut()}
                className="text-gray-400 hover:text-white"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            )}
          </div>
        </SidebarFooter>
      </Sidebar>
    </motion.div>
  )
}

export default MainSidebar
