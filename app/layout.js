import './globals.css'

export const metadata = {
  title: 'FitSL',
  description: 'Revolutionize diet management'
}

export default function RootLayout ({ children }) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  )
}
