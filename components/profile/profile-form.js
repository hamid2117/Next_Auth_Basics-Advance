import classes from './profile-form.module.css'
import { useRef, useState } from 'react'
function ProfileForm() {
  const newPasswordInput = useRef()
  const oldPasswordInput = useRef()
  const [notify, setNotify] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!newPasswordInput.current.value || !oldPasswordInput.current.value) {
      setNotify(true)
    }
    fetch('/api/user/change-password', {
      method: 'PATCH',
      body: JSON.stringify({
        newPassword: newPasswordInput.current.value,
        oldPassword: oldPasswordInput.current.value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      {notify && <h2 style={{ color: 'red' }}>Please review your inputs </h2>}
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={newPasswordInput} />
      </div>
      <div className={classes.control}>
        <label htmlFor='old-password'>Old Password</label>
        <input type='password' id='old-password' ref={oldPasswordInput} />
      </div>
      <div className={classes.action}>
        <button type='submit'>Change Password</button>
      </div>
    </form>
  )
}

export default ProfileForm
