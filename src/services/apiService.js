const INITIAL_POSTS = [
    { 
        id: 1, 
        user: 'CyberArtist', 
        avatar: 'https://i.pravatar.cc/150?img=33', 
        images: ['https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80', 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80'], 
        caption: 'Deep diving into Neo-Tokyo architecture. The glassmorphism effects here are insane! #Cyberpunk #Design', 
        time: '2h ago', 
        likes: 1240 
    },
    { 
        id: 2, 
        user: 'DesignGuru', 
        avatar: 'https://i.pravatar.cc/150?img=44', 
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80', 
        caption: 'Glassmorphism is here to stay. Look at these textures.', 
        time: '5h ago', 
        likes: 890 
    },
    {
        id: 3,
        user: 'Futurist',
        avatar: 'https://i.pravatar.cc/150?img=12',
        images: [
            'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
            'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
            'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&q=80',
            'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80'
        ],
        caption: 'The intersection of AI and Human creativity is the most exciting space in tech right now.',
        time: '1d ago',
        likes: 2400
    }
];

const MOCK_USERS = [
    { id: 1, name: 'Chloe Davis', code: '#87654321', avatar: 'https://i.pravatar.cc/150?u=chloe' },
    { id: 2, name: 'Alex Cyber', code: '#11223344', avatar: 'https://i.pravatar.cc/150?u=alex' },
    { id: 3, name: 'NeonExplorer', code: '#44556677', avatar: 'https://i.pravatar.cc/150?u=neon' },
];

export const getInitialPosts = () => INITIAL_POSTS;
export const getMockUsers = () => MOCK_USERS;

export const generateMorePosts = (count = 5) => {
    return Array.from({ length: count }).map((_, i) => ({
        id: Date.now() + i,
        user: `Explorer_${Math.floor(Math.random() * 1000)}`,
        avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 50)}`,
        image: `https://picsum.photos/800/600?sig=${Math.floor(Math.random() * 1000)}`,
        caption: 'Just discovered this amazing spot. The Hybrid View is truly different. #Discovery #Live',
        time: `${Math.floor(Math.random() * 24)}h ago`,
        likes: Math.floor(Math.random() * 5000)
    }));
};
