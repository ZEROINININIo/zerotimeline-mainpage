
import React, { useEffect, useRef, useState } from 'react';
import { Terminal, ExternalLink, Cpu, Code2, Tv, Zap, BookOpen, Disc, Layers, ArrowRight, Lock, AlertTriangle, Infinity } from 'lucide-react';
import Reveal from '../components/Reveal';

// --- Dynamic Background Component ---
const CyberVoidBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { alpha: false }); 
        if (!ctx) return;

        let animationFrameId: number;
        let w = window.innerWidth;
        let h = window.innerHeight;
        
        const chars = "TIME OBJ BEFORE MAIN AFTER ZERO XV";
        
        const resize = () => {
            w = window.innerWidth;
            h = window.innerHeight;
            canvas.width = w;
            canvas.height = h;
        };
        resize();
        window.addEventListener('resize', resize);

        class Particle {
            x: number;
            y: number;
            z: number;
            char: string;
            speed: number;
            
            constructor() {
                this.x = (Math.random() - 0.5) * w;
                this.y = (Math.random() - 0.5) * h;
                this.z = Math.random() * w; 
                this.char = chars[Math.floor(Math.random() * chars.length)];
                this.speed = 1 + Math.random();
            }

            move() {
                this.z -= this.speed;
                if (this.z <= 0) {
                    this.z = w;
                    this.x = (Math.random() - 0.5) * w;
                    this.y = (Math.random() - 0.5) * h;
                }
            }

            draw() {
                if(!ctx) return;
                const perspective = 300 / (this.z || 1); 
                const sx = w / 2 + this.x * perspective;
                const sy = h / 2 + this.y * perspective;
                
                if (sx < 0 || sx > w || sy < 0 || sy > h) return;

                const alpha = Math.min(1, (w - this.z) / (w * 0.5));
                const fontSize = Math.max(8, (24 * perspective));
                
                // Using the specific font for canvas too
                ctx.font = `${fontSize}px 'AliM', monospace`;
                
                // Monochrome palette
                const grayScale = Math.floor(Math.random() * 150) + 100; // 100-250 range
                ctx.fillStyle = `rgba(${grayScale}, ${grayScale}, ${grayScale}, ${alpha})`;
                
                ctx.fillText(this.char, sx, sy);
            }
        }

        const particles: Particle[] = Array.from({ length: 80 }, () => new Particle());

        const render = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.3)'; // Heavy trail effect, pure black base
            ctx.fillRect(0, 0, w, h);
            
            particles.forEach(p => {
                p.move();
                p.draw();
            });
            
            animationFrameId = requestAnimationFrame(render);
        };
        render();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className="fixed inset-0 z-0 opacity-60 pointer-events-none" />;
};

const HomePage: React.FC = () => {
  const [glitchTrigger, setGlitchTrigger] = useState(false);

  // Random glitch effect for avatar
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchTrigger(true);
      setTimeout(() => setGlitchTrigger(false), 200);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const avatarUrl = "https://q.qlogo.cn/headimg_dl?dst_uin=1660452904&spec=640&img_type=jpg";
  const biliUrl = "https://space.bilibili.com/348054218?spm_id_from=333.1007.0.0";

  // Active Project Links (BEFORE)
  const activeLinks = [
    { 
      id: 'main', 
      url: 'https://bf.zeroxv.cn', 
      title: 'BF.ZEROXV.CN', 
      label: 'NOVEL / 小说主站',
      desc: 'NOVA ARCHIVE // 原创轻视觉小说企划', 
      icon: BookOpen,
      theme: 'group-hover:border-white text-void-light'
    },
    { 
      id: 'ost', 
      url: 'https://ost.zeroxv.cn', 
      title: 'OST.ZEROXV.CN', 
      label: 'AUDIO / 音乐站',
      desc: 'OST DATABASE // 沉浸式听觉体验与原声集', 
      icon: Disc,
      theme: 'group-hover:border-void-gray text-void-gray'
    },
    { 
      id: 'pic', 
      url: 'https://pic.zeroxv.cn', 
      title: 'PIC.ZEROXV.CN', 
      label: 'GALLERY / 图片站/在线社区',
      desc: 'VISUAL ASSETS // 设定图、插画与美术资源，或者开趴？', 
      icon: Layers,
      theme: 'group-hover:border-white text-void-gray'
    }
  ];

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center overflow-x-hidden">
        
        {/* Background Layer */}
        <CyberVoidBackground />
        
        {/* Grid Overlay */}
        <div className="fixed inset-0 bg-grid-hard opacity-20 pointer-events-none"></div>

        {/* Decoration Corners */}
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none p-4 md:p-8 z-20 flex flex-col justify-between">
            <div className="flex justify-between items-start">
                <div className="text-[10px] font-alim text-void-gray">
                    TIMELINE_PROTOCOL: SEQUENTIAL<br/>
                    TARGET: ZEROXV
                </div>
                <div className="flex gap-2">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-void-gray/30 rounded-full"></div>
                </div>
            </div>
            <div className="flex justify-between items-end">
                <div className="text-[10px] font-alim text-void-gray">
                    COORDINATES: UNKNOWN<br/>
                    STATUS: ONLINE
                </div>
                <div className="w-16 h-1 bg-white/30"></div>
            </div>
        </div>

        {/* --- Content Container --- */}
        {/* Strictly Reduced Padding to fix blank tail: pb-6 lg:pb-8 */}
        <div className="relative z-10 w-full max-w-6xl flex flex-col lg:flex-row items-start gap-8 px-6 md:px-12 pt-24 pb-6 lg:pt-32 lg:pb-8">
            
            {/* 1. Left Column: Personal Identity (Sticky on Desktop) */}
            <div className="w-full lg:w-[350px] flex flex-col gap-6 lg:sticky lg:top-8 shrink-0">
                <Reveal>
                    <div className="w-full bg-black/60 backdrop-blur-md border border-void-gray/30 p-1 animate-float shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                        {/* Card Glow */}
                        <div className="absolute inset-0 bg-white/5 blur-xl pointer-events-none"></div>
                        
                        {/* Inner Border Container */}
                        <div className="relative border border-void-gray/50 bg-black/90 p-8 flex flex-col items-center text-center overflow-hidden group">
                            
                            {/* Scanning Line Effect */}
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-[10%] w-full animate-[scanline_3s_linear_infinite] pointer-events-none"></div>

                            {/* Avatar Section */}
                            <div className="relative mb-8 group-hover:scale-105 transition-transform duration-500">
                                <div className="w-32 h-32 relative">
                                    {/* Rotating Rings */}
                                    <div className="absolute inset-0 border border-white/40 rounded-full border-dashed animate-spin-slow"></div>
                                    <div className="absolute -inset-2 border border-void-gray/20 rounded-full animate-[spin_8s_linear_infinite_reverse]"></div>
                                    
                                    {/* Avatar Image */}
                                    <div className="absolute inset-2 overflow-hidden rounded-full border-2 border-white/60 bg-black">
                                        <img 
                                            src={avatarUrl} 
                                            alt="ZEROXV" 
                                            className={`w-full h-full object-cover transition-all duration-100 grayscale contrast-125 brightness-110 ${glitchTrigger ? 'scale-110 invert' : 'scale-100'}`}
                                        />
                                    </div>
                                    
                                    {/* Status Dot */}
                                    <div className="absolute bottom-1 right-1 w-5 h-5 bg-black rounded-full flex items-center justify-center border border-white">
                                        <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Identity Section */}
                            <div className="space-y-3 mb-8 relative w-full">
                                <div className="flex items-center justify-center gap-2 text-void-light/70 text-[10px] font-alim tracking-[0.2em] uppercase border-b border-void-gray/20 pb-2">
                                    <Terminal size={12} />
                                    Developer
                                </div>
                                <h1 className={`text-4xl font-black text-void-light tracking-tighter uppercase ${glitchTrigger ? 'glitch-text-heavy text-white' : ''}`} data-text="ZEROXV">
                                    ZEROXV
                                </h1>
                                <p className="text-void-gray font-alim text-xs uppercase tracking-widest">
                                    开发者 // 创作者
                                </p>
                            </div>

                            {/* Actions / Links */}
                            <div className="w-full space-y-4">
                                <a 
                                    href={biliUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-between w-full p-3 border border-void-gray/30 bg-black hover:bg-white/10 hover:border-white hover:text-white transition-all group/btn"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="p-1.5 bg-void-dark border border-void-gray/30 group-hover/btn:border-white/50 transition-colors">
                                            <Tv size={16} />
                                        </div>
                                        <div className="text-left">
                                            <div className="text-xs font-bold font-alim tracking-wider">BILIBILI</div>
                                        </div>
                                    </div>
                                    <ExternalLink size={14} className="opacity-50 group-hover/btn:translate-x-1 transition-transform" />
                                </a>

                                <div className="flex items-center justify-center gap-4 text-void-gray/30 pt-2">
                                    <Code2 size={20} />
                                    <div className="h-3 w-px bg-current"></div>
                                    <Cpu size={20} />
                                    <div className="h-3 w-px bg-current"></div>
                                    <Zap size={20} />
                                </div>
                            </div>
                        </div>
                    </div>
                </Reveal>
            </div>

            {/* 2. Right Column: Timeline Matrix - Reduced Gap */}
            <div className="flex-1 w-full flex flex-col gap-6">
                
                {/* TIMELINE: BEFORE (Active) */}
                <div className="relative">
                    <Reveal>
                        <div className="mb-4 flex items-center gap-4">
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse shadow-[0_0_10px_white]"></div>
                            <div className="h-px bg-white/50 w-16"></div>
                            <h2 className="text-3xl font-black text-white tracking-widest uppercase glitch-text-heavy" data-text="TIME OBJ(BEFORE)">
                                TIME OBJ. (BEFORE)
                            </h2>
                            <div className="text-[10px] font-mono border border-white/30 px-2 py-0.5 text-white/70">CURRENT PHASE</div>
                        </div>
                        <p className="text-xs text-void-gray font-mono mb-6 pl-24 border-l border-void-gray/20 max-w-lg">
                            "一切的开端。不过故事貌似已经开始好久了呢."
                            <br/>
                            <span className="opacity-50 text-[10px]">INITIALIZATION // ORIGIN ARCHIVES</span>
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-4 md:pl-8 border-l border-dashed border-white/20">
                            {activeLinks.map((link) => {
                                const isMain = link.id === 'main';
                                return (
                                    <a 
                                        key={link.id}
                                        href={link.url}
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className={`
                                            group relative flex flex-col p-6 border transition-all duration-500 min-h-[160px]
                                            ${isMain 
                                                ? 'md:col-span-2 bg-black border-white/30 shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:border-white hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] z-10 hover:-translate-y-1' 
                                                : 'border-void-gray/30 bg-black/80 backdrop-blur-sm hover:border-white overflow-hidden'}
                                        `}
                                    >
                                        {/* Main Card Special Effects */}
                                        {isMain && (
                                            <>
                                                {/* Overflowing Holographic Badge */}
                                                <div className="absolute -top-3 -right-3 z-30 bg-white text-black text-[10px] font-black px-2 py-0.5 border-2 border-black transform rotate-3 shadow-[0_0_15px_white] animate-pulse">
                                                    CORE // ACTIVE
                                                </div>

                                                {/* Animated Scanline Background */}
                                                <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(255,255,255,0.05)_50%,transparent_100%)] bg-[length:200%_200%] animate-scanline opacity-20 pointer-events-none"></div>
                                                
                                                {/* Large Decorative Icon spilling out visually (clipped by border but large) */}
                                                <div className="absolute -right-8 -bottom-8 text-white opacity-[0.03] transform rotate-12 scale-150 pointer-events-none transition-all duration-500 group-hover:opacity-[0.08] group-hover:scale-[1.6]">
                                                    <link.icon size={240} strokeWidth={0.5} />
                                                </div>
                                            </>
                                        )}

                                        {/* Hover Border Color for standard cards */}
                                        {!isMain && (
                                            <div className={`absolute inset-0 border-2 border-transparent ${link.theme} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}></div>
                                        )}
                                        
                                        <div className="flex justify-between items-start mb-auto relative z-20">
                                            <div className={`p-3 border border-void-gray/30 bg-void-dark group-hover:bg-black transition-colors ${link.theme} group-hover:border-current`}>
                                                <link.icon size={24} strokeWidth={1.5} className="text-void-gray group-hover:text-white transition-colors" />
                                            </div>
                                            <ArrowRight size={20} className="text-void-gray group-hover:text-white group-hover:-rotate-45 transition-all duration-300" />
                                        </div>
                                        
                                        <div className="relative z-20 mt-4">
                                            <div className={`text-[9px] font-bold font-alim tracking-widest uppercase opacity-60 mb-1 ${link.theme}`}>
                                                {link.label}
                                            </div>
                                            <h3 className={`text-xl font-black tracking-tighter uppercase group-hover:text-white transition-colors ${isMain ? 'text-white text-3xl' : 'text-void-light'}`}>
                                                {link.title}
                                            </h3>
                                            <div className={`h-px bg-void-gray/50 my-2 transition-all duration-500 ${isMain ? 'w-full bg-white/50' : 'w-8 group-hover:w-full group-hover:bg-white'}`}></div>
                                            <p className={`text-[10px] font-alim transition-colors ${isMain ? 'text-void-light' : 'text-void-gray group-hover:text-void-light/80'}`}>
                                                {link.desc}
                                            </p>
                                        </div>
                                    </a>
                                );
                            })}
                        </div>
                    </Reveal>
                </div>

                {/* TIMELINE: MAIN (Locked) */}
                <div className="relative opacity-80 hover:opacity-100 transition-opacity">
                    <Reveal delay={200}>
                        <div className="mb-4 flex items-center gap-4">
                            <div className="w-2 h-2 border border-void-gray rounded-full"></div>
                            <div className="h-px bg-void-gray/30 w-16"></div>
                            <h2 className="text-2xl font-black text-void-gray tracking-widest uppercase flex items-center gap-2">
                                TIME OBJ. (MAIN) <Lock size={16} />
                            </h2>
                            <div className="text-[10px] font-mono border border-void-gray/20 px-2 py-0.5 text-void-gray/50">LOCKED</div>
                        </div>
                        
                        <div className="pl-4 md:pl-8 border-l border-dashed border-void-gray/20">
                            <div className="w-full h-32 border border-void-gray/20 bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.03),rgba(255,255,255,0.03)_10px,transparent_10px,transparent_20px)] flex flex-col items-center justify-center text-center p-4 relative overflow-hidden group">
                                {/* Alert Overlay */}
                                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-10 transition-opacity"></div>
                                
                                <AlertTriangle size={32} className="text-void-gray mb-2 opacity-50 group-hover:text-white group-hover:opacity-100 transition-all duration-300" />
                                <h3 className="text-xl font-black text-void-gray uppercase tracking-widest group-hover:text-white transition-colors glitch-text-heavy" data-text="ACCESS RESTRICTED">
                                    CORE TIMELINE
                                </h3>
                                <p className="text-xs font-mono text-void-gray/50 mt-1 uppercase">
                                    [ENCRYPTED] The Impending Doom // 核心正传
                                </p>
                                <div className="absolute bottom-2 right-2 text-[8px] font-mono text-void-gray/30">
                                    KEY_MISSING: 0xMAIN_NULL
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>

                {/* TIMELINE: AFTER (Locked) */}
                <div className="relative opacity-60 hover:opacity-90 transition-opacity">
                    <Reveal delay={400}>
                        <div className="mb-4 flex items-center gap-4">
                            <div className="w-2 h-2 border border-void-gray/50 rounded-full"></div>
                            <div className="h-px bg-void-gray/20 w-16"></div>
                            <h2 className="text-2xl font-black text-void-gray/70 tracking-widest uppercase flex items-center gap-2">
                                TIME OBJ. (AFTER) <Lock size={16} />
                            </h2>
                            <div className="text-[10px] font-mono border border-void-gray/20 px-2 py-0.5 text-void-gray/30">FUTURE</div>
                        </div>
                        
                        <div className="pl-4 md:pl-8 border-l border-dashed border-void-gray/10">
                            <div className="w-full h-32 border border-void-gray/10 bg-black flex flex-col items-center justify-center text-center p-4 relative overflow-hidden group">
                                {/* Static Noise Background */}
                                <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ0cmFuc3BhcmVudCIvPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNub2lzZSkiIG9wYWNpdHk9IjAuNSIvPjwvc3ZnPg==')] animate-[shift_0.2s_infinite]"></div>
                                
                                <Infinity size={32} className="text-void-gray mb-2 opacity-30 group-hover:text-white group-hover:opacity-80 transition-all duration-500" />
                                <h3 className="text-xl font-black text-void-gray/50 uppercase tracking-widest group-hover:text-white transition-colors blur-[1px] group-hover:blur-0 duration-500">
                                    Z ERA
                                </h3>
                                <p className="text-xs font-mono text-void-gray/30 mt-1 uppercase">
                                    DATA NOT FOUND // 退守之后？..
                                </p>
                            </div>
                        </div>
                    </Reveal>
                </div>

                {/* Footer Info - Reduced Margin */}
                <div className="mt-4 flex justify-between items-center text-[9px] font-alim text-void-gray/50 uppercase border-t border-void-gray/10 pt-4 pb-2">
                    <span>System.Connect(ZeroXV) // &copy; 2022-2026</span>
                    <span>All Rights Reserved.</span>
                </div>
            </div>
        </div>
    </div>
  );
};

export default HomePage;
