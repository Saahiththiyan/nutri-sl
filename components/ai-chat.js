'use client'

import { useState, useRef, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'

export default function Chat() {
  const [input, setInput] = useState('')
  const [chatHistory, setChatHistory] = useState([])
  const scrollRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = { role: 'user', content: input }
    const updatedChat = [...chatHistory, userMessage]

    setChatHistory(updatedChat)
    setInput('')

    const res = await fetch('/api/ai-chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: updatedChat }),
    })

    const { reply } = await res.json()

    setChatHistory((prev) => [
      ...prev,
      { role: 'assistant', content: reply },
    ])
  }

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    })
  }, [chatHistory])

  return (
    <Card className="max-w-3xl mx-auto my-10 shadow-lg">
      <CardHeader>
        <CardTitle>🍏 NutriAI Chat Assistant</CardTitle>
      </CardHeader>

      <CardContent>
        <ScrollArea ref={scrollRef} className="h-[400px] px-4">
          {chatHistory.length === 0 && (
            <div className="text-gray-400 text-center mt-10">
              Ask me anything about nutrition, diets, or meal planning!
            </div>
          )}

          {chatHistory.map((msg, idx) => (
            <div
              key={idx}
              className={`my-2 flex ${
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`px-4 py-2 rounded-lg max-w-[80%] ${
                  msg.role === 'user'
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>

      <CardFooter>
        <form onSubmit={handleSubmit} className="w-full flex gap-2">
          <Input
            value={input}
            placeholder="Ask your diet question..."
            onChange={(e) => setInput(e.target.value)}
          />
          <Button type="submit">Send</Button>
        </form>
      </CardFooter>
    </Card>
  )
}
