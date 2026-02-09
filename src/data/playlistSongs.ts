// Our Playlist - 3 Special Songs
// These are our songs that remind me of us

export interface Song {
  id: string;
  title: string;
  artist: string;
  album?: string;
  duration?: string;
  coverColor: string;
  spotifyUrl: string;
}

// Our 3 special songs
export const playlistSongs: Song[] = [
  {
    id: "1",
    title: "not a lot, just forever",
    artist: "Adrianne Lenker",
    album: "songs",
    duration: "4:11",
    coverColor: "from-red-500 to-rose-600",
    spotifyUrl: "https://open.spotify.com/track/11hEwcy9LMEvzAlOYAFhkK",
  },
  {
    id: "2",
    title: "About you",
    artist: "The 1975",
    album: "Being Funny in a foreign Language",
    duration: "4:23",
    coverColor: "from-orange-500 to-red-500",
    spotifyUrl: "https://open.spotify.com/track/1fDFHXcykq4iw8Gg7s5hG9",
  },
  {
    id: "3",
    title: "Apple Pie",
    artist: "Lizzy Mcalpine",
    album: "Give me a minute",
    duration: "2:57",
    coverColor: "from-amber-400 to-yellow-500",
    spotifyUrl: "https://open.spotify.com/track/0zLnAV1lYEhVnKk3ITmCym",
  },
];

// Get all 3 songs (no more daily rotation)
export function getTodaysSongs(): Song[] {
  return playlistSongs;
}

// Get formatted date string
export function getFormattedDate(date: Date = new Date()): string {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
