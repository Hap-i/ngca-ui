import { Button } from "@workspace/ui/components/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@workspace/ui/components/card";
import { Badge } from "@workspace/ui/components/badge";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@workspace/ui/components/select";
import Link from "next/link";
import { ArrowLeft, Users, Calendar, Clock, CheckCircle, Star } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Group Sessions | Next Gen Cricket Academy",
  description: "Structured cricket coaching for ages 6-18. £12.50/session. Friday, Saturday & Sunday sessions available.",
};

const schedule = [
  { day: "Friday", time: "6 PM – 8 PM" },
  { day: "Saturday", time: "11 AM – 1 PM" },
  { day: "Saturday", time: "1:30 PM – 3:30 PM" },
  { day: "Sunday", time: "11 AM – 1 PM" },
  { day: "Sunday", time: "1:30 PM – 3:30 PM" },
];

export default function GroupSessionsPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-muted/30 py-12 md:py-16">
        <div className="container px-4">
          <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
          <div className="max-w-3xl">
            <Badge className="mb-4">Group Sessions</Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Level Up Together
            </h1>
            <p className="text-lg text-muted-foreground">
              Structured coaching sessions for young cricketers aged 6-18.
              Build skills, make friends, and develop your game in a supportive environment.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing & Schedule */}
      <section className="py-12 md:py-16">
        <div className="container px-4">
          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl">
            {/* Pricing */}
            <Card className="border-2 border-primary">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Badge className="bg-primary">Session Pass</Badge>
                </CardTitle>
                <CardDescription>Per session pricing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-5xl font-bold text-primary mb-2">£12.50</div>
                <p className="text-muted-foreground">per session</p>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Structured coaching format</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Max 12 players per session</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Ages 6-18 welcome</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>All skill levels</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Schedule */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Session Schedule
                </CardTitle>
                <CardDescription>Weekly sessions available</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {schedule.map((session, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <span className="font-medium">{session.day}</span>
                      <Badge variant="secondary">{session.time}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-12 md:py-16 bg-muted/20">
        <div className="container px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">What Your Child Will Learn</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="p-6">
              <h3 className="font-semibold mb-2">Batting Fundamentals</h3>
              <p className="text-sm text-muted-foreground">
                Grip, stance, shot selection, and technique development
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="font-semibold mb-2">Bowling Skills</h3>
              <p className="text-sm text-muted-foreground">
                Run-up, action, line and length control
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="font-semibold mb-2">Fielding & Catching</h3>
              <p className="text-sm text-muted-foreground">
                Ground fielding, catches, and throwing accuracy
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="font-semibold mb-2">Game Awareness</h3>
              <p className="text-sm text-muted-foreground">
                Reading the game, positioning, and decision making
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="font-semibold mb-2">Match Practice</h3>
              <p className="text-sm text-muted-foreground">
                Scrimmages and mini-games in a fun environment
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="font-semibold mb-2">Teamwork</h3>
              <p className="text-sm text-muted-foreground">
                Building friendships and learning to work together
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-12 md:py-16">
        <div className="container px-4">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Book a Session</CardTitle>
                <CardDescription>
                  Sign up for our upcoming group coaching sessions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="session">Select Session</Label>
                    <Select>
                      <SelectTrigger id="session">
                        <SelectValue placeholder="Choose a session" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fri">Friday 6 PM – 8 PM</SelectItem>
                        <SelectItem value="sat-1">Saturday 11 AM – 1 PM</SelectItem>
                        <SelectItem value="sat-2">Saturday 1:30 PM – 3:30 PM</SelectItem>
                        <SelectItem value="sun-1">Sunday 11 AM – 1 PM</SelectItem>
                        <SelectItem value="sun-2">Sunday 1:30 PM – 3:30 PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="player-name">Player's Name</Label>
                      <Input id="player-name" placeholder="Child's full name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="age">Player's Age</Label>
                      <Select>
                        <SelectTrigger id="age">
                          <SelectValue placeholder="Select age" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 13 }, (_, i) => i + 6).map((age) => (
                            <SelectItem key={age} value={age.toString()}>{age} years</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="skill">Skill Level</Label>
                    <Select>
                      <SelectTrigger id="skill">
                        <SelectValue placeholder="Select skill level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner - New to cricket</SelectItem>
                        <SelectItem value="intermediate">Intermediate - Playing club cricket</SelectItem>
                        <SelectItem value="advanced">Advanced - Representative level</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="parent-name">Parent/Guardian Name</Label>
                      <Input id="parent-name" placeholder="Your full name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact">Contact Number</Label>
                      <Input id="contact" type="tel" placeholder="07xxx xxx xxx" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="your@email.com" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="emergency">Emergency Contact</Label>
                    <Input id="emergency" placeholder="Name & number" />
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    Book Session - £12.50
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
          <h3 className="text-xl font-semibold mb-4">Questions about group sessions?</h3>
          <p className="text-muted-foreground mb-6">
            We're happy to help find the right session for your child
          </p>
          <Button asChild variant="outline">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}