import { Button } from "@workspace/ui/components/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@workspace/ui/components/card";
import { Badge } from "@workspace/ui/components/badge";
import Link from "next/link";
import { services, features, testimonials } from "@/lib/data";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next Gen Cricket Academy | Premium Indoor Cricket Training",
  description: "Book indoor cricket lanes, coaching sessions, and bowling machine hire. Practice to Perfection at our premium indoor cricket facility. Open 12pm-12am, 7 days a week.",
  keywords: ["cricket training", "indoor cricket", "cricket coaching", "cricket lane hire", "batting practice", "bowling machine hire"],
};

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Section 1: Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-b from-background via-background to-muted/30 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
        <div className="container px-4 py-16 md:py-24 relative">
          <div className="max-w-3xl mx-auto text-center space-y-6 md:space-y-8">
            <Badge variant="outline" className="mb-4">
              Premium Indoor Cricket Training
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground">
              Practice to{" "}
              <span className="text-primary">Perfection</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Where casual players become serious cricketers. Book your lane, join a session, or train with our expert coaches.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button asChild size="lg" className="text-lg px-8">
                <Link href={services.laneHire.path}>Book a Lane</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8">
                <Link href="/group-sessions">Explore Sessions</Link>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground pt-4">
              Open 7 days • 12 PM to 12 AM • 4 Indoor Lanes
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Lane Hire */}
      <section className="py-16 md:py-24 bg-muted/20">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <Badge>Start Here</Badge>
                <h2 className="text-3xl md:text-4xl font-bold">
                  Your Training Starts Here
                </h2>
                <p className="text-muted-foreground text-lg">
                  {services.laneHire.description}
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li>✓ Practice at your own pace</li>
                  <li>✓ Flexible 1-3 hour sessions</li>
                  <li>✓ Perfect for all skill levels</li>
                </ul>
                <div className="pt-4">
                  <p className="text-2xl font-bold text-primary">
                    From £{services.laneHire.price.offPeak}/hour
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Off-peak: {services.laneHire.offPeakHours}
                  </p>
                </div>
                <Button asChild size="lg" className="mt-4">
                  <Link href={services.laneHire.path}>Book Your Lane</Link>
                </Button>
              </div>
              <Card className="p-6">
                <CardHeader>
                  <CardTitle>Pricing</CardTitle>
                  <CardDescription>Simple, transparent pricing</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-background rounded-lg">
                    <div>
                      <p className="font-semibold">Off Peak</p>
                      <p className="text-sm text-muted-foreground">12-4PM & 10PM-12AM</p>
                    </div>
                    <p className="text-2xl font-bold text-primary">£15/hr</p>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-background rounded-lg">
                    <div>
                      <p className="font-semibold">Peak</p>
                      <p className="text-sm text-muted-foreground">4PM - 10PM</p>
                    </div>
                    <p className="text-2xl font-bold text-primary">£25/hr</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Training Trio */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">Level Up</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Elevate Your Game
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Progress from casual practice to structured training with our range of sessions.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Group Sessions */}
            <Card className="group hover:shadow-lg transition-shadow">
              <CardHeader>
                <Badge variant="outline">{services.groupSessions.title}</Badge>
                <CardTitle className="mt-2">{services.groupSessions.title}</CardTitle>
                <CardDescription>{services.groupSessions.ageGroup}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{services.groupSessions.description}</p>
                <div className="text-2xl font-bold text-primary mb-2">
                  £{services.groupSessions.price.perSession}/session
                </div>
                <p className="text-sm text-muted-foreground">
                  Max {services.groupSessions.capacity}
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full group-hover:bg-primary/90 transition-colors">
                  <Link href={services.groupSessions.path}>Join Group Sessions</Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Bowling Machine */}
            <Card className="group hover:shadow-lg transition-shadow">
              <CardHeader>
                <Badge variant="outline">{services.bowlingMachine.title}</Badge>
                <CardTitle className="mt-2">{services.bowlingMachine.title}</CardTitle>
                <CardDescription>Batting Repetition</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{services.bowlingMachine.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Off Peak</span>
                    <span className="font-semibold">£{services.bowlingMachine.price.offPeak}/hr</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Peak</span>
                    <span className="font-semibold">£{services.bowlingMachine.price.peak}/hr</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full group-hover:bg-primary/90 transition-colors">
                  <Link href={services.bowlingMachine.path}>Book Bowling Machine</Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Side Arm */}
            <Card className="group hover:shadow-lg transition-shadow">
              <CardHeader>
                <Badge variant="outline">{services.sideArm.title}</Badge>
                <CardTitle className="mt-2">{services.sideArm.title}</CardTitle>
                <CardDescription>Match Simulation</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{services.sideArm.description}</p>
                <div className="text-2xl font-bold text-primary mb-2">
                  £{services.sideArm.price.perHour}/hour
                </div>
                <p className="text-sm text-muted-foreground">
                  High-intensity training
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full group-hover:bg-primary/90 transition-colors">
                  <Link href={services.sideArm.path}>Book Side Arm</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Section 4: Coaching */}
      <section className="py-16 md:py-24 bg-muted/20">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-4">Elite Development</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Expert Coaching, Personal Attention
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              {services.coaching.description}
            </p>
            <div className="p-8 bg-card rounded-xl border">
              <p className="text-2xl font-bold text-primary mb-2">{services.coaching.price}</p>
              <p className="text-muted-foreground mb-6">
                One-to-one sessions tailored to your goals
              </p>
              <Button asChild size="lg">
                <Link href={services.coaching.path}>Enquire About 1-on-1 Coaching</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Birthday Parties */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <Badge variant="secondary" className="mb-4">Celebrate</Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Cricket Parties Kids Love
                </h2>
                <p className="text-muted-foreground text-lg mb-6">
                  {services.birthdayParties.description}
                </p>
                <ul className="space-y-2 text-muted-foreground mb-6">
                  <li>✓ Active, fun-filled celebrations</li>
                  <li>✓ Professional setup</li>
                  <li>✓ Stress-free for parents</li>
                  <li>✓ Memorable experiences</li>
                </ul>
                <Button asChild variant="outline" size="lg">
                  <Link href={services.birthdayParties.path}>Plan Your Party</Link>
                </Button>
              </div>
              <div className="order-1 md:order-2 p-8 bg-muted rounded-xl">
                <div className="text-center">
                  <p className="text-muted-foreground mb-2">Custom quotes available</p>
                  <p className="text-3xl font-bold">Birthday Packages</p>
                  <p className="text-sm text-muted-foreground mt-2">Tailored to your needs</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Why Choose Us */}
      <section className="py-16 md:py-24 bg-muted/20">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Next Gen Cricket Academy
            </h2>
            <p className="text-muted-foreground text-lg">
              The premier choice for cricket training in the area
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <Card key={index} className="text-center p-6">
                <CardHeader>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7: Facility */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">Our Facility</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              See For Yourself
            </h2>
            <p className="text-muted-foreground text-lg">
              A professional cricket training environment
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { title: "4 Indoor Lanes", desc: "Professional nets" },
                { title: "12PM-12AM", desc: "Long operating hours" },
                { title: "7 Days", desc: "Open every day" },
                { title: "Expert Coaches", desc: "Qualified team" },
              ].map((item, index) => (
                <div key={index} className="p-6 bg-muted rounded-xl text-center">
                  <p className="font-bold text-lg">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 8: Testimonials */}
      <section className="py-16 md:py-24 bg-muted/20">
        <div className="container px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">Testimonials</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our Cricketers Say
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <CardContent>
                  <p className="text-muted-foreground mb-4 italic">
                    "{testimonial.content}"
                  </p>
                  <div className="pt-4 border-t">
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Section 9: Final CTA */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Your next level starts with practice. Book online in under 2 minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8">
                <Link href="/lane-hire">Book a Lane</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-muted/30 border-t">
        <div className="container px-4">
          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div>
              <h3 className="font-bold mb-4">Next Gen Cricket Academy</h3>
              <p className="text-sm text-muted-foreground">
                Practice to Perfection.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/lane-hire" className="hover:text-foreground">Lane Hire</Link></li>
                <li><Link href="/group-sessions" className="hover:text-foreground">Group Sessions</Link></li>
                <li><Link href="/coaching" className="hover:text-foreground">Coaching</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Hours</h4>
              <p className="text-sm text-muted-foreground">
                Monday - Sunday<br />
                12:00 PM - 12:00 AM
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <p className="text-sm text-muted-foreground">
                Email: info@nextgencricket.co.uk<br />
                Phone: [Coming Soon]
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            © 2024 Next Gen Cricket Academy. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}