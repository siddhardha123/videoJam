import Image from 'next/image'
import { Inter } from 'next/font/google'
import NavBar from '@/components/NavBar'
import Landing from '@/components/Landing'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
  
      <div className=''>
            {/* <NavBar/> */}
            <Landing/>
      </div>
  )
}
