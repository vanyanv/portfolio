import { NextResponse } from 'next/server';

export const revalidate = 900;

const LA_LAT = 34.0522;
const LA_LONG = -118.2437;

export async function GET() {
  const url = new URL('https://api.open-meteo.com/v1/forecast');
  url.searchParams.set('latitude', String(LA_LAT));
  url.searchParams.set('longitude', String(LA_LONG));
  url.searchParams.set(
    'current',
    'temperature_2m,apparent_temperature,weather_code,wind_speed_10m',
  );
  url.searchParams.set('temperature_unit', 'fahrenheit');
  url.searchParams.set('wind_speed_unit', 'mph');
  url.searchParams.set('timezone', 'America/Los_Angeles');

  try {
    const res = await fetch(url, { next: { revalidate } });
    if (!res.ok) throw new Error('Weather request failed');

    const data = await res.json();
    const current = data.current ?? {};

    return NextResponse.json(
      {
        location: 'Los Angeles',
        temperature: current.temperature_2m ?? 0,
        apparentTemperature: current.apparent_temperature ?? 0,
        windSpeed: current.wind_speed_10m ?? 0,
        condition: weatherCodeLabel(current.weather_code),
        fetchedAt: new Date().toISOString(),
      },
      {
        headers: {
          'Cache-Control': 's-maxage=900, stale-while-revalidate=3600',
        },
      },
    );
  } catch {
    return NextResponse.json(
      { message: 'Weather widget data unavailable' },
      { status: 502 },
    );
  }
}

function weatherCodeLabel(code: number) {
  if (code === 0) return 'Clear';
  if ([1, 2].includes(code)) return 'Partly cloudy';
  if (code === 3) return 'Cloudy';
  if ([45, 48].includes(code)) return 'Fog';
  if ([51, 53, 55, 56, 57].includes(code)) return 'Drizzle';
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return 'Rain';
  if ([71, 73, 75, 77, 85, 86].includes(code)) return 'Snow';
  if ([95, 96, 99].includes(code)) return 'Thunderstorms';
  return 'Mixed conditions';
}
