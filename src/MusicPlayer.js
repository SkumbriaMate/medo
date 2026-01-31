import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
    const newMusic = [
      "https://xapopyizznjubyostnxn.supabase.co/storage/v1/object/public/Medos%20webb/covers/Radiohead%20-%20Let%20Down.mp3",
      "https://xapopyizznjubyostnxn.supabase.co/storage/v1/object/public/Medos%20webb/covers/Forever.mp3"
    ];
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0); // Start with first Mac DeMarco song
  const [showDropdown, setShowDropdown] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  
  const audioRef = useRef(null);

  // Check if mobile device
  const isMobile = /iPhone|iPad|iPod|Android|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  // Auto-generated playlist from music folder
  const playlist = [
    { name: "No Other Heart", artist: "Mac DeMarco", src: "/music/Mac DeMarco __ No Other Heart (Official Audio) - CapturedTracks.mp3", cover: "/music-images/no other heart.jpg" },
    { name: "I Like Her", artist: "Mac DeMarco", src: "/music/20191009 I Like Her - Mac DeMarco.mp3", cover: "/music-images/i like her.jpg" },
    { name: "For the First Time", artist: "Mac DeMarco", src: "/music/For the First Time - Mac DeMarco.mp3", cover: "/music-images/for the first time.jpg" },
    { name: "Heart To Heart", artist: "Mac DeMarco", src: "/music/Heart To Heart - Mac DeMarco.mp3", cover: "/music-images/heart to heart.jpg" },
    { name: "My Kind Of Woman", artist: "Mac DeMarco", src: "/music/Mac DeMarco __ My Kind Of Woman - CapturedTracks.mp3", cover: "/music-images/my kind of women.jpg" },
    { name: "Here Comes The Sun", artist: "The Beatles", src: "/music/Here Comes The Sun (2019 Mix) - The Beatles.mp3", cover: "/music-images/here comes the sun.jpg" },
   { name: "Let Down", artist: "Radiohead", src: "/music/Radiohead - Let Down.mp3", cover: "/music-images/let down.jpg" },
    { name: "No Surprises", artist: "Radiohead", src: "/music/Radiohead - No Surprises - Radiohead.mp3", cover: "/music-images/no sup[rises.jpg" },
    { name: "Please, Please, Please Let Me Get What I Want", artist: "The Smiths", src: "/music/The Smiths - Please, Please, Please Let Me Get What I Want - The Smiths.mp3", cover: "/music-images/please please let me.jpg" },
    { name: "There Is A Light That Never Goes Out", artist: "The Smiths", src: "/music/The Smiths - There Is A Light That Never Goes Out (Official Audio) - The Smiths.mp3", cover: "/music-images/there is a lite that never goes.jpg" },
    { name: "Forever", artist: "Unknown", src: "https://xapopyizznjubyostnxn.supabase.co/storage/v1/object/public/Medos%20webb/covers/Forever.mp3", cover: "https://xapopyizznjubyostnxn.supabase.co/storage/v1/object/public/Medos%20webb/covers/forever.jpg" },
    // Added tracks
   
  ];

  const currentTrack = playlist[currentTrackIndex];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Update time
    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    
    // Handle track end
    const handleEnded = () => {
      if (currentTrackIndex < playlist.length - 1) {
        setCurrentTrackIndex(currentTrackIndex + 1);
      } else {
        setIsPlaying(false);
      }
    };

    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentTrackIndex, playlist.length]);

  // Auto-start music on first user interaction
  useEffect(() => {
    const startMusicOnInteraction = async () => {
      if (audioRef.current && !hasInteracted) {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
          setHasInteracted(true);
          console.log("✓ Music started on user interaction!");
        } catch (error) {
          console.log("Failed to start music:", error.message);
        }
      }
    };

    // Listen for any user interaction
    window.addEventListener('click', startMusicOnInteraction, { once: true });
    window.addEventListener('touchstart', startMusicOnInteraction, { once: true });
    window.addEventListener('keydown', startMusicOnInteraction, { once: true });

    return () => {
      window.removeEventListener('click', startMusicOnInteraction);
      window.removeEventListener('touchstart', startMusicOnInteraction);
      window.removeEventListener('keydown', startMusicOnInteraction);
    };
  }, [hasInteracted]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(e => {
            console.log("Auto-play prevented:", e);
          });
        }
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex]);

  const togglePlay = () => {
    if (!hasInteracted) {
      setHasInteracted(true);
    }
    
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.then(() => {
            setIsPlaying(true);
          }).catch(error => {
            console.log("Play failed:", error);
          });
        } else {
          setIsPlaying(true);
        }
      }
    }
  };

  const selectTrack = (index) => {
    if (!hasInteracted) {
      setHasInteracted(true);
    }
    setCurrentTrackIndex(index);
    setIsPlaying(true);
    setShowDropdown(false);
  };

  const nextTrack = () => {
    if (!hasInteracted) {
      setHasInteracted(true);
    }
    if (currentTrackIndex < playlist.length - 1) {
      setCurrentTrackIndex(currentTrackIndex + 1);
    }
  };

  const prevTrack = () => {
    if (!hasInteracted) {
      setHasInteracted(true);
    }
    if (currentTrackIndex > 0) {
      setCurrentTrackIndex(currentTrackIndex - 1);
    }
  };

  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={currentTrack.src}
        crossOrigin="anonymous"
      />
      
      <div className="fixed top-3 right-3 z-50 w-56 h-56 sm:w-64 sm:h-64 rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
        {/* Cover as Background */}
        <div className="relative w-full h-full">
          <img
            src={currentTrack.cover}
            alt={currentTrack.name}
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => {
              e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256' viewBox='0 0 256 256'%3E%3Crect width='256' height='256' fill='%23f3f4f6'/%3E%3Ctext x='128' y='128' text-anchor='middle' dy='.3em' font-family='Arial' font-size='32' fill='%236b7280'%3E🎵%3C/text%3E%3C/svg%3E";
            }}
          />
          
          {/* Dark Overlay for Better Text Visibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
          
          {/* Content Overlay */}
          <div className="absolute inset-0 p-3 sm:p-4 flex flex-col justify-between">
            {/* Top Section - Track Info and Dropdown */}
            <div>
              <div className="flex items-start justify-between">
                <div className="flex-1 mr-2">
                  <h3 className="text-xs sm:text-sm font-bold text-white truncate drop-shadow-lg">{currentTrack.name}</h3>
                  <p className="text-xs text-white/90 drop-shadow">{currentTrack.artist}</p>
                </div>
                
                {/* Dropdown Toggle */}
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="p-1.5 bg-black/30 hover:bg-black/50 rounded-lg transition-all duration-200 backdrop-blur-sm"
                >
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/>
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Middle Section - Progress Bar */}
            <div className="my-3 sm:my-4">
              <div className="flex items-center justify-between text-xs text-white/80 mb-2">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
              <div className="relative">
                <div className="w-full h-1 bg-white/30 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-white rounded-full transition-all duration-300"
                    style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                  />
                </div>
                <input
                  type="range"
                  min="0"
                  max={duration || 0}
                  value={currentTime}
                  onChange={handleSeek}
                  className="absolute inset-0 w-full h-1 opacity-0 cursor-pointer slider"
                />
              </div>
            </div>
            
            {/* Bottom Section - Controls */}
            <div className="flex items-center justify-center gap-4 sm:gap-6">
              <button
                onClick={prevTrack}
                disabled={currentTrackIndex === 0}
                className="p-2 bg-black/30 hover:bg-black/50 rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm"
              >
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8.445 14.832A1 1 0 0010 14v-8a1 1 0 00-1.555-.832L3 9.168v-2.5a1 1 0 00-2 0v7a1 1 0 002 0v-2.5l5.445 4z"/>
                </svg>
              </button>
              
              <button
                onClick={togglePlay}
                className="p-2.5 sm:p-3 bg-white/90 hover:bg-white text-gray-700 rounded-full transition-all duration-200 shadow-lg"
              >
                {isPlaying ? (
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"/>
                  </svg>
                ) : (
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"/>
                  </svg>
                )}
              </button>
              
              <button
                onClick={nextTrack}
                disabled={currentTrackIndex === playlist.length - 1}
                className="p-2 bg-black/30 hover:bg-black/50 rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm"
              >
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 10.832V14a1 1 0 002 0V6a1 1 0 00-2 0v3.168L4.555 5.168z"/>
                </svg>
              </button>
            </div>
          </div>
          
          {/* Playlist Dropdown */}
          <AnimatePresence>
            {showDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className="absolute top-full left-0 mt-2 w-48 sm:w-56 bg-white rounded-xl shadow-2xl border border-gray-200 max-h-64 overflow-y-auto z-50"
              >
                {playlist.map((track, index) => (
                  <button
                    key={index}
                    onClick={() => selectTrack(index)}
                    className={`w-full text-left px-3 py-2 hover:bg-gray-50 transition-all duration-200 border-b border-gray-100 last:border-b-0 flex items-center gap-3 ${
                      index === currentTrackIndex ? 'bg-gray-100 text-gray-900 font-semibold' : 'text-gray-700'
                    }`}
                  >
                    <img
                      src={track.cover}
                      alt={track.name}
                      className="w-8 h-8 sm:w-10 sm:h-10 object-cover rounded"
                      onError={(e) => {
                        e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' fill='%23f3f4f6'/%3E%3Ctext x='20' y='20' text-anchor='middle' dy='.3em' font-family='Arial' font-size='12' fill='%236b7280'%3E🎵%3C/text%3E%3C/svg%3E";
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate text-xs sm:text-sm">{track.name}</div>
                      <div className="text-xs text-gray-500">{track.artist}</div>
                    </div>
                    {index === currentTrackIndex && isPlaying && (
                      <div className="w-2 h-2 bg-gray-600 rounded-full animate-pulse"></div>
                    )}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 12px;
          height: 12px;
          background: #ec4899;
          border-radius: 50%;
          cursor: pointer;
        }
        .slider::-moz-range-thumb {
          width: 12px;
          height: 12px;
          background: #ec4899;
          border-radius: 50%;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </>
  );
};

export default MusicPlayer;
