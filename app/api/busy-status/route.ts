import { NextResponse } from 'next/server';

export async function GET() {
  // Dynamically mock the busy level based on typical peak hours (lunch/dinner)
  const hour = new Date().getHours();
  let status: 'not busy' | 'a little busy' | 'very busy' = 'not busy';

  if (hour >= 11 && hour <= 14) {
    status = 'very busy'; // Lunch peak
  } else if (hour >= 17 && hour <= 20) {
    status = 'a little busy'; // Evening coffee rush
  }

  return NextResponse.json(
    {
      currentStatus: status,
      bestTimeToVisit: '2 PM - 5 PM',
      live: true,
    },
    {
      headers: {
        'Cache-Control': 'public, s-maxage=900, stale-while-revalidate=3600',
      },
    }
  );
}
