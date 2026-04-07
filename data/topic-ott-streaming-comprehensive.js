export const OTT_STREAMING = {
  id:"ott-streaming", title:"How OTT Streaming Works", category:"internet", difficulty:"beginner", readTime:"18 min read",
  hook:"You press play on Netflix, and within 2 seconds, a 4K HDR movie starts streaming — the video was stored on a server potentially 10,000 km away, compressed from 200 GB raw to 15 GB, split into thousands of 2-second segments at 6 different quality levels, cached on a server inside your ISP's data center just 5 km from your home, and delivered to your screen at exactly the bitrate your internet can sustain. India's OTT market has 450+ million users across 40+ platforms. How does streaming actually work?",
  oneLiner:"OTT streaming delivers video by encoding content at multiple quality levels, splitting it into small segments (2-6 seconds), caching on CDN edge servers near users, and using adaptive bitrate streaming (HLS/DASH) to dynamically select optimal quality based on real-time bandwidth — ensuring smooth playback without buffering.",
  summary:"Streaming works by pre-encoding video at multiple quality levels (360p to 4K), splitting each into thousands of small segments, distributing copies to CDN servers worldwide, and having your player dynamically choose the best quality segment based on your current internet speed — seamlessly switching quality mid-stream without interruption.",
  beginnerExplanation:`THE BASIC CONCEPT — STREAMING vs DOWNLOADING

Downloading: The ENTIRE file transfers to your device before you can watch. A 2-hour 1080p movie (~4 GB) takes 10-30 minutes to download. You wait, THEN watch. Streaming: The video is delivered in small pieces and played AS each piece arrives. Playback begins within 2-5 seconds. Like drinking water from a tap (streaming) vs filling a bucket first (downloading).

HOW VIDEO IS PREPARED FOR STREAMING

Before any viewer presses play, the video goes through extensive preparation:

Step 1 — Encoding: The original master file (often 4K ProRes at 200+ GB) is compressed into multiple quality levels: 240p/200 kbps (very slow connections), 480p/1.5 Mbps (SD — small phone screens), 720p/3 Mbps (HD), 1080p/5-8 Mbps (Full HD), and 4K HDR/15-25 Mbps (Ultra HD). Each uses codecs like H.264 (widest compatibility), H.265/HEVC (30-50% smaller), or AV1 (30% smaller than HEVC, royalty-free — used by YouTube, Netflix). Netflix uses per-title encoding — analyzing each title's complexity and creating optimized bitrate ladders.

Step 2 — Segmenting: Each quality level is split into 2-6 second segments. A 2-hour movie at 6 quality levels = ~12,000 individual segment files, each independently decodable.

Step 3 — Manifest file: A playlist file (.m3u8 for HLS or .mpd for DASH) lists ALL segments at ALL quality levels with their URLs, bitrates, and codecs. The player reads this to know what's available.

ADAPTIVE BITRATE STREAMING — THE MAGIC

Your player continuously monitors download speed. For each upcoming segment, it selects the HIGHEST quality that can download before needed. If bandwidth is 10 Mbps: player selects 1080p (5-8 Mbps). If bandwidth drops to 2 Mbps: player instantly switches to 480p. When bandwidth recovers: switches back. This happens transparently — you might notice brief quality drop, but playback NEVER stops.

The two main protocols: HLS (HTTP Live Streaming — Apple, dominant) and DASH (Dynamic Adaptive Streaming over HTTP — open standard, used by Netflix). Both split video into segments, use manifest files, and enable adaptive quality switching over standard HTTP.

CDN — BRINGING CONTENT CLOSE TO YOU

Netflix's Open Connect: 17,000+ custom servers in 6,000+ locations across 175+ countries — many placed INSIDE ISP data centers. When you stream, video likely comes from a server 5-20 km away. Popular content is pre-loaded to edge servers during off-peak hours. In India: Jio has its own CDN infrastructure. Hotstar/JioCinema handle 30+ million concurrent viewers during IPL finals.

DRM — PROTECTING CONTENT

Content is AES-encrypted before distribution. Only authorized players with valid DRM licenses can decrypt. Major systems: Widevine (Google — Android/Chrome), FairPlay (Apple), PlayReady (Microsoft). Widevine L1 (hardware DRM) enables HD/4K. L3 (software) limits to SD. This is why Netflix streams at 1080p on your phone but sometimes only 720p in Chrome on your laptop.

RECOMMENDATION ALGORITHMS

Netflix's recommendation engine drives 80% of content watched. It uses: collaborative filtering (users who watched A also watched B), content-based filtering (genre, actors, themes — Netflix uses 1,000+ micro-tags per title), watch behavior signals (completed vs abandoned, pause/rewind patterns, time of day, device type), and massive A/B testing (different thumbnails for the same show optimized per user's click behavior).

LIVE STREAMING — DIFFERENT FROM ON-DEMAND

Live streaming has different challenges: latency (delay between real event and your screen — standard HLS: 15-45 seconds, LL-HLS: 2-5 seconds, WebRTC: <1 second) and real-time encoding (camera → hardware encoder → packager segments → CDN → viewer in 5-30 seconds). IPL on JioCinema: 30+ million concurrent viewers during finals — requiring thousands of CDN edge servers, real-time encoding, 40+ Tbps bandwidth, and robust failover.

OTT PLATFORMS IN INDIA — The most competitive market globally: JioCinema (IPL, free tier), Hotstar (Disney+ content), Netflix (₹149-649/month — among world's cheapest), Amazon Prime (₹1,499/year with shopping), Sony LIV, Zee5, MX Player, Aha (Telugu), Hoichoi (Bengali), Sun NXT (Tamil/Telugu), and 30+ more.`,
  standardExplanation:`The technical infrastructure behind streaming at scale.

VIDEO ENCODING PIPELINE

Pre-processing: source quality analysis, scene change detection (I-frame placement), HDR metadata processing. Per-title encoding (Netflix): analyzes each title's complexity, creates custom encoding ladder — saving 20-50% bandwidth at equivalent quality. Extended to per-shot encoding.

Codec strategy: H.264/AVC (fallback for older devices), H.265/HEVC (4K content on newer devices — patent costs limit adoption), AV1 (growing rapidly — royalty-free AND better compression — YouTube default, Netflix for AV1-capable devices), VP9 (Google — YouTube). Encoding time: software encoding (x264, x265, SVT-AV1) produces highest quality but is slow — Netflix uses thousands of cloud instances. Hardware encoding (NVENC) is faster but lower quality — used for live streaming and initial YouTube processing.

STREAMING ARCHITECTURE

Origin servers store master files. CDN edge servers cache popular content and serve 95%+ of traffic. Manifest servers serve playlist files. License servers issue DRM keys. API servers handle authentication, catalog, recommendations, billing, progress sync, and analytics.

Player architecture: manifest parser, bandwidth estimator (moving average of recent segment download speeds), ABR algorithm (balances quality, buffer stability, and switch frequency), buffer manager (maintains 20-60 seconds ahead), DRM module, and renderer (hardware video decoder + audio sync). Buffer strategy: initial buffering (2-5 seconds — the loading spinner), steady-state buffer (20-60 seconds — safety net against bandwidth drops), and rebuffer threshold (buffer empties → spinner, drop to lowest quality to refill quickly).

CONTENT PROTECTION BEYOND DRM

Forensic watermarking: invisible per-user watermarks identify the source account if content is pirated. Geo-restrictions: IP-based catalog enforcement (different content per country, VPN detection and blocking). Concurrent stream limits: server tracks active sessions per account.

AUDIO IN STREAMING

Multiple formats: AAC stereo, Dolby Digital 5.1, Dolby Digital Plus 7.1, and Dolby Atmos (object-based spatial audio). Multiple language tracks available — player downloads only the selected language. Indian content typically dubbed in 5-10+ languages — each a separate audio track.

ANALYTICS AND QoE

Platforms monitor: Video Start Time (target: <2 seconds), rebuffering ratio (target: <0.1%), average bitrate, bitrate switches, error rate, and engagement metrics. These drive infrastructure decisions — more CDN capacity deployed to regions with high rebuffering, direct ISP peering for poor-performing networks.`,
  advancedExplanation:`Cutting-edge streaming technology.

CMAF (Common Media Application Format): Unifies HLS and DASH segment formats — single encoding/storage for both protocols, halving storage costs and improving CDN cache hit rates. Most new deployments use CMAF.

LOW-LATENCY LIVE STREAMING: LL-HLS uses partial segments (sub-segment chunks pushed before full segment completes) — 2-4 second latency. WebRTC achieves sub-second latency for interactive streaming. Trade-off: lower latency = less buffer = more susceptibility to bandwidth fluctuations.

ML IN STREAMING: Neural network-based encoders achieve 10-20% better compression. Reinforcement learning ABR algorithms (Pensieve — MIT/Facebook) outperform rule-based algorithms. ML predicts content popularity for proactive CDN caching. AI selects per-user thumbnails maximizing click-through.

INTERACTIVE AND IMMERSIVE: Netflix's Bandersnatch (branching narrative with viewer choices), 360° video (viewport-adaptive streaming), cloud gaming (game rendered remotely, video streamed — <50ms latency needed), and AR/VR streaming (Apple Vision Pro spatial video).

FUTURE OF STREAMING: (1) AV1 becoming dominant codec. (2) AI-generated personalized content. (3) FAST channels (free ad-supported linear TV). (4) Spatial computing/virtual cinema. (5) Live commerce (streaming + shopping). (6) Regional language explosion in India. (7) Platform consolidation. (8) Connected TV growth shifting viewing from mobile to large screen. (9) Micropayments via UPI (pay-per-view ₹10-50 per movie). (10) AI dubbing expanding language availability.`,
  corePrinciple:"OTT streaming delivers video by encoding content at multiple quality levels, splitting each into small segments (2-6 seconds), distributing copies to CDN edge servers near viewers, and using adaptive bitrate streaming to dynamically select optimal quality per segment based on real-time bandwidth. The result: smooth playback starting in 2 seconds, adapting to bandwidth fluctuations without buffering, across devices from 2G phones to 4K smart TVs.",
  components:[
    {name:"Video Encoder (Transcoder)",desc:"Compresses master video into multiple quality levels (240p-4K) using codecs (H.264, H.265, AV1). Per-title encoding optimizes bitrate per title's complexity. A 2-hour movie becomes 12,000+ segment files across 6+ quality levels."},
    {name:"CDN (Content Delivery Network)",desc:"Distributed servers caching content near viewers. Netflix Open Connect: 17,000+ servers in 6,000+ locations — often inside ISP data centers. Reduces latency, serves 95%+ of streaming traffic from edge caches."},
    {name:"Adaptive Bitrate Player",desc:"Client-side player that: reads manifest, estimates bandwidth continuously, selects optimal quality per segment, manages 20-60 second playback buffer, handles DRM decryption, and renders video/audio. Built into Netflix app, browsers, smart TVs."},
    {name:"Manifest / Playlist",desc:"Metadata file (.m3u8 for HLS, .mpd for DASH) listing all available segments at all quality levels with URLs, bitrates, codecs, and timing. The player's roadmap for what content is available."},
    {name:"DRM System",desc:"Encrypts content, controls access. Widevine (Google — Android/Chrome), FairPlay (Apple), PlayReady (Microsoft). L1 hardware DRM enables HD/4K; L3 software limits to SD. Prevents unauthorized copying."},
    {name:"Recommendation Engine",desc:"ML system suggesting content based on: viewing history, collaborative filtering, content attributes, watch behavior, and A/B tested presentation. Drives 80% of Netflix viewing."},
  ],
  steps:[
    {title:"Content Preparation",desc:"Studio delivers master file (4K ProRes, ~200 GB). Platform encodes at 6+ quality levels using H.264/H.265/AV1, segments into 2-6 second chunks, encrypts with DRM, generates manifest files, pushes popular content to CDN edge servers worldwide, and creates thumbnails/subtitles/metadata."},
    {title:"You Press Play",desc:"Your app authenticates your account, checks subscription tier and geographic licensing, and requests the manifest file — URL points to nearest CDN edge server."},
    {title:"Player Downloads Manifest",desc:"Small text file listing ALL segments at ALL quality levels with URLs. Player now knows every quality option, every segment's CDN location, and all audio/subtitle track options."},
    {title:"Initial Buffering",desc:"Player estimates bandwidth, requests first segments at conservative quality. 2-5 seconds buffered before playback begins (the loading spinner). DRM license simultaneously fetched from license server."},
    {title:"Adaptive Playback",desc:"For each subsequent segment, ABR algorithm measures recent download speed, checks buffer level, and selects highest quality downloadable before needed. Quality drops seamlessly if bandwidth drops; increases when bandwidth recovers. All switching happens at segment boundaries — invisible to viewer."},
    {title:"Continuous Optimization",desc:"Throughout playback: 20-60 second buffer maintained, quality adjustments at every segment boundary, audio/subtitle tracks switchable mid-stream, playback position synced to server (enabling cross-device resume), and engagement data sent back to recommendation engine."},
  ],
  misconceptions:[
    {myth:"Streaming uses more data than downloading",reality:"For the same quality, streaming and downloading use approximately the SAME data. Streaming might use LESS because adaptive bitrate may deliver some portions at lower quality, and you only transfer what you watch (not the whole file if you stop early). Streaming uses MORE only if you re-watch frequently (each viewing re-transfers data)."},
    {myth:"Higher internet speed = better video quality automatically",reality:"Quality depends on: subscription tier (Netflix basic caps at 720p regardless of speed), content's maximum available quality (not all content is 4K), device DRM level (Widevine L3 = max 480p in Chrome), and display resolution (4K to a 720p screen wastes bandwidth). 100 Mbps doesn't help if your plan caps at 720p."},
    {myth:"Buffering always means slow internet",reality:"Buffering can be caused by: network congestion between CDN and your device, CDN server overload, streaming platform infrastructure stress (common during live events), Wi-Fi issues (weak signal, interference), device limitations (old hardware struggling to decode), or VPN overhead. Try: reducing quality manually, switching Wi-Fi↔cellular, restarting the app."},
    {myth:"All 4K streams look the same",reality:"4K is resolution (3840×2160) but NOT quality — quality depends on BITRATE. Netflix 4K at 15-25 Mbps looks noticeably better than YouTube 4K at 10-15 Mbps in complex scenes. A high-bitrate 1080p stream (20 Mbps) can look BETTER than a low-bitrate 4K stream (8 Mbps)."},
    {myth:"OTT platforms are killing cinema",reality:"In India, cinema box office revenue GREW to ₹12,000+ crore in 2023 (highest ever). OTT expanded the total entertainment market rather than cannibalizing cinema. TV viewership remains massive (800+ million). The real shift: more choice for viewers, more distribution options for creators, and a regional language content explosion."},
  ],
  analogies:[
    {analogy:"Streaming is like drinking from a tap, not a bottle",explanation:"Downloading = buying a water bottle (have the whole thing before drinking). Streaming = drinking from a tap (water flows as you drink, never filling a bottle). If water pressure (bandwidth) drops, flow (quality) reduces but you can still drink (watch)."},
    {analogy:"Adaptive bitrate is like automatic transmission in a car",explanation:"Automatic transmission selects optimal gear based on speed and conditions — seamlessly shifting without input. Adaptive streaming selects optimal video quality based on bandwidth — shifting seamlessly without manual quality adjustment."},
    {analogy:"CDN edge servers are like Amazon's local warehouses",explanation:"Amazon places inventory in local fulfillment centers near customers. CDN places content copies on servers near viewers — often inside your ISP's building. Both reduce delivery distance and time dramatically."},
  ],
  quiz:[
    {q:"Adaptive bitrate streaming works by:",options:["Always streaming maximum quality","Dynamically selecting best quality per segment based on real-time bandwidth","Reducing video length for slow connections","Requiring manual quality selection"],answer:1},
    {q:"CDN edge servers improve streaming by:",options:["Increasing your internet speed","Placing content copies on servers NEAR viewers — reducing distance and latency","Compressing videos further","Blocking other users"],answer:1},
    {q:"Widevine L1 vs L3 determines:",options:["Sound quality","Maximum streaming resolution — L1 (hardware DRM) enables HD/4K, L3 (software) limits to SD","Internet speed","App size"],answer:1},
    {q:"A 2-hour movie is prepared for streaming by:",options:["Uploading the original file","Encoding at multiple qualities, splitting into thousands of segments, encrypting with DRM, distributing to CDN","Converting to one format","Reducing resolution only"],answer:1},
    {q:"Netflix's recommendation engine drives approximately:",options:["20% of viewing","50%","80% — most content watched is algorithmically recommended","100%"],answer:2},
  ],
  faqs:[
    {q:"How much data does streaming use?",a:"Per hour: SD (480p): 0.7-1 GB. HD (720p): 1.5-2 GB. Full HD (1080p): 3-5 GB. 4K UHD: 7-12 GB. 4K HDR: 10-16 GB. Music streaming: 40-150 MB. Example: 2 hours Netflix daily at 1080p = ~8 GB/day = ~240 GB/month. On Jio's 1.5 GB/day plan: ~1 hour of 720p daily. Wi-Fi recommended for regular HD/4K streaming."},
    {q:"What internet speed do I need?",a:"Minimums per stream: SD: 3 Mbps. HD: 5 Mbps. Full HD: 10 Mbps. 4K: 25 Mbps. Multiple simultaneous streams multiply requirements. Jio Fiber 30 Mbps (₹399/month) handles 2-3 HD streams. 4G cellular (10-30 Mbps) adequate for 1 HD stream. Test at fast.com (Netflix's speed test)."},
    {q:"Why can't I get 4K on my laptop browser?",a:"Most browsers use Widevine L3 (software DRM) — limited to 720p-1080p. For 4K: use the native app (Netflix Windows/Mac app), Microsoft Edge with PlayReady, Safari on macOS (FairPlay), or a smart TV/streaming device with hardware DRM."},
    {q:"How does offline download work?",a:"App requests DRM license with offline rights (expiry: 48 hours after starting, 30 days after download). Encrypted segments stored locally. Plays offline using local DRM license. Limitations: not all content downloadable, quality may be capped, downloads expire, device-locked."},
    {q:"Why does the same show look different on Netflix vs YouTube?",a:"Bitrate allocation (Netflix gives 5-15 Mbps at 1080p, YouTube 3-8 Mbps), encoding quality (Netflix uses slow software encoding with per-title optimization, YouTube uses faster hardware encoding), codec choice (Netflix HEVC/AV1 vs YouTube VP9/AV1), and color processing differences."},
    {q:"How do live sports handle millions of concurrent viewers?",a:"Pre-positioned CDN capacity across India, multi-CDN strategy (2-3 providers simultaneously), real-time encoding farm, lower-latency protocols (LL-HLS at 3-8 seconds), and server-side ad insertion. JioCinema IPL: 32+ million peak concurrent viewers, 30-50 Tbps total bandwidth."},
    {q:"What is SSAI (Server-Side Ad Insertion)?",a:"Ads stitched INTO the video stream on the server before delivery — from the player's perspective, one continuous stream. Benefits: ad blockers can't distinguish ads from content, seamless quality matching, no buffering during transitions, and personalized ads per viewer."},
    {q:"Can I share my streaming account?",a:"Tightening: Netflix cracked down in 2023 — accounts tied to one household. Amazon Prime allows 3 devices. Hotstar varies by plan. Trend: household-based enforcement, per-profile tracking, and paid extra-member add-ons."},
    {q:"Why is content different in India vs other countries?",a:"Content licensing is territorial — studios sell distribution rights per country. A movie may be on Netflix India but Disney+ US because different companies bought rights in each territory. This creates different catalogs per country, geo-blocking via IP address, and VPN arms race."},
    {q:"How does video quality differ mobile vs TV?",a:"Same subscription delivers different max quality per device: Mobile typically capped at 720p-1080p (small screen, data saving), browsers at 720p-1080p (DRM limitations), smart TVs/streaming devices up to 4K HDR (hardware DRM enables highest quality). Platform auto-selects maximum for your device and plan."},
    {q:"What is the future of streaming in India?",a:"Key trends: (1) FAST channels (free ad-supported linear TV). (2) Regional language content explosion (Tamil/Telugu/Malayalam growing faster than Hindi). (3) Live commerce integration. (4) Sports driving subscriptions. (5) Telecom bundles (Jio+JioCinema, Airtel+Xstream). (6) AI personalization. (7) Platform consolidation (40+ unsustainable). (8) Connected TV growth. (9) UPI micropayments (₹10-50 pay-per-view). (10) AI dubbing expanding languages."},
    {q:"How much does OTT cost in India?",a:"Among world's cheapest: Netflix ₹149-649/month, Amazon Prime ₹1,499/year (with shopping), Hotstar ₹149-899/year, Sony LIV ₹299-999/year, Zee5 free+premium, JioCinema free tier available. Compared globally: Netflix India basic (₹149 = ~$1.80) vs US ($6.99). Enabled by: ad revenue, large user base, and intense competition."},
    {q:"What is the difference between OTT and IPTV?",a:"OTT (Over-The-Top): delivered over the open internet — works on any internet connection. No relationship needed between the OTT provider and your ISP. Netflix, YouTube, Hotstar are OTT. IPTV: delivered over a managed, dedicated network controlled by the telecom/ISP. Quality guaranteed (dedicated bandwidth), but tied to that specific provider. Airtel Xstream Box (IPTV component), Jio STB are examples. OTT is dominant — IPTV is a niche premium offering."},
    {q:"How do subtitles and dubbing work?",a:"Subtitles: separate text files (SRT/VTT) with timestamps — player renders text over video, downloading only selected language (<1 MB/hour). Dubbing: separate audio tracks per language — player downloads only selected language. Indian titles typically dubbed in 5-10+ languages. AI dubbing (emerging) expands language availability faster and cheaper."},
    {q:"What happens to my viewing data?",a:"Platforms collect: what/how/when you watch, browse behavior, device/network info. Used for: recommendations, content investment decisions (Netflix greenlit House of Cards based on viewing data), targeted ads (ad-supported tiers), and product improvement. Governed by India's Digital Personal Data Protection Act 2023."},
    {q:"Why do some shows buffer more than others?",a:"Complex scenes (action, fast motion, detailed textures) require higher bitrate — if your bandwidth barely meets the threshold, complex scenes may cause buffer while simple scenes play smoothly. Also: newly released popular content may overwhelm CDN edge caches (not yet cached locally), live content has less buffering headroom than on-demand, and some platforms encode at lower bitrates than others for the same nominal resolution."},
    {q:"How does Dolby Atmos audio work in streaming?",a:"Dolby Atmos metadata is carried within the Dolby Digital Plus audio track — no separate stream needed. The metadata describes sound object positions in 3D space. Your device's Atmos renderer maps these objects to your specific speaker/headphone configuration. Available on: Netflix, Amazon Prime, Apple TV+, Disney+ — requires: Atmos-capable device (AirPods Pro, soundbar, AVR) and premium subscription tier."},
    {q:"Can I watch the same content simultaneously on multiple devices?",a:"Depends on subscription: Netflix Basic: 1 stream. Standard: 2. Premium: 4. Amazon Prime: 3 devices. Hotstar Mobile: 1. Super: 2. Premium: 4. The server tracks active playback sessions — exceeding the limit blocks additional devices until one stops. Some platforms allow downloading on additional devices beyond the simultaneous stream limit."},
    {q:"What is a streaming stick/box and do I need one?",a:"A streaming device (Amazon Fire Stick ₹2,500-6,000, Chromecast ₹3,000-6,000, Apple TV ₹15,000-20,000, Xiaomi Mi Box ₹3,500) plugs into your TV's HDMI port, adding smart TV functionality: all OTT apps, casting from phone, voice control, and better performance than most built-in smart TV software. Worth buying if: your TV isn't smart, your smart TV's software is slow/outdated, or you want better DRM support for HD/4K on services that limit built-in TV app quality."},
  ],
  glossary:[
    {term:"OTT",def:"Over-The-Top — content delivered via internet, bypassing traditional cable/satellite distribution. Netflix, Hotstar, JioCinema, YouTube are OTT platforms."},
    {term:"ABR",def:"Adaptive Bitrate — player dynamically selects video quality per segment based on real-time bandwidth, ensuring smooth playback without buffering."},
    {term:"CDN",def:"Content Delivery Network — distributed servers caching content near viewers. Netflix Open Connect: 17,000+ servers in 6,000+ locations."},
    {term:"HLS / DASH",def:"HTTP Live Streaming (Apple) / Dynamic Adaptive Streaming (open standard) — the two main adaptive streaming protocols using segmented video and manifest files."},
    {term:"Codec",def:"Compression algorithm: H.264, H.265, AV1, VP9 for video; AAC, Opus, Dolby Atmos for audio. Newer codecs = better quality at lower bitrates."},
    {term:"DRM",def:"Digital Rights Management — encryption and access control. Widevine (Google), FairPlay (Apple), PlayReady (Microsoft). L1 hardware enables HD/4K; L3 software limits to SD."},
    {term:"Manifest",def:"Metadata file (.m3u8/.mpd) listing all segments, quality levels, audio/subtitle tracks with URLs. Player's roadmap for available content."},
    {term:"Bitrate",def:"Data per second in a stream (Mbps). Higher = better quality. Netflix 1080p: 5-8 Mbps. Netflix 4K: 15-25 Mbps."},
    {term:"Transcoding",def:"Converting video between formats/qualities. Source master transcoded into multiple quality levels. CPU-intensive — Netflix uses thousands of cloud instances."},
    {term:"SSAI",def:"Server-Side Ad Insertion — ads stitched into stream on the server. Prevents ad blocking, enables personalized ads, seamless transitions."},
  ],
  relatedTopics:["internet","video-audio","cloud"],
  childSummary:"When you watch Netflix or JioCinema, the movie comes in tiny 2-second pieces — like beads on a necklace! Your phone plays each piece as it arrives. If your internet is fast, you get HIGH quality pieces (super clear). If it slows down, you get LOWER quality pieces (a bit blurry but still playing — no freezing!). The movie files are stored on special computers placed really close to you — maybe inside your internet company's building nearby — so pieces arrive super fast. That's why Netflix starts in just 2 seconds!",
  applications:["On-demand video (Netflix, Prime, Hotstar)","Live sports (IPL, cricket, football)","Music streaming (Spotify, JioSaavn)","Live news","Educational platforms (Coursera, Unacademy)","Cloud gaming","Video podcasts","Virtual events","Short-form video (Reels, Shorts)","Religious/cultural live streams"],
};
