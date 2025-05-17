"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Wallet, Info, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { createWalletClient, custom, getAddress, type WalletClient } from "viem"
import { mainnet, base, optimism, arbitrum } from "viem/chains"

export function ExchangeComponent() {
  // State for exchange form
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [walletClient, setWalletClient] = useState<WalletClient | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  // ETH request state
  const [targetChain, setTargetChain] = useState("optimism")
  const [ethAmount, setEthAmount] = useState("0.01")
  const [recipientAddress, setRecipientAddress] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("usdc")
  const [paymentChain, setPaymentChain] = useState("base")
  const [paymentAmount, setPaymentAmount] = useState("18")

  // Chain options for ETH
  const ethChains = [
    { id: "ethereum", name: "Ethereum", gasEstimate: "0.005 ETH" },
    { id: "optimism", name: "Optimism", gasEstimate: "0.001 ETH" },
    { id: "arbitrum", name: "Arbitrum", gasEstimate: "0.0008 ETH" },
    { id: "base", name: "Base", gasEstimate: "0.0005 ETH" },
    { id: "zksync", name: "zkSync", gasEstimate: "0.0003 ETH" },
    { id: "linea", name: "Linea", gasEstimate: "0.0004 ETH" },
    { id: "scroll", name: "Scroll", gasEstimate: "0.0006 ETH" },
    { id: "metis", name: "Metis", gasEstimate: "0.0004 ETH" },
    { id: "mantle", name: "Mantle", gasEstimate: "0.0003 ETH" },
    { id: "mode", name: "Mode", gasEstimate: "0.0004 ETH" },
    { id: "polygon", name: "Polygon", gasEstimate: "0.1 MATIC" },
  ]

  // Payment options - only tokens available on Base
  const baseTokens = [
    { id: "usdc", name: "USDC" },
    { id: "eth", name: "ETH" },
    { id: "weth", name: "WETH" },
    { id: "dai", name: "DAI" },
    { id: "usdt", name: "USDT" },
  ]

  // Check if wallet is already connected on component mount
  useEffect(() => {
    const checkWalletConnection = async () => {
      try {
        // Check if ethereum object exists (MetaMask or other injected wallet)
        if (typeof window !== "undefined" && window.ethereum) {
          // Get connected accounts
          const accounts = await window.ethereum.request({ method: "eth_accounts" })

          if (accounts && accounts.length > 0) {
            const address = getAddress(accounts[0]) // Normalize the address
            setWalletAddress(address)
            setRecipientAddress(address)
            setIsWalletConnected(true)

            // Create wallet client
            const client = createWalletClient({
              chain: getChainForTarget(targetChain),
              transport: custom(window.ethereum),
            })
            setWalletClient(client)
          }
        }
      } catch (error) {
        console.error("Error checking wallet connection:", error)
      }
    }

    checkWalletConnection()
  }, [targetChain])

  // Get viem chain object for the selected target chain
  const getChainForTarget = (chainId: string) => {
    switch (chainId) {
      case "ethereum":
        return mainnet
      case "base":
        return base
      case "optimism":
        return optimism
      case "arbitrum":
        return arbitrum
      default:
        return mainnet // Default to mainnet
    }
  }

  // Get available chains for selected payment method
  const getPaymentChains = (cryptoId) => {
    // For now, only return base regardless of the payment method
    return ["base"]
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

    // Update wallet client with new chain if connected
    if (isWalletConnected && window.ethereum) {
      const client = createWalletClient({
        chain: getChainForTarget(value),
        transport: custom(window.ethereum),
      })
      setWalletClient(client)
    }
  }

  // Handle ETH amount change
  const handleEthAmountChange = (value) => {
    setEthAmount(value)
    // Calculate equivalent payment amount (simplified calculation)
    const numValue = Number.parseFloat(value) || 0
    if (paymentMethod === "usdc" || paymentMethod === "usdt" || paymentMethod === "dai") {
      setPaymentAmount((numValue * 1800).toString())
    } else if (paymentMethod === "eth" || paymentMethod === "weth") {
      setPaymentAmount(numValue.toString())
    } else {
      setPaymentAmount((numValue * 1800).toString()) // Default to stablecoin rate
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

  // Connect wallet function using viem
  const connectWallet = async (walletType: string) => {
    setIsLoading(true)

    try {
      if (typeof window === "undefined" || !window.ethereum) {
        alert("Please install MetaMask or another Ethereum wallet to connect")
        setIsLoading(false)
        return
      }

      // Request account access
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })

      if (accounts && accounts.length > 0) {
        const address = getAddress(accounts[0]) // Normalize the address

        // Create wallet client
        const client = createWalletClient({
          chain: getChainForTarget(targetChain),
          transport: custom(window.ethereum),
        })

        setWalletClient(client)
        setWalletAddress(address)
        setRecipientAddress(address)
        setIsWalletConnected(true)
        setDialogOpen(false) // Close the dialog
      }
    } catch (error) {
      console.error("Error connecting wallet:", error)
      alert("Failed to connect wallet. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // Request ETH function
  const requestEth = async () => {
    setIsLoading(true)

    try {
      if (!walletClient) {
        throw new Error("Wallet not connected")
      }

      // In a real app, you would interact with a smart contract here
      // For this demo, we'll just show a success message
      alert(
        `ETH Request Created: ${ethAmount} ETH on ${targetChain} to be sent to ${recipientAddress}. You will pay ${paymentAmount} ${paymentMethod.toUpperCase()} on ${paymentChain}.`,
      )
    } catch (error) {
      console.error("Error requesting ETH:", error)
      alert("Failed to request ETH. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // Format address for display
  const formatAddress = (address: string) => {
    if (!address) return ""
    return `${address.slice(0, 6)}...${address.slice(-4)}`
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
              {formatAddress(walletAddress)}
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
            <SelectContent position="popper" className="max-h-[300px] overflow-y-auto">
              {ethChains.map((chain) => (
                <SelectItem key={chain.id} value={chain.id}>
                  {chain.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* ETH Amount */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="eth-amount">ETH Amount</Label>
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
            <SelectContent position="popper" className="max-h-[300px] overflow-y-auto">
              {baseTokens.map((token) => (
                <SelectItem key={token.id} value={token.id}>
                  {token.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="text-xs text-muted-foreground">Only showing tokens available on Base</div>
        </div>

        {/* Payment Chain */}
        <div className="space-y-2">
          <Label>Payment Network</Label>
          <Select value={paymentChain} onValueChange={setPaymentChain}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select payment network" />
            </SelectTrigger>
            <SelectContent position="popper" className="max-h-[300px] overflow-y-auto">
              <SelectItem value="base">Base</SelectItem>
              <div className="px-2 py-2 text-xs text-muted-foreground italic border-t mt-1">
                More payment networks coming soon...
              </div>
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
      <CardFooter className="flex flex-col gap-3">
        {!isWalletConnected ? (
          <>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
                  onClick={() => setDialogOpen(true)}
                >
                  <Wallet className="mr-2 h-4 w-4" /> Connect Wallet
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
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
              onClick={() => window.open("https://base.org/ecosystem", "_blank")}
            >
              Connect with Base Wallet <ExternalLink className="h-4 w-4" />
            </Button>
          </>
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

// Add TypeScript interface for window.ethereum
declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean
      request: (args: { method: string; params?: any[] }) => Promise<any>
    }
  }
}
