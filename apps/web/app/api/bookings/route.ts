import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/services/supabase';
import type { DbBooking } from '@/lib/db/schema';

function generateBookingReference(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = 'NGCA-';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');
    const email = searchParams.get('email');
    const date = searchParams.get('date');

    let query = supabaseAdmin.from('bookings').select('*').order('created_at', { ascending: false });

    if (status) {
      query = query.eq('status', status);
    }

    if (email) {
      query = query.eq('customer_email', email);
    }

    if (date) {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);
      query = query.gte('booking_date', startOfDay.toISOString()).lte('booking_date', endOfDay.toISOString());
    }

    const { data, error } = await query;

    if (error) throw error;

    return NextResponse.json({ success: true, bookings: data });
  } catch (error) {
    console.error('Bookings list error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      resourceId,
      serviceType,
      bookingDate,
      startAt,
      endAt,
      customerName,
      customerEmail,
      customerPhone,
      playerCount,
      notes
    } = body;

    // Validate required fields
    if (!resourceId || !serviceType || !bookingDate || !startAt || !endAt || !customerName || !customerEmail) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check for conflicting bookings
    const { data: existingBookings } = await supabaseAdmin
      .from('bookings')
      .select('id')
      .eq('resource_id', resourceId)
      .eq('status', 'confirmed')
      .lt('start_at', endAt)
      .gt('end_at', startAt);

    if (existingBookings && existingBookings.length > 0) {
      return NextResponse.json(
        { success: false, error: 'Time slot is already booked' },
        { status: 409 }
      );
    }

    // Check blocked slots
    const { data: blockedSlots } = await supabaseAdmin
      .from('blocked_slots')
      .select('id')
      .eq('resource_id', resourceId)
      .lt('start_at', endAt)
      .gt('end_at', startAt);

    if (blockedSlots && blockedSlots.length > 0) {
      return NextResponse.json(
        { success: false, error: 'Time slot is blocked' },
        { status: 409 }
      );
    }

    // Calculate price
    const startDate = new Date(startAt);
    const isPeak = startDate.getDay() === 6 || startDate.getDay() === 0 || startDate.getHours() >= 16;
    const price = isPeak ? (serviceType === 'bowling_machine' ? '32.00' : '25.00') :
                  serviceType === 'bowling_machine' ? '22.00' : '15.00';

    // Calculate duration in hours
    const startTime = new Date(startAt);
    const endTime = new Date(endAt);
    const hours = Math.ceil((endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60));
    const amount = (parseFloat(price) * hours).toFixed(2);

    // Generate booking reference
    const bookingReference = generateBookingReference();

    // Create booking
    const booking: Partial<DbBooking> = {
      booking_reference: bookingReference,
      resource_id: resourceId,
      service_type: serviceType,
      booking_date: bookingDate,
      start_at: startAt,
      end_at: endAt,
      status: 'pending_payment',
      payment_status: 'pending',
      amount,
      customer_name: customerName,
      customer_email: customerEmail,
      customer_phone: customerPhone || null,
      player_count: playerCount || null,
      notes: notes || null,
      expires_at: new Date(Date.now() + 30 * 60 * 1000).toISOString() // 30 min expiry
    };

    const { data, error } = await supabaseAdmin
      .from('bookings')
      .insert(booking)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      booking: data,
      expiresAt: booking.expires_at
    });
  } catch (error) {
    console.error('Booking creation error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}