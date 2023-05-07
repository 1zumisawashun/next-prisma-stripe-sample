type PaymentStatusProps = {
  status: string
  message: string
}
export const PaymentStatus: React.FC<PaymentStatusProps> = ({
  status,
  message
}) => {
  switch (status) {
    case 'processing':
    case 'requires_payment_method':
    case 'requires_confirmation':
      return <h2>Processing...</h2>

    case 'requires_action':
      return <h2>Authenticating...</h2>

    case 'succeeded':
      return <h2>Payment Succeeded 🥳</h2>

    case 'error':
      return (
        <>
          <h2>Error 😭</h2>
          <p className="error-message">{message}</p>
          <p className="error-message">error</p>
        </>
      )

    default:
      return null
  }
}
