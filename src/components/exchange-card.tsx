"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowDownUp, Info } from "lucide-react"
import { cn } from "@/lib/utils"

interface ExchangeCardProps {
  className?: string
}

export function ExchangeCard({ className }: ExchangeCardProps) {
  const [fromChain, setFromChain] = useState("optimism")
  const [toChain, setToChain] = useState("polygon")
  const [fromAmount, setFromAmount] = useState("1.0")
  const [toAmount, setToAmount] = useState("1800")

  const handleSwap = () => {
    const tempChain = fromChain
    setFromChain(toChain)
    setToChain(tempChain)

    const tempAmount = fromAmount
    setFromAmount(toAmount)
    setToAmount(tempAmount)
  }

  return (
    <Card className={cn("w-full max-w-md", className)}>
      <CardHeader>
        <CardTitle>Quick Exchange</CardTitle>
        <CardDescription>Swap ETH for stablecoins across chains</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>From</Label>
            <div className="flex gap-2">
              <Select value={fromChain} onValueChange={setFromChain}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Select chain" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="optimism">Optimism</SelectItem>
                  <SelectItem value="arbitrum">Arbitrum</SelectItem>
                  <SelectItem value="base">Base</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="eth">
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="Asset" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="eth">ETH</SelectItem>
                </SelectContent>
              </Select>
              <Input
                type="number"
                value={fromAmount}
                onChange={(e) => setFromAmount(e.target.value)}
                className="flex-1"
              />
            </div>
          </div>

          <div className="flex justify-center">
            <Button variant="ghost" size="icon" onClick={handleSwap} className="rounded-full h-8 w-8 bg-muted">
              <ArrowDownUp className="h-4 w-4" />
              <span className="sr-only">Swap</span>
            </Button>
          </div>

          <div className="space-y-2">
            <Label>To</Label>
            <div className="flex gap-2">
              <Select value={toChain} onValueChange={setToChain}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Select chain" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="polygon">Polygon</SelectItem>
                  <SelectItem value="ethereum">Ethereum</SelectItem>
                  <SelectItem value="bsc">BSC</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="usdc">
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="Asset" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="usdc">USDC</SelectItem>
                  <SelectItem value="usdt">USDT</SelectItem>
                  <SelectItem value="dai">DAI</SelectItem>
                </SelectContent>
              </Select>
              <Input type="number" value={toAmount} onChange={(e) => setToAmount(e.target.value)} className="flex-1" />
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-muted p-3 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Info className="h-4 w-4" />
            <span>Exchange rate: 1 ETH ≈ 1800 USDC</span>
          </div>
          <div className="mt-2 flex justify-between text-xs text-muted-foreground">
            <span>Fee: 0.1%</span>
            <span>Estimated time: 2-5 min</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600">
          Connect Wallet to Exchange
        </Button>
      </CardFooter>
    </Card>
  )
}
