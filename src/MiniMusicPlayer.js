import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MiniMusicPlayer = ({ onAudioRef }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  
  const audioRef = useRef(null);

  // Expose audio ref to parent
  useEffect(() => {
    if (onAudioRef) {
      onAudioRef(audioRef);
    }
  }, [onAudioRef]);

  // Check if mobile device - more comprehensive detection
  const isMobile = /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                     (typeof window.orientation !== "undefined") || 
                     (navigator.userAgent.includes("Mobile")) ||
                     window.innerWidth <= 768;

  // Playlist
  const playlist = [
    { name: "No Other Heart", artist: "Mac DeMarco", src: "/music/Mac DeMarco __ No Other Heart (Official Audio) - CapturedTracks.mp3", cover: "/music-images/no other heart.jpg" },
    { name: "I Like Her", artist: "Mac DeMarco", src: "/music/20191009 I Like Her - Mac DeMarco.mp3", cover: "/music-images/i like her.jpg" },
    { name: "For the First Time", artist: "Mac DeMarco", src: "/music/For the First Time - Mac DeMarco.mp3", cover: "/music-images/for the first time.jpg" },
    { name: "Heart To Heart", artist: "Mac DeMarco", src: "/music/Heart To Heart - Mac DeMarco.mp3", cover: "/music-images/heart to heart.jpg" },
    { name: "My Kind Of Woman", artist: "Mac DeMarco", src: "/music/Mac DeMarco __ My Kind Of Woman - CapturedTracks.mp3", cover: "/music-images/my kind of women.jpg" },
    { name: "Here Comes The Sun", artist: "The Beatles", src: "/music/Here Comes The Sun (2019 Mix) - The Beatles.mp3", cover: "/music-images/here comes the sun.jpg" },
    { name: "Yesterday", artist: "The Beatles", src: "/music/Yesterday (Remastered 2015) - The Beatles .mp3", cover: "/music-images/yesterday.jpg" },
    { name: "No Surprises", artist: "Radiohead", src: "/music/Radiohead - No Surprises - Radiohead.mp3", cover: "/music-images/no sup[rises.jpg" },
    { name: "Please, Please, Please Let Me Get What I Want", artist: "The Smiths", src: "/music/The Smiths - Please, Please, Please Let Me Get What I Want - The Smiths.mp3", cover: "/music-images/please please let me.jpg" },
    { name: "There Is A Light That Never Goes Out", artist: "The Smiths", src: "/music/The Smiths - There Is A Light That Never Goes Out (Official Audio) - The Smiths.mp3", cover: "/music-images/there is a lite that never goes.jpg" },
  ];

  const currentTrack = playlist[currentTrackIndex];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      if (currentTrackIndex < playlist.length - 1) {
        setCurrentTrackIndex(currentTrackIndex + 1);
      } else {
        setIsPlaying(false);
      }
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentTrackIndex, playlist.length]);

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

  const togglePlay = () => {
    if (!hasInteracted) {
      setHasInteracted(true);
    }
    
    // Force play on mobile after user interaction
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        // Try to play with user interaction
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.then(() => {
            setIsPlaying(true);
          }).catch(error => {
            console.log("Play failed:", error);
            setIsPlaying(false);
          });
        } else {
          setIsPlaying(true);
        }
      }
    }
  };

  const toggleExpand = () => {
    console.log("Toggle expand clicked. isMobile:", isMobile, "hasInteracted:", hasInteracted);
    setIsExpanded(!isExpanded);
    
    // On mobile, if this is the first interaction, try to start playing
    if (!hasInteracted && !isPlaying) {
      setHasInteracted(true);
      if (audioRef.current) {
        console.log("Attempting to play on expand...");
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.then(() => {
            setIsPlaying(true);
            console.log("Play on expand successful!");
          }).catch(error => {
            console.log("Play on expand failed:", error);
          });
        }
      }
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
      
      {/* Mini Player - Cover Only */}
      {!isExpanded && (
        <div 
          className="fixed top-3 right-3 z-50 w-12 h-12 sm:w-14 sm:h-14 sm:w-16 sm:h-16 rounded-xl shadow-lg overflow-hidden border border-gray-200 cursor-pointer"
          onClick={toggleExpand}
        >
          <img
            src={currentTrack.cover}
            alt={currentTrack.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' fill='%23f3f4f6'/%3E%3Ctext x='32' y='32' text-anchor='middle' dy='.3em' font-family='Arial' font-size='16' fill='%236b7280'%3E🎵%3C/text%3E%3C/svg%3E";
            }}
          />
          
          {/* Play/Pause Overlay - Much larger for mobile */}
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="w-6 h-6 sm:w-5 sm:h-5 bg-white/90 rounded-full flex items-center justify-center">
              {isPlaying ? (
                <svg className="w-3 h-3 sm:w-2.5 sm:h-2.5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"/>
                </svg>
              ) : (
                <svg className="w-3 h-3 sm:w-2.5 sm:h-2.5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"/>
                </svg>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Expanded Player */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed top-3 right-3 z-50 w-64 h-64 sm:w-72 sm:h-72 rounded-2xl shadow-2xl overflow-hidden border border-gray-200"
          >
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
              
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              
              {/* Content Overlay */}
              <div className="absolute inset-0 p-4 flex flex-col justify-between">
                {/* Top Section - Track Info and Close Button */}
                <div>
                  <div className="flex items-start justify-between">
                    <div className="flex-1 mr-2">
                      <h3 className="text-sm font-bold text-white truncate drop-shadow-lg">{currentTrack.name}</h3>
                      <p className="text-xs text-white/90 drop-shadow">{currentTrack.artist}</p>
                    </div>
                    
                    {/* Close Button */}
                    <button
                      onClick={toggleExpand}
                      className="p-2 bg-black/30 hover:bg-black/50 rounded-lg transition-all duration-200 backdrop-blur-sm"
                    >
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"/>
                      </svg>
                    </button>
                  </div>
                </div>
                
                {/* Middle Section - Progress Bar */}
                <div className="my-4">
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
                      onChange={(e) => {
                        const newTime = parseFloat(e.target.value);
                        setCurrentTime(newTime);
                        if (audioRef.current) {
                          audioRef.current.currentTime = newTime;
                        }
                      }}
                      className="absolute inset-0 w-full h-1 opacity-0 cursor-pointer"
                    />
                  </div>
                </div>
                
                {/* Bottom Section - Controls */}
                <div className="flex items-center justify-center gap-6">
                  <button
                    onClick={() => {
                      // Circular navigation: first song previous → last song
                      const newIndex = currentTrackIndex === 0 ? playlist.length - 1 : currentTrackIndex - 1;
                      setCurrentTrackIndex(newIndex);
                      if (!hasInteracted) {
                        setHasInteracted(true);
                      }
                    }}
                    className="p-2 bg-black/30 hover:bg-black/50 rounded-full transition-all duration-200 backdrop-blur-sm"
                  >
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8.445 14.832A1 1 0 0010 14v-8a1 1 0 00-1.555-.832L3 9.168v-2.5a1 1 0 00-2 0v7a1 1 0 002 0v-2.5l5.445 4z"/>
                    </svg>
                  </button>
                  
                  <button
                    onClick={togglePlay}
                    className="p-4 sm:p-3 bg-white/90 hover:bg-white text-gray-700 rounded-full transition-all duration-200 shadow-lg transform hover:scale-105"
                  >
                    {isPlaying ? (
                      <svg className="w-6 h-6 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"/>
                      </svg>
                    ) : (
                      <svg className="w-6 h-6 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"/>
                      </svg>
                    )}
                  </button>
                  
                  <button
                    onClick={() => {
                      // Circular navigation: last song next → first song
                      const newIndex = currentTrackIndex === playlist.length - 1 ? 0 : currentTrackIndex + 1;
                      setCurrentTrackIndex(newIndex);
                      if (!hasInteracted) {
                        setHasInteracted(true);
                      }
                    }}
                    className="p-2 bg-black/30 hover:bg-black/50 rounded-full transition-all duration-200 backdrop-blur-sm"
                  >
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 10.832V14a1 1 0 002 0V6a1 1 0 00-2 0v3.168L4.555 5.168z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MiniMusicPlayer;
