import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { ArrowDownUp, Info, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function ExchangeInterface() {
  const [exchangeType, setExchangeType] = useState("market")
  const [fromChain, setFromChain] = useState("optimism")
  const [toChain, setToChain] = useState("polygon")
  const [fromAsset, setFromAsset] = useState("eth")
  const [toAsset, setToAsset] = useState("usdc")
  const [fromAmount, setFromAmount] = useState("1.0")
  const [toAmount, setToAmount] = useState("1800")
  const [advancedMode, setAdvancedMode] = useState(false)

  const handleSwap = () => {
    const tempChain = fromChain
    setFromChain(toChain)
    setToChain(tempChain)

    const tempAsset = fromAsset
    setFromAsset(toAsset)
    setToAsset(tempAsset)

    const tempAmount = fromAmount
    setFromAmount(toAmount)
    setToAmount(tempAmount)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Exchange</CardTitle>
            <CardDescription>Trade ETH for stablecoins across chains</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="advanced-mode" checked={advancedMode} onCheckedChange={setAdvancedMode} />
            <Label htmlFor="advanced-mode">Advanced</Label>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="market" onValueChange={setExchangeType}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="market">Market Order</TabsTrigger>
            <TabsTrigger value="limit">Limit Order</TabsTrigger>
          </TabsList>
          <TabsContent value="market" className="space-y-4 pt-4">
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
                      <SelectItem value="zksync">zkSync</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={fromAsset} onValueChange={setFromAsset}>
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
                <div className="text-xs text-muted-foreground">Balance: 5.43 ETH</div>
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
                      <SelectItem value="avalanche">Avalanche</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={toAsset} onValueChange={setToAsset}>
                    <SelectTrigger className="w-[100px]">
                      <SelectValue placeholder="Asset" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usdc">USDC</SelectItem>
                      <SelectItem value="usdt">USDT</SelectItem>
                      <SelectItem value="dai">DAI</SelectItem>
                      <SelectItem value="busd">BUSD</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    type="number"
                    value={toAmount}
                    onChange={(e) => setToAmount(e.target.value)}
                    className="flex-1"
                  />
                </div>
                <div className="text-xs text-muted-foreground">Balance: 2,450.00 USDC</div>
              </div>
            </div>

            {advancedMode && (
              <div className="space-y-4 pt-2">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="slippage">Slippage Tolerance</Label>
                    <Select defaultValue="0.5">
                      <SelectTrigger id="slippage">
                        <SelectValue placeholder="Slippage" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0.1">0.1%</SelectItem>
                        <SelectItem value="0.5">0.5%</SelectItem>
                        <SelectItem value="1.0">1.0%</SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gas-option">Gas Option</Label>
                    <Select defaultValue="standard">
                      <SelectTrigger id="gas-option">
                        <SelectValue placeholder="Gas Option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="economy">Economy</SelectItem>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="fast">Fast</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Bridge Information</AlertTitle>
                  <AlertDescription>
                    This exchange will use Connext for bridging assets across chains. Estimated time: 5-10 minutes.
                  </AlertDescription>
                </Alert>
              </div>
            )}

            <div className="rounded-lg bg-muted p-3 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Info className="h-4 w-4" />
                <span>Exchange rate: 1 ETH ≈ 1800 USDC</span>
              </div>
              <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                <span>Platform fee: 0.1%</span>
                <span>Gas fee: ~$2.50</span>
                <span>Estimated time: 2-5 min</span>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="limit" className="space-y-4 pt-4">
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
                  <Select value={fromAsset} onValueChange={setFromAsset}>
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
                  <Select value={toAsset} onValueChange={setToAsset}>
                    <SelectTrigger className="w-[100px]">
                      <SelectValue placeholder="Asset" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usdc">USDC</SelectItem>
                      <SelectItem value="usdt">USDT</SelectItem>
                      <SelectItem value="dai">DAI</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    type="number"
                    value={toAmount}
                    onChange={(e) => setToAmount(e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Limit Price (USDC per ETH)</Label>
                <Input type="number" defaultValue="1850" />
              </div>

              <div className="space-y-2">
                <Label>Expiration</Label>
                <Select defaultValue="24h">
                  <SelectTrigger>
                    <SelectValue placeholder="Select expiration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1h">1 hour</SelectItem>
                    <SelectItem value="24h">24 hours</SelectItem>
                    <SelectItem value="7d">7 days</SelectItem>
                    <SelectItem value="30d">30 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Alert variant="warning">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Limit Order Information</AlertTitle>
              <AlertDescription>
                Your order will be executed when the market price reaches your limit price. A small deposit is required
                to place this order.
              </AlertDescription>
            </Alert>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600">
          Connect Wallet to Exchange
        </Button>
      </CardFooter>
    </Card>
  )
}
