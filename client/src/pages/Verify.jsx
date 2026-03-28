import React, { useContext, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Verify = () => {
  const [searchParams] = useSearchParams()
  const success = searchParams.get('success')
  const sessionId = searchParams.get('session_id')

  const { backendUrl, token, loadCreditsData } = useContext(AppContext)
  const navigate = useNavigate()

  const verifyStripePayment = async () => {
    try {
      if (success === 'true' && sessionId) {
        const { data } = await axios.post(
          backendUrl + '/api/user/verify-stripe',
          { sessionId },
          { headers: { token } }
        )

        if (data.success) {
          toast.success("Payment Successful! Credits Added.")
          loadCreditsData();
          navigate('/')
        } else {
          toast.error(data.message)
          navigate('/')
        }
      } else {
        toast.error("Payment was cancelled or failed.")
        navigate('/')
      }
    } catch (error) {
      toast.error(error.message)
      navigate('/')
    }
  }

  useEffect(() => {
    if (token) {
      verifyStripePayment()
    }
  }, [token])

  return (
    <div className='min-h-[60vh] flex items-center justify-center'>
      <div className="w-16 h-16 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin"></div>
    </div>
  )
}

export default Verify
