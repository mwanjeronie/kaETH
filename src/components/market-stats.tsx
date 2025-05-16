import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDown, ArrowUp } from "lucide-react"

export function MarketStats() {
  const stats = [
    {
      pair: "ETH/USDC",
      price: "1,800.25",
      change: "+2.5%",
      volume: "$5.2M",
      isPositive: true,
    },
    {
      pair: "ETH/USDT",
      price: "1,798.50",
      change: "+2.3%",
      volume: "$4.8M",
      isPositive: true,
    },
    {
      pair: "ETH/DAI",
      price: "1,795.75",
      change: "-0.5%",
      volume: "$2.1M",
      isPositive: false,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Market Stats</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {stats.map((stat) => (
            <div key={stat.pair} className="flex items-center justify-between">
              <div>
                <div className="font-medium">{stat.pair}</div>
                <div className="text-sm text-muted-foreground">Vol: {stat.volume}</div>
              </div>
              <div className="text-right">
                <div className="font-medium">${stat.price}</div>
                <div
                  className={`text-sm flex items-center justify-end ${stat.isPositive ? "text-green-500" : "text-red-500"}`}
                >
                  {stat.isPositive ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                  {stat.change}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
