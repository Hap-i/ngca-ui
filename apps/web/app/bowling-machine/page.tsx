import { Button } from "@workspace/ui/components/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@workspace/ui/components/card";
import { Badge } from "@workspace/ui/components/badge";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@workspace/ui/components/select";
import Link from "next/link";
import { ArrowLeft, Target, Zap, Clock, CheckCircle, Shield } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bowling Machine Hire | Next Gen Cricket Academy",
  description: "Professional bowling machine hire for batting practice. £22/hour off-peak, £32/hour peak. Improve your batting technique.",
};

export default function BowlingMachinePage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="bg-muted/30 py-12 md:py-16">
        <div className="container px-4">
          <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
          <div className="max-w-3xl">
            <Badge className="mb-4">Bowling Machine</Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Precision Training
            </h1>
            <p className="text-lg text-muted-foreground">
              Refine your batting technique with focused repetition using our professional
              bowling machine. Perfect for building consistency and confidence.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-12 md:py-16">
        <div className="container px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-2 border-muted">
              <CardHeader>
                <CardTitle>
                  <Badge variant="secondary">Off Peak</Badge>
                </CardTitle>
                <CardDescription>Midday & late evening</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-primary mb-2">£22</div>
                <p className="text-muted-foreground text-sm mb-4">per hour</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    12 PM – 4 PM
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    10 PM – 12 AM
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary">
              <CardHeader>
                <CardTitle>
                  <Badge className="bg-primary">Peak</Badge>
                </CardTitle>
                <CardDescription>After school & evenings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-primary mb-2">£32</div>
                <p className="text-muted-foreground text-sm mb-4">per hour</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    4 PM – 10 PM
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-12 md:py-16 bg-muted/20">
        <div className="container px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Why Use a Bowling Machine?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <Card className="p-6">
              <Target className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-semibold mb-2">Consistent Deliveries</h3>
              <p className="text-sm text-muted-foreground">
                Practice against repeatable bowling for muscle memory
              </p>
            </Card>
            <Card className="p-6">
              <Zap className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-semibold mb-2">Rapid Improvement</h3>
              <p className="text-sm text-muted-foreground">
                More balls faced in an hour than a net session
              </p>
            </Card>
            <Card className="p-6">
              <Clock className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-semibold mb-2">Flexible Pacing</h3>
              <p className="text-sm text-muted-foreground">
                Control your own session, take breaks as needed
              </p>
            </Card>
            <Card className="p-6">
              <Shield className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-semibold mb-2">Safe Environment</h3>
              <p className="text-sm text-muted-foreground">
                Professional setup with proper safety measures
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Booking */}
      <section className="py-12 md:py-16">
        <div className="container px-4">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Book Bowling Machine</CardTitle>
                <CardDescription>
                  Machine hire includes lane access and safety briefing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Preferred Date</Label>
                      <Input id="date" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time">Preferred Time</Label>
                      <Select>
                        <SelectTrigger id="time">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="12:00">12:00 PM</SelectItem>
                          <SelectItem value="13:00">1:00 PM</SelectItem>
                          <SelectItem value="14:00">2:00 PM</SelectItem>
                          <SelectItem value="15:00">3:00 PM</SelectItem>
                          <SelectItem value="16:00">4:00 PM</SelectItem>
                          <SelectItem value="17:00">5:00 PM</SelectItem>
                          <SelectItem value="18:00">6:00 PM</SelectItem>
                          <SelectItem value="19:00">7:00 PM</SelectItem>
                          <SelectItem value="20:00">8:00 PM</SelectItem>
                          <SelectItem value="21:00">9:00 PM</SelectItem>
                          <SelectItem value="22:00">10:00 PM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration</Label>
                      <Select>
                        <SelectTrigger id="duration">
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Hour</SelectItem>
                          <SelectItem value="2">2 Hours</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="experience">Experience Level</Label>
                      <Select>
                        <SelectTrigger id="experience">
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="Enter your name" />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="your@email.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" type="tel" placeholder="07xxx xxx xxx" />
                    </div>
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    Book Bowling Machine
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-muted/20">
        <div className="container px-4 text-center">
          <p className="text-muted-foreground mb-4">
            First time using a bowling machine? We'll provide a full safety briefing.
          </p>
          <Button asChild variant="outline">
            <Link href="/contact">Have Questions?</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}