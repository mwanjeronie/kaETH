import { Card, CardContent } from "@/components/ui/card"

export function SupportedChains() {
  const chains = [
    { name: "Ethereum", logo: "/placeholder.svg?height=40&width=40" },
    { name: "Optimism", logo: "/placeholder.svg?height=40&width=40" },
    { name: "Arbitrum", logo: "/placeholder.svg?height=40&width=40" },
    { name: "Polygon", logo: "/placeholder.svg?height=40&width=40" },
    { name: "Base", logo: "/placeholder.svg?height=40&width=40" },
    { name: "zkSync", logo: "/placeholder.svg?height=40&width=40" },
    { name: "Avalanche", logo: "/placeholder.svg?height=40&width=40" },
    { name: "BSC", logo: "/placeholder.svg?height=40&width=40" },
  ]

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Supported Chains</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              kaETH supports multiple blockchain networks for seamless cross-chain exchanges
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-6 mt-8">
            {chains.map((chain) => (
              <Card key={chain.name} className="border-none shadow-none">
                <CardContent className="flex flex-col items-center justify-center p-4">
                  <img src={chain.logo || "/placeholder.svg"} alt={chain.name} className="h-10 w-10 mb-2" />
                  <span className="text-sm font-medium">{chain.name}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
