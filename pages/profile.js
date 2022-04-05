import UserProfile from '../components/profile/user-profile'
import { getSession } from 'next-auth/react'
function ProfilePage() {
  return <UserProfile />
}

export const getServerSideProps = async (context) => {
  const session = await getSession({ req: context.req })
  console.log(session)
  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    }
  }

  return {
    props: { session },
  }
}

export default ProfilePage
