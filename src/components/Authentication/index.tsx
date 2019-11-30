import React, { PropsWithChildren, useEffect } from 'react'
import { connect } from 'react-redux'
import { Redux } from '../../@types'
import { saveSession } from '../../store/modules/auth/actions'
import { selectSession } from '../../store/modules/auth/selectors'

interface ComponentProps extends PropsWithChildren<{}> {}

interface StateProps {
  session: string
}

interface DispatchProps {
  saveSession: typeof saveSession
}

interface Props extends StateProps, DispatchProps, ComponentProps {}

const Authentication = ({ session, saveSession, children }: Props) => {
  useEffect(() => {
    if (!session) {
      saveSession()
    }
  }, [session])

  if (!session) {
    return null
  }

  return <>{children}</>
}

const mapStateToProps = (state: Redux) => ({
  session: selectSession(state),
})

export default connect(mapStateToProps, { saveSession })(Authentication)
