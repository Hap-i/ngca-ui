'use client';

import { Button } from "@workspace/ui/components/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@workspace/ui/components/card";
import { Badge } from "@workspace/ui/components/badge";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@workspace/ui/components/select";
import Link from "next/link";
import { ArrowLeft, Clock, Users, Calendar, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";

export default function LaneHirePage() {
  const [selectedDate, setSelectedDate] = useState('');
  const [slots, setSlots] = useState<Array<{time: string; availableLanes: number; price: string}>>([]);
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [laneResourceIds, setLaneResourceIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    duration: '1',
    players: '1',
    name: '',
    email: '',
    phone: '',
    notes: ''
  });

  useEffect(() => {
    if (selectedDate) {
      fetchSlots();
    }
    fetchLaneResources();
  }, [selectedDate]);

  async function fetchLaneResources() {
    try {
      const res = await fetch('/api/admin/resources?type=lane'); // Assuming admin API can filter by type
      const data = await res.json();
      if (data.success) {
        setLaneResourceIds(data.resources.map((r: { id: string }) => r.id));
      }
    } catch (error) {
      console.error('Failed to fetch lane resources:', error);
    }
  }

  async function fetchSlots() {
    setLoading(true);
    setSlots([]); // Clear previous slots
    setSelectedSlots([]); // Clear selected slots on date change
    setTotalPrice(0); // Reset total price
    try {
      const res = await fetch(`/api/slots?resourceType=lane&date=${selectedDate}`);
      const data = await res.json();
      if (data.success && data.dates.length > 0) {
        setSlots(data.dates[0].slots);
      }
    } catch (error) {
      console.error('Failed to fetch slots:', error);
    } finally {
      setLoading(false);
    }
  }

  function toggleSlot(time: string) {
    setSelectedSlots(prev =>
      prev.includes(time) ? prev.filter(t => t !== time) : [...prev, time].sort()
    );
  }

  useEffect(() => {
    let price = 0;
    selectedSlots.forEach(slotTime => {
      const slot = slots.find(s => s.time === slotTime);
      if (slot) {
        price += parseFloat(slot.price) * parseInt(formData.duration);
      }
    });
    setTotalPrice(price);
  }, [selectedSlots, slots, formData.duration]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (selectedSlots.length === 0) {
      alert("Please select at least one time slot.");
      return;
    }
    if (totalPrice === 0) {
      alert("Cannot book for free. Please ensure slots have prices.");
      return;
    }

    try {
      const bookingPromises = selectedSlots.map(async (slotTime) => {
        // Find an available lane resource ID for this slot time
        const availableLane = slots.find(s => s.time === slotTime && s.availableLanes > 0);
        if (!availableLane) {
          throw new Error(`No available lanes for slot ${slotTime}`);
        }

        // For now, we'll just pick the first laneResourceId. In a real scenario, you'd want more sophisticated lane assignment.
        if (laneResourceIds.length === 0) {
          throw new Error("No lane resources available.");
        }
        const resourceIdToBook = laneResourceIds[0]; // Simplistic: always pick the first available lane

        const startDateTime = `${formData.date}T${slotTime}:00`;
        const endHour = parseInt(slotTime.split(':')[0]) + parseInt(formData.duration);
        const endMin = slotTime.split(':')[1];
        const endDateTime = `${formData.date}T${endHour.toString().padStart(2, '0')}:${endMin}:00`;

        const res = await fetch('/api/bookings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            resourceId: resourceIdToBook,
            serviceType: 'lane_hire',
            bookingDate: formData.date,
            startAt: startDateTime,
            endAt: endDateTime,
            customerName: formData.name,
            customerEmail: formData.email,
            customerPhone: formData.phone,
            playerCount: parseInt(formData.players),
            notes: formData.notes,
            amount: (parseFloat(availableLane.price) * parseInt(formData.duration)).toFixed(2),
          })
        });
        const data = await res.json();
        if (!data.success) {
          throw new Error(data.error || 'Failed to create booking');
        }
        return data.booking;
      });

      const bookings = await Promise.all(bookingPromises);
      alert(`Bookings confirmed! References: ${bookings.map(b => b.booking_reference).join(', ')}`);
      // Reset form or navigate
      setSelectedSlots([]);
      setTotalPrice(0);
      setFormData({
        ...formData,
        name: '',
        email: '',
        phone: '',
        notes: ''
      });
      fetchSlots(); // Refresh slots after booking

    } catch (error: any) {
      console.error('Booking error:', error);
      alert('Booking failed: ' + error.message);
    }
  }

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
            <Badge className="mb-4">Lane Hire</Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Practice at Your Own Pace
            </h1>
            <p className="text-lg text-muted-foreground">
              Book our premium indoor lanes for solo practice or play with friends.
              Professional environment with floodlight-quality lighting.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-12 md:py-16">
        <div className="container px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl">
            {/* Off Peak */}
            <Card className="border-2 border-muted">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Badge variant="secondary">Off Peak</Badge>
                </CardTitle>
                <CardDescription>Best value for flexible training</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-primary mb-2">£15</div>
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

            {/* Peak */}
            <Card className="border-2 border-primary">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Badge className="bg-primary">Peak</Badge>
                </CardTitle>
                <CardDescription>Evening & afternoon sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-primary mb-2">£25</div>
                <p className="text-muted-foreground text-sm mb-4">per hour</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    4 PM – 10 PM
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Most popular times
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-16 bg-muted/20">
        <div className="container px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">What You Get</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold">12-Hour Access</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Open 12 PM to 12 AM, 7 days a week
              </p>
            </Card>
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold">Up to 6 Players</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Perfect for groups or team practice
              </p>
            </Card>
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold">Flexible Booking</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Book 1-3 hours at a time
              </p>
            </Card>
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold">Professional Lanes</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                4 indoor lanes with premium setup
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="py-12 md:py-16">
        <div className="container px-4">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Book Your Lane</CardTitle>
                <CardDescription>
                  Select date, check availability, and confirm your booking
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Preferred Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => {
                          setFormData({...formData, date: e.target.value});
                          setSelectedDate(e.target.value);
                        }}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Available Slots</Label>
                    {loading ? (
                      <div className="flex items-center justify-center h-24">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                      </div>
                    ) : slots.length === 0 ? (
                      <p className="text-muted-foreground">Select a date to see available slots.</p>
                    ) : (
                      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                        {slots.map((slot) => (
                          <Button
                            key={slot.time}
                            variant={selectedSlots.includes(slot.time) ? "default" : "outline"}
                            onClick={() => toggleSlot(slot.time)}
                            disabled={slot.availableLanes === 0}
                            className="flex-col h-auto py-2"
                          >
                            <span className="font-semibold">{parseInt(slot.time) < 12 ? `${parseInt(slot.time)}:00 AM` : `${(parseInt(slot.time) > 12 ? parseInt(slot.time) - 12 : 12)}:00 ${parseInt(slot.time) >= 12 ? 'PM' : 'AM'}`}</span>
                            <span className="text-xs text-muted-foreground">
                              {slot.availableLanes > 0 ? `${slot.availableLanes} lanes` : "Booked"}
                            </span>
                            <span className="text-xs">£{parseFloat(slot.price).toFixed(2)}/hr</span>
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration</Label>
                      <Select
                        value={formData.duration}
                        onValueChange={(value) => setFormData({...formData, duration: value})}
                        disabled={selectedSlots.length === 0}
                      >
                        <SelectTrigger id="duration">
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Hour</SelectItem>
                          <SelectItem value="2">2 Hours</SelectItem>
                          <SelectItem value="3">3 Hours</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="players">Number of Players</Label>
                      <Select
                        value={formData.players}
                        onValueChange={(value) => setFormData({...formData, players: value})}
                      >
                        <SelectTrigger id="players">
                          <SelectValue placeholder="Select players" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Player</SelectItem>
                          <SelectItem value="2">2 Players</SelectItem>
                          <SelectItem value="3">3 Players</SelectItem>
                          <SelectItem value="4">4 Players</SelectItem>
                          <SelectItem value="5">5 Players</SelectItem>
                          <SelectItem value="6">6 Players</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="07xxx xxx xxx"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Special Requests (Optional)</Label>
                    <Input
                      id="notes"
                      placeholder="Any special requirements"
                      value={formData.notes}
                      onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    />
                  </div>

                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total:</span>
                    <span>£{totalPrice.toFixed(2)}</span>
                  </div>

                  <Button type="submit" size="lg" className="w-full" disabled={selectedSlots.length === 0 || totalPrice === 0}>
                    Confirm Booking
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-muted/20">
        <div className="container px-4 text-center">
          <h3 className="text-xl font-semibold mb-4">Questions about lane hire?</h3>
          <p className="text-muted-foreground mb-6">
            Our team is happy to help you plan your training session
          </p>
          <Button asChild variant="outline">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}