import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Wallet, LogOut } from "lucide-react"

export function ConnectWalletButton() {
  const [connected, setConnected] = useState(false)
  const [address, setAddress] = useState("")

  const handleConnect = (walletType: string) => {
    // Simulate wallet connection
    setAddress("0x1234...5678")
    setConnected(true)
  }

  const handleDisconnect = () => {
    setConnected(false)
    setAddress("")
  }

  if (connected) {
    return (
      <Button variant="outline" onClick={handleDisconnect} className="flex items-center gap-2">
        <span className="hidden sm:inline">{address}</span>
        <span className="sm:hidden">0x12...78</span>
        <LogOut className="h-4 w-4" />
      </Button>
    )
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600">
          <Wallet className="mr-2 h-4 w-4" /> Connect Wallet
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Connect your wallet</DialogTitle>
          <DialogDescription>Choose your preferred wallet provider to connect to kaETH.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Button onClick={() => handleConnect("metamask")} className="flex items-center justify-between">
            <span>MetaMask</span>
            <img src="/placeholder.svg?height=24&width=24" alt="MetaMask" className="h-6 w-6" />
          </Button>
          <Button onClick={() => handleConnect("walletconnect")} className="flex items-center justify-between">
            <span>WalletConnect</span>
            <img src="/placeholder.svg?height=24&width=24" alt="WalletConnect" className="h-6 w-6" />
          </Button>
          <Button onClick={() => handleConnect("coinbase")} className="flex items-center justify-between">
            <span>Coinbase Wallet</span>
            <img src="/placeholder.svg?height=24&width=24" alt="Coinbase Wallet" className="h-6 w-6" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
