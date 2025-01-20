'use server'
import { createAdminClient, createSessionClient } from '@/lib/appwrite'
import { cookies } from 'next/headers'
import { ID, Query } from 'node-appwrite'
import { redirect } from 'next/navigation'

export const getUserDetails = async (userId: string) => {
  try {
    const { database } = await createAdminClient()
    const user = await database.listDocuments(
      process.env.DATABASE_COLLECTION_ID!,
      process.env.USER_COLLECTION_ID!,
      [Query.equal('userId', userId)]
    )

    if (user?.total === 0) return null
    return JSON.parse(JSON.stringify(user.documents[0]))
  } catch (error) {
    console.log('error', error)
  }
}

export async function getLoggedInUser() {
  const sessionClient = await createSessionClient()
  if (!sessionClient) return null

  try {
    const { account } = sessionClient
    const result = await account.get()
    let user
    if (result) {
      user = await getUserDetails(result.$id)
    }

    if (!user) {
      user = {
        $id: result.$id,
        email: result.email,
        username: result.name,
        // proMember: result.proMember,
        // totalScore: result.totalScore,
      }
    }
    return JSON.parse(JSON.stringify(user))
  } catch (error) {
    console.log('error', error)
    return null
  }
}

export async function signUp(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const username = formData.get('username') as string
  console.log('signup-start', formData)
  try {
    console.log('inside try for signup')
    const { account, database } = await createAdminClient()
    console.log('account', account)
    console.log('database', database)
    const newUserAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    )
    console.log('newUserAccount', newUserAccount)
    if (!newUserAccount) throw new Error('Failed to create account')

    const newUser = await database.createDocument(
      process.env.DATABASE_COLLECTION_ID!,
      process.env.USER_COLLECTION_ID!,
      ID.unique(),
      {
        userId: newUserAccount.$id,
        email: email,
        username: username,
        proMember: false,
        totalScore: 0,
      }
    )

    if (!newUser) throw new Error('Failed to create user in the database')
    const session = await account.createEmailPasswordSession(email, password)

    ;(await cookies()).set('appwrite-session', session.secret, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    })

    return { success: true }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      error: error.message,
    }
  }
}

export async function signIn(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  try {
    const { account } = await createAdminClient()
    const session = await account.createEmailPasswordSession(email, password)

    ;(await cookies()).set('appwrite-session', session.secret, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    })
    return { success: true }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      error: error.message,
    }
  }
}

export async function signOut(): Promise<void> {
  const sessionClient = await createSessionClient()
  if (!sessionClient) redirect('/sign-in')
  const { account } = sessionClient

  ;(await cookies()).delete('appwrite-session')
  await account.deleteSession('current')

  return redirect('/sign-in')
}
