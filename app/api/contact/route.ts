import { NextRequest, NextResponse } from 'next/server'
import { contactSchema } from '@/lib/validators'
import { rateLimit } from '@/lib/rate-limit'
import { prisma } from '@/lib/db'
import { z } from 'zod'

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || 'unknown'
    if (!rateLimit(ip, 5, 60 * 1000)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    const body = await request.json()
    const data = contactSchema.parse(body)

    // Honeypot check
    if (data.honeypot && data.honeypot.length > 0) {
      return NextResponse.json({ success: true }) // Silent fail for bots
    }

    // Save message to database
    await prisma.contactMessage.create({
      data: {
        name: data.name,
        email: data.email,
        message: data.message,
      },
    })

    // Also log to console for development
    console.log('Contact form submission:', {
      name: data.name,
      email: data.email,
      message: data.message,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    console.error('Error processing contact form:', error)
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 })
  }
}


