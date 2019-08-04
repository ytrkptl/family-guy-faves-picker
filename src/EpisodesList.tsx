import React from 'react'
import { IEpisode, Dispatch, IState, FavAction } from './interfaces'
import NoPhoto from './no-image.svg';

interface IProps {
  episodes: Array<IEpisode>
  toggleFavAction: FavAction
  favorites: Array<IEpisode>
  store: { state: IState; dispatch: Dispatch }
}

export default function EpisodesList(props: IProps): Array<JSX.Element> {
  const { episodes, toggleFavAction, favorites, store } = props
  const { state, dispatch } = store

  return episodes.map((episode: IEpisode) => {
    return (
      <section key={episode.id} className=
        {favorites.find((fav: IEpisode) => fav.id === episode.id)
        ? 'episode-box-fav'
        : 'episode-box'}
      >
        <img className='' src={!!episode.image ? episode.image.medium : NoPhoto} alt={`Family Guy ${episode.name}`} style={{height: '140px'}} />
        <div className='textContainer'>
          <div className='textCol1'>
            <h4 className="episode-name">{episode.name}</h4>
            <p>Season: {episode.season} Number: {episode.number}</p>
          </div>
          <div className='textCol2'>
            <button
              type='button'
              className='favButton'
              onClick={() => toggleFavAction(state, dispatch, episode)}
            >
              {favorites.find((fav: IEpisode) => fav.id === episode.id)
                ? <p className="heartText2">&#10084;</p>
                : <p className="heartText1">&#10084;</p>}
            </button>
          </div>
        </div>
      </section>
    )
  })
}