import React from 'react'
import App from './App'
import { Store } from './Storefile'
import { IEpisodeProps } from './interfaces'
import { toggleFavAction } from './Actions'

const EpisodeList = React.lazy<any>(() => import('./EpisodesList'))

export default function FavPage(): JSX.Element {
  const { state, dispatch } = React.useContext(Store)

  const props: IEpisodeProps = {
    episodes: state.favorites,
    store: { state, dispatch },
    toggleFavAction,
    favorites: state.favorites
  }

  return (
    <App>
      <React.Suspense fallback={<div>loading...</div>}>
        <div className='episode-layout'>
          <EpisodeList {...props} />
          {props.favorites.length===0? 
          <div className='favDefaultText'>
            <h3 style={{padding: '10px', textAlign: 'center'}}>{`You haven't marked any items as favorites yet!`}</h3>
            <h3 style={{padding: '10px', textAlign: 'center'}}>{`Navigate back to the home page to mark items as favorites.`}</h3>
          </div>
          : null}
        </div>
      </React.Suspense>
    </App>
  )
}