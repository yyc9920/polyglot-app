export interface LastFmTrack {
  name: string;
  duration: string;
  mbid: string;
  url: string;
  streamable: {
    '#text': string;
    fulltrack: string;
  };
  artist: {
    name: string;
    mbid: string;
    url: string;
  };
  image: {
    '#text': string;
    size: 'small' | 'medium' | 'large' | 'extralarge';
  }[];
  '@attr': {
    rank: string;
  };
}

export interface LastFmTopTracksResponse {
  tracks: {
    track: LastFmTrack[];
    '@attr': {
      tag: string;
      page: string;
      perPage: string;
      totalPages: string;
      total: string;
    };
  };
}

export async function getTopTracksByTag(tag: string, apiKey: string): Promise<LastFmTrack[]> {
  try {
    const response = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=${encodeURIComponent(tag)}&api_key=${apiKey}&format=json&limit=10`
    );

    if (!response.ok) {
      throw new Error(`Last.fm API Error: ${response.statusText}`);
    }

    const data: LastFmTopTracksResponse = await response.json();
    return data.tracks.track;
  } catch (error) {
    console.error('Failed to fetch Last.fm top tracks:', error);
    return [];
  }
}
