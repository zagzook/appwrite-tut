'use server'
import { Client, Account, Databases, Users } from 'node-appwrite'
import { cookies } from 'next/headers'

export async function createSessionClient() {
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT!)
    .setProject(process.env.APPWRITE_PROJECT_ID!)

  const session = (await cookies()).get('appwrite-session')
  if (!session || !session.value) {
    return
  }

  client.setSession(session.value)

  return {
    get account() {
      return new Account(client)
    },
  }
}

export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT!)
    .setProject(process.env.APPWRITE_PROJECT_ID!)
    .setKey(process.env.NEXT_APPWRITE_KEY!)

  return {
    get account() {
      return new Account(client)
    },
    get database() {
      return new Databases(client)
    },
    get user() {
      return new Users(client)
    },
  }
}
