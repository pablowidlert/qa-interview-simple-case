import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User } from '../../App'
import { Form } from './Form'
import { PageLabels } from '../../types/PageLabels'

interface LoginPageProps {
  user?: User
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>
}

const LoginPage: React.FC<LoginPageProps> = ({ user, setUser }) => {
  const navigate = useNavigate()

  useEffect(() => {
    if (user) navigate('/')
  }, [navigate, user])

  const labels: PageLabels = {
    aboutTitle: 'Welcome to the Strawberry QA Chapter website!',
    ctaInfo: { text: "Don't have an account?", cta: 'Signup' },
    titleMain: 'Strawberry QA',
    titleSub: 'Login',
  }

  return (
    <main
      style={{ overflow: 'auto', height: '100%', width: '100%' }}
      className="page"
    >
      <div className="login">
        <h1 data-testid="mainHeading">{labels.titleMain}</h1>
        <h2 data-testid="pageSubHeading">{labels.titleSub}</h2>
        <Form setUser={setUser} />
        <br />
        {labels.ctaInfo.text}
        <Link data-testid="signUpLink" to={`/signup`}>
          {labels.ctaInfo.cta}
        </Link>
        <br />
      </div>
      <div className="background">
        <h1 data-testid="pageDescriptionText">{labels.aboutTitle}</h1>
      </div>
    </main>
  )
}

export default LoginPage
