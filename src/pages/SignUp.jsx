import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'
import { db } from '../firebase.config'
import { setDoc, doc, serverTimestamp } from 'firebase/firestore'
import { toast } from 'react-toastify'
import OAuth from '../components/OAuth'

function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })

  const { name, email, password, password2 } = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    if (password.length < 6) {
      return toast.error('Password too short')
    }

    if (password !== password2) {
      return toast.error('Passwords must match')
    }

    try {
      const auth = getAuth()

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      const user = userCredential.user

      updateProfile(auth.currentUser, {
        displayName: name,
      })

      const formDataCopy = { ...formData }
      delete formDataCopy.password
      delete formDataCopy.password2

      formDataCopy.timestamp = serverTimestamp()

      await setDoc(doc(db, 'users', user.uid), formDataCopy)

      navigate('/')
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  const navigate = useNavigate()
  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Sign Up!</p>
        </header>

        <main>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              className="nameInput"
              placeholder="Name"
              id="name"
              value={name}
              onChange={onChange}
            />
            <input
              type="email"
              className="emailInput"
              placeholder="Email"
              id="email"
              value={email}
              onChange={onChange}
            />

            <div className="passwordInputDiv">
              <input
                type={showPassword ? 'text' : 'password'}
                className="passwordInput"
                placeholder="Password"
                id="password"
                value={password}
                onChange={onChange}
              />
              <img
                src={visibilityIcon}
                alt="show password"
                className="showPassword"
                onClick={() => setShowPassword((prevState) => !prevState)}
              />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              className="passwordInput"
              placeholder="Confirm Password"
              id="password2"
              value={password2}
              onChange={onChange}
            />

            <div className="signUpBar">
              <p className="signUpText">Sign Up</p>
              <button className="signUpButton">
                <ArrowRightIcon fill="#ffffff" width={'34px'} height="34px" />
              </button>
            </div>
          </form>

          <OAuth />

          <Link to={'/sign-in'} className="registerLink">
            Already have an account? Sign in
          </Link>
        </main>
      </div>
    </>
  )
}
export default SignUp
