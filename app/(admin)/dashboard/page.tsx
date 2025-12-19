'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { ProjectManager } from '@/components/admin/ProjectManager'
import { CategoryManager } from '@/components/admin/CategoryManager'
import { MessageManager } from '@/components/admin/MessageManager'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

type LoginFormData = z.infer<typeof loginSchema>

export default function DashboardPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'projects' | 'categories' | 'messages'>('projects')
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    setError('')
    const result = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    })

    if (result?.error) {
      setError('Invalid email or password')
    } else {
      router.refresh()
    }
  }

  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md space-y-4 rounded-lg bg-gray-800 p-8"
        >
          <h1 className="mb-6 text-2xl font-bold">Admin Login</h1>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium">
              Email
            </label>
            <Input id="email" type="email" {...register('email')} />
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
          </div>
          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium">
              Password
            </label>
            <Input id="password" type="password" {...register('password')} />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6 flex gap-4 border-b border-gray-800">
        <button
          onClick={() => setActiveTab('projects')}
          className={`border-b-2 px-4 py-2 ${
            activeTab === 'projects'
              ? 'border-red-600 text-red-600'
              : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          Projects
        </button>
        <button
          onClick={() => setActiveTab('categories')}
          className={`border-b-2 px-4 py-2 ${
            activeTab === 'categories'
              ? 'border-red-600 text-red-600'
              : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          Categories
        </button>
        <button
          onClick={() => setActiveTab('messages')}
          className={`border-b-2 px-4 py-2 ${
            activeTab === 'messages'
              ? 'border-red-600 text-red-600'
              : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          Messages
        </button>
      </div>

      {activeTab === 'projects' && <ProjectManager />}
      {activeTab === 'categories' && <CategoryManager />}
      {activeTab === 'messages' && <MessageManager />}
    </div>
  )
}


