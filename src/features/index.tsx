import { AnchorButton } from '@/components'
import styles from './index.module.scss'

export const Index = () => {
  return (
    <div className="center-wrapper -with-header">
      <div className="center-inner">
        <h1 className={styles['index-headline']}>BooxMix</h1>
        <div className="gap-container">
          <p className={styles['index-message']}>
            Make book playlists you like!
          </p>
          <div>
            <AnchorButton href="/books" variant="outlined" size="large">
              Find Books
            </AnchorButton>
          </div>
        </div>
      </div>
    </div>
  )
}
