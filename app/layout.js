import './globals.css'

export const metadata = {
  title: 'NutriSL',
  description: 'Revolutionize diet management'
}

export default function RootLayout ({ children }) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  )
}
