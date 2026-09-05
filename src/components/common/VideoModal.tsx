import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Play, Sparkles } from "lucide-react";
import { Button } from "../lightswind/button";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  badge?: string;
  repoUrl?: string;
  videoUrl: string;
  videoDuration?: string;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  title,
  badge,
  repoUrl,
  videoUrl,
  videoDuration,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
      if (videoRef.current) {
        videoRef.current.pause();
      }
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6 md:p-8">
          {/* Backdrop with strong blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Dialog Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: "spring", damping: 26, stiffness: 320 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl rounded-3xl border border-white/15 bg-card/95 shadow-2xl overflow-hidden flex flex-col z-10 max-h-[92vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border/60 bg-background/60 backdrop-blur-sm">
              <div className="flex items-center gap-3 pr-4 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center text-primary shrink-0">
                  <Play className="w-4 h-4 fill-current" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-base sm:text-lg font-bold text-foreground truncate">
                      {title}
                    </h3>
                    {badge && (
                      <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full border border-primary/30 bg-primary/10 text-primary font-bold">
                        {badge}
                      </span>
                    )}
                    {videoDuration && (
                      <span className="text-[11px] font-mono text-muted-foreground bg-muted/60 px-2 py-0.5 rounded-md">
                        {videoDuration}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0">
                {repoUrl && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 px-3 rounded-full text-xs font-semibold gap-1.5 border-border/80 hover:bg-foreground/5 hidden sm:inline-flex"
                    onClick={() => window.open(repoUrl, "_blank", "noopener,noreferrer")}
                  >
                    <span>GitHub</span>
                    <ExternalLink className="w-3 h-3" />
                  </Button>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-foreground/10 hover:bg-foreground/20 text-foreground flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Cerrar video"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Video Player Container (16:9 ratio) */}
            <div className="relative w-full bg-black flex items-center justify-center aspect-video overflow-hidden">
              <video
                ref={videoRef}
                src={videoUrl}
                controls
                autoPlay
                playsInline
                preload="metadata"
                className="w-full h-full object-contain"
              >
                Tu navegador no soporta reproducción de video HTML5.
              </video>
            </div>

            {/* Footer Information */}
            <div className="px-6 py-3 border-t border-border/50 bg-background/50 flex items-center justify-between text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span>Transmisión fluida optimizada vía GitHub CDN</span>
              </span>
              {repoUrl && (
                <a
                  href={repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sm:hidden text-primary font-bold hover:underline"
                >
                  Ver código
                </a>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default VideoModal;
