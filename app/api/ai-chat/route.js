import { NextResponse } from 'next/server'
import Groq from 'groq-sdk'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

const systemPrompt = {
  role: "system",
  content: `
    You are NutriAI, a specialized diet and nutrition assistant.
    ONLY answer questions related to diet, nutrition, meal planning, health foods, fitness diets, and calorie intake.
    Politely decline unrelated queries by clarifying your specialization.
  `
}

export async function POST(req) {
  try {
    const { messages } = await req.json()
    
    const chatCompletion = await groq.chat.completions.create({
      messages: [systemPrompt, ...messages],
      model: "llama3-8b-8192",
      temperature: 0.5,
      max_tokens: 512,
    })

    return NextResponse.json({ reply: chatCompletion.choices[0].message.content })
  } catch (error) {
    console.error('Error in AI chat:', error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
} 