import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User } from '../../App'
import { Form } from './Form'
import { PageLabels } from '../../types/PageLabels'

interface SignupPageProps {
  user?: User
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>
}

const SignupPage: React.FC<SignupPageProps> = ({ user, setUser }) => {
  const navigate = useNavigate()

  useEffect(() => {
    if (user) navigate('/')
  }, [navigate, user])

  const labels: PageLabels = {
    aboutTitle: 'You should join us because:',
    perks: ['We are a nice company', 'Free breakfast!'],
    ctaInfo: { text: 'Already have an account?', cta: 'Login' },
    titleMain: 'Strawberry QA',
    titleSub: 'Become a member',
  }

  return (
    <main
      style={{ overflow: 'auto', height: '100%', width: '100%' }}
      className="page"
    >
      <div className="signup">
        <h1 data-testid="mainHeading">{labels.titleMain}</h1>
        <div style={{ width: '100%', paddingRight: '2rem' }}>
          <h2 data-testid="pageSubHeading">{labels.titleSub}</h2>
          <Form setUser={setUser} />
        </div>
        <br />
        {labels.ctaInfo.text}{' '}
        <Link data-testid="loginLink" to={`/login`}>
          {labels.ctaInfo.cta}
        </Link>
      </div>

      <div className="background">
        <h1 data-testid="pageDescriptionText">{labels.aboutTitle}</h1>
        <br />
        {labels.perks?.map((perk) => <p key={perk}>- {perk}</p>)}
      </div>
    </main>
  )
}

export default SignupPage
