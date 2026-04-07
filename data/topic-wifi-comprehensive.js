export const WIFI = {
  id:"wifi", title:"How Wi-Fi Works", category:"connectivity", difficulty:"beginner", readTime:"25 min read",
  hook:"You walk into your home, and your phone instantly connects to the internet — wirelessly. You stream 4K video, video-call family across the world, download files at hundreds of megabits per second, all through invisible waves passing through walls, furniture, and the air itself. Over 20 billion devices worldwide are connected via Wi-Fi right now. It's so ubiquitous that we notice it only when it stops working. But what IS Wi-Fi? How does data travel through thin air? Why does it slow down when you walk to the far corner of your house? And why does your neighbor's Wi-Fi interfere with yours?",
  oneLiner:"Wi-Fi transmits data as radio waves between your device and a router using the IEEE 802.11 family of standards, encoding digital information onto electromagnetic waves at 2.4 GHz or 5 GHz (and now 6 GHz) frequencies, with the router providing a bridge between the wireless local network and the wired internet connection.",
  summary:"Wi-Fi is a short-range wireless technology that creates a local network bubble — typically 10-50 meters — around a router. It's NOT the internet itself; it's the last wireless hop connecting your device to the router, which then connects to the actual internet through a physical cable. Understanding this distinction, and how radio waves carry data, demystifies most Wi-Fi problems.",

  beginnerExplanation:`Let's start with the most important thing to understand.

WI-FI IS NOT THE INTERNET

This is the single biggest misconception. Wi-Fi and the internet are completely different things:

The Internet is the global network of interconnected computers, cables, and data centers spanning the entire planet. It's physical infrastructure — undersea cables, fiber optic lines, massive data centers. (See our Internet topic for the full explanation.)

Wi-Fi is just the short-range wireless connection between YOUR DEVICE and YOUR ROUTER. It's the "last few meters" — a wireless bridge replacing what would otherwise be an Ethernet cable plugged into your phone or laptop.

You can have Wi-Fi without internet: If your ISP connection goes down but your router is still powered on, your devices still connect to Wi-Fi — they just can't access anything online. You might still be able to stream from a local media server or print to a wireless printer.

You can have internet without Wi-Fi: Plug an Ethernet cable directly from your router to your laptop. You have full internet access with no Wi-Fi involved.

Your router is the bridge between the two: On one side, it connects to the internet via a physical cable from your ISP (fiber, coaxial, or telephone line). On the other side, it creates a Wi-Fi bubble that your devices connect to wirelessly. The router translates between the wired internet and the wireless local network.

HOW DATA TRAVELS ON RADIO WAVES

Wi-Fi uses radio waves — the same type of electromagnetic radiation as FM radio, TV broadcasts, and microwave ovens, just at different frequencies. Radio waves are invisible, travel at the speed of light, and can pass through walls (though they weaken each time).

But how do you put DATA on a radio wave? Through a process called modulation:

Imagine a perfectly regular wave — smooth up-and-down oscillation. By itself, it carries no information (just like a constant humming sound carries no message). To encode data, you MODIFY the wave in controlled ways:

Amplitude modulation: Vary the wave's height (louder/softer) to represent 1s and 0s.
Frequency modulation: Vary the wave's speed (faster/slower oscillation) to represent data.
Phase modulation: Shift the wave's timing (advance or delay the wave cycle) to represent data.

Modern Wi-Fi uses extremely sophisticated modulation — QAM (Quadrature Amplitude Modulation) — which simultaneously varies BOTH the amplitude and phase to encode multiple bits per symbol. Wi-Fi 6 uses 1024-QAM, encoding 10 bits into every single wave symbol. Wi-Fi 7 uses 4096-QAM, encoding 12 bits per symbol.

At 5 GHz, the radio wave oscillates 5 billion times per second. With each oscillation potentially carrying multiple bits of data, you can see how Wi-Fi achieves hundreds of megabits or even gigabits per second — even though the underlying mechanism is "just" radio waves.

THE WI-FI CONNECTION PROCESS — WHAT HAPPENS WHEN YOU CONNECT

Step 1 — Discovery: Your router continuously broadcasts "beacon frames" — small radio signals announcing its presence about 10 times per second. Each beacon contains the network name (SSID), supported speeds, security type, and channel information. When you see a list of available Wi-Fi networks on your phone, you're seeing the SSIDs from all the beacons your phone has received.

Step 2 — Authentication: When you select a network and enter the password, your device and the router perform a "4-way handshake" to verify the password without actually transmitting it over the air. Using WPA3 (the latest security standard), the handshake uses SAE (Simultaneous Authentication of Equals) — a protocol based on elliptic curve cryptography that's resistant to offline dictionary attacks (where an attacker captures the handshake and tries millions of passwords on their own computer).

Step 3 — Association: After authentication, your device formally associates with the router — registering as a client. The router assigns your device an IP address (via DHCP) and the device can now send and receive data through the router.

Step 4 — Data transfer: Your device and router exchange data using the agreed modulation scheme, channel width, and spatial streams. Every piece of data is encrypted (using AES-256 with WPA3), so even if someone captures the radio signals, they can't read the content.

Step 5 — Roaming: If you move to another room and the signal weakens, your device can "roam" to a closer access point (if you have mesh Wi-Fi or multiple access points). Ideally, this handoff is seamless — your video call doesn't drop.

2.4 GHz VS 5 GHz VS 6 GHz — THE THREE WI-FI BANDS

Wi-Fi operates in three frequency bands, each with different characteristics:

2.4 GHz — The Original Band
Range: Excellent — up to 50 meters indoors. 2.4 GHz waves are longer and penetrate walls better.
Speed: Lower — maximum ~600 Mbps (Wi-Fi 6), typically 50-150 Mbps in practice.
Congestion: Very crowded — only 3 non-overlapping channels (1, 6, 11) in a band shared with Bluetooth, microwave ovens, baby monitors, cordless phones, and your neighbors' Wi-Fi networks.
Best for: IoT devices (smart bulbs, sensors), devices far from the router, older devices.

5 GHz — The Fast Band
Range: Shorter — up to 30 meters indoors. Higher frequency waves are absorbed more by walls.
Speed: Much faster — maximum ~4.8 Gbps (Wi-Fi 6), typically 200-800 Mbps in practice.
Congestion: Much less crowded — 25 non-overlapping channels provide far more room.
Best for: Streaming, gaming, video calls, large downloads, devices close to the router.

6 GHz — The New Frontier (Wi-Fi 6E/7)
Range: Shortest — similar to 5 GHz but slightly less wall penetration.
Speed: Fastest — maximum ~9.6 Gbps (Wi-Fi 6E), 46 Gbps theoretical (Wi-Fi 7).
Congestion: Virtually empty — 59 new channels with no legacy devices.
Best for: Highest-performance applications, AR/VR, 8K streaming, real-time gaming.
Availability: Requires Wi-Fi 6E or Wi-Fi 7 devices (increasingly common in 2024-2025 flagships).

Most modern routers are "tri-band" — they broadcast on all three bands simultaneously, and smart devices automatically connect to the best available band.

WHY WI-FI SLOWS DOWN — THE MOST COMMON CAUSES

Distance from router: Radio signal strength decreases with the square of distance. At twice the distance, signal is 4× weaker. The router and device negotiate lower speeds to maintain a reliable connection at greater distances.

Walls and obstacles: Every wall the signal passes through absorbs some energy. Drywall: ~3 dB loss (halves signal). Concrete: ~12 dB loss. Metal (refrigerator, ductwork): near-total blockage. Glass with metallic coating (energy-efficient windows): significant blockage.

Congestion from neighbors: In an apartment building, 20-30 Wi-Fi networks might be competing for the same 3 channels in the 2.4 GHz band. Devices on the same channel must take turns transmitting — like people trying to talk in a crowded room. This dramatically reduces your effective throughput.

Too many devices: Your router shares its total bandwidth among all connected devices. A router delivering 1 Gbps total with 20 active devices gives each device an average of 50 Mbps — regardless of what the "maximum speed" sticker on the router box claims.

Interference from other devices: Microwave ovens operate at 2.45 GHz — smack in the middle of the Wi-Fi band — and leak significant radiation. Bluetooth (also 2.4 GHz), baby monitors, cordless phones, and even USB 3.0 cables (which emit interference near 2.4 GHz due to poor shielding) can all degrade Wi-Fi performance.

Router hardware limitations: Older or cheap routers have limited processing power, fewer antennas, and smaller buffers. When multiple devices stream simultaneously, the router's processor becomes the bottleneck — not the wireless link.

MESH WI-FI — SOLVING THE COVERAGE PROBLEM

Traditional single-router setups create a single point of coverage — strong near the router, weak far away. Wi-Fi extenders/repeaters exist but create problems: they halve the bandwidth (because they receive and retransmit on the same channel), create a separate network (requiring manual switching), and add latency.

Mesh Wi-Fi systems (Google Nest, TP-Link Deco, Amazon Eero) use multiple units placed throughout your home, all working as a single unified network. Key advantages:

Seamless roaming: Your device automatically connects to the nearest unit as you move — no switching networks, no dropped connections.

Dedicated backhaul: Better mesh systems use a dedicated radio (or wired Ethernet) for inter-unit communication, so your data bandwidth isn't halved.

Self-healing: If one unit fails, traffic automatically routes through other units.

Smart channel management: The system continuously monitors congestion and moves clients to the best channel/band.

Coverage: A 3-unit mesh system can cover 300-500 square meters reliably.

For Indian homes (concrete walls, 2-4 BHK layout), mesh systems are dramatically better than single routers — a single router in the hall often can't reach the master bedroom through multiple concrete walls. A 3-unit mesh system (₹8,000-15,000) transforms the experience.`,

  standardExplanation:`The engineering and protocols that make wireless networking work.

IEEE 802.11 STANDARDS EVOLUTION

Wi-Fi is defined by the IEEE 802.11 family of standards:

802.11b (1999): 2.4 GHz, 11 Mbps max. The first mass-market Wi-Fi.
802.11a (1999): 5 GHz, 54 Mbps. Better speed but poor range. Limited adoption.
802.11g (2003): 2.4 GHz, 54 Mbps. Combined b's range with a's speed approach.
802.11n / Wi-Fi 4 (2009): Dual-band (2.4+5 GHz), 600 Mbps. Introduced MIMO.
802.11ac / Wi-Fi 5 (2014): 5 GHz, 6.9 Gbps. Wider channels (80/160 MHz), MU-MIMO.
802.11ax / Wi-Fi 6 (2020): Dual-band, 9.6 Gbps. OFDMA, TWT, 1024-QAM, BSS coloring.
802.11ax / Wi-Fi 6E (2021): Added 6 GHz band. Same tech as Wi-Fi 6, vastly more spectrum.
802.11be / Wi-Fi 7 (2024): Tri-band, 46 Gbps theoretical. 320 MHz channels, 4096-QAM, MLO.

KEY TECHNOLOGIES IN MODERN WI-FI

OFDM / OFDMA (Orthogonal Frequency Division Multiple Access):
Instead of using the entire channel width for one device at a time, OFDMA divides the channel into smaller sub-channels called Resource Units (RUs). Different devices can transmit/receive simultaneously on different RUs within the same channel — like multiple lanes on a highway. Wi-Fi 6 introduced OFDMA for both uplink and downlink, dramatically improving efficiency in dense environments (offices, apartments, stadiums).

MIMO (Multiple Input, Multiple Output):
Using multiple antennas to send and receive multiple data streams simultaneously. A 4×4 MIMO router with 4 antennas can theoretically send 4 independent streams to a 4-antenna device, quadrupling throughput. MU-MIMO (Multi-User MIMO) extends this by sending different streams to different devices simultaneously — a 8×8 MU-MIMO router can serve 8 single-antenna devices at once.

Beamforming: Instead of broadcasting signal equally in all directions (like a bare light bulb), beamforming focuses the signal toward specific devices (like a flashlight). The router uses multiple antennas to create constructive interference in the direction of the client and destructive interference elsewhere. This increases range and throughput for the targeted device. Modern routers do this automatically and continuously track device positions.

Target Wake Time (TWT): A Wi-Fi 6 feature that lets the router schedule when each IoT device "wakes up" to communicate. A temperature sensor might only need to send data once per minute — TWT lets it sleep the rest of the time, dramatically extending battery life for IoT devices from weeks to years.

BSS Coloring: In dense environments, Wi-Fi signals from neighboring networks cause devices to defer transmission (thinking the channel is busy). BSS coloring assigns a "color" (identifier) to each network's transmissions. Devices can now distinguish "my network's signals" from "neighbor's signals" and transmit even when a neighbor is active on the same channel — significantly improving throughput in apartments and offices.

Multi-Link Operation (MLO) — Wi-Fi 7: A device can simultaneously connect to the SAME router on MULTIPLE bands (e.g., 5 GHz + 6 GHz simultaneously). Traffic is distributed across links for higher aggregate throughput, or duplicated across links for ultra-reliable low-latency communication. This is the most significant advancement in Wi-Fi 7 — it fundamentally changes how devices interact with routers.

WPA3 SECURITY

WPA3 (Wi-Fi Protected Access 3, mandatory for Wi-Fi 6 certification):

SAE (Simultaneous Authentication of Equals): Replaces WPA2's PSK (Pre-Shared Key) handshake. Even if an attacker captures the handshake, they cannot perform offline dictionary attacks (trying millions of passwords on their own computer). Each handshake is unique — capturing one handshake provides no information for future handshakes.

Individual encryption: WPA3 encrypts traffic between each device and the router with a unique key, even on open (no-password) networks. In WPA2 open networks, anyone can capture and read other users' traffic.

192-bit security mode: For enterprise/government networks requiring the highest security. Uses CNSA (Commercial National Security Algorithm) suite.

Protected Management Frames (PMF): Mandatory in WPA3. Prevents deauthentication attacks (where an attacker forces devices to disconnect from the router, often as a precursor to capturing handshakes or launching evil twin attacks).

CHANNEL BONDING AND CHANNEL WIDTH

Wi-Fi channels are like lanes on a road. Wider channels = more data capacity:

20 MHz channels: Standard width. 3 non-overlapping in 2.4 GHz, 25 in 5 GHz.
40 MHz: Combines 2 adjacent channels. Doubles potential throughput.
80 MHz: Combines 4 channels. Standard for Wi-Fi 5/6 on 5 GHz.
160 MHz: Combines 8 channels. Maximum for Wi-Fi 6 on 5 GHz. Only 2-3 non-overlapping 160 MHz channels available in 5 GHz.
320 MHz: Combines 16 channels. Wi-Fi 7 only, available in 6 GHz band. Maximum throughput.

Wider channels provide higher maximum speed but: cover fewer available channels (more potential for neighbor interference), require cleaner signal (more susceptible to interference), and are only useful when you actually need the throughput (a smart doorbell doesn't benefit from 320 MHz channels). Smart routers automatically select the appropriate channel width based on conditions.`,

  advancedExplanation:`Deep RF engineering and next-generation wireless.

RADIO PROPAGATION PHYSICS

Wi-Fi signal behavior in real environments involves complex physics:

Free-space path loss: Signal strength decreases with 1/r² (inverse square law). At 5 GHz, the Friis equation gives: path loss (dB) = 20log₁₀(d) + 20log₁₀(f) - 147.55, where d is distance in meters and f is frequency in Hz. At 10 meters on 5 GHz: ~66 dB loss. This means the signal is about 4 million times weaker than at the antenna.

Wall attenuation varies dramatically by material:
Drywall/plasterboard: 3-4 dB
Wood door: 3-4 dB
Glass window: 2-3 dB (clear), 6-10 dB (Low-E coated)
Brick: 6-8 dB
Concrete (standard): 10-15 dB
Concrete (reinforced with rebar): 15-25 dB
Metal: 20-40+ dB (near-complete blockage)

Multipath: Signals reflect off walls, floors, ceilings, furniture, and people, arriving at the receiver via multiple paths with different delays and phases. These copies can constructively interfere (boosting signal) or destructively interfere (canceling signal). This is why moving your phone just a few centimeters can significantly change Wi-Fi speed — you might be at a "null point" where reflected signals cancel the direct signal.

MIMO exploits multipath: In MIMO systems, multiple antennas transmit different data streams that take different reflected paths. The receiver's multiple antennas and signal processing algorithms separate these streams, turning multipath (a problem for single-antenna systems) into an advantage (parallel data channels).

Doppler effect: When you move while connected to Wi-Fi, the received frequency shifts slightly (higher when moving toward the router, lower when moving away). Modern receivers compensate for this, but at higher speeds or frequencies, Doppler can degrade performance.

MEDIUM ACCESS CONTROL — CSMA/CA

Wi-Fi uses CSMA/CA (Carrier Sense Multiple Access with Collision Avoidance) to share the radio medium:

Before transmitting, a device "listens" to check if the channel is clear. If the channel is busy, the device waits (defers). When the channel becomes free, the device waits a random additional time (backoff) before transmitting — this randomization reduces the probability of two devices transmitting simultaneously. After transmitting, the device waits for an acknowledgment (ACK) from the receiver. If no ACK is received, the device assumes a collision occurred and retransmits after a longer random backoff.

This differs from Ethernet's CSMA/CD (Collision Detection), where collisions can be detected during transmission. In wireless, a device can't reliably detect collisions while transmitting (its own signal drowns out others), so Wi-Fi uses AVOIDANCE (waiting) rather than DETECTION.

The hidden node problem: Two devices that can't hear each other (on opposite sides of the router) might both sense the channel as clear and transmit simultaneously, causing a collision at the router. RTS/CTS (Request to Send / Clear to Send) protocol mitigates this: a device sends a short RTS, the router responds with CTS (heard by all devices), and other devices defer.

WI-FI SENSING — BEYOND COMMUNICATION

Wi-Fi 802.11bf (expected ~2025) standardizes Wi-Fi sensing — using Wi-Fi signals to detect motion, presence, gestures, and even breathing without cameras:

When a person moves in a room, they disturb Wi-Fi signals between the router and connected devices — the reflected signals change slightly. By analyzing Channel State Information (CSI) — the detailed multipath profile of the wireless channel — algorithms can detect: room occupancy (someone is present), motion detection (someone is moving), gesture recognition (hand waves, specific gestures), respiration monitoring (chest movement changes signal path), and fall detection (sudden change in signal pattern).

Applications: home security (intruder detection without cameras — privacy-preserving), elderly care (fall detection, activity monitoring), smart home automation (lights on when someone enters), and sleep tracking. Google Nest Hub uses this for sleep sensing. Amazon has patented similar technology.

WI-FI 7 (802.11be) — THE NEXT GENERATION

Key innovations beyond previous generations:

320 MHz channels (6 GHz band only): Double the width of Wi-Fi 6's maximum, proportionally doubling potential throughput in favorable conditions.

4096-QAM: Encodes 12 bits per symbol (vs 10 bits for Wi-Fi 6's 1024-QAM). 20% higher throughput per symbol at the cost of requiring stronger signal quality for the densest modulations.

Multi-Link Operation (MLO): Simultaneously connects to the same router on multiple bands. Three modes: (1) Aggregation — combines bandwidth from multiple links for higher total throughput. (2) Low latency — sends time-critical data on whichever link is currently idle, reducing worst-case latency by 75-90%. (3) Reliability — duplicates critical data across multiple links for zero-loss transmission.

Deterministic latency: Critical for AR/VR, cloud gaming, and industrial IoT where consistent sub-5ms latency is required. Wi-Fi 7's combination of OFDMA scheduling, MLO, and restricted TWT provides much more predictable timing than previous generations.

Preamble puncturing: If part of a wide channel (e.g., 160 MHz) is occupied by an overlapping narrowband network, Wi-Fi 7 can use the remaining portions while leaving a "hole" where the interfering signal exists. Previous generations would fall back to a narrower channel entirely.

OPEN ROAMING AND PASSPOINT

Wi-Fi roaming between different networks (home → café → office → airport) currently requires manual network selection and authentication at each location. OpenRoaming (Wireless Broadband Alliance) and Passpoint (Hotspot 2.0) aim to make Wi-Fi work like cellular — your device automatically discovers, authenticates, and connects to available networks based on pre-established trust relationships (carrier agreements, enterprise federations).

With Passpoint, your phone could automatically connect to any participating Wi-Fi network worldwide using your mobile carrier's credentials — no passwords, no captive portals, seamless transition from cellular to Wi-Fi and back.`,

  corePrinciple:"Wi-Fi works by encoding digital data onto radio waves (2.4/5/6 GHz electromagnetic radiation) using sophisticated modulation techniques (QAM), transmitting these waves between your device and a router over a short range (10-50 meters), and using multiple antennas (MIMO), multiple sub-channels (OFDMA), and signal focusing (beamforming) to maximize throughput and reliability. The router then bridges between this wireless local connection and the wired internet, acting as the gateway between your devices and the global network.",

  components:[
    {name:"Wireless Router / Access Point",desc:"The central hub broadcasting Wi-Fi signals and managing connections for all devices. Contains: radio transmitter/receiver (for each supported band), multiple antennas (2-12, for MIMO and beamforming), a processor (for routing, NAT, firewall, QoS), a switch (for wired Ethernet ports), and firmware (the operating system managing everything). The router also performs NAT — translating between the single public IP address from your ISP and the private IP addresses of your multiple devices."},
    {name:"Wi-Fi Antenna (in your device)",desc:"A small antenna (typically 2-10mm, often multiple antennas for MIMO) that receives and transmits radio waves. Phone antennas are usually embedded around the edge of the device or behind the screen. Laptops have antennas in the screen bezel. The antenna must be tuned to resonate at 2.4/5/6 GHz. Metal phone cases or holding the phone in certain ways can block the antenna — this was the 'antennagate' issue with iPhone 4."},
    {name:"Wi-Fi Chipset",desc:"The silicon brain handling all wireless communication. Major manufacturers: Qualcomm (WCN6740, FastConnect 7800), Broadcom (BCM4389), Intel (Wi-Fi 7 BE200), MediaTek (Filogic 880). The chipset handles: modulation/demodulation, encryption/decryption (AES-256 in hardware), MIMO processing, beamforming calculation, channel scanning, and power management. Consumes 100-500mW during active transmission."},
    {name:"Radio Frequency (2.4/5/6 GHz)",desc:"The electromagnetic frequency bands used for Wi-Fi transmission. These are part of the ISM (Industrial, Scientific, Medical) bands — unlicensed frequencies that anyone can use without government permits. 2.4 GHz = longer range, more interference. 5 GHz = faster, less interference, shorter range. 6 GHz (Wi-Fi 6E/7) = fastest, cleanest spectrum, shortest range. The specific channels within each band are regulated by country."},
    {name:"Modulation (QAM)",desc:"The technique encoding digital bits onto analog radio waves. 256-QAM (Wi-Fi 5) = 8 bits per symbol. 1024-QAM (Wi-Fi 6) = 10 bits per symbol. 4096-QAM (Wi-Fi 7) = 12 bits per symbol. Higher QAM = more data per wave cycle, but requires cleaner signal (less noise and interference). Near the router (strong signal): highest QAM achievable. Far from router (weak signal): falls back to lower QAM."},
    {name:"WPA3 Encryption",desc:"The security protocol protecting Wi-Fi communications. Uses AES-256 encryption (considered unbreakable with current technology) and SAE key exchange (resistant to offline password attacks). Every device has a unique encryption key, even on open networks. Replaced WPA2 (which had vulnerabilities including the KRACK attack discovered in 2017)."},
  ],
  steps:[
    {title:"Router Broadcasts Beacon Signals",desc:"Your wireless router continuously transmits beacon frames approximately 10 times per second on each supported band and channel. Each beacon is a small radio transmission announcing: the network name (SSID), supported speeds and capabilities (Wi-Fi version, channel width, security type), the router's MAC address, and timing information for synchronization. These beacons are how your phone discovers available networks when you open Wi-Fi settings."},
    {title:"Your Device Discovers and Selects Network",desc:"Your phone/laptop scans all channels across all bands, collecting beacons from every nearby network. It displays the list of discovered SSIDs. When you select your network (or your phone auto-connects to a saved network), the device initiates the connection process. In mesh systems, the device selects the access point with the strongest signal or best capacity."},
    {title:"Authentication — Proving You Know the Password",desc:"Your device and the router perform a cryptographic handshake (WPA3-SAE or WPA2-PSK 4-way handshake). Neither side ever transmits the actual password. Instead, they use the password as input to a mathematical protocol that proves BOTH sides know the same password without revealing it. If successful, they derive unique session encryption keys. If the password is wrong, authentication fails."},
    {title:"Association and IP Assignment",desc:"After authentication, the device formally associates with the router. The router assigns the device a local IP address via DHCP (typically 192.168.1.x or 10.0.0.x). The device is now a member of the local network — it can communicate with other local devices and, through the router's NAT and internet connection, with the global internet."},
    {title:"Data Transmission — Encoding and Sending",desc:"When you load a webpage: your browser creates an HTTP request → the Wi-Fi chipset encrypts it (AES-256) → modulates it onto a radio wave (QAM) → transmits via antenna. The router's antenna receives the signal → demodulates → decrypts → forwards to the internet through the wired connection. The response follows the reverse path. All this happens in milliseconds, with error correction, retransmission of lost frames, and rate adaptation (automatically adjusting speed based on signal quality)."},
    {title:"Continuous Adaptation",desc:"Throughout your session, the Wi-Fi system continuously adapts: the router adjusts transmit power and beamforming toward your device, rate adaptation selects the best speed/modulation for current signal conditions, band steering moves capable devices from crowded 2.4 GHz to faster 5/6 GHz, OFDMA scheduling optimizes channel sharing among all devices, and TWT coordinates sleep/wake schedules for IoT devices to minimize congestion and maximize battery life."},
  ],
  misconceptions:[
    {myth:"Wi-Fi IS the internet",reality:"Wi-Fi is the short-range wireless link between your device and your router — nothing more. The internet is the global network your router connects to via a physical cable. You can have Wi-Fi without internet (router powered on, ISP down) and internet without Wi-Fi (Ethernet cable). When people say 'the Wi-Fi is slow,' they usually mean either their internet connection is slow (ISP issue) or their wireless link is degraded (Wi-Fi issue) — and the solution is different for each."},
    {myth:"5G Wi-Fi and 5G cellular are the same thing",reality:"Completely different technologies that unfortunately share a number. '5G Wi-Fi' refers to the 5 GHz frequency BAND used by Wi-Fi 5/6 (a frequency of radio waves). '5G cellular' refers to the 5th GENERATION of cellular network technology (4G LTE → 5G NR). They use different frequencies, different protocols, different infrastructure, and are operated by different entities. A phone can use both simultaneously."},
    {myth:"More expensive routers always provide faster internet",reality:"Your Wi-Fi speed can NEVER exceed your internet plan speed. If you pay for a 100 Mbps connection, a ₹20,000 router won't give you 200 Mbps internet. A premium router helps when: you have many devices (better processor handles concurrent connections), your home is large (better antennas and beamforming extend range), you're on a very fast plan (gigabit plans need Wi-Fi 6/6E to fully utilize), or you have heavy local traffic (local file transfers, gaming, streaming). For a 50 Mbps plan in a 2BHK, a ₹2,000-4,000 Wi-Fi 6 router is perfectly adequate."},
    {myth:"Hiding your SSID makes your network secure",reality:"Hiding the SSID (network name) only removes it from casual browsing. Anyone with basic tools (free apps like WiFi Analyzer) can see hidden networks. In fact, hidden SSIDs can REDUCE security because your devices constantly broadcast the hidden SSID name while looking for the network — creating a trackable signature. Real security comes from: a strong, unique password (12+ characters), WPA3 encryption, keeping router firmware updated, and disabling WPS (Wi-Fi Protected Setup, which has known vulnerabilities)."},
    {myth:"Wi-Fi signals are harmful to health",reality:"Wi-Fi operates at very low power — typically 30-100 milliwatts (0.03-0.1W). For comparison, a microwave oven operates at 1,000 watts (10,000× more powerful) and your mobile phone transmits at up to 2 watts during calls. The electromagnetic radiation from Wi-Fi is non-ionizing (far too low frequency to damage DNA) and thousands of times below international safety limits. Decades of research across thousands of studies have found no established health effects from Wi-Fi exposure. The WHO classifies radiofrequency EMF as 'possibly carcinogenic' (Group 2B) — the same category as pickled vegetables and talcum powder."},
  ],
  analogies:[
    {analogy:"An invisible Ethernet cable",explanation:"Wi-Fi does exactly what an Ethernet cable does — connects your device to the router — just wirelessly. The router is the same in both cases: it's the bridge between your local network and the internet. Wi-Fi replaces the physical cable with radio waves. This is why Wi-Fi speed is often lower than wired Ethernet — radio waves through air and walls are a noisier, less reliable medium than a copper/fiber cable with a direct physical connection."},
    {analogy:"Talking in a crowded room",explanation:"A Wi-Fi channel is like a conversation in a room. With few people (devices), everyone can talk freely and be heard clearly. As more people join (neighbors' Wi-Fi networks, more devices), the room gets noisier — everyone must speak louder (higher transmit power) or take turns (CSMA/CA). Eventually, there's so much noise that conversations become slow and unreliable. Moving to a less crowded room (5 GHz or 6 GHz band) dramatically improves the situation."},
    {analogy:"A lighthouse beam",explanation:"Beamforming focuses Wi-Fi signal toward specific devices, like a lighthouse directing its beam toward a particular ship. Without beamforming, the router broadcasts equally in all directions (like a bare light bulb) — most of the signal energy is wasted on directions where no devices exist. With beamforming, energy is concentrated where it's needed, extending range and increasing speed for targeted devices."},
  ],
  quiz:[
    {q:"Wi-Fi and the internet are:",options:["The same thing","Different — Wi-Fi is the local wireless link, internet is the global network","Both wireless technologies","Both require cables"],answer:1},
    {q:"Why does 2.4 GHz Wi-Fi have better range than 5 GHz?",options:["More power is used","Lower frequency waves penetrate walls better and travel farther","2.4 GHz is newer technology","5 GHz is intentionally limited"],answer:1},
    {q:"What does MIMO stand for and why does it matter?",options:["Maximum Input/Minimum Output — reduces interference","Multiple Input, Multiple Output — uses multiple antennas for parallel data streams","Managed Internet, Mobile Output — manages connections","Modulated Interference, Managed Operation — handles congestion"],answer:1},
    {q:"WPA3 improves Wi-Fi security by:",options:["Using faster frequencies","Making passwords longer","Using SAE handshake resistant to offline attacks + individual device encryption","Blocking hackers' IP addresses"],answer:2},
    {q:"If you have a 100 Mbps internet plan, a ₹20,000 router will give you:",options:["200 Mbps internet speed","Still 100 Mbps maximum internet, but better local performance","Unlimited internet speed","1 Gbps internet speed"],answer:1},
  ],
  faqs:[
    {q:"Why is my Wi-Fi slow even though my internet plan is fast?",a:"Your internet plan speed is only achievable IF your Wi-Fi link is at least as fast. Common Wi-Fi bottlenecks: old router (Wi-Fi 4 routers cap at ~150 Mbps), too far from router (signal degrades with distance — try moving closer), using 2.4 GHz (switch to 5 GHz for faster speeds), channel congestion (neighbors on the same channel — use a Wi-Fi analyzer app to find the least congested channel), too many devices (each shares the total bandwidth), physical obstacles (concrete walls, metal objects), or interference (microwave oven, Bluetooth devices). Solutions: upgrade to a Wi-Fi 6 router (₹3,000-8,000), use 5 GHz band, optimize router placement (central location, elevated), or install a mesh system for large homes."},
    {q:"Where should I place my router for best coverage?",a:"Central location: Place the router as close to the center of your living space as possible — not in a corner. Elevated position: Higher is better (on a shelf or mounted on a wall) because signals travel outward and downward more effectively than upward through floors. Away from obstructions: Not inside a cabinet, behind a TV, or near metal objects (refrigerator, metal shelf). Away from interference: At least 2 meters from microwave ovens, cordless phones, and Bluetooth devices. Away from water: Large water containers (fish tanks, water coolers) absorb Wi-Fi signals. Antenna orientation: If the router has external antennas, point them vertically (for horizontal coverage on the same floor) or horizontally (for multi-floor coverage)."},
    {q:"Should I use the same SSID for 2.4 GHz and 5 GHz?",a:"Yes, on modern routers — this is called 'band steering.' When both bands share the same network name and password, smart devices (and the router's band steering algorithm) automatically connect to the best band based on signal quality and capabilities. Capable devices close to the router go to 5 GHz (faster). Devices far away or older devices use 2.4 GHz (better range). This is simpler and usually works well. The exception: if you have specific devices that behave badly with band steering (some older IoT devices), you might want separate SSIDs to force them to a specific band."},
    {q:"How many devices can connect to one Wi-Fi router?",a:"The technical limit per router is typically 250-300 associated devices. The practical limit is much lower — 20-50 devices for consumer routers, depending on how active the devices are. Each active device consumes processor resources, memory, and a share of the wireless airtime. IoT devices (smart bulbs, sensors) that communicate rarely impose minimal load. Devices actively streaming video or downloading large files consume significant bandwidth and airtime. If you have 30+ devices and experience slowdowns, consider: a Wi-Fi 6 router (better at handling many devices via OFDMA and TWT), separating IoT devices onto 2.4 GHz and high-bandwidth devices onto 5 GHz, or adding a second access point."},
    {q:"Is public Wi-Fi (cafes, airports) safe to use?",a:"With modern HTTPS (95%+ of web traffic), public Wi-Fi is reasonably safe for general browsing — the encrypted connection between your browser and websites protects your data even on an insecure network. Risks remain: evil twin attacks (fake hotspot with the same name as the legitimate one, potentially intercepting unencrypted traffic), DNS hijacking (redirecting you to fake websites), and shoulder surfing (someone watching your screen). Precautions: verify the exact network name with staff, don't access sensitive services (banking) on public Wi-Fi unless using a VPN, enable 2FA on important accounts, use HTTPS-only mode in your browser, and forget the network after use (so your phone doesn't auto-connect to fake networks with the same name later). Using a VPN adds strong protection by encrypting ALL your traffic, not just HTTPS."},
    {q:"What is Wi-Fi 7 and should I upgrade?",a:"Wi-Fi 7 (802.11be) is the latest standard (devices available from late 2024). Key improvements over Wi-Fi 6E: 320 MHz channels (2× wider), 4096-QAM (20% more data per symbol), Multi-Link Operation (simultaneous connection across multiple bands — the biggest game-changer), and better latency predictability. Should you upgrade? Yes, if you: have many devices competing for bandwidth, need the lowest latency (cloud gaming, VR), have a gigabit+ internet plan, or are buying new equipment anyway. Wait if: your current Wi-Fi 6 setup works fine, you have a moderate-speed internet plan (<500 Mbps), or Wi-Fi 7 devices are still expensive in your market. Early Wi-Fi 7 routers cost ₹15,000-40,000; prices will drop significantly as adoption grows."},
    {q:"Why does my Wi-Fi disconnect frequently?",a:"Common causes: weak signal (too far from router — check signal strength in Wi-Fi settings), channel interference (use a Wi-Fi analyzer app to check for congested channels), router overheating (check if the router is hot — ensure ventilation), firmware bugs (update router firmware from manufacturer's website), driver issues (update Wi-Fi drivers on laptop/PC), IP address conflicts (multiple devices assigned the same IP — restart router), DFS channels (5 GHz channels 52-144 require the router to check for radar — if radar is detected, the router switches channels, causing a brief disconnection), or power saving features (phone Wi-Fi turning off during sleep — check power management settings)."},
    {q:"What is a Wi-Fi extender vs a mesh system?",a:"Wi-Fi extender/repeater: A single device placed between the router and the dead zone. It receives the router's signal and rebroadcasts it. Problems: halves bandwidth (it uses the same radio to receive and retransmit), creates a separate network segment (your device may not seamlessly switch), adds latency, and creates a 'one-hop' extension point that can become a bottleneck. Cost: ₹1,000-3,000. Mesh system: Multiple units placed throughout the home, working as a unified system with a single network name. Advantages: seamless roaming, dedicated backhaul channel (no bandwidth halving), self-organizing topology, consistent performance throughout. Cost: ₹5,000-15,000 for a 2-3 unit kit. For a home with persistent dead zones, mesh is dramatically better than extenders."},
    {q:"Does the number of antennas on a router matter?",a:"Yes, but not in the way most people think. More antennas ≠ stronger signal or longer range. Antennas serve MIMO — multiple antennas enable parallel data streams. A 4×4 MIMO router can send 4 independent streams to a 4-antenna device, roughly quadrupling throughput compared to 1×1. However, most phones have only 2 antennas — so streams 3 and 4 from your 4-antenna router aren't used by your phone. MU-MIMO helps: the router can serve different devices on different antennas simultaneously. In practice, for a typical home with phones and laptops (2×2 devices), a 4-antenna (4×4) router is the sweet spot. 8+ antenna routers benefit in environments with many simultaneous users (offices, shared homes with many heavy users)."},
    {q:"How do I know if someone is stealing my Wi-Fi?",a:"Check your router's admin panel (typically at 192.168.1.1 or 192.168.0.1 in a browser). Look for 'Connected Devices' or 'Client List.' You'll see the MAC address, IP address, and sometimes the device name for every connected device. Count and identify them — if there are more devices than you own, someone may be connected. Solutions: change your Wi-Fi password immediately (use WPA3 if available, WPA2 at minimum), disable WPS (vulnerable to brute-force), enable MAC address filtering (only allows specific device hardware addresses — not foolproof but adds a barrier), and check if any unauthorized devices are listed."},
    {q:"Why does my internet slow down in the evenings?",a:"Two factors: ISP congestion and Wi-Fi congestion. ISP congestion: In the evening (7-11 PM, 'peak hours'), most households in your area are streaming, gaming, and browsing simultaneously. If your ISP's infrastructure (especially the last-mile connection to your neighborhood) is oversubscribed, bandwidth is shared and everyone gets less. This affects wired AND wireless connections equally. Wi-Fi congestion: More devices are active in the evening (everyone's home), and more neighbors' Wi-Fi networks are active, increasing channel interference. Solution for ISP congestion: upgrade to a higher-tier plan or switch to a fiber ISP (fiber has more capacity per user). Solution for Wi-Fi congestion: use 5/6 GHz bands, change to a less congested channel, or upgrade to a Wi-Fi 6/7 router with OFDMA for better multi-device handling."},
    {q:"What is QoS and should I enable it?",a:"QoS (Quality of Service) is a router feature that prioritizes certain types of traffic over others. Without QoS, all traffic is first-come-first-served — a large file download could consume all bandwidth, causing your video call to stutter. With QoS, you can tell the router: 'Prioritize video calls and gaming over file downloads and software updates.' The router then allocates bandwidth accordingly — ensuring low-latency traffic gets through even during heavy network load. Enable QoS if: you have multiple users/devices competing for bandwidth and experience quality issues during peak usage. Most modern routers (especially Wi-Fi 6 and later) have smart QoS that automatically detects and prioritizes real-time traffic without manual configuration."},
    {q:"Can my landlord or ISP see what I browse on Wi-Fi?",a:"Your Wi-Fi itself is encrypted (WPA2/WPA3), so someone passively monitoring the radio waves can't read your traffic. However: your ISP can see which DOMAINS you connect to (even with HTTPS — they can see 'facebook.com' but not the specific page or content), because DNS queries are typically unencrypted. Using DNS over HTTPS (DoH) or DNS over TLS (DoT) encrypts DNS queries too. A VPN encrypts ALL traffic between your device and the VPN server, making it opaque to both the ISP and anyone on the local network — they only see encrypted data going to the VPN provider. For maximum privacy: use HTTPS-only mode + encrypted DNS (DoH/DoT) + a reputable VPN service."},
    {q:"How much electricity does a Wi-Fi router consume?",a:"A typical home router consumes 5-15 watts continuously (less than an LED bulb). A high-end gaming/mesh router: 15-30 watts. Running 24/7 for a year: a 10W router uses ~88 kWh, costing approximately ₹450-700/year at Indian electricity rates. This is negligible compared to most other appliances. Turning off your router at night to 'save electricity' saves perhaps ₹1-2 per night — not worth the inconvenience (smart home devices lose connectivity, security cameras stop working, and your router's DHCP leases and routing tables need to re-establish each morning)."},
    {q:"What is Wi-Fi calling?",a:"Wi-Fi calling (VoWiFi — Voice over Wi-Fi) uses your Wi-Fi connection to make regular phone calls instead of using the cellular network. Your voice is converted to data packets and sent over Wi-Fi to the internet, then through your carrier's network to the recipient. Benefits: calls in areas with poor cellular coverage but good Wi-Fi (basement, concrete buildings, rural areas with broadband), no special app needed (uses the native phone dialer), and uses your regular phone number. Most Indian carriers (Jio, Airtel, Vi) support Wi-Fi calling on compatible phones. Enable it in: Settings → Phone → Wi-Fi Calling (iPhone) or Settings → Connections → Wi-Fi Calling (Android). Call quality depends on Wi-Fi bandwidth and latency — a stable broadband connection typically provides good quality."},
    {q:"Why do some devices show 'connected, no internet'?",a:"This means your device has successfully connected to the router's Wi-Fi network (authentication and association worked fine), but the router itself cannot reach the internet. Common causes: ISP outage (the cable/fiber to your home is down — check ISP status page or call their helpline), router not connected to modem (check the WAN/Internet cable between router and modem/ONT), DHCP failure from ISP (router failed to get an IP address from ISP — restart the modem/ONT, wait 2 minutes, then restart the router), DNS failure (the router can reach the internet but DNS resolution fails — try changing DNS to 8.8.8.8 or 1.1.1.1), MAC authentication issue (some ISPs lock service to a specific device's MAC address), or router misconfiguration (incorrect PPPoE credentials, wrong WAN settings)."},
    {q:"How secure is WPA2 compared to WPA3?",a:"WPA2 (2004) is still considered secure for home use IF you use a strong, unique password (12+ characters, mixed case/numbers/symbols). Known vulnerabilities: KRACK attack (2017) — exploits WPA2 handshake vulnerabilities, allows attackers on the same network to decrypt traffic. Patched in most devices, but older unpatched devices remain vulnerable. Offline dictionary attacks — if an attacker captures a WPA2 handshake, they can try billions of password guesses on their own computer. A weak password (e.g., 'password123') can be cracked in seconds; a strong 16-character password would take centuries. WPA3 (2018) fixes both: SAE handshake is immune to offline dictionary attacks and KRACK-style exploits. WPA3 also provides forward secrecy (compromising the password later doesn't decrypt previously captured traffic). Recommendation: use WPA3 if all your devices support it; use WPA2/WPA3 transitional mode if some devices are older."},
    {q:"What internet speed do I actually need?",a:"Depends on usage and number of simultaneous users. Per-device recommendations: basic browsing/social media: 5-10 Mbps, SD video streaming: 5-10 Mbps, HD video streaming: 15-25 Mbps, 4K streaming: 25-50 Mbps, video calling (Zoom/Meet): 5-10 Mbps up AND down, online gaming: 10-25 Mbps (latency matters more than speed), working from home (VPN, cloud apps): 25-50 Mbps. For a household: take the sum of simultaneous peak usage. A family of 4 where 2 people stream 4K, 1 person video-calls, and 1 person browses needs: 50+50+10+10 = ~120 Mbps. Add 30-50% buffer for overhead and other devices. A 200 Mbps plan would be comfortable. In India, Jio Fiber and Airtel Xstream offer plans from 30 Mbps (₹399/month) to 1 Gbps (₹3,999/month)."},
  ],
  glossary:[
    {term:"SSID",def:"Service Set Identifier — your Wi-Fi network's name as it appears in the list of available networks. Can be hidden but this doesn't improve security."},
    {term:"WPA3",def:"Wi-Fi Protected Access 3 — latest security standard. Uses SAE handshake (immune to offline attacks), individual device encryption, and mandatory Protected Management Frames."},
    {term:"MIMO / MU-MIMO",def:"Multiple Input Multiple Output — using multiple antennas for parallel data streams. MU-MIMO serves multiple devices simultaneously on different antennas."},
    {term:"OFDMA",def:"Orthogonal Frequency Division Multiple Access — divides a Wi-Fi channel into smaller sub-channels, allowing multiple devices to transmit simultaneously. Key efficiency feature of Wi-Fi 6/7."},
    {term:"Beamforming",def:"Focusing the Wi-Fi signal toward specific devices (like a flashlight vs bare bulb) by controlling the phase of transmissions from multiple antennas. Increases range and speed."},
    {term:"Band Steering",def:"Router feature automatically directing capable devices to the faster 5/6 GHz bands, keeping only legacy and distant devices on the more congested 2.4 GHz band."},
    {term:"Mesh Wi-Fi",def:"System of multiple access points creating a unified, seamless network throughout a home. Better than single routers for large homes with concrete walls."},
    {term:"Channel Width",def:"The bandwidth of the radio channel: 20/40/80/160/320 MHz. Wider channels = more throughput but fewer non-overlapping channels available."},
    {term:"QAM",def:"Quadrature Amplitude Modulation — encoding technique. 256-QAM (Wi-Fi 5) = 8 bits/symbol. 1024-QAM (Wi-Fi 6) = 10 bits. 4096-QAM (Wi-Fi 7) = 12 bits."},
    {term:"MLO",def:"Multi-Link Operation (Wi-Fi 7) — simultaneously connecting to the same router on multiple bands for higher aggregate throughput or lower latency."},
  ],
  relatedTopics:["internet","bluetooth","mobile-calls"],
  childSummary:"Wi-Fi is like an invisible bridge between your phone and the internet box (router) in your house! The router shouts data using invisible radio waves, and your phone catches them with a tiny antenna. It's like talking to someone across the room — except instead of words, the radio waves carry all the YouTube videos, messages, and web pages you want. The router is plugged into the internet with a cable — it's the translator between the wireless world of your phone and the wired world of the internet!",
  applications:["Home internet connectivity","Office and enterprise networks","Public hotspots (cafes, airports, hotels)","Smart home IoT (lights, cameras, speakers)","Enterprise warehousing and logistics","Healthcare (medical device connectivity)","Education (classroom connectivity)","Industrial IoT (factory automation)","Retail (POS systems, inventory tracking)","Transportation (in-flight Wi-Fi, station connectivity)"],
};
