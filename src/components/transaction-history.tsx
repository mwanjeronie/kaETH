import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight, ExternalLink, Search } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Helper function for Badge styling
const getBadgeProps = (
  status: string,
): { variant: "default" | "secondary" | "destructive" | "outline"; className: string; label: string } => {
  switch (status) {
    case "completed":
      return {
        variant: "default", // Updated to a valid variant
        className: "bg-green-500/10 text-green-500 hover:bg-green-500/20 hover:text-green-500",
        label: "Completed",
      }
    case "in progress":
      return {
        variant: "secondary", // Updated to a valid variant
        className: "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 hover:text-yellow-500",
        label: "In Progress",
      }
    case "failed":
      return {
        variant: "destructive", // Updated to a valid variant
        className: "bg-red-500/10 text-red-500 hover:bg-red-500/20 hover:text-red-500",
        label: "Failed",
      }
    default:
      return {
        variant: "outline", // Fallback to a neutral variant
        className: "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20 hover:text-gray-500",
        label: "Unknown",
      }
  }
}
export function TransactionHistory() {
  const transactions = [
    {
      id: "tx1",
      fromChain: "Optimism",
      toChain: "Polygon",
      fromAsset: "ETH",
      toAsset: "USDC",
      fromAmount: "2.5",
      toAmount: "4,500",
      status: "completed",
      time: "May 15, 2025 - 12:30 PM",
      txHash: "0x1234...5678",
    },
    {
      id: "tx2",
      fromChain: "Arbitrum",
      toChain: "Ethereum",
      fromAsset: "ETH",
      toAsset: "DAI",
      fromAmount: "1.2",
      toAmount: "2,160",
      status: "completed",
      time: "May 14, 2025 - 3:45 PM",
      txHash: "0xabcd...efgh",
    },
    {
      id: "tx3",
      fromChain: "Base",
      toChain: "BSC",
      fromAsset: "ETH",
      toAsset: "BUSD",
      fromAmount: "0.8",
      toAmount: "1,440",
      status: "in progress",
      time: "May 14, 2025 - 2:15 PM",
      txHash: "0x9876...5432",
    },
    {
      id: "tx4",
      fromChain: "zkSync",
      toChain: "Avalanche",
      fromAsset: "ETH",
      toAsset: "USDT",
      fromAmount: "3.0",
      toAmount: "5,400",
      status: "completed",
      time: "May 13, 2025 - 11:20 AM",
      txHash: "0xijkl...mnop",
    },
    {
      id: "tx5",
      fromChain: "Optimism",
      toChain: "Ethereum",
      fromAsset: "ETH",
      toAsset: "USDC",
      fromAmount: "1.5",
      toAmount: "2,700",
      status: "failed",
      time: "May 12, 2025 - 9:10 AM",
      txHash: "0xqrst...uvwx",
    },
    {
      id: "tx6",
      fromChain: "Arbitrum",
      toChain: "Polygon",
      fromAsset: "ETH",
      toAsset: "USDT",
      fromAmount: "0.5",
      toAmount: "900",
      status: "completed",
      time: "May 11, 2025 - 4:30 PM",
      txHash: "0xyzab...cdef",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <CardTitle>Transaction History</CardTitle>
          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search transactions..." className="pl-8 w-full" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="sent">Sent</TabsTrigger>
            <TabsTrigger value="received">Received</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>From</TableHead>
                    <TableHead></TableHead>
                    <TableHead>To</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Transaction Hash</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((tx) => {
                    const { variant, className, label } = getBadgeProps(tx.status)
                    return (
                      <TableRow key={tx.id}>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="font-medium">
                              {tx.fromAmount} {tx.fromAsset}
                            </span>
                            <span className="text-xs text-muted-foreground">{tx.fromChain}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <ArrowRight className="h-4 w-4 text-muted-foreground" />
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="font-medium">
                              {tx.toAmount} {tx.toAsset}
                            </span>
                            <span className="text-xs text-muted-foreground">{tx.toChain}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={variant} className={className}>
                            {label}
                          </Badge>
                        </TableCell>
                        <TableCell>{tx.time}</TableCell>
                        <TableCell>
                          <span className="font-mono text-xs">{tx.txHash}</span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon" aria-label={`View transaction ${tx.txHash}`}>
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          <TabsContent value="sent">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>From</TableHead>
                    <TableHead></TableHead>
                    <TableHead>To</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Transaction Hash</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.slice(0, 3).map((tx) => {
                    const { variant, className, label } = getBadgeProps(tx.status)
                    return (
                      <TableRow key={tx.id}>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="font-medium">
                              {tx.fromAmount} {tx.fromAsset}
                            </span>
                            <span className="text-xs text-muted-foreground">{tx.fromChain}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <ArrowRight className="h-4 w-4 text-muted-foreground" />
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="font-medium">
                              {tx.toAmount} {tx.toAsset}
                            </span>
                            <span className="text-xs text-muted-foreground">{tx.toChain}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={variant} className={className}>
                            {label}
                          </Badge>
                        </TableCell>
                        <TableCell>{tx.time}</TableCell>
                        <TableCell>
                          <span className="font-mono text-xs">{tx.txHash}</span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon" aria-label={`View transaction ${tx.txHash}`}>
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          <TabsContent value="received">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>From</TableHead>
                    <TableHead></TableHead>
                    <TableHead>To</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Transaction Hash</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.slice(3, 6).map((tx) => {
                    const { variant, className, label } = getBadgeProps(tx.status)
                    return (
                      <TableRow key={tx.id}>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="font-medium">
                              {tx.fromAmount} {tx.fromAsset}
                            </span>
                            <span className="text-xs text-muted-foreground">{tx.fromChain}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <ArrowRight className="h-4 w-4 text-muted-foreground" />
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="font-medium">
                              {tx.toAmount} {tx.toAsset}
                            </span>
                            <span className="text-xs text-muted-foreground">{tx.toChain}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={variant} className={className}>
                            {label}
                          </Badge>
                        </TableCell>
                        <TableCell>{tx.time}</TableCell>
                        <TableCell>
                          <span className="font-mono text-xs">{tx.txHash}</span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon" aria-label={`View transaction ${tx.txHash}`}>
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex items-center justify-end space-x-2 py-4">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
