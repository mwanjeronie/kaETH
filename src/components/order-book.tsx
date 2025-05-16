import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function OrderBook() {
  // Mock data for order book
  const asks = [
    { price: "1,810.50", amount: "2.5", total: "4,526.25" },
    { price: "1,805.75", amount: "1.8", total: "3,250.35" },
    { price: "1,803.25", amount: "3.2", total: "5,770.40" },
    { price: "1,802.00", amount: "0.5", total: "901.00" },
    { price: "1,801.50", amount: "1.2", total: "2,161.80" },
  ]

  const bids = [
    { price: "1,799.75", amount: "0.8", total: "1,439.80" },
    { price: "1,798.50", amount: "1.5", total: "2,697.75" },
    { price: "1,797.25", amount: "2.0", total: "3,594.50" },
    { price: "1,795.00", amount: "3.5", total: "6,282.50" },
    { price: "1,790.25", amount: "5.0", total: "8,951.25" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Order Book</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="both">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="asks">Asks</TabsTrigger>
            <TabsTrigger value="both">Both</TabsTrigger>
            <TabsTrigger value="bids">Bids</TabsTrigger>
          </TabsList>
          <TabsContent value="asks">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Price (USDC)</TableHead>
                  <TableHead>Amount (ETH)</TableHead>
                  <TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {asks.map((ask, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-red-500">{ask.price}</TableCell>
                    <TableCell>{ask.amount}</TableCell>
                    <TableCell>{ask.total}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          <TabsContent value="both">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Price (USDC)</TableHead>
                  <TableHead>Amount (ETH)</TableHead>
                  <TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {asks.slice(0, 3).map((ask, index) => (
                  <TableRow key={`ask-${index}`}>
                    <TableCell className="text-red-500">{ask.price}</TableCell>
                    <TableCell>{ask.amount}</TableCell>
                    <TableCell>{ask.total}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={3} className="text-center bg-muted/50 py-1">
                    <span className="text-sm font-medium">Spread: 0.75 USDC (0.04%)</span>
                  </TableCell>
                </TableRow>
                {bids.slice(0, 3).map((bid, index) => (
                  <TableRow key={`bid-${index}`}>
                    <TableCell className="text-green-500">{bid.price}</TableCell>
                    <TableCell>{bid.amount}</TableCell>
                    <TableCell>{bid.total}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          <TabsContent value="bids">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Price (USDC)</TableHead>
                  <TableHead>Amount (ETH)</TableHead>
                  <TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bids.map((bid, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-green-500">{bid.price}</TableCell>
                    <TableCell>{bid.amount}</TableCell>
                    <TableCell>{bid.total}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
