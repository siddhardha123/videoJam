import React from 'react'
import Link from 'next/link'
const Landing = () => {
  return (
            <section>
                <div className="max-w-screen-xl mx-auto px-4 py-28 gap-12 text-gray-600 md:px-8">
                    <div className="space-y-5 max-w-4xl mx-auto text-center">
                        <h1 className="text-sm text-indigo-600 font-medium">
                            Built for videoJam 
                        </h1>
                        <h2 className="text-5xl md:text-7xl text-white font-extrabold mx-auto">
                        Access exclusive content from top educators with<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] to-[#E114E5]"> our token gated Dapp </span>
                        </h2>
                        <p className="max-w-2xl mx-auto">
                        Unlock Exclusive Access to Expert-Led Meetings and Materials with NFTs
                        </p>
                        <div className="items-center justify-center gap-x-3 space-y-3 sm:flex sm:space-y-0">
                            <Link href="/AddEducator" className="block py-2 px-4 text-white font-medium bg-indigo-600 duration-150 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg shadow-lg hover:shadow-none">
                                Join as Educator
                            </Link>
                            <Link href="/Educators" className="block py-2 px-4 text-white hover:text-gray-500 font-medium duration-150 active:bg-gray-100 border rounded-lg">
                                Get access
                            </Link>
                        </div>
                    </div>
                   
                </div>
            </section>
        )
  
}

export default Landing