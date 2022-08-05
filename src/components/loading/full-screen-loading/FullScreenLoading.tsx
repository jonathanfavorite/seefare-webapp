import React, {useContext} from 'react'
import { LoadingContext } from '../../../contexts/LoadingContext'
import { Boat } from '../../icons/Icons'
import RotatingBoat from '../../icons/RotatingBoat'
import './FullScreenLoading.scss'
interface FullScreenLoadingProps {
    text?: string
}

function FullScreenLoading(props: FullScreenLoadingProps, {
}) {
  const loadingCtx = useContext(LoadingContext)
  return (
    <div className="full-screen-loading">
      <div className="spinner"><RotatingBoat size={100} /></div>
        <div className="text">{loadingCtx.loadingText}</div>
    </div>
  )
}

export default FullScreenLoading