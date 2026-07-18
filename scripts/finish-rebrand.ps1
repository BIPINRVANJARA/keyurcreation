# Complete Keyurscreation brand updates across all pages
$Root = 'c:\Users\Bipin\Desktop\snapture'
$BrandLink = '<link rel="stylesheet" href="assets/css/keyurscreation.css" media="all" />'
$Favicon = '<link rel="icon" href="assets/images/brand/favicon.svg" type="image/svg+xml" />'

$files = Get-ChildItem $Root -Filter '*.html' -File

foreach ($f in $files) {
    $c = [System.IO.File]::ReadAllText($f.FullName)

    # Encoding fixes (UTF-8 em dash)
    $c = $c.Replace([char]0x00E2 + [char]0x0080 + [char]0x0093, [char]0x2013)

    # Ensure brand CSS on every page
    if ($c -notmatch 'keyurscreation\.css') {
        $c = $c -replace '</head>', "$BrandLink`n$Favicon`n</head>"
    }

    # Fix broken script tag
    $c = $c -replace 'id="snapture-custom\.js"', 'id="snapture-custom-js"'

    # Fix broken ajax URLs
    $c = $c -replace '/wp/Keyurscreation/', '/'
    $c = $c -replace 'themexriver\.com/wp/Keyurscreation', ''

    # Preloader
    $c = $c -replace 'KEYURSCREATION\s*</p>', 'STORIES BY KEYUR</p>'

    # Footer copyright
    $c = $c -replace '©<span class="wa_current_year"></span>, <a href="#" aria-label="name">Keyurscreation</a> All Rights Reserved\.',
        '©<span class="wa_current_year"></span> Keyurscreation – Stories by Keyur | TSPF. All Rights Reserved.'

    # Footer menu
    $c = $c -replace 'aria-label="About us">\s*About us\s*</a>', 'aria-label="About">About</a>'
    $c = $c -replace 'aria-label="Services">\s*Services\s*</a>', 'aria-label="Our Stories">Our Stories</a>'
    $c = $c -replace 'aria-label="Portfolio">\s*Our Stories\s*</a>\s*</li>\s*<li>\s*<a href="contact.html"', 'aria-label="Booking">Book a Shoot</a></li><li><a href="contact.html"'
    # Simpler footer fix - replace duplicate portfolio link area
    $c = [regex]::Replace($c, '(?<=st-footer-2-menu">\s*<ul>).*?(?=</ul>)', {
        param($m)
        @'
                                        <li><a href="index.html" aria-label="Home">Home</a></li>
                                        <li><a href="about.html" aria-label="About">About</a></li>
                                        <li><a href="portfolio.html" aria-label="Our Stories">Our Stories</a></li>
                                        <li><a href="booking.html" aria-label="Booking">Booking</a></li>
                                        <li><a href="contact.html" aria-label="Contact">Contact</a></li>
'@
    }, 'Singleline')

    # Social links - add real placeholders
    $c = $c -replace 'fab fa-instagram"></i>\s*</span>\s*</a>\s*</div>\s*</div>\s*<div class="st-footer-2-menu"',
        'fab fa-instagram"></i></span></a><a href="https://wa.me/919876543210" target="_blank" rel="noopener" aria-label="WhatsApp" class="single-link"><span class="icon-elm"><i class="fab fa-whatsapp"></i></span></a></div></div><div class="st-footer-2-menu"'

    # Replace western names with Indian couple names
    $c = $c -replace 'Cameron Williamson', 'Priya & Rahul Shah'
    $c = $c -replace 'Esther Howard', 'Keyur Patel'
    $c = $c -replace 'John ', 'Keyur '

    # Generic testimonial replacements
    $c = $c -replace '"Captured our special day perfectly with emotional depth[^"]*"',
        '"Keyurscreation captured our Ahmedabad wedding with such emotion. Every candid moment was perfectly timed — we cried watching our highlight film!"'
    $c = $c -replace '"Extremely professional and easy to work with[^"]*"',
        '"From Haldi to Reception, the team was punctual and incredibly talented. The cinematic video exceeded all our expectations!"'
    $c = $c -replace '"Made us feel comfortable throughout the shoot[^"]*"',
        '"Our pre-wedding shoot in Gandhinagar was magical. Keyur made us feel so comfortable — the photos are absolutely stunning!"'
    $c = $c -replace '"The photos were absolutely stunning[^"]*"',
        '"The traditional ceremony coverage was beautiful. Premium editing, fast delivery, and albums that feel like luxury heirlooms."'
    $c = $c -replace '"Incredible attention to detail[^"]*"',
        '"Drone shots of our venue in Himatnagar were breathtaking. Professional, creative, and worth every rupee. Highly recommended!"'

    # Agency testimonials on testimonials page
    $c = $c -replace 'The team delivered stunning visuals that perfectly captured our brand identity[^"]*',
        'Keyurscreation captured our wedding in Ahmedabad with such emotion and beauty. Every candid moment was perfectly timed!'
    $c = $c -replace 'Amazing work and professional approach throughout the project[^"]*',
        'From Haldi to Reception, the team was punctual, professional, and incredibly talented. The cinematic video exceeded expectations!'
    $c = $c -replace 'Fast turnaround without sacrificing quality[^"]*',
        'Our engagement shoot in Gandhinagar was magical. The photos are absolutely stunning — best wedding photographer in Gujarat!'
    $c = $c -replace 'Collaborative from mood board to final edit[^"]*',
        'They understood our vision for a traditional Gujarati wedding and delivered frames that made our families tear up with joy.'
    $c = $c -replace 'Crisp lighting, thoughtful composition[^"]*',
        'The highlight film and teaser were cinematic masterpieces. Our guests still talk about how beautiful the wedding video looked.'
    $c = $c -replace 'Clear communication, flexible on-site[^"]*',
        'Keyur and team covered our Sangeet and Mehndi with such energy. Candid shots captured every laugh and tear perfectly.'
    $c = $c -replace 'Our boutique needed seasonal lookbooks[^"]*',
        'We booked them for our maternity shoot in Bhiloda — gentle, patient, and the portraits are frame-worthy forever.'
    $c = $c -replace 'Documentary work demands trust[^"]*',
        'Luxury wedding film quality at honest pricing. They travelled to our destination wedding without any hassle.'
    $c = $c -replace 'We hire Keyurscreation for annual galas[^"]*',
        'Five stars for punctuality, quality, and warmth. Keyurscreation made our big day stress-free and beautifully documented.'

    # Contact page updates
    $c = $c -replace '4517 Washington Ave\. Manchester, Kentucky 39495', 'Bhiloda, Gujarat, India — Serving Ahmedabad, Gandhinagar, Himatnagar & All Gujarat'
    $c = $c -replace '\(704\) 555-0127', '+91 98765 43210'
    $c = $c -replace '\(684\) 555-0102', '+91 98765 43210 (WhatsApp)'
    $c = $c -replace '\[email&#160;protected\]', 'hello@keyurscreation.com'
    $c = $c -replace 'placeholder="Services type"', 'placeholder="Wedding / Pre-Wedding / Event Type"'
    $c = $c -replace 'placeholder="Your Name \*"', 'placeholder="Your Name *"'
    $c = $c -replace 'Book Your Photography Service Today Without Delay\.', 'Book Your Wedding Photography Session — Let Us Tell Your Story.'
    $c = $c -replace '<h3 class="st-h-4 title">Email Address</h3>\s*<p class="st-p-2 link-elm">\s*\+91',
        '<h3 class="st-h-4 title">Phone & WhatsApp</h3><p class="st-p-2 link-elm">+91'

    # Breadcrumb titles
    if ($f.Name -eq 'about.html') {
        $c = $c -replace '<h1 class="st-breadcrumb-title">About</h1>', '<h1 class="st-breadcrumb-title">About Keyurscreation</h1>'
        $c = $c -replace 'data-background="assets/images/uploads/2026/05/bg-img\.webp"',
            'data-background="https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80"'
    }
    if ($f.Name -eq 'testimonials.html') {
        $c = $c -replace '<h1 class="st-breadcrumb-title">Testimonials</h1>', '<h1 class="st-breadcrumb-title">Love From Our Couples</h1>'
    }
    if ($f.Name -eq 'portfolio.html') {
        $c = $c -replace '<h1 class="st-breadcrumb-title">[^<]+</h1>', '<h1 class="st-breadcrumb-title">Our Wedding Stories</h1>'
    }
    if ($f.Name -eq 'team.html') {
        $c = $c -replace '<h1 class="st-breadcrumb-title">Our Team</h1>', '<h1 class="st-breadcrumb-title">Meet Our Team</h1>'
    }
    if ($f.Name -eq 'blog.html') {
        $c = $c -replace '<h1 class="st-breadcrumb-title">[^<]+</h1>', '<h1 class="st-breadcrumb-title">Wedding Photography Blog</h1>'
    }
    if ($f.Name -eq 'faq.html') {
        $c = $c -replace '<h1 class="st-breadcrumb-title">[^<]+</h1>', '<h1 class="st-breadcrumb-title">Frequently Asked Questions</h1>'
    }
    if ($f.Name -eq 'booking.html') {
        $c = $c -replace '<h1 class="st-breadcrumb-title">[^<]+</h1>', '<h1 class="st-breadcrumb-title">Book Your Shoot</h1>'
    }
    if ($f.Name -eq 'events.html') {
        $c = $c -replace '<h1 class="st-breadcrumb-title">[^<]+</h1>', '<h1 class="st-breadcrumb-title">Wedding Events</h1>'
    }

    # Pricing packages
    $c = $c -replace 'Basic Package', 'Silver Package'
    $c = $c -replace 'Standard Package', 'Gold Package'
    $c = $c -replace 'Premium Package', 'Platinum Package'
    $c = $c -replace 'Quick sessions &amp; personal portraits', 'Wedding Photography'
    $c = $c -replace 'Perfect for Events &amp; small projects', 'Photography + Cinematography'
    $c = $c -replace 'Weddings &amp; full-day coverage', 'Photography + Films + Drone + Album'

    # Index testimonial section title if present
    $c = $c -replace 'Client Testimonials', 'Love From Our Couples'
    $c = $c -replace 'What Our Clients Say', 'Love From Our Couples'

    [System.IO.File]::WriteAllText($f.FullName, $c, [System.Text.UTF8Encoding]::new($false))
    Write-Host "Updated $($f.Name)"
}

Write-Host 'Batch update complete.'
