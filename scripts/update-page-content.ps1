# Page-specific content updates for Keyurscreation
$Root = 'c:\Users\Bipin\Desktop\snapture'

# Wedding placeholder images (Unsplash)
$WeddingImg = 'https://images.unsplash.com/photo-1606800052052-a08af834886e?w=1200&q=80'
$WeddingImg2 = 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80'
$WeddingImg3 = 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1200&q=80'
$WeddingImg4 = 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=1200&q=80'

# --- INDEX.HTML ---
$index = Join-Path $Root 'index.html'
$c = Get-Content $index -Raw -Encoding UTF8

# Hero title
$c = $c -replace '<span class="wa_cursor_magnetic_1_elm">Keyurscreation</span>', '<span class="wa_cursor_magnetic_1_elm">Stories by Keyur</span>'

# Hero bottom title
$c = $c -replace 'Framing <span class="img-elm[^<]+</span> Moments That Tell Your <span class="img-elm-single-2[^<]+</span> Unique Story<span class="dot">\.</span>',
    'Every Love Story Deserves to Be <span class="has-clr">Remembered Forever</span><span class="dot">.</span>'

# Hero buttons
$c = $c -replace 'aria-label="View Portfolio" href="portfolio.html"', 'aria-label="View Portfolio" href="portfolio.html"'
$c = $c -replace '<span class="text">View Portfolio</span>', '<span class="text">View Portfolio</span>'
$c = $c -replace 'aria-label="Book a Session" href="contact.html"', 'aria-label="Book Your Shoot" href="booking.html"'
$c = $c -replace '<span class="text">Book a Session</span>', '<span class="text">Book Your Shoot</span>'
$c = $c -replace "I'm Esther Howard", 'Keyur | Founder'

# Services section
$c = $c -replace '<span class="text">Our Services</span>', '<span class="text">What We Capture</span>'
$c = $c -replace 'Creative Photography Services For Every Moment\.', 'Wedding Photography &amp; Cinematography For Every Sacred Moment.'
$c = $c -replace '<span class="text">View All Services</span>', '<span class="text">Explore All Services</span>'

# Service items
$c = $c -replace 'Portrait Photography\s*</a>', 'Wedding Photography</a>'
$c = $c -replace 'Portrait photography captures personality[^<]+', 'Timeless wedding photography that captures every emotion, ritual, and candid moment of your most sacred day with artistic elegance.'
$c = $c -replace 'Wedding Photography\s*</a>\s*</h3>\s*<p class="st-p-2 disc tx-description">Wedding photography beautifully[^<]+',
    'Wedding Cinematography</a></h3><p class="st-p-2 disc tx-description">Cinematic wedding films that tell your love story with emotion, music, and breathtaking visuals — a film you will cherish forever.'
$c = $c -replace 'Commercial Shoots', 'Pre-Wedding Shoots'
$c = $c -replace 'Commercial shoots deliver high-quality visuals[^<]+', 'Romantic pre-wedding sessions at stunning Gujarat locations — creating magical portraits and cinematic frames before your big day.'
$c = $c -replace 'Travel Photography', 'Drone Coverage'
$c = $c -replace 'Travel photography captures destinations[^<]+', 'Aerial drone photography and cinematography for breathtaking perspectives of your wedding venue, celebrations, and grand moments.'

# About section on home
$c = $c -replace '<span class="text">About Us</span>', '<span class="text">Our Story</span>'
$c = $c -replace "I'm a professional <span class=\"has-clr\">photographer specializing</span> <span class=\"has-opacity\">in portraits, lifestyle, and creative storytelling\. My work blends emotion with artistic composition to create visuals that feel</span> authentic and unforgettable\.",
    'Keyurscreation is a <span class="has-clr">passionate wedding studio</span> <span class="has-opacity">in Bhiloda, Gujarat — specializing in storytelling through emotions, candid moments, premium editing, and cinematic filmmaking that makes every couple feel like royalty.</span>'
$c = $c -replace '<span class="text">\s*More About Us\s*</span>', '<span class="text">Discover Our Story</span>'

# Projects section
$c = $c -replace 'Some\s*<span>Selected Work</span>', 'Our <span>Wedding Stories</span>'

# Process section -> Our Process
$c = $c -replace '<span class="text">Work Process</span>', '<span class="text">Our Process</span>'
$c = $c -replace 'Simple Creative Process', 'How We Create Your Timeless Story'
$c = $c -replace 'A smooth and collaborative process designed to turn your vision into stunning visual stories with clarity and creativity\.',
    'From our first conversation to delivering your wedding film — a seamless, personal journey designed around your love story.'
$c = $c -replace '<h3 class="st-h-2 title tx-title">Consultation</h3>\s*<p class="st-p-2 disc tx-description">We discuss your ideas, goals, style preferences, and expectations to fully\.</p>',
    '<h3 class="st-h-2 title tx-title">Connect &amp; Consult</h3><p class="st-p-2 disc tx-description">We meet to understand your vision, wedding dates, ceremonies, and the emotions you want preserved forever.</p>'
$c = $c -replace '<h3 class="st-h-2 title tx-title">Planning &amp; Concept</h3>\s*<p class="st-p-2 disc tx-description">I plan the shoot by selecting locations, mood, lighting style, and creative direction\.</p>',
    '<h3 class="st-h-2 title tx-title">Plan &amp; Storyboard</h3><p class="st-p-2 disc tx-description">We craft a detailed shot list, timeline, and creative direction for every ceremony and celebration.</p>'
$c = $c -replace '<h3 class="st-h-2 title tx-title">Photoshoot Execution</h3>\s*<p class="st-p-2 disc tx-description">A professional and relaxed shooting experience focused on capturing natural\.</p>',
    '<h3 class="st-h-2 title tx-title">Capture Every Moment</h3><p class="st-p-2 disc tx-description">Our team captures candid emotions, traditional rituals, and cinematic frames throughout your wedding.</p>'
$c = $c -replace '<h3 class="st-h-2 title tx-title">Editing &amp; Delivery</h3>\s*<p class="st-p-2 disc tx-description">Carefully edited images are delivered in high resolution, ensuring a polished\.</p>',
    '<h3 class="st-h-2 title tx-title">Edit &amp; Deliver</h3><p class="st-p-2 disc tx-description">Premium editing, cinematic color grading, albums, highlight films, and teasers delivered with care.</p>'

# Pricing on home
$c = $c -replace '<span class="text">Pricing Package</span>', '<span class="text">Our Packages</span>'
$c = $c -replace 'Flexible Photography Packages', 'Wedding Photography Packages'
$c = $c -replace 'Flexible photography pricing plans designed to suit every need[^<]+',
    'Elegant packages crafted for every celebration — from intimate ceremonies to grand luxury weddings across Gujarat.'
$c = $c -replace '<h4 class="st-h-2 title">Basic Package</h4>', '<h4 class="st-h-2 title">Silver Package</h4>'
$c = $c -replace '<p class="st-p-2 disc">Quick sessions &amp; personal portraits</p>', '<p class="st-p-2 disc">Wedding Photography</p>'
$c = $c -replace '<h4 class="st-h-2 title">Standard Package</h4>', '<h4 class="st-h-2 title">Gold Package</h4>'
$c = $c -replace '<p class="st-p-2 disc">Perfect for Events &amp; small projects</p>', '<p class="st-p-2 disc">Photography + Cinematography</p>'
$c = $c -replace '<h4 class="st-h-2 title">Premium Package</h4>', '<h4 class="st-h-2 title">Platinum Package</h4>'
$c = $c -replace '<p class="st-p-2 disc">Weddings &amp; full-day coverage</p>', '<p class="st-p-2 disc">Photography + Films + Drone + Album</p>'
$c = $c -replace '>\s*99\s*<', '> 49,999 <'
$c = $c -replace '>\s*249\s*<', '> 99,999 <'
$c = $c -replace '>\s*459\s*<', '> 1,99,999 <'
$c = $c -replace '/per project', '/package'

# Why choose section
$c = $c -replace '<span class="text">Why Choose Me</span>', '<span class="text">Why Choose Us</span>'
$c = $c -replace 'Why Work <br> with Me\?', 'Why Couples <br> Choose Keyurscreation?'
$c = $c -replace 'I combine creativity, professionalism, and a client-focused approach to deliver high-quality photography that captures authentic moments and tells your unique story beautifully\.',
    'We combine cinematic storytelling, emotional candid photography, and luxury production quality — delivering wedding memories that feel as beautiful as the day itself.'

# Footer
$c = $c -replace '<h3 class="st-h-2 big-title">Keyurscreation</h3>', '<h3 class="st-h-2 big-title">Keyurscreation</h3>'
$c = $c -replace 'aria-label="Services">\s*Services\s*</a>', 'aria-label="Our Stories">Our Stories</a>'
$c = $c -replace 'aria-label="Portfolio">\s*Our Stories\s*</a>', 'aria-label="Booking">Book a Shoot</a>' -replace 'href="portfolio.html"\s*target="_self"\s*rel=""\s*aria-label="Booking">Book a Shoot', 'href="booking.html" target="_self" rel="" aria-label="Booking">Book a Shoot'

# Insert Featured Wedding Films section before process section
$filmsSection = @'

		<div class="elementor-element e-con-full e-flex e-con e-child kc-films-wrapper">
		<section class="kc-films-area tx-section">
			<div class="container st-container-2">
				<div class="text-center">
					<h6 class="st-subtitle-2 has-black tx-subTitle">
						<span class="text">Cinematic Films</span>
						<span class="line-1"></span><span class="line-2"></span><span class="line-3"></span><span class="line-4"></span>
					</h6>
					<h2 class="st-sec-title-2 has-black wa-split-text split-line-up tx-title" style="color:#fff;">Featured Wedding Films</h2>
					<p class="st-p-2 sec-disc wow fadeInUp" style="color:#E8DFD0;max-width:600px;margin:16px auto 0;">Luxury wedding films crafted with emotion, music, and cinematic storytelling — relive your most precious moments.</p>
				</div>
				<div class="kc-films-grid">
					<div class="kc-film-card wow fadeInUp">
						<img src="https://images.unsplash.com/photo-1606800052052-a08af834886e?w=800&q=80" alt="Luxury wedding film Ahmedabad">
						<div class="kc-play"><i class="fas fa-play"></i></div>
						<div class="kc-film-overlay"><h4>Priya &amp; Rahul</h4><p>Ahmedabad · Luxury Wedding Film</p></div>
					</div>
					<div class="kc-film-card wow fadeInUp" data-wow-delay=".15s">
						<img src="https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80" alt="Pre-wedding cinematic film Gujarat">
						<div class="kc-play"><i class="fas fa-play"></i></div>
						<div class="kc-film-overlay"><h4>Ananya &amp; Dev</h4><p>Gandhinagar · Pre-Wedding Film</p></div>
					</div>
					<div class="kc-film-card wow fadeInUp" data-wow-delay=".3s">
						<img src="https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80" alt="Traditional wedding highlight Bhiloda">
						<div class="kc-play"><i class="fas fa-play"></i></div>
						<div class="kc-film-overlay"><h4>Kavya &amp; Arjun</h4><p>Bhiloda · Traditional Wedding</p></div>
					</div>
				</div>
			</div>
		</section>
		</div>

'@

if ($c -notmatch 'kc-films-area') {
    $c = $c -replace '(<section class="st-process-2-area)', "$filmsSection`n`$1"
}

# Hero background to wedding image
$c = $c -replace 'data-background="assets/images/uploads/2026/04/h2-bg-img\.webp"', "data-background=`"$WeddingImg`""

[System.IO.File]::WriteAllText($index, $c, [System.Text.UTF8Encoding]::new($false))
Write-Host 'Updated index.html'

# --- ABOUT.HTML ---
$about = Join-Path $Root 'about.html'
$a = Get-Content $about -Raw -Encoding UTF8
$a = $a -replace '<h1 class="st-breadcrumb-title">About</h1>', '<h1 class="st-breadcrumb-title">About Keyurscreation</h1>'
$a = $a -replace 'data-background="assets/images/uploads/2026/05/bg-img\.webp"', "data-background=`"$WeddingImg2`""
[System.IO.File]::WriteAllText($about, $a, [System.Text.UTF8Encoding]::new($false))
Write-Host 'Updated about.html'

# --- PORTFOLIO.HTML ---
$port = Join-Path $Root 'portfolio.html'
$p = Get-Content $port -Raw -Encoding UTF8
$p = $p -replace '<h1 class="st-breadcrumb-title">[^<]+</h1>', '<h1 class="st-breadcrumb-title">Our Wedding Stories</h1>'
$p = $p -replace 'Portfolio Overlapping', 'Our Wedding Stories'
$p = $p -replace 'Portfolio', 'Our Stories'
[System.IO.File]::WriteAllText($port, $p, [System.Text.UTF8Encoding]::new($false))
Write-Host 'Updated portfolio.html'

# --- TESTIMONIALS ---
$test = Join-Path $Root 'testimonials.html'
$t = Get-Content $test -Raw -Encoding UTF8
$t = $t -replace '<h1 class="st-breadcrumb-title">[^<]+</h1>', '<h1 class="st-breadcrumb-title">Love From Our Couples</h1>'
$t = $t -replace '"Our rebrand launch relied on Keyurscreation[^"]+"',
    '"Keyurscreation captured our wedding in Ahmedabad with such emotion and beauty. Every candid moment was perfectly timed — we cried watching our highlight film!"'
$t = $t -replace '"Crisp lighting, thoughtful composition[^"]+"',
    '"From Haldi to Reception, the team was punctual, professional, and incredibly talented. The cinematic video exceeded all our expectations. Highly recommended!"'
$t = $t -replace '"We hire Keyurscreation for annual galas[^"]+"',
    '"Our pre-wedding shoot in Gandhinagar was magical. Keyur made us feel comfortable and the photos are absolutely stunning. Best wedding photographer in Gujarat!"'
[System.IO.File]::WriteAllText($test, $t, [System.Text.UTF8Encoding]::new($false))
Write-Host 'Updated testimonials.html'

# --- CONTACT ---
$contact = Join-Path $Root 'contact.html'
$ct = Get-Content $contact -Raw -Encoding UTF8
$ct = $ct -replace 'placeholder="Services type"', 'placeholder="Wedding / Pre-Wedding / Event Type"'
$ct = $ct -replace 'placeholder="Your Name"', 'placeholder="Bride & Groom Names"'
[System.IO.File]::WriteAllText($contact, $ct, [System.Text.UTF8Encoding]::new($false))
Write-Host 'Updated contact.html'

# --- BLOG ---
$blog = Join-Path $Root 'blog.html'
$b = Get-Content $blog -Raw -Encoding UTF8
$b = $b -replace '<h1 class="st-breadcrumb-title">[^<]+</h1>', '<h1 class="st-breadcrumb-title">Wedding Photography Blog</h1>'
[System.IO.File]::WriteAllText($blog, $b, [System.Text.UTF8Encoding]::new($false))
Write-Host 'Updated blog.html'

# --- FAQ ---
$faq = Join-Path $Root 'faq.html'
$f = Get-Content $faq -Raw -Encoding UTF8
$f = $f -replace '<h1 class="st-breadcrumb-title">[^<]+</h1>', '<h1 class="st-breadcrumb-title">Frequently Asked Questions</h1>'
[System.IO.File]::WriteAllText($faq, $f, [System.Text.UTF8Encoding]::new($false))
Write-Host 'Updated faq.html'

# --- PRICING ---
$pricing = Join-Path $Root 'pricing.html'
$pr = Get-Content $pricing -Raw -Encoding UTF8
$pr = $pr -replace 'Basic Package', 'Silver Package'
$pr = $pr -replace 'Standard Package', 'Gold Package'
$pr = $pr -replace 'Premium Package', 'Platinum Package'
$pr = $pr -replace '>\s*99\s*<', '> 49,999 <'
$pr = $pr -replace '>\s*249\s*<', '> 99,999 <'
$pr = $pr -replace '>\s*459\s*<', '> 1,99,999 <'
[System.IO.File]::WriteAllText($pricing, $pr, [System.Text.UTF8Encoding]::new($false))
Write-Host 'Updated pricing.html'

# --- TEAM ---
$team = Join-Path $Root 'team.html'
$tm = Get-Content $team -Raw -Encoding UTF8
$tm = $tm -replace '<h1 class="st-breadcrumb-title">[^<]+</h1>', '<h1 class="st-breadcrumb-title">Meet Our Team</h1>'
[System.IO.File]::WriteAllText($team, $tm, [System.Text.UTF8Encoding]::new($false))
Write-Host 'Updated team.html'

# --- BOOKING ---
$book = Join-Path $Root 'booking.html'
$bk = Get-Content $book -Raw -Encoding UTF8
$bk = $bk -replace '<h1 class="st-breadcrumb-title">[^<]+</h1>', '<h1 class="st-breadcrumb-title">Book Your Shoot</h1>'
[System.IO.File]::WriteAllText($book, $bk, [System.Text.UTF8Encoding]::new($false))
Write-Host 'Updated booking.html'

# --- EVENTS ---
$events = Join-Path $Root 'events.html'
$ev = Get-Content $events -Raw -Encoding UTF8
$ev = $ev -replace '<h1 class="st-breadcrumb-title">[^<]+</h1>', '<h1 class="st-breadcrumb-title">Wedding Events</h1>'
[System.IO.File]::WriteAllText($events, $ev, [System.Text.UTF8Encoding]::new($false))
Write-Host 'Updated events.html'

Write-Host 'Page content updates complete.'
