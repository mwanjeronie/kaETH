"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ArrowRight, ExternalLink } from "lucide-react"

export function RecentTransactions() {
  // Mock data for recent transactions
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
      time: "2 mins ago",
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
      time: "15 mins ago",
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
      time: "20 mins ago",
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
      time: "45 mins ago",
    },
  ]

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>From</TableHead>
              <TableHead></TableHead>
              <TableHead>To</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Time</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((tx) => (
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
                  <Badge
                    variant={tx.status === "completed" ? "success" : "outline"}
                    className={
                      tx.status === "completed"
                        ? "bg-green-500/10 text-green-500 hover:bg-green-500/20 hover:text-green-500"
                        : ""
                    }
                  >
                    {tx.status === "completed" ? "Completed" : "In Progress"}
                  </Badge>
                </TableCell>
                <TableCell>{tx.time}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon">
                    <ExternalLink className="h-4 w-4" />
                    <span className="sr-only">View transaction</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
