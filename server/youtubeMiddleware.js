const axios = require('axios');

/**
 * YouTube Data API v3 Middleware
 * This snippet provides the logic to fetch trending videos and shorts from YouTube.
 * Place this in your Express server logic.
 */

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3';

const fetchYoutubeVideos = async (req, res) => {
    try {
        const { type = 'trending', pageToken = '' } = req.query;
        
        let endpoint = `${YOUTUBE_API_URL}/videos`;
        let params = {
            part: 'snippet,contentDetails,statistics',
            chart: 'mostPopular',
            regionCode: 'US',
            maxResults: 10,
            key: YOUTUBE_API_KEY,
            pageToken: pageToken
        };

        // If searching for shorts specifically (YouTube doesn't have a direct 'shorts' chart, 
        // we often filter by hashtags or use the search endpoint with videoDuration='short')
        if (type === 'shorts') {
            endpoint = `${YOUTUBE_API_URL}/search`;
            params = {
                part: 'snippet',
                q: '#shorts',
                type: 'video',
                videoDuration: 'short',
                maxResults: 10,
                key: YOUTUBE_API_KEY,
                pageToken: pageToken
            };
        }

        const response = await axios.get(endpoint, { params });
        
        // Unified JSON Format
        const unifiedData = response.data.items.map(item => {
            const id = item.id.videoId || item.id;
            return {
                id: id,
                title: item.snippet.title,
                thumbnail: item.snippet.thumbnails.high.url,
                channelTitle: item.snippet.channelTitle,
                description: item.snippet.description,
                publishedAt: item.snippet.publishedAt,
                videoUrl: `https://www.youtube.com/watch?v=${id}`,
                // Mapping to Hybrid Social Media Format
                user: item.snippet.channelTitle,
                avatar: item.snippet.thumbnails.default.url,
                caption: item.snippet.title,
                type: type === 'shorts' ? 'reel' : 'video'
            };
        });

        res.json({
            success: true,
            data: unifiedData,
            nextPageToken: response.data.nextPageToken
        });

    } catch (error) {
        console.error('YouTube API Error:', error.response?.data || error.message);
        res.status(500).json({ 
            success: false, 
            error: 'Failed to fetch YouTube content' 
        });
    }
};

module.exports = { fetchYoutubeVideos };
