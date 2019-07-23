import React from 'react'
import { Store } from './Storefile'
import { Link } from '@reach/router'

export default function App({
  children
}: {
  children: JSX.Element
}): JSX.Element {
  const { state } = React.useContext(Store)

  return (
    <React.Fragment>
      <header className='headerStyle'>
        <div className='headerPart1'>
          <h1 className='title'><Link to='/'  className='titleLinkStyle'>Family Guy</Link></h1>
          <p className='subtitle'>Pick your favorite Family Guy episode!!!</p>
        </div>
        <div  className='tabs'>
          <Link to='/'  className='linkStyle'>Home</Link>
          <Link to='/faves'  className='linkStyle'>Favorites: {state.favorites.length}</Link>
        </div>
      </header>
      {children}
    </React.Fragment>
  )
}