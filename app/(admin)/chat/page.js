'use client'

import React, { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'

const Chat = () => {
  const [users, setUsers] = useState([])
  const [user, setUser] = useState(null)
  const [selectedUser, setSelectedUser] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const router = useRouter()

  useEffect(() => {
    const fetchUsers = async () => {
      const { data: users, error } = await supabase.from('clients').select('*, profiles(*)')
      if (error) console.error(error)
      else setUsers(users)
    }
    
    fetchUsers()
  }, [])

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user)).catch(error => console.log(error))
  }, [])

  useEffect(() => {
    if (selectedUser) {
      const fetchMessages = async () => {
        const { data: messages, error } = await supabase
          .from('messages')
          .select('*')
          .or(`admin_id.eq.${user?.id},client_id.eq.${selectedUser.profiles[0].id}`)
          .order('created_at', { ascending: true })
        if (error) console.error(error)
        else setMessages(messages)
      }

      fetchMessages()

      const messageSubscription = supabase
        .channel('public:messages')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, payload => {
          if (payload.new.admin_id === user?.id || payload.new.client_id === selectedUser.profiles[0].id) {
            console.log('message set');
            setMessages(prev => [...prev, payload.new])
          }
        })
        .subscribe()

      return () => {
        supabase.removeChannel(messageSubscription)
      }
    }
  }, [selectedUser])

  const sendMessage = async () => {
    if (newMessage.trim() !== "") {
      const { error } = await supabase.from('messages').insert([{ admin_id: user?.id, client_id: selectedUser.profiles[0].id, content: newMessage, sender: 'admin' }])
      if (error) console.error(error)
      else setNewMessage("")
    }
  }

  return (
    <div className="flex h-[calc(100vh-64px)] w-screen">
      {/* User list */}
      <div className="w-1/5 p-2 border-r border-gray-300">
        {users.map((user, index) => (
          <div onClick={() => setSelectedUser(user)} key={index} className="flex items-center p-2 cursor-pointer hover:bg-gray-200">
            <Avatar name={user} className="mr-3">
              <AvatarImage src={user.avatar_url} alt="@shadcn" />
              <AvatarFallback>{user.first_name}</AvatarFallback> 
            </Avatar>
            <span className="font-bold">{user.first_name} {user.last_name}</span>
          </div>
        ))}
      </div>

      {/* Chat interface */}
      <div className="flex flex-col w-4/5 p-4">
        {/* Messages */}
        <div className="flex flex-col flex-1 overflow-y-auto space-y-4">
          {messages.map((message, index) => (
            (message.admin_id === user?.id && message.client_id === selectedUser.profiles[0].id) && (
            <div
              key={index}
              className={`max-w-3/4 p-3 rounded-md ${
                message.sender === 'admin' ? 'self-end bg-green-100' : 'self-start bg-gray-200'
              }`}
            >
              {console.log(message.admin_id, user?.id)}
              <span>{message.content}</span>
            </div>
            )
          ))}
        </div>

        {/* Input field */}
        <div className="flex p-3 border-t border-gray-300">
          <Input placeholder="Type your message..." className="flex-1 mr-3" value={newMessage} onChange={e => setNewMessage(e.target.value)}/>
          <Button onClick={sendMessage} className="flex-shrink-0">Send</Button>
        </div>
      </div>
    </div>
  )
}

export default Chat
