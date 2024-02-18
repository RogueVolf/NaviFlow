import '@/styles/global.css';

export const metadata = {
    title: 'NaviFlow',
    description: 'A place for sharing knowledge'
}

const RootLayout = ({children}) => {
  return (
    <html lang='en'>
          <body className='w-full'>
            <div className='main'>
                <div className='gradient'>
                </div>
            </div>
              <main className='app'>
                {children}
            </main>
        </body>
    </html>
  )
}

export default RootLayout