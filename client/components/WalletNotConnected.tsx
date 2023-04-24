import { ConnectButton } from '@rainbow-me/rainbowkit';
const WalletNotConnected =  () => {
    return (
        <section className="py-28" >
            <div className="max-w-screen-xl mx-auto px-4 md:text-center md:px-8">
                <div className="max-w-xl space-y-3 md:mx-auto">
                   
                    <p className="text-white text-3xl  text-justify font-semibold sm:text-4xl">
                        Dont have access to the meet 
                    </p>
                    <div>
                    <ConnectButton />

                    </div>
                   
                </div>
               
            </div>
        </section>
    )
}

export default WalletNotConnected;