import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import { auth } from 'auth'

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { db } = await connectToDatabase()
    
    const userProfile = await db.collection('userProfiles').findOne({
      email: session.user.email
    })

    if (!userProfile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
    }

    return NextResponse.json(userProfile)
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await req.json()
    const { db } = await connectToDatabase()

    const result = await db.collection('userProfiles').updateOne(
      { email: session.user.email },
      { 
        $set: {
          email: session.user.email,
          level: data.level,
          expertise: data.expertise,
          learningStyle: data.learningStyle,
          goals: data.goals,
          updatedAt: new Date()
        }
      },
      { upsert: true }
    )

    return NextResponse.json({ success: true, data: result })
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
