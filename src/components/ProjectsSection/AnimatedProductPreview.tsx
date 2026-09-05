import React from "react";
import { motion } from "framer-motion";
import {
  Dumbbell,
  Mic,
  Video,
  FileText,
  BarChart3,
  Volume2,
  Database,
} from "lucide-react";

interface AnimatedProductPreviewProps {
  projectId: string;
  isActive: boolean;
}

export const AnimatedProductPreview: React.FC<AnimatedProductPreviewProps> = ({
  projectId,
  isActive,
}) => {
  switch (projectId) {
    case "gymgineer":
      return <GymgineerAnimatedPreview isActive={isActive} />;
    case "voxify":
      return <VoxifyAnimatedPreview isActive={isActive} />;
    case "genovideo":
      return <GenovideoAnimatedPreview isActive={isActive} />;
    case "inkredo":
      return <InkredoAnimatedPreview isActive={isActive} />;
    case "opinizoom":
      return <OpinizoomAnimatedPreview isActive={isActive} />;
    default:
      return null;
  }
};

/* =========================================================================
   1. GYMGINEER: Computer Vision & AI Workout Trainer
   Realistic Gym Barbell, Squat Rack, 20kg Plates, Bar Path Tracking & Depth HUD
   ========================================================================= */
const GymgineerAnimatedPreview: React.FC<{ isActive: boolean }> = ({ isActive: _isActive }) => {
  return (
    <div className="relative w-full h-full bg-slate-950 text-slate-100 overflow-hidden select-none flex flex-col justify-between p-4 sm:p-5 font-sans">
      {/* Background Gym Floor / Rubber Mat Grid */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Top Gym Station Header */}
      <div className="relative z-10 flex items-center justify-between border-b border-slate-800/80 pb-2">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center">
            <Dumbbell className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-200 block leading-tight">
              Squat Rack #02 · Olympic Barbell
            </span>
            <span className="font-mono text-[9px] text-slate-400">Exercise: Back Squat</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold">
            100 KG · 225 LBS
          </span>
          <span className="font-mono text-[9px] text-cyan-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            60 FPS
          </span>
        </div>
      </div>

      {/* Center Gym Viewport: Squat Rig & Animated Barbell Lift with Bar Path */}
      <div className="relative z-10 flex-1 my-1 flex items-center justify-center">
        <div className="relative w-full max-w-[340px] h-[145px] sm:h-[155px] rounded-xl border border-slate-800 bg-slate-900/60 backdrop-blur-xs p-2.5 flex flex-col justify-between overflow-hidden shadow-inner">
          {/* Vertical Squat Rack Steel Uprights (Left & Right) */}
          <div className="absolute left-6 top-0 bottom-0 w-2.5 bg-slate-800 border-x border-slate-700 flex flex-col justify-around py-2">
            {[18, 16, 14, 12, 10].map((pin) => (
              <div key={pin} className="w-1.5 h-1 rounded-full bg-slate-950 mx-auto" />
            ))}
          </div>
          <div className="absolute right-6 top-0 bottom-0 w-2.5 bg-slate-800 border-x border-slate-700 flex flex-col justify-around py-2">
            {[18, 16, 14, 12, 10].map((pin) => (
              <div key={pin} className="w-1.5 h-1 rounded-full bg-slate-950 mx-auto" />
            ))}
          </div>

          {/* Real-time Bar Path Dotted Tracking Laser Centerline */}
          <div className="absolute left-1/2 top-4 bottom-4 -translate-x-1/2 w-[1px] border-l border-dashed border-cyan-400/50 pointer-events-none" />

          {/* Top Detection Pill */}
          <div className="relative z-20 flex items-center justify-between text-[9px] font-mono">
            <span className="text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
              AI BAR PATH: 99.2% VERTICAL
            </span>
            <span className="text-emerald-400 bg-emerald-950/70 px-2 py-0.5 rounded border border-emerald-500/30 font-bold">
              DEPTH: 88° PARALLEL
            </span>
          </div>

          {/* Animated Realistic Olympic Barbell with Plates */}
          <div className="relative flex-1 flex items-center justify-center my-1">
            <motion.div
              className="relative w-full flex items-center justify-center z-20"
              animate={{
                y: [-18, 22, 22, -18, -18],
              }}
              transition={{
                duration: 3.2,
                repeat: Infinity,
                times: [0, 0.44, 0.54, 0.85, 1],
                ease: "easeInOut",
              }}
            >
              {/* Left Plates (2 x 20kg Black Plates + Chrome Collar) */}
              <div className="flex items-center">
                {/* Outer 20kg Plate */}
                <div className="w-3.5 h-18 sm:h-20 bg-gradient-to-r from-zinc-700 via-zinc-800 to-zinc-900 rounded-sm border border-zinc-600 shadow-md flex items-center justify-center">
                  <span className="text-[7px] font-mono font-bold text-zinc-300 -rotate-90">20</span>
                </div>
                {/* Inner 20kg Plate */}
                <div className="w-3.5 h-18 sm:h-20 bg-gradient-to-r from-zinc-800 via-zinc-900 to-zinc-800 rounded-sm border border-zinc-600 shadow-md ml-0.5 flex items-center justify-center">
                  <span className="text-[7px] font-mono font-bold text-zinc-300 -rotate-90">20</span>
                </div>
                {/* Barbell Sleeve Collar */}
                <div className="w-2 h-7 bg-zinc-400 border border-zinc-300 rounded-xs shadow-xs" />
              </div>

              {/* Main Olympic Bar (Chrome Steel with knurling) */}
              <div className="flex-1 max-w-[170px] sm:max-w-[200px] h-2.5 bg-gradient-to-b from-zinc-300 via-zinc-100 to-zinc-400 rounded-xs relative shadow-sm">
                {/* Center Laser Tracking Point with Pulsing Ring */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="w-3.5 h-3.5 rounded-full bg-cyan-400/30 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(6,182,212,1)]" />
                  </div>
                </div>
                {/* Knurling Grid Texture on Bar */}
                <div className="absolute left-3 right-3 top-0 bottom-0 opacity-30 bg-[radial-gradient(black_1px,transparent_0)] bg-[size:3px_3px]" />
              </div>

              {/* Right Plates (2 x 20kg Black Plates + Chrome Collar) */}
              <div className="flex items-center">
                {/* Barbell Sleeve Collar */}
                <div className="w-2 h-7 bg-zinc-400 border border-zinc-300 rounded-xs shadow-xs" />
                {/* Inner 20kg Plate */}
                <div className="w-3.5 h-18 sm:h-20 bg-gradient-to-r from-zinc-800 via-zinc-900 to-zinc-800 rounded-sm border border-zinc-600 shadow-md mr-0.5 flex items-center justify-center">
                  <span className="text-[7px] font-mono font-bold text-zinc-300 -rotate-90">20</span>
                </div>
                {/* Outer 20kg Plate */}
                <div className="w-3.5 h-18 sm:h-20 bg-gradient-to-r from-zinc-700 via-zinc-800 to-zinc-900 rounded-sm border border-zinc-600 shadow-md flex items-center justify-center">
                  <span className="text-[7px] font-mono font-bold text-zinc-300 -rotate-90">20</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Live Lift Status */}
          <div className="relative z-20 flex items-center justify-between text-[10px] pt-1 border-t border-slate-800 font-mono">
            <span className="text-slate-300">Phase: Concentric Drive</span>
            <span className="text-emerald-400 font-bold">Velocity: 0.62 m/s</span>
          </div>
        </div>
      </div>

      {/* Bottom Gym Biometrics & Set HUD */}
      <div className="relative z-10 grid grid-cols-3 gap-2 pt-2 border-t border-slate-800/80">
        <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800 flex flex-col">
          <span className="text-[9px] font-mono text-slate-400 uppercase">Set 3 Reps</span>
          <span className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
            <span>08 / 10</span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </span>
        </div>
        <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800 flex flex-col">
          <span className="text-[9px] font-mono text-slate-400 uppercase">Bar Path ROM</span>
          <span className="text-xs sm:text-sm font-bold text-cyan-400">98% Strict</span>
        </div>
        <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800 flex flex-col">
          <span className="text-[9px] font-mono text-slate-400 uppercase">AI Feedback</span>
          <span className="text-xs sm:text-sm font-bold text-emerald-400">Chest Up · Clean</span>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   2. VOXIFY: Multilingual AI Voiceover & TTS Studio
   Real animated equalizer bars, scrub timeline, multi-locale badge, wave graph
   ========================================================================= */
const VoxifyAnimatedPreview: React.FC<{ isActive: boolean }> = ({ isActive: _isActive }) => {
  const barHeights = [
    30, 65, 45, 80, 95, 60, 40, 75, 90, 100, 70, 50, 85, 95, 65, 40, 80, 60, 35, 75, 90, 60, 45, 70,
  ];

  return (
    <div className="relative w-full h-full bg-neutral-950 text-neutral-100 overflow-hidden select-none flex flex-col justify-between p-4 sm:p-5 font-sans">
      {/* Background Soft Studio Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-32 bg-violet-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top DAW Header */}
      <div className="relative z-10 flex items-center justify-between border-b border-neutral-800/80 pb-2">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-violet-500/20 border border-violet-500/40 text-violet-400 flex items-center justify-center">
            <Mic className="w-3 h-3" />
          </div>
          <span className="text-xs font-bold text-neutral-200">Sofia Neural (ES-MX)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-violet-500/15 border border-violet-500/30 text-violet-300 font-bold">
            48 kHz · 24-bit
          </span>
          <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-neutral-800 text-neutral-400">
            WAV HD
          </span>
        </div>
      </div>

      {/* Live Animated Voice Equalizer Spectrum */}
      <div className="relative z-10 flex-1 my-2 flex flex-col justify-center">
        {/* Equalizer Waveform Columns */}
        <div className="h-20 sm:h-24 w-full flex items-center justify-between gap-1 px-1 bg-neutral-900/60 rounded-xl border border-neutral-800/80 p-3 shadow-inner relative overflow-hidden">
          {/* Moving Playhead */}
          <motion.div
            className="absolute top-0 bottom-0 w-[2px] bg-violet-400 shadow-[0_0_10px_rgba(167,139,250,0.9)] z-20 pointer-events-none"
            animate={{ left: ["0%", "100%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />

          {barHeights.map((h, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-full bg-gradient-to-t from-violet-600 via-fuchsia-500 to-cyan-400"
              animate={{
                height: [`${Math.max(15, h * 0.35)}%`, `${h}%`, `${Math.max(20, h * 0.5)}%`],
              }}
              transition={{
                duration: 0.8 + (i % 5) * 0.15,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
              style={{
                opacity: 0.75 + (i % 3) * 0.1,
              }}
            />
          ))}
        </div>

        {/* Audio Timeline Timestamp */}
        <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 mt-2 px-1">
          <span className="text-violet-400 font-bold">00:14.28</span>
          <span>Pitch: +0.2 st · Pace: 1.05x</span>
          <span>01:15.00</span>
        </div>
      </div>

      {/* Bottom Audio Script Preview */}
      <div className="relative z-10 bg-neutral-900/80 p-2.5 rounded-lg border border-neutral-800 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 truncate">
          <Volume2 className="w-3.5 h-3.5 text-violet-400 shrink-0" />
          <span className="text-[11px] text-neutral-300 truncate italic">
            "Convierte cualquier guión en locuciones con emoción..."
          </span>
        </div>
        <span className="font-mono text-[10px] text-emerald-400 shrink-0 font-bold">
          450+ Voces
        </span>
      </div>
    </div>
  );
};

/* =========================================================================
   3. GENOVIDEO: AI Text-to-Video Engine (Reels & Shorts)
   Real multi-track video timeline, 9:16 phone preview, subtitle sync, render beam
   ========================================================================= */
const GenovideoAnimatedPreview: React.FC<{ isActive: boolean }> = ({ isActive: _isActive }) => {
  return (
    <div className="relative w-full h-full bg-slate-950 text-slate-100 overflow-hidden select-none flex flex-col justify-between p-4 sm:p-5 font-sans">
      {/* Top Timeline Bar */}
      <div className="relative z-10 flex items-center justify-between border-b border-slate-800/80 pb-2">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-pink-500/20 border border-pink-500/40 text-pink-400 flex items-center justify-center">
            <Video className="w-3 h-3" />
          </div>
          <span className="text-xs font-bold text-slate-200">Reels_Automated_9x16.mp4</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-pink-500/15 border border-pink-500/30 text-pink-300 font-bold">
            9:16 Vertical
          </span>
          <span className="font-mono text-[9px] text-slate-400">4K 60FPS</span>
        </div>
      </div>

      {/* Center 9:16 Simulated Video Viewport */}
      <div className="relative z-10 flex-1 my-2 flex items-center justify-center gap-3">
        {/* Mock Phone Video Frame */}
        <div className="relative w-[110px] sm:w-[125px] h-[140px] sm:h-[155px] rounded-xl border border-slate-700 bg-slate-900 overflow-hidden shadow-lg flex flex-col justify-between p-2">
          {/* Video Background Layer Simulation */}
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-900 via-indigo-950 to-pink-900 opacity-60" />

          {/* Mini Play Badge */}
          <div className="relative z-10 flex items-center justify-between">
            <span className="font-mono text-[8px] bg-black/60 px-1.5 py-0.5 rounded text-white font-bold">
              00:04s
            </span>
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>

          {/* Dynamic Auto-Subtitles Simulation */}
          <div className="relative z-10 text-center">
            <motion.div
              className="bg-black/75 px-2 py-1 rounded border border-white/20 text-[9px] font-black text-amber-300 uppercase tracking-tight shadow-md"
              animate={{ scale: [0.95, 1.05, 0.95] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            >
              "CREA EN SEGUNDOS"
            </motion.div>
          </div>

          {/* Social Icons Overlay Mock */}
          <div className="relative z-10 flex justify-end gap-1">
            <span className="text-[7px] font-mono text-white/80 bg-black/50 px-1 rounded">
              HD Auto-Sync
            </span>
          </div>
        </div>

        {/* Multi-Track Editor Simulation */}
        <div className="flex-1 flex flex-col gap-1.5">
          {/* Track 1: Visuals */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-md p-1.5 flex items-center justify-between">
            <span className="text-[9px] font-mono text-slate-400">B-ROLL_4K</span>
            <div className="flex gap-1">
              <span className="w-6 h-3.5 rounded bg-indigo-600/60 border border-indigo-400/40" />
              <span className="w-8 h-3.5 rounded bg-indigo-600/60 border border-indigo-400/40" />
              <span className="w-5 h-3.5 rounded bg-indigo-600/60 border border-indigo-400/40" />
            </div>
          </div>
          {/* Track 2: Audio */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-md p-1.5 flex items-center justify-between">
            <span className="text-[9px] font-mono text-slate-400">VOICE_TRACK</span>
            <div className="w-20 h-3.5 rounded bg-pink-600/40 border border-pink-400/30 flex items-center justify-center">
              <div className="w-full h-[2px] bg-pink-400/70" />
            </div>
          </div>
          {/* Track 3: Captions */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-md p-1.5 flex items-center justify-between">
            <span className="text-[9px] font-mono text-slate-400">SUBTITLES</span>
            <div className="w-16 h-3.5 rounded bg-amber-600/40 border border-amber-400/30 flex items-center justify-center text-[7px] font-mono text-amber-200">
              KARAOKE
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Export Render Bar */}
      <div className="relative z-10 bg-slate-900/80 p-2.5 rounded-lg border border-slate-800 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-slate-400">Export Progress:</span>
          <span className="text-[10px] font-mono font-bold text-pink-400">100% Ready</span>
        </div>
        <span className="font-mono text-[10px] text-slate-300 font-semibold">
          Auto B-Roll & Voice
        </span>
      </div>
    </div>
  );
};

/* =========================================================================
   4. INKREDO: Autonomous AI Research & Newsletter Platform
   Real markdown/editorial draft, research citations pills, audience metrics
   ========================================================================= */
const InkredoAnimatedPreview: React.FC<{ isActive: boolean }> = ({ isActive: _isActive }) => {
  return (
    <div className="relative w-full h-full bg-stone-950 text-stone-100 overflow-hidden select-none flex flex-col justify-between p-4 sm:p-5 font-sans">
      {/* Top Editorial Bar */}
      <div className="relative z-10 flex items-center justify-between border-b border-stone-800/80 pb-2">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center">
            <FileText className="w-3 h-3" />
          </div>
          <span className="text-xs font-bold text-stone-200">Issue #48 · Brand Voice: Tech</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-amber-500/15 border border-amber-500/30 text-amber-300 font-bold">
            Autonomous
          </span>
          <span className="font-mono text-[9px] text-stone-400">Markdown v2</span>
        </div>
      </div>

      {/* Center Drafting Document Simulation */}
      <div className="relative z-10 flex-1 my-2 flex flex-col justify-center">
        <div className="bg-stone-900/80 rounded-xl border border-stone-800 p-3 sm:p-3.5 flex flex-col gap-2 shadow-inner">
          {/* Article Title with Animated Typing Cursor */}
          <div className="flex items-center gap-1">
            <h4 className="text-xs sm:text-[13px] font-extrabold text-stone-100 tracking-tight">
              The Next Era of Autonomous Agent Architectures
            </h4>
            <motion.span
              className="inline-block w-1.5 h-3.5 bg-amber-400"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.9, repeat: Infinity }}
            />
          </div>

          <p className="text-[11px] text-stone-400 leading-relaxed line-clamp-2">
            "By pairing multi-agent reasoning with structured verification loops, companies reduce
            operational overhead by 40% while preserving brand nuance..."
          </p>

          {/* Research Source Citations Pills */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-stone-800">
            <span className="font-mono text-[9px] px-2 py-0.5 rounded-full bg-stone-800 text-amber-300 border border-amber-500/20">
              Source: arxiv:2603.1194
            </span>
            <span className="font-mono text-[9px] px-2 py-0.5 rounded-full bg-stone-800 text-stone-300 border border-stone-700">
              Fact Checked (100%)
            </span>
            <span className="font-mono text-[9px] px-2 py-0.5 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-500/30">
              SEO Score: 98/100
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Newsletter Delivery Stats */}
      <div className="relative z-10 bg-stone-900/80 p-2.5 rounded-lg border border-stone-800 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-stone-400">Audience Dispatch:</span>
          <span className="text-[10px] font-mono font-bold text-amber-400">14,280 Readers</span>
        </div>
        <span className="font-mono text-[10px] text-emerald-400 font-bold">54.8% Open Rate</span>
      </div>
    </div>
  );
};

/* =========================================================================
   5. OPINIZOOM: No-Code NLP, Topic Mining & Sentiment Analytics
   Real sentiment distribution curve, keyword cloud with scores, live table stats
   ========================================================================= */
const OpinizoomAnimatedPreview: React.FC<{ isActive: boolean }> = ({ isActive: _isActive }) => {
  return (
    <div className="relative w-full h-full bg-zinc-950 text-zinc-100 overflow-hidden select-none flex flex-col justify-between p-4 sm:p-5 font-sans">
      {/* Top Header */}
      <div className="relative z-10 flex items-center justify-between border-b border-zinc-800/80 pb-2">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-teal-500/20 border border-teal-500/40 text-teal-400 flex items-center justify-center">
            <BarChart3 className="w-3 h-3" />
          </div>
          <span className="text-xs font-bold text-zinc-200">Customer_Reviews_Q3.xlsx</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-teal-500/15 border border-teal-500/30 text-teal-300 font-bold">
            NLP Engine v3
          </span>
          <span className="font-mono text-[9px] text-zinc-400">2,450 Rows</span>
        </div>
      </div>

      {/* Center Sentiment & Topic Mining Dashboard */}
      <div className="relative z-10 flex-1 my-2 flex flex-col justify-center gap-2">
        {/* Sentiment Distribution Bar */}
        <div className="bg-zinc-900/80 rounded-xl border border-zinc-800 p-3 flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-mono text-[10px] text-zinc-400 uppercase font-bold">
              Sentiment Distribution
            </span>
            <span className="font-mono text-[10px] text-emerald-400 font-bold">
              Positive: 84.6%
            </span>
          </div>

          {/* Multi-segment Sentiment Progress Bar */}
          <div className="w-full h-3 rounded-full bg-zinc-800 flex overflow-hidden p-0.5 border border-zinc-700">
            <motion.div
              className="h-full bg-emerald-500 rounded-l-full"
              animate={{ width: ["80%", "85%", "84.6%"] }}
              transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse" }}
            />
            <div className="h-full bg-amber-500 w-[11%]" />
            <div className="h-full bg-rose-500 w-[4.4%] rounded-r-full" />
          </div>

          <div className="flex items-center justify-between text-[9px] font-mono text-zinc-400 pt-1">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" /> Pos (84%)
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" /> Neu (11%)
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-rose-500 inline-block" /> Neg (5%)
            </span>
          </div>
        </div>

        {/* Extracted Topic Tags Cloud with Sentiment Scores */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-zinc-900 border border-emerald-500/40 text-emerald-300 flex items-center gap-1">
            <span>"Fast Delivery"</span>
            <span className="font-bold">+94%</span>
          </span>
          <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-zinc-900 border border-teal-500/40 text-teal-300 flex items-center gap-1">
            <span>"Intuitive UI"</span>
            <span className="font-bold">+89%</span>
          </span>
          <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-zinc-300 flex items-center gap-1">
            <span>"Price Point"</span>
            <span className="font-bold">±Neutral</span>
          </span>
        </div>
      </div>

      {/* Bottom Extraction Status Bar */}
      <div className="relative z-10 bg-zinc-900/80 p-2.5 rounded-lg border border-zinc-800 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Database className="w-3.5 h-3.5 text-teal-400" />
          <span className="text-[10px] font-mono text-zinc-300">
            No-Code Ingestion: CSV / Excel
          </span>
        </div>
        <span className="font-mono text-[10px] text-teal-400 font-bold">Zero Code Required</span>
      </div>
    </div>
  );
};

export default AnimatedProductPreview;
