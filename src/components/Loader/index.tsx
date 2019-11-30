import CircularProgress from '@material-ui/core/CircularProgress'
import React from 'react'
import { Offset, Overlay } from './styled'

export enum LoaderType {
  OVERLAY = 'overlay',
  OFFSET = 'offset',
  DEFAULT = 'default',
}

interface Props {
  type?: LoaderType
}

const Loader = ({ type = LoaderType.OFFSET }: Props) => {
  switch (type) {
    case LoaderType.OFFSET:
      return (
        <Offset>
          <CircularProgress />
        </Offset>
      )
    case LoaderType.OVERLAY:
      return (
        <Overlay>
          <CircularProgress color="inherit" />
        </Overlay>
      )
    case LoaderType.DEFAULT:
    default:
      return <CircularProgress />
  }
}

export default Loader
