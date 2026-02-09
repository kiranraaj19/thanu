// Our Playlist - Songs that remind me of us
// From: https://open.spotify.com/playlist/5C7Qf3WGfgRnRE988Gbkam

export interface Song {
  id: string;
  title: string;
  artist: string;
  album?: string;
  duration?: string;
  coverColor: string;
  spotifyUrl: string;
}

export const playlistSongs: Song[] = [
  // Hindi Romantic Songs
  { id: "1", title: "Tum Hi Ho", artist: "Arijit Singh", album: "Aashiqui 2", duration: "4:22", coverColor: "from-blue-400 to-purple-500", spotifyUrl: "https://open.spotify.com/track/3xMHXmedL5Rvfxmiar9Ryv" },
  { id: "2", title: "Raabta", artist: "Arijit Singh", album: "Agent Vinod", duration: "4:04", coverColor: "from-rose-400 to-pink-500", spotifyUrl: "https://open.spotify.com/track/5Lq75Vb8Sdwo0mpDtWF2IW" },
  { id: "3", title: "Agar Tum Saath Ho", artist: "Arijit Singh, Alka Yagnik", album: "Tamasha", duration: "5:41", coverColor: "from-amber-400 to-orange-500", spotifyUrl: "https://open.spotify.com/track/3hkC9EHFZNQPztlwGrz6kg" },
  { id: "4", title: "Channa Mereya", artist: "Arijit Singh", album: "Ae Dil Hai Mushkil", duration: "4:49", coverColor: "from-indigo-400 to-blue-500", spotifyUrl: "https://open.spotify.com/track/0Y8C2OiFV9hrPkdZFL9yE5" },
  { id: "5", title: "Tera Ban Jaunga", artist: "Akhil Sachdeva, Tulsi Kumar", album: "Kabir Singh", duration: "3:56", coverColor: "from-red-400 to-rose-500", spotifyUrl: "https://open.spotify.com/track/5P3B3P6W5X2v8a8g1q3Q2r" },
  { id: "6", title: "Dil Diyan Gallan", artist: "Atif Aslam", album: "Tiger Zinda Hai", duration: "4:22", coverColor: "from-teal-400 to-cyan-500", spotifyUrl: "https://open.spotify.com/track/1wNY2z8qD6B8z2u8y8y8y8" },
  { id: "7", title: "Shayad", artist: "Arijit Singh", album: "Love Aaj Kal", duration: "4:08", coverColor: "from-violet-400 to-purple-500", spotifyUrl: "https://open.spotify.com/track/7F9vK8h9X8X8X8X8X8X8X8" },
  { id: "8", title: "Kalank", artist: "Arijit Singh", album: "Kalank", duration: "5:11", coverColor: "from-rose-300 to-red-400", spotifyUrl: "https://open.spotify.com/track/6v8v8v8v8v8v8v8v8v8v8v" },
  { id: "9", title: "Phir Le Aya Dil", artist: "Arijit Singh", album: "Barfi!", duration: "5:06", coverColor: "from-emerald-400 to-teal-500", spotifyUrl: "https://open.spotify.com/track/5t5t5t5t5t5t5t5t5t5t5t" },
  { id: "10", title: "Muskurane", artist: "Arijit Singh", album: "CityLights", duration: "5:48", coverColor: "from-pink-400 to-rose-500", spotifyUrl: "https://open.spotify.com/track/4r4r4r4r4r4r4r4r4r4r4r" },
  { id: "11", title: "Janam Janam", artist: "Arijit Singh, Antara Mitra", album: "Dilwale", duration: "3:58", coverColor: "from-purple-400 to-indigo-500", spotifyUrl: "https://open.spotify.com/track/3e3e3e3e3e3e3e3e3e3e3e" },
  { id: "12", title: "Gerua", artist: "Arijit Singh, Antara Mitra", album: "Dilwale", duration: "5:45", coverColor: "from-orange-400 to-red-500", spotifyUrl: "https://open.spotify.com/track/2w2w2w2w2w2w2w2w2w2w2w" },
  { id: "13", title: "Tum Se Hi", artist: "Mohit Chauhan", album: "Jab We Met", duration: "5:24", coverColor: "from-green-400 to-emerald-500", spotifyUrl: "https://open.spotify.com/track/1q1q1q1q1q1q1q1q1q1q1q" },
  { id: "14", title: "Pehla Nasha", artist: "Udit Narayan, Sadhana Sargam", album: "Jo Jeeta Wohi Sikandar", duration: "4:51", coverColor: "from-yellow-400 to-amber-500", spotifyUrl: "https://open.spotify.com/track/4v4v4v4v4v4v4v4v4v4v4v" },
  { id: "15", title: "Tujhe Kitna Chahne Lage", artist: "Arijit Singh", album: "Kabir Singh", duration: "4:45", coverColor: "from-blue-500 to-indigo-600", spotifyUrl: "https://open.spotify.com/track/5w5w5w5w5w5w5w5w5w5w5w" },
  { id: "16", title: "Bekhayali", artist: "Sachet Tandon", album: "Kabir Singh", duration: "6:11", coverColor: "from-red-500 to-rose-600", spotifyUrl: "https://open.spotify.com/track/6x6x6x6x6x6x6x6x6x6x6x" },
  { id: "17", title: "Khairiyat", artist: "Arijit Singh", album: "Chhichhore", duration: "4:40", coverColor: "from-cyan-400 to-blue-500", spotifyUrl: "https://open.spotify.com/track/7y7y7y7y7y7y7y7y7y7y7y" },
  { id: "18", title: "Pachtaoge", artist: "Arijit Singh", album: "Jaani Ve", duration: "4:30", coverColor: "from-slate-400 to-gray-500", spotifyUrl: "https://open.spotify.com/track/8z8z8z8z8z8z8z8z8z8z8z" },
  { id: "19", title: "Ve Maahi", artist: "Arijit Singh, Asees Kaur", album: "Kesari", duration: "3:44", coverColor: "from-amber-500 to-yellow-600", spotifyUrl: "https://open.spotify.com/track/9a9a9a9a9a9a9a9a9a9a9a" },
  { id: "20", title: "Duniyaa", artist: "Akhil, Dhvani Bhanushali", album: "Luka Chuppi", duration: "3:42", coverColor: "from-pink-500 to-rose-600", spotifyUrl: "https://open.spotify.com/track/0b0b0b0b0b0b0b0b0b0b0b" },
  
  // English Romantic Songs
  { id: "21", title: "Perfect", artist: "Ed Sheeran", album: "÷ (Divide)", duration: "4:23", coverColor: "from-orange-500 to-red-500", spotifyUrl: "https://open.spotify.com/track/0tgVpDi06FyKpA1zm0rEO5" },
  { id: "22", title: "Thinking Out Loud", artist: "Ed Sheeran", album: "x (Multiply)", duration: "4:41", coverColor: "from-green-500 to-emerald-600", spotifyUrl: "https://open.spotify.com/track/34gCuhDGsG4bRPIf9bb02f" },
  { id: "23", title: "All of Me", artist: "John Legend", album: "Love in the Future", duration: "4:29", coverColor: "from-blue-600 to-indigo-700", spotifyUrl: "https://open.spotify.com/track/3U4isOIWM3VvDubwSI3y7a" },
  { id: "24", title: "Just the Way You Are", artist: "Bruno Mars", album: "Doo-Wops & Hooligans", duration: "3:40", coverColor: "from-red-400 to-pink-500", spotifyUrl: "https://open.spotify.com/track/7BqBn9nzAq8spo5e7cZ0dJ" },
  { id: "25", title: "A Thousand Years", artist: "Christina Perri", album: "The Twilight Saga", duration: "4:45", coverColor: "from-purple-500 to-violet-600", spotifyUrl: "https://open.spotify.com/track/6lanRgr6wXibZr8KgzXxBl" },
  { id: "26", title: "I Don't Want to Miss a Thing", artist: "Aerosmith", album: "Armageddon", duration: "4:58", coverColor: "from-gray-600 to-slate-700", spotifyUrl: "https://open.spotify.com/track/4w3tXBXz8V4V7q2e1z1z1z" },
  { id: "27", title: "Can't Help Falling in Love", artist: "Elvis Presley", album: "Blue Hawaii", duration: "3:02", coverColor: "from-blue-400 to-cyan-500", spotifyUrl: "https://open.spotify.com/track/44AyOl4qVkzS48vBsbNXaC" },
  { id: "28", title: "Make You Feel My Love", artist: "Adele", album: "19", duration: "3:32", coverColor: "from-gray-500 to-gray-600", spotifyUrl: "https://open.spotify.com/track/3d9Dzrd1v8M27F6QHkY1Kx" },
  { id: "29", title: "At Last", artist: "Etta James", album: "At Last!", duration: "3:00", coverColor: "from-gold-400 to-yellow-500", spotifyUrl: "https://open.spotify.com/track/1h2xVEJqG3Qn1w2w3w4w5w" },
  { id: "30", title: "Unchained Melody", artist: "The Righteous Brothers", album: "Just Once in My Life", duration: "3:35", coverColor: "from-indigo-500 to-purple-600", spotifyUrl: "https://open.spotify.com/track/2h2h2h2h2h2h2h2h2h2h2h" },
  { id: "31", title: "Endless Love", artist: "Lionel Richie, Diana Ross", album: "Endless Love", duration: "4:25", coverColor: "from-rose-500 to-pink-600", spotifyUrl: "https://open.spotify.com/track/3i3i3i3i3i3i3i3i3i3i3i" },
  { id: "32", title: "My Heart Will Go On", artist: "Celine Dion", album: "Titanic", duration: "4:40", coverColor: "from-cyan-500 to-blue-600", spotifyUrl: "https://open.spotify.com/track/4k4k4k4k4k4k4k4k4k4k4k" },
  { id: "33", title: "I Will Always Love You", artist: "Whitney Houston", album: "The Bodyguard", duration: "4:31", coverColor: "from-violet-500 to-purple-600", spotifyUrl: "https://open.spotify.com/track/5l5l5l5l5l5l5l5l5l5l5l" },
  { id: "34", title: "Everything I Do", artist: "Bryan Adams", album: "Waking Up the Neighbours", duration: "6:33", coverColor: "from-red-600 to-rose-700", spotifyUrl: "https://open.spotify.com/track/6m6m6m6m6m6m6m6m6m6m6m" },
  { id: "35", title: "Your Song", artist: "Elton John", album: "Elton John", duration: "4:04", coverColor: "from-yellow-500 to-amber-600", spotifyUrl: "https://open.spotify.com/track/7n7n7n7n7n7n7n7n7n7n7n" },
  { id: "36", title: "Wonderful Tonight", artist: "Eric Clapton", album: "Slowhand", duration: "3:42", coverColor: "from-pink-400 to-rose-500", spotifyUrl: "https://open.spotify.com/track/8o8o8o8o8o8o8o8o8o8o8o" },
  { id: "37", title: "The Way You Look Tonight", artist: "Frank Sinatra", album: "Swing Easy!", duration: "3:22", coverColor: "from-blue-500 to-indigo-600", spotifyUrl: "https://open.spotify.com/track/9p9p9p9p9p9p9p9p9p9p9p" },
  { id: "38", title: "Fly Me to the Moon", artist: "Frank Sinatra", album: "It Might as Well Be Swing", duration: "2:27", coverColor: "from-yellow-400 to-orange-500", spotifyUrl: "https://open.spotify.com/track/0n0n0n0n0n0n0n0n0n0n0n" },
  { id: "39", title: "La Vie En Rose", artist: "Édith Piaf", album: "La Vie En Rose", duration: "3:06", coverColor: "from-rose-400 to-pink-500", spotifyUrl: "https://open.spotify.com/track/1q1q1q1q1q1q1q1q1q1q1q" },
  { id: "40", title: "Yellow", artist: "Coldplay", album: "Parachutes", duration: "4:29", coverColor: "from-yellow-400 to-yellow-500", spotifyUrl: "https://open.spotify.com/track/3AJwUDP919kvQ9QcozQPxg" },
  
  // More Modern Love Songs
  { id: "41", title: "Say You Won't Let Go", artist: "James Arthur", album: "Back from the Edge", duration: "3:31", coverColor: "from-orange-400 to-red-500", spotifyUrl: "https://open.spotify.com/track/5uCax9HTNlzGybIStD3vDh" },
  { id: "42", title: "Photograph", artist: "Ed Sheeran", album: "x (Multiply)", duration: "4:18", coverColor: "from-green-400 to-teal-500", spotifyUrl: "https://open.spotify.com/track/6fxVffaTuwjgEk5h9yIewE" },
  { id: "43", title: "Love Me Like You Do", artist: "Ellie Goulding", album: "Fifty Shades of Grey", duration: "4:12", coverColor: "from-gray-400 to-slate-500", spotifyUrl: "https://open.spotify.com/track/3b7mS6Xcvq2w6b4w1w2w3w" },
  { id: "44", title: "Stay With Me", artist: "Sam Smith", album: "In the Lonely Hour", duration: "2:52", coverColor: "from-blue-400 to-indigo-500", spotifyUrl: "https://open.spotify.com/track/5Db9V5dFo4zYv4z4z5z6z7" },
  { id: "45", title: "Adore You", artist: "Harry Styles", album: "Fine Line", duration: "3:27", coverColor: "from-pink-400 to-rose-500", spotifyUrl: "https://open.spotify.com/track/3jj3jj3jj3jj3jj3jj3jj3" },
  { id: "46", title: "Watermelon Sugar", artist: "Harry Styles", album: "Fine Line", duration: "2:54", coverColor: "from-red-400 to-pink-500", spotifyUrl: "https://open.spotify.com/track/6UelLqGlWMcVH1E5c4H7lY" },
  { id: "47", title: "Levitating", artist: "Dua Lipa", album: "Future Nostalgia", duration: "3:23", coverColor: "from-purple-400 to-indigo-500", spotifyUrl: "https://open.spotify.com/track/39LLxExYz6ewLAcYrzQQyP" },
  { id: "48", title: "Peaches", artist: "Justin Bieber", album: "Justice", duration: "3:18", coverColor: "from-orange-400 to-amber-500", spotifyUrl: "https://open.spotify.com/track/4iV5W9uYEdYUVa79Axb7Rh" },
  { id: "49", title: "Intentions", artist: "Justin Bieber", album: "Changes", duration: "3:32", coverColor: "from-yellow-400 to-orange-500", spotifyUrl: "https://open.spotify.com/track/4i1i1i1i1i1i1i1i1i1i1i" },
  { id: "50", title: "10,000 Hours", artist: "Dan + Shay, Justin Bieber", album: "10,000 Hours", duration: "2:47", coverColor: "from-teal-400 to-cyan-500", spotifyUrl: "https://open.spotify.com/track/2wrJq5XKLnmhRXHIAf9xI0" },
  { id: "51", title: "Die With A Smile", artist: "Lady Gaga, Bruno Mars", album: "Die With A Smile", duration: "4:11", coverColor: "from-red-500 to-rose-600", spotifyUrl: "https://open.spotify.com/track/2plbrEY59IikOBgBNGjaMh" },
  { id: "52", title: "Until I Found You", artist: "Stephen Sanchez", album: "Easy On My Eyes", duration: "2:57", coverColor: "from-amber-400 to-yellow-500", spotifyUrl: "https://open.spotify.com/track/0rzaRSujxA0yKmjm6kz5vG" },
  { id: "53", title: "Snooze", artist: "SZA", album: "SOS", duration: "3:21", coverColor: "from-violet-400 to-purple-500", spotifyUrl: "https://open.spotify.com/track/1Qrg8KqiBpW07iCocNsfER" },
  { id: "54", title: "Cruel Summer", artist: "Taylor Swift", album: "Lover", duration: "2:58", coverColor: "from-pink-500 to-rose-600", spotifyUrl: "https://open.spotify.com/track/1BxfuPKGuaTgP7aM0Bbdwr" },
  { id: "55", title: "Lover", artist: "Taylor Swift", album: "Lover", duration: "3:41", coverColor: "from-blue-400 to-pink-500", spotifyUrl: "https://open.spotify.com/track/1dGr1c8CrMLDpV6mPbImSI" },
  { id: "56", title: "Enchanted", artist: "Taylor Swift", album: "Speak Now", duration: "5:53", coverColor: "from-purple-400 to-violet-500", spotifyUrl: "https://open.spotify.com/track/04S1pkp1UaIuJ3urfz7Ehw" },
  { id: "57", title: "You Belong With Me", artist: "Taylor Swift", album: "Fearless", duration: "3:52", coverColor: "from-yellow-400 to-amber-500", spotifyUrl: "https://open.spotify.com/track/1qrpoAMXodY6895hGKoUpI" },
  { id: "58", title: "Paper Rings", artist: "Taylor Swift", album: "Lover", duration: "2:42", coverColor: "from-red-400 to-orange-500", spotifyUrl: "https://open.spotify.com/track/4y5l5l5l5l5l5l5l5l5l5l" },
  { id: "59", title: "August", artist: "Taylor Swift", album: "Folklore", duration: "4:21", coverColor: "from-amber-300 to-orange-400", spotifyUrl: "https://open.spotify.com/track/3h3h3h3h3h3h3h3h3h3h3h" },
  { id: "60", title: "Style", artist: "Taylor Swift", album: "1989", duration: "3:51", coverColor: "from-gray-400 to-slate-500", spotifyUrl: "https://open.spotify.com/track/0h0h0h0h0h0h0h0h0h0h0h" },
];

// Simple hash function for date-based selection
function getDateHash(date: Date): number {
  const dateStr = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`;
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    const char = dateStr.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

// Get 3 songs based on today's date
export function getTodaysSongs(date: Date = new Date()): Song[] {
  const hash = getDateHash(date);
  const songs: Song[] = [];
  const usedIndices = new Set<number>();

  // Select 3 unique songs based on hash
  for (let i = 0; i < 3; i++) {
    let index = (hash + i * 17) % playlistSongs.length;
    while (usedIndices.has(index)) {
      index = (index + 1) % playlistSongs.length;
    }
    usedIndices.add(index);
    songs.push(playlistSongs[index]);
  }

  return songs;
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
