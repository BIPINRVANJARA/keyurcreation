# Continue Keyurscreation rebrand - blog rebuild, team fix, encoding, content
$Root = 'c:\Users\Bipin\Desktop\snapture'
$EnDash = [char]0x2013
$EmDash = [char]0x2014

function Fix-Encoding($text) {
    $enMoji = [System.Text.Encoding]::GetEncoding(1252).GetString([byte[]](0xE2, 0x80, 0x93))
    $emMoji = [System.Text.Encoding]::GetEncoding(1252).GetString([byte[]](0xE2, 0x80, 0x94))
    $text = $text.Replace($enMoji, $EnDash)
    $text = $text.Replace($emMoji, $EmDash)
    return $text
}

# --- 1. Fix encoding in all HTML pages ---
Get-ChildItem (Join-Path $Root '*.html') | ForEach-Object {
    $c = [System.IO.File]::ReadAllText($_.FullName, [System.Text.Encoding]::UTF8)
    $fixed = Fix-Encoding $c
    if ($fixed -ne $c) {
        [System.IO.File]::WriteAllText($_.FullName, $fixed, [System.Text.UTF8Encoding]::new($false))
        Write-Host "Fixed encoding: $($_.Name)"
    }
}

# --- 2. Fix team members ---
$teamPath = Join-Path $Root 'team.html'
$team = [System.IO.File]::ReadAllText($teamPath, [System.Text.Encoding]::UTF8)

$team = $team -replace 'Meet the Creative Team Behind <br> Every Stunning Shot',
    'The Passionate Team Behind <br> Every Wedding Story'

$members = @(
    @{ id = 'dba7277'; name = 'Keyur Patel'; role = 'Founder &amp; Lead Cinematographer' },
    @{ id = '88e046a'; name = 'Dhruv Shah'; role = 'Lead Photographer' },
    @{ id = 'f1e2970'; name = 'Meera Desai'; role = 'Candid Photographer' },
    @{ id = '528614e'; name = 'Vijay Patel'; role = 'Drone Operator' },
    @{ id = '22e67ae'; name = 'Kiran Mehta'; role = 'Video Editor' },
    @{ id = 'c2416b4'; name = 'Nisha Sharma'; role = 'Color Grader' },
    @{ id = '1ceab45'; name = 'Arjun Rao'; role = 'Production Assistant' }
)

foreach ($m in $members) {
    $pattern = "(?s)(data-id=`"$($m.id)`".*?<h5 class=`"st-h-4 name`">.*?<a[^>]*>)\s*[^<]+\s*(</a>.*?</h5>.*?<p class=`"st-p-2 bio`">)[^<]+(</p>)"
    $team = [regex]::Replace($team, $pattern, "`${1}`n                    $($m.name)                `${2}$($m.role)`${3}", 1)
}

$team = $team -replace '<b>Join</b> our team and work on exciting photography projects[^<]+',
    '<b>Join</b> our creative family in Bhiloda, Gujarat — passionate storytellers who live and breathe wedding photography &amp; cinematography.'

[System.IO.File]::WriteAllText($teamPath, $team, [System.Text.UTF8Encoding]::new($false))
Write-Host "Fixed team.html"

# --- 3. Rebuild blog.html from events.html shell ---
$events = [System.IO.File]::ReadAllText((Join-Path $Root 'events.html'), [System.Text.Encoding]::UTF8)

$img1 = 'https://images.unsplash.com/photo-1606800052052-a08af834886e?w=1200&q=80'
$img2 = 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80'
$img3 = 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1200&q=80'
$img4 = 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=1200&q=80'
$img5 = 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200&q=80'

function New-BlogArticle($id, $img, $cat, $date, $title, $excerpt) {
    $slug = ($title -replace '[^a-zA-Z0-9]+', '-').Trim('-').ToLower()
    return @"
    <article id="post-$id" class="tx-blog-box mt-30 post-$id post type-post status-publish format-standard has-post-thumbnail hentry">
        <div class="st-blog-4-big-card m-0">
            <div class="card-img wa-fix wa-img-cover">
                <img width="1200" height="600" src="$img" class="img-responsive w-100 wp-post-image" alt="$title - Keyurscreation wedding blog" decoding="async" />
            </div>
            <div class="content-wrap">
                <div class="cat-x-author">
                    <div class="cat-box">
                        <a class="st-p-2 categories" href="blog.html">$cat</a>
                        <p class="st-p-2 date">$date</p>
                    </div>
                    <div class="author-x-time">
                        <div class="meta-author">
                            <h4 class="st-p-2 meta-author-name">Keyur Patel</h4>
                        </div>
                        <p class="st-p-2 meta-date">5 min read</p>
                    </div>
                </div>
                <h4 class="st-h-2 title">
                    <a href="blog.html#$slug" aria-label="$title">$title</a>
                </h4>
                <p class="st-p-2 disc">$excerpt</p>
                <a href="blog.html#$slug" aria-label="$title" class="btn-elm st-h-4">
                    Read More <span class="icon-elm"><i class="fa-solid fa-arrow-right"></i></span>
                </a>
            </div>
        </div>
    </article>
"@
}

$articles = @(
    New-BlogArticle 1 $img1 'Pre-Wedding' 'March 15, 2026' 'How to Plan Your Pre-Wedding Shoot' 'From choosing the perfect Gujarat location to coordinating outfits and timing golden hour — everything you need for a stunning pre-wedding session with Keyurscreation.'
    New-BlogArticle 2 $img2 'Wedding Locations' 'March 10, 2026' 'Top Wedding Locations in Gujarat' 'Discover breathtaking venues across Ahmedabad, Gandhinagar, Udaipur, and hidden gems near Bhiloda — perfect backdrops for your wedding photography and films.'
    New-BlogArticle 3 $img3 'Wedding Tips' 'March 5, 2026' 'Wedding Photography Checklist' 'A complete guide for couples — timeline planning, must-have shots, family group photos, ceremony coverage, and how to work with your photography team on the big day.'
    New-BlogArticle 4 $img4 'Couple Photos' 'February 28, 2026' 'Best Time for Couple Photos' 'Golden hour, monsoon romance, or winter warmth — learn when to schedule your couple portraits for the most flattering light and cinematic results.'
    New-BlogArticle 5 $img5 'Candid Photography' 'February 20, 2026' 'Why Candid Photography Matters' 'The unscripted tears, laughter, and stolen glances are what make your wedding album truly yours. Here is why we prioritize candid storytelling over posed perfection.'
)

$blogMain = @"
<div class="tx-blog-area st-blog-standard-area pt-120 pb-120 fix">
	<div class="container st-container-2">
        <div class="row">
			<div class="col-xxl-8 col-xl-8 col-lg-8">
				<div class="blog__wrapper blog-list-content mt-none-30">
$($articles -join "`n")
				</div>
			</div>
			<div class="col-xxl-4 col-xl-4 col-lg-4 mt-30 mt-lg-0">
				<div class="tx-sidebarWrapper st-blog-sidebar">
					<div class="tx-blog-widget widget st-blog-sidebar-widget headline widget_search">
						<h4 class="widget-title">Search</h4>
						<div class="search-widget">
							<form class="tx-search-widget tx-input-field st-sidebar-search" action="index.html" method="get">
								<input type="search" name="s" placeholder="Search articles..." class="st-sidebar-search-input">
								<button type="submit" aria-label="search" class="st-sidebar-search-btn"><i class="fa-solid fa-magnifying-glass"></i></button>
							</form>
						</div>
					</div>
					<div class="tx-blog-widget widget st-blog-sidebar-widget headline tx-cat-widget">
						<h4 class="widget-title">Categories</h4>
						<div class="tx-cat-widget category-widget ul-li-block st-blog-sidebar-widget">
							<ul class="tx-cat-list st-sidebar-categories">
								<li><a href="blog.html"><span class="text">Wedding Photography</span><span class="number">(12)</span></a></li>
								<li><a href="blog.html"><span class="text">Pre-Wedding</span><span class="number">(8)</span></a></li>
								<li><a href="blog.html"><span class="text">Cinematography</span><span class="number">(5)</span></a></li>
								<li><a href="blog.html"><span class="text">Wedding Tips</span><span class="number">(15)</span></a></li>
								<li><a href="blog.html"><span class="text">Gujarat Weddings</span><span class="number">(7)</span></a></li>
							</ul>
						</div>
					</div>
					<div class="tx-blog-widget widget st-blog-sidebar-widget headline">
						<h4 class="widget-title">Follow Us</h4>
						<ul class="st-sidebar-social">
							<li><a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a></li>
							<li><a href="#" aria-label="YouTube"><i class="fab fa-youtube"></i></a></li>
							<li><a href="#" aria-label="WhatsApp"><i class="fab fa-whatsapp"></i></a></li>
						</ul>
					</div>
				</div>
			</div>
        </div>
    </div>
</div>
"@

$blog = $events
$blog = $blog -replace '<title>[^<]+</title>', '<title>Wedding Photography Blog | Keyurscreation ' + $EnDash + ' Gujarat Tips &amp; Stories</title>'
$blog = $blog -replace '<meta name="description" content="[^"]*" />', '<meta name="description" content="Wedding photography tips, pre-wedding guides, Gujarat venue ideas, and candid photography insights from Keyurscreation in Bhiloda, Gujarat." />'
$blog = $blog -replace '<meta property="og:title" content="[^"]*" />', '<meta property="og:title" content="Wedding Photography Blog | Keyurscreation" />'
$blog = $blog -replace '<meta property="og:description" content="[^"]*" />', '<meta property="og:description" content="Expert wedding photography tips and stories from Keyurscreation, Bhiloda, Gujarat." />'
$blog = $blog -replace '<h1 class="st-breadcrumb-title">[^<]+</h1>', '<h1 class="st-breadcrumb-title">Wedding Blog</h1>'
$blog = $blog -replace '<li class="item taBcrumb-end"><span>[^<]+</span></li>', '<li class="item taBcrumb-end"><span>Blog</span></li>'

$blog = [regex]::Replace($blog, '(?s)<!-- breadcrumb-end -->\s*<div data-elementor-type="wp-page".*?</div>\s*</div>\s*<div data-elementor-type="wp-post"', "<!-- breadcrumb-end -->`n$blogMain`n`t`t`t`t`t`t`t`t`t`t<div data-elementor-type=`"wp-post`"", 1)

[System.IO.File]::WriteAllText((Join-Path $Root 'blog.html'), (Fix-Encoding $blog), [System.Text.UTF8Encoding]::new($false))
Write-Host "Rebuilt blog.html"

# --- 4. Events page content ---
$eventsPath = Join-Path $Root 'events.html'
$ev = [System.IO.File]::ReadAllText($eventsPath, [System.Text.Encoding]::UTF8)
$ev = $ev -replace 'Capturing Moments That Define <br> Your Events', 'Every Sacred Ritual, <br> Beautifully Captured'
$ev = $ev -replace 'Corporate Events</a>', 'Haldi Ceremony</a>'
$ev = $ev -replace 'Bangkok, Thailand', 'Bhiloda, Gujarat'
$ev = $ev -replace 'Fashion Shows</a>', 'Mehndi Ceremony</a>'
$ev = $ev -replace 'Product Launch</a>', 'Sangeet Night</a>'
$ev = $ev -replace 'Birthday Parties</a>', 'Wedding Reception</a>'
$ev = $ev -replace 'Music Concerts</a>', 'Engagement Ceremony</a>'
$ev = $ev -replace 'Art Exhibitions</a>', 'Baraat &amp; Varmala</a>'
$ev = $ev -replace 'Food Festivals</a>', 'Mandap &amp; Pheras</a>'
[System.IO.File]::WriteAllText($eventsPath, (Fix-Encoding $ev), [System.Text.UTF8Encoding]::new($false))
Write-Host "Updated events.html"

# --- 5. Contact page enhancements ---
$contactPath = Join-Path $Root 'contact.html'
$ct = [System.IO.File]::ReadAllText($contactPath, [System.Text.Encoding]::UTF8)
if ($ct -notmatch 'fab fa-whatsapp') {
    $ct = $ct -replace '(<p class="st-p-2 disc">hello@keyurscreation\.com</p>)', '$1
                        <p class="st-p-2 disc"><a href="https://wa.me/919876543210" target="_blank" rel="noopener">WhatsApp: +91 98765 43210</a></p>
                        <p class="st-p-2 disc"><a href="#" target="_blank" rel="noopener">Instagram: @keyurscreation</a></p>
                        <p class="st-p-2 disc">Mon' + $EnDash + 'Sat: 10:00 AM ' + $EnDash + ' 7:00 PM</p>'
}
if ($ct -notmatch 'google.com/maps') {
    $mapBlock = '<div class="kc-map-embed pt-60 pb-60"><div class="container st-container-2"><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3688.0!2d73.2!3d23.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sBhiloda%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1" width="100%" height="350" style="border:0;border-radius:12px;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Keyurscreation studio location in Bhiloda, Gujarat"></iframe></div></div>'
    $ct = $ct -replace '(</section>\s*<!-- breadcrumb-end -->)', ($mapBlock + '$1')
}
[System.IO.File]::WriteAllText($contactPath, (Fix-Encoding $ct), [System.Text.UTF8Encoding]::new($false))
Write-Host "Updated contact.html"

# --- 6. Booking page copy ---
$bookingPath = Join-Path $Root 'booking.html'
$bk = [System.IO.File]::ReadAllText($bookingPath, [System.Text.Encoding]::UTF8)
$bk = $bk -replace 'Book Your Photography Session', 'Book Your Wedding Photography'
$bk = $bk -replace 'Schedule your next photoshoot', 'Reserve your wedding date with Keyurscreation'
$bk = $bk -replace 'Choose a date and time that works best for you', 'Select your wedding dates and preferred package — we serve all of Gujarat'
[System.IO.File]::WriteAllText($bookingPath, (Fix-Encoding $bk), [System.Text.UTF8Encoding]::new($false))
Write-Host "Updated booking.html"

# --- 7. Portfolio page ---
$portPath = Join-Path $Root 'portfolio.html'
$pt = [System.IO.File]::ReadAllText($portPath, [System.Text.Encoding]::UTF8)
$pt = $pt -replace 'Our Selected Projects', 'Our Wedding Stories'
$pt = $pt -replace 'Explore Our Creative Portfolio', 'Real Weddings, Real Emotions Across Gujarat'
$pt = $pt -replace 'Fashion Photography', 'Wedding'
$pt = $pt -replace 'Portrait Photography', 'Pre-Wedding'
$pt = $pt -replace 'Lifestyle Photography', 'Engagement'
$pt = $pt -replace 'Travel Photography', 'Reception'
$pt = $pt -replace 'Commercial Shoots', 'Cinematography'
[System.IO.File]::WriteAllText($portPath, (Fix-Encoding $pt), [System.Text.UTF8Encoding]::new($false))
Write-Host "Updated portfolio.html"

# --- 8. Pricing page packages ---
$pricingPath = Join-Path $Root 'pricing.html'
$pr = [System.IO.File]::ReadAllText($pricingPath, [System.Text.Encoding]::UTF8)
$pr = $pr -replace '<h4 class="st-h-2 title">Basic Package</h4>', '<h4 class="st-h-2 title">Silver Package</h4>'
$pr = $pr -replace '<h4 class="st-h-2 title">Standard Package</h4>', '<h4 class="st-h-2 title">Gold Package</h4>'
$pr = $pr -replace '<h4 class="st-h-2 title">Premium Package</h4>', '<h4 class="st-h-2 title">Platinum Package</h4>'
$pr = $pr -replace '>\s*99\s*<', '> 49,999 <'
$pr = $pr -replace '>\s*249\s*<', '> 99,999 <'
$pr = $pr -replace '>\s*459\s*<', '> 1,99,999 <'
$pr = $pr -replace '/per project', '/package'
$pr = $pr -replace 'Flexible Photography Packages', 'Wedding Photography Packages'
$pr = $pr -replace 'Quick sessions &amp; personal portraits', 'Wedding Photography'
$pr = $pr -replace 'Perfect for Events &amp; small projects', 'Photography + Cinematography + Drone'
$pr = $pr -replace 'Weddings &amp; full-day coverage', 'Full Coverage + Album + Highlight Film + Teaser'
[System.IO.File]::WriteAllText($pricingPath, (Fix-Encoding $pr), [System.Text.UTF8Encoding]::new($false))
Write-Host "Updated pricing.html"

# --- 9. Fix broken themexriver URLs in JS config ---
Get-ChildItem (Join-Path $Root '*.html') | ForEach-Object {
    $c = [System.IO.File]::ReadAllText($_.FullName, [System.Text.Encoding]::UTF8)
    $orig = $c
    $c = $c -replace 'https://themexriver\.com/wp/Keyurscreation/', 'index.html'
    $c = $c -replace 'https://themexriver\.com/wp/snapture/', 'index.html'
    if ($c -ne $orig) {
        [System.IO.File]::WriteAllText($_.FullName, (Fix-Encoding $c), [System.Text.UTF8Encoding]::new($false))
        Write-Host "Fixed URLs: $($_.Name)"
    }
}

# Cleanup temp download
$rawBlog = Join-Path $Root 'blog-raw.html'
if (Test-Path $rawBlog) { Remove-Item $rawBlog -Force }

Write-Host "Done."
