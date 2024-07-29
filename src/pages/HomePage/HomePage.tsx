import React, { useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { User } from '../../App'
import { Button } from '@mui/material'
import { PageLabels } from '../../types/PageLabels'

interface HomePageProps {
  user?: User
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>
}

const HomePage: React.FC<HomePageProps> = ({ user, setUser }) => {
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) navigate('/login')
  }, [navigate, user])

  const handleLogout = useCallback(() => {
    setUser(undefined)
    navigate('/login')
  }, [navigate, setUser])

  if (!user) return null

  const labels: PageLabels = {
    aboutTitle: 'What is Strawberry?',
    perks: [
      'Strawberry is a portal to a world of hotels, meetings, restaurants and spas.',
      'And members can enjoy a range of additional benefits at the same time.',
      'You can use our website and app to find opportunities all over the Nordics - our goal is to fill your life with fun, meaningful and exciting experiences.',
    ],
    ctaInfo: { cta: 'Log out' },
    titleMain: 'Strawberry QA',
    titleSub: 'Welcome',
  }

  return (
    <main
      style={{ overflow: 'auto', height: '100%', width: '100%' }}
      className="page"
    >
      <div style={{ width: '30%', padding: '70px' }} className="home">
        <h1 data-testid="mainHeading">{labels.titleMain}</h1>
        <div>
          <h2 data-testid="pageSubHeading">
            {labels.titleSub}, {user.firstName}!
          </h2>
        </div>
        <Button
          data-testid="logOutButton"
          variant="contained"
          onClick={handleLogout}
        >
          {labels.ctaInfo.cta}
        </Button>
      </div>
      <div
        style={{
          justifyContent: 'normal',
        }}
        className="background"
      >
        <h1 style={{ textAlign: 'left' }} data-testid="pageDescriptionHeader">
          {labels.aboutTitle}
        </h1>
        <br />
        {labels.perks?.map((perk, index) => (
          <p
            data-testid={`pageDescriptionText${index}`}
            style={{ textAlign: 'left' }}
            key={perk}
          >
            {perk}
          </p>
        ))}
      </div>
    </main>
  )
}

export default HomePage
