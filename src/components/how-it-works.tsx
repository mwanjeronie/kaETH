import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRightLeft, Shield, Zap, Coins } from "lucide-react"

export function HowItWorks() {
  const steps = [
    {
      icon: <ArrowRightLeft className="h-10 w-10 text-purple-500" />,
      title: "Connect & Select",
      description: "Connect your wallet and select the chains and assets you want to exchange.",
    },
    {
      icon: <Shield className="h-10 w-10 text-blue-500" />,
      title: "Secure P2P Matching",
      description: "Our platform securely matches you with peers looking to make the opposite exchange.",
    },
    {
      icon: <Zap className="h-10 w-10 text-purple-500" />,
      title: "Fast Settlement",
      description: "Transactions are settled quickly across chains with minimal fees.",
    },
    {
      icon: <Coins className="h-10 w-10 text-blue-500" />,
      title: "Receive Assets",
      description: "Your exchanged assets are delivered directly to your wallet on the destination chain.",
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">How kaETH Works</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our P2P platform makes cross-chain exchanges simple, secure, and efficient
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {steps.map((step, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="mx-auto mb-4">{step.icon}</div>
                  <CardTitle>{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{step.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
