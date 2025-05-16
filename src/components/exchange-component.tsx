"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Wallet, Info } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function ExchangeComponent() {
  // State for exchange form
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // ETH request state
  const [targetChain, setTargetChain] = useState("optimism")
  const [ethAmount, setEthAmount] = useState("0.01")
  const [recipientAddress, setRecipientAddress] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("usdc")
  const [paymentChain, setPaymentChain] = useState("polygon")
  const [paymentAmount, setPaymentAmount] = useState("18")

  // Chain options for ETH
  const ethChains = [
    { id: "optimism", name: "Optimism", gasEstimate: "0.001 ETH" },
    { id: "arbitrum", name: "Arbitrum", gasEstimate: "0.0008 ETH" },
    { id: "base", name: "Base", gasEstimate: "0.0005 ETH" },
    { id: "zksync", name: "zkSync", gasEstimate: "0.0003 ETH" },
    { id: "polygon", name: "Polygon", gasEstimate: "0.1 MATIC" },
  ]

  // Payment options
  const paymentCryptos = [
    { id: "usdc", name: "USDC", chains: ["ethereum", "polygon", "arbitrum", "optimism", "base"] },
    { id: "usdt", name: "USDT", chains: ["ethereum", "tron", "polygon", "bsc"] },
    { id: "dai", name: "DAI", chains: ["ethereum", "polygon", "optimism"] },
    { id: "bnb", name: "BNB", chains: ["bsc"] },
    { id: "matic", name: "MATIC", chains: ["polygon", "ethereum"] },
    { id: "sol", name: "SOL", chains: ["solana"] },
  ]

  // Get available chains for selected payment method
  const getPaymentChains = (cryptoId) => {
    const crypto = paymentCryptos.find((c) => c.id === cryptoId)
    return crypto ? crypto.chains : []
  }

  // Handle chain selection
  const handleTargetChainChange = (value) => {
    setTargetChain(value)
    // Update gas estimate based on chain
    const chain = ethChains.find((c) => c.id === value)
    if (chain) {
      // Default to a small amount suitable for gas on this chain
      if (value === "polygon") {
        setEthAmount("0.1") // For MATIC
      } else {
        setEthAmount("0.01") // For ETH
      }
    }
  }

  // Handle ETH amount change
  const handleEthAmountChange = (value) => {
    setEthAmount(value)
    // Calculate equivalent payment amount (simplified calculation)
    const numValue = Number.parseFloat(value) || 0
    if (paymentMethod === "usdc" || paymentMethod === "usdt" || paymentMethod === "dai") {
      setPaymentAmount((numValue * 1800).toString())
    } else if (paymentMethod === "bnb") {
      setPaymentAmount((numValue * 10).toString())
    } else if (paymentMethod === "matic") {
      setPaymentAmount(((numValue * 1800) / 0.7).toString())
    } else if (paymentMethod === "sol") {
      setPaymentAmount(((numValue * 1800) / 60).toString())
    }
  }

  // Handle payment method change
  const handlePaymentMethodChange = (value) => {
    setPaymentMethod(value)
    // Set default chain for this payment method
    const chains = getPaymentChains(value)
    if (chains.length > 0) {
      setPaymentChain(chains[0])
    }

    // Recalculate payment amount
    handleEthAmountChange(ethAmount)
  }

  // Connect wallet function
  const connectWallet = (walletType) => {
    setIsLoading(true)

    // Simulate wallet connection - in a real app, you would use ethers.js or web3.js
    setTimeout(() => {
      setIsWalletConnected(true)
      setWalletAddress("0x1234...5678")
      setRecipientAddress("0x1234...5678") // Auto-fill recipient with connected wallet
      setIsLoading(false)
    }, 1000)
  }

  // Request ETH function
  const requestEth = () => {
    setIsLoading(true)

    // Simulate order creation - in a real app, this would interact with smart contracts or backend
    setTimeout(() => {
      alert(
        `ETH Request Created: ${ethAmount} ETH on ${targetChain} to be sent to ${recipientAddress}. You will pay ${paymentAmount} ${paymentMethod.toUpperCase()} on ${paymentChain}.`,
      )
      setIsLoading(false)
    }, 2000)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl">Get ETH for Gas</CardTitle>
            <CardDescription>Request small amounts of ETH for transaction fees</CardDescription>
          </div>
          {isWalletConnected && (
            <Badge variant="outline" className="px-2 py-1">
              {walletAddress}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Target Chain Selection */}
        <div className="space-y-2">
          <Label>I need ETH on</Label>
          <Select value={targetChain} onValueChange={handleTargetChainChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select chain" />
            </SelectTrigger>
            <SelectContent>
              {ethChains.map((chain) => (
                <SelectItem key={chain.id} value={chain.id}>
                  {chain.name} (Est. gas: {chain.gasEstimate})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* ETH Amount */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="eth-amount">ETH Amount</Label>
            <span className="text-xs text-muted-foreground">For gas fees (~5-10 transactions)</span>
          </div>
          <div className="flex gap-2">
            <Input
              id="eth-amount"
              type="number"
              value={ethAmount}
              onChange={(e) => handleEthAmountChange(e.target.value)}
              placeholder="0.01"
              className="flex-1"
            />
            <span className="flex items-center px-3 bg-muted rounded-md text-sm">
              {targetChain === "polygon" ? "MATIC" : "ETH"}
            </span>
          </div>
          <div className="text-xs text-muted-foreground">Recommended: 0.01 ETH for most L2 chains</div>
        </div>

        {/* Recipient Address */}
        <div className="space-y-2">
          <Label htmlFor="recipient">Recipient Address</Label>
          <Input
            id="recipient"
            value={recipientAddress}
            onChange={(e) => setRecipientAddress(e.target.value)}
            placeholder="0x..."
            className="font-mono text-sm"
          />
          <div className="text-xs text-muted-foreground">The address where you want to receive the ETH</div>
        </div>

        {/* Payment Method */}
        <div className="space-y-2">
          <Label>I'll pay with</Label>
          <Select value={paymentMethod} onValueChange={handlePaymentMethodChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select payment method" />
            </SelectTrigger>
            <SelectContent>
              {paymentCryptos.map((crypto) => (
                <SelectItem key={crypto.id} value={crypto.id}>
                  {crypto.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Payment Chain */}
        <div className="space-y-2">
          <Label>Payment Network</Label>
          <Select value={paymentChain} onValueChange={setPaymentChain}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select payment network" />
            </SelectTrigger>
            <SelectContent>
              {getPaymentChains(paymentMethod).map((chainId) => {
                const chainName = chainId.charAt(0).toUpperCase() + chainId.slice(1)
                return (
                  <SelectItem key={chainId} value={chainId}>
                    {chainName}
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
        </div>

        {/* Trade Summary */}
        <div className="rounded-lg bg-muted p-3 text-sm">
          <div className="flex items-center gap-2 mb-2">
            <Info className="h-4 w-4" />
            <span className="font-medium">Transaction Summary</span>
          </div>
          <div className="space-y-1 text-muted-foreground">
            <div className="flex justify-between">
              <span>You will receive:</span>
              <span>
                {ethAmount} {targetChain === "polygon" ? "MATIC" : "ETH"} on{" "}
                {targetChain.charAt(0).toUpperCase() + targetChain.slice(1)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>You will pay:</span>
              <span>
                {paymentAmount} {paymentMethod.toUpperCase()} on{" "}
                {paymentChain.charAt(0).toUpperCase() + paymentChain.slice(1)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Service fee:</span>
              <span>1%</span>
            </div>
            <div className="flex justify-between">
              <span>Estimated delivery:</span>
              <span>5-15 minutes</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        {!isWalletConnected ? (
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600">
                <Wallet className="mr-2 h-4 w-4" /> Connect Wallet to Continue
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Connect your wallet</DialogTitle>
                <DialogDescription>Choose your preferred wallet provider to connect to kaETH.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Button
                  onClick={() => connectWallet("metamask")}
                  className="flex items-center justify-between"
                  disabled={isLoading}
                >
                  <span>MetaMask</span>
                  <img src="/placeholder.svg?height=24&width=24" alt="MetaMask" className="h-6 w-6" />
                </Button>
                <Button
                  onClick={() => connectWallet("walletconnect")}
                  className="flex items-center justify-between"
                  disabled={isLoading}
                >
                  <span>WalletConnect</span>
                  <img src="/placeholder.svg?height=24&width=24" alt="WalletConnect" className="h-6 w-6" />
                </Button>
                <Button
                  onClick={() => connectWallet("coinbase")}
                  className="flex items-center justify-between"
                  disabled={isLoading}
                >
                  <span>Coinbase Wallet</span>
                  <img src="/placeholder.svg?height=24&width=24" alt="Coinbase Wallet" className="h-6 w-6" />
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        ) : (
          <Button
            className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
            onClick={requestEth}
            disabled={isLoading || !recipientAddress}
          >
            {isLoading ? "Processing..." : "Request ETH for Gas"}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
