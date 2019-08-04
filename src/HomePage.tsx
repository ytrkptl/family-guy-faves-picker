import React from 'react'

import App from './App'
import { Store } from './Storefile'
import { IEpisodeProps } from './interfaces'
import { fetchDataAction, toggleFavAction } from './Actions'
import { JSXElement } from '@babel/types';
const EpisodeList = React.lazy<any>(() => import('./EpisodesList'))

const HomePage = () => {
  const { state, dispatch } = React.useContext(Store)
  React.useEffect(() => {
    state.episodes.length === 0 && fetchDataAction(dispatch)
  })

  const [display, setDisplay] = React.useState('none');
  
  const floatingBtn : any = React.useRef();
  const epilayout:any = React.useRef();

  const getScrollPosition = (element:any) => {
    return element.current.scrollTop;
  }

  const setDisplayBasedOnScrollPos = (element: any) => {
      let scrollPos = getScrollPosition(epilayout);
      scrollPos > 20 ? setDisplay('flex') : setDisplay('none');
  }

  const handleClick:any = () => {epilayout.current.scrollTop = 0}
  const handleScroll:any = React.useEffect(()=>{
    let var1 = epilayout.current;
    epilayout.current.addEventListener('scroll', setDisplayBasedOnScrollPos)
    return () => {
      var1.removeEventListener('scroll', setDisplayBasedOnScrollPos)
    }
  })
  
  const props: IEpisodeProps = {
    episodes: state.episodes,
    store: { state, dispatch },
    toggleFavAction,
    favorites: state.favorites
  }

  return (
    <App>
      <React.Suspense fallback={<div>loading...</div>}>
        <section className='episode-layout' ref={epilayout} onScroll={handleScroll}>
          <EpisodeList {...props} />
          <span ref={floatingBtn} id="floatingBtn" style={{display: `${display}`}} onClick={handleClick}>&#8679;</span>
        </section>
      </React.Suspense>
    </App>
  )
}

export default HomePage;