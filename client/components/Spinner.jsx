import ClipLoader from 'react-spinners/SyncLoader'

import styles from './Spinner.module.scss'

const override = {
  display: 'flex',
  margin: '0 auto',
  borderColor: '#eac3ff',
}

const Spinner = ({ loading }) => {
  return (
    <>
      <div>
        <div className={styles.loadingContainer}>
          <ClipLoader
            color='#D08C54'
            loading={loading}
            cssOverride={override}
            size={25}
            aria-label='Loading Spinner'
          />
        </div>
      </div>

      <div data-testid='bananas' />
    </>
  )
}

export default Spinner
