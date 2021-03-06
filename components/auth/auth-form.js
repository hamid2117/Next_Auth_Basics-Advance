import { useState, useRef } from 'react'
import { signIn } from 'next-auth/react'
import classes from './auth-form.module.css'
import { useRouter } from 'next/router'
function AuthForm() {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(true)
  const [notify, setNotify] = useState(false)
  const emailInput = useRef()
  const passwordInput = useRef()

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState)
  }

  const SignInFunc = async (email, password) => {
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    })
    if (!result.error) {
      router.replace('/profile')
    }
  }

  const sendData = async (email, password) => {
    const data = JSON.stringify({ email, password })
    isLogin
      ? await SignInFunc(email, password)
      : fetch('/api/auth/signup', {
          method: 'POST',
          body: data,
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((data) => {
            console.log(data)
          })
          .catch((err) => {
            console.log(err)
          })
  }
  const handleSubmit = (e) => {
    e.preventDefault()

    emailInput.current.value && passwordInput.current.value
      ? sendData(emailInput.current.value, passwordInput.current.value)
      : setNotify(true)
  }
  const handleGoogle = async () => {
    signIn('google', { callbackUrl: 'http://localhost:3000/' })
  }
  return (
    <>
      <section className={classes.auth}>
        <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
        {notify && <h2 style={{ color: 'red' }}>Please review your inputs </h2>}
        <form onSubmit={handleSubmit}>
          <div className={classes.control}>
            <label htmlFor='email'>Your Email</label>
            <input type='email' ref={emailInput} id='email' required />
          </div>
          <div className={classes.control}>
            <label htmlFor='password'>Your Password</label>
            <input type='password' id='password' ref={passwordInput} required />
          </div>
          <div className={classes.actions}>
            <button>{isLogin ? 'Login' : 'Create Account'}</button>
            <button
              type='button'
              className={classes.toggle}
              onClick={switchAuthModeHandler}
            >
              {isLogin ? 'Create new account' : 'Login with existing account'}
            </button>
          </div>
        </form>
      </section>
      <br />
      <section style={{ display: 'grid', placeItems: 'center' }}>
        <button onClick={handleGoogle}>Sign in With Google</button>
      </section>
    </>
  )
}

export default AuthForm
