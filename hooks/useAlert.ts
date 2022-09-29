import { useCallback, useMemo, useState } from 'react'

type AlertState = {
  alertMessage: string
  alertColor: "error" | "warning" | "info" | "success" | ''
}

const useAlert = () => {
  const [alert, setAlert] = useState<AlertState>({ alertMessage: '', alertColor: '' })
  const { alertMessage, alertColor } = alert
  const alertOpen = alertMessage ? true : false

  const closeAlert = useCallback(
    ({ handleClose }: { handleClose?: Function }) => {
      setAlert({
        alertMessage: '',
        alertColor: '',
      })

      if (handleClose && typeof handleClose === 'function') handleClose()
    },
    [alert]
  )

  const showAlert = useCallback(
    ({ alertMessage, alertColor }: AlertState) => {
      setAlert({
        alertMessage,
        alertColor,
      })
    },
    [alert]
  )

  return useMemo(() => {
    return { showAlert, closeAlert, alertOpen, alertMessage, alertColor }
  }, [alert, alertOpen, alertMessage, alertColor])
}

export default useAlert
