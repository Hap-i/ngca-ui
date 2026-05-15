import { Button } from "@workspace/ui/components/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@workspace/ui/components/card";
import { Badge } from "@workspace/ui/components/badge";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@workspace/ui/components/select";
import Link from "next/link";
import { ArrowLeft, Flame, Trophy, TrendingUp, AlertCircle } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Side Arm Sessions | Next Gen Cricket Academy",
  description: "High-intensity batting practice with match-like deliveries. £30/hour. Ideal for intermediate and advanced players.",
};

export default function SideArmPage() {
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
            <Badge className="mb-4">Side Arm Sessions</Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Match Simulation Training
            </h1>
            <p className="text-lg text-muted-foreground">
              High-intensity batting practice with match-like deliveries.
              Take your game to the next level with realistic match simulation.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-12 md:py-16">
        <div className="container px-4">
          <div className="max-w-md mx-auto">
            <Card className="border-2 border-primary">
              <CardHeader className="text-center">
                <CardTitle>
                  <Badge className="bg-primary">Session Rate</Badge>
                </CardTitle>
                <CardDescription>High-intensity training</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-5xl font-bold text-primary mb-2">£30</div>
                <p className="text-muted-foreground">per hour</p>
                <ul className="mt-6 space-y-3 text-left">
                  <li className="flex items-center gap-2">
                    <Badge variant="outline" className="h-5 w-5 p-0 justify-center text-[10px]">1</Badge>
                    <span>Realistic match-paced deliveries</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Badge variant="outline" className="h-5 w-5 p-0 justify-center text-[10px]">2</Badge>
                    <span>Variable pace and bounce</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Badge variant="outline" className="h-5 w-5 p-0 justify-center text-[10px]">3</Badge>
                    <span>Reaction time improvement</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Badge variant="outline" className="h-5 w-5 p-0 justify-center text-[10px]">4</Badge>
                    <span>Match scenario practice</span>
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
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Why Choose Side Arm Training?</h2>
          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="p-6">
              <Flame className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-semibold mb-2">High Intensity</h3>
              <p className="text-sm text-muted-foreground">
                Fast-paced training that mimics match conditions
              </p>
            </Card>
            <Card className="p-6">
              <TrendingUp className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-semibold mb-2">Skill Development</h3>
              <p className="text-sm text-muted-foreground">
                Improve timing, placement, and shot selection
              </p>
            </Card>
            <Card className="p-6">
              <Trophy className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-semibold mb-2">Competition Ready</h3>
              <p className="text-sm text-muted-foreground">
                Build confidence for match day performance
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-12 md:py-16">
        <div className="container px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="border-yellow-500/50 bg-yellow-50 dark:bg-yellow-950/20">
              <CardContent className="flex gap-4 p-6">
                <AlertCircle className="h-6 w-6 text-yellow-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Recommended for Intermediate+ Players</h3>
                  <p className="text-sm text-muted-foreground">
                    Side arm sessions are best suited for players who have some cricket experience.
                    If you're new to cricket, we recommend starting with lane hire or group sessions first.
                  </p>
                </div>
              </CardContent>
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
                <CardTitle>Book Side Arm Session</CardTitle>
                <CardDescription>
                  All equipment provided. Full safety briefing included.
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
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience">Playing Experience</Label>
                    <Select>
                      <SelectTrigger id="experience">
                        <SelectValue placeholder="Select your level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="intermediate">Club Cricketer</SelectItem>
                        <SelectItem value="advanced">Advanced / Representative</SelectItem>
                      </SelectContent>
                    </Select>
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
                    Book Side Arm Session
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
            Not sure if side arm is right for you? We can help you decide.
          </p>
          <Button asChild variant="outline">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}