import { ExchangeComponent } from "@/components/exchange-component"
import { HowItWorks } from "@/components/how-it-works"
import { SupportedChains } from "@/components/supported-chains"

// Pure React functional component
export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      
      <main className="flex-1 flex items-center justify-center bg-gradient-to-b from-background to-background/80 py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-6">
              kaETH: P2P Crypto Exchange Platform
            </h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl text-center mb-10">
              Buy and sell cryptocurrencies directly with other users across multiple blockchains with low fees and
              secure transactions
            </p>
            <ExchangeComponent />
          </div>
        </div>
      </main>
      <HowItWorks />
      <SupportedChains />
      <footer className="border-t py-6">
        <div className="container px-4 md:px-6 text-center text-sm text-muted-foreground">
          <p>© 2025 kaETH. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
