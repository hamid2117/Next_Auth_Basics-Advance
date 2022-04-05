import AuthForm from '../components/auth/auth-form'
import { getSession } from 'next-auth/react'
function AuthPage() {
  return <AuthForm />
}

export const getServerSideProps = async (context) => {
  const session = await getSession({ req: context.req }) // checking cookies valid

  if (session) {
    return {
      redirect: {
        destination: '/profile',
        permanent: false,
      },
    }
  }
  return { props: {} }
}

export default AuthPage
