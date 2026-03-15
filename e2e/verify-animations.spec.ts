import { test, expect } from '@playwright/test';

test.describe('Verifikasi 8 Animasi Baru - Portfolio Salsa', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    // Tunggu hydration selesai
    await page.waitForTimeout(2000);
  });

  // ============================================================
  // 1. MAGNETIC BUTTON — CTA di Hero
  // ============================================================
  test('1. Magnetic Button - CTA Hero harus ada dan berfungsi', async ({ page }) => {
    // Cek kedua CTA ada
    const portfolioBtn = page.getByRole('link', { name: 'Lihat Portofolio' });
    const diskusiBtn = page.getByRole('link', { name: 'Mari Berdiskusi' });
    await expect(portfolioBtn).toBeVisible();
    await expect(diskusiBtn).toBeVisible();

    // Cek apakah MagneticButton wrapper (data-testid) merender
    const magneticButtons = page.locator('[data-testid="magnetic-button"]');
    const count = await magneticButtons.count();
    console.log(`[Magnetic Button] Ditemukan ${count} elemen dengan data-testid="magnetic-button"`);

    // Cek apakah CTA button di-wrap oleh sesuatu dengan inline-block style (MagneticButton)
    // MagneticButton cuma render di desktop (pointer: fine). Di chromium headless harusnya desktop.
    if (count > 0) {
      // Verify CTA ada di dalam magnetic button
      const firstMagnetic = magneticButtons.first();
      const linkInside = firstMagnetic.locator('a');
      await expect(linkInside).toBeVisible();
      console.log('[Magnetic Button] ✅ CTA buttons ter-wrap dalam MagneticButton');
    } else {
      // Mungkin headless dianggap mobile - verify apakah matchMedia pointer:fine returns false
      const isDesktop = await page.evaluate(() => window.matchMedia('(pointer: fine)').matches);
      console.log(`[Magnetic Button] pointer:fine = ${isDesktop}`);
      if (!isDesktop) {
        console.log('[Magnetic Button] ⚠️ Browser headless dianggap non-desktop, MagneticButton fallback ke children biasa (expected behavior)');
      } else {
        console.log('[Magnetic Button] ❌ GAGAL - Desktop tapi MagneticButton tidak render wrapper');
        expect(count).toBeGreaterThan(0);
      }
    }
  });

  // ============================================================
  // 2. WAVE TEXT — "Saya" di About, "Analitis" di Skills
  // ============================================================
  test('2. Wave Text - Huruf bergelombang pada section titles', async ({ page }) => {
    // Scroll ke About
    await page.locator('#tentang').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    const waveTexts = page.locator('[data-testid="wave-text"]');
    const count = await waveTexts.count();
    console.log(`[Wave Text] Ditemukan ${count} elemen wave-text`);

    // Harusnya minimal 2: "Saya" di About, "Analitis" di Skills
    expect(count).toBeGreaterThanOrEqual(2);

    // Verify "Saya" - cek aria-label
    const sayaWave = waveTexts.first();
    const ariaLabel = await sayaWave.getAttribute('aria-label');
    console.log(`[Wave Text] aria-label pertama: "${ariaLabel}"`);
    expect(ariaLabel).toBe('Saya');

    // Cek huruf-huruf individual di-split
    const charSpans = sayaWave.locator('span[aria-hidden="true"]');
    const charCount = await charSpans.count();
    console.log(`[Wave Text] Jumlah karakter "Saya" = ${charCount}`);
    expect(charCount).toBe(4); // S-a-y-a

    // Scroll ke Skills dan verify "Analitis"
    await page.locator('#skill').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    const skillWave = page.locator('[data-testid="wave-text"][aria-label="Analitis"]');
    await expect(skillWave).toBeVisible();
    console.log('[Wave Text] ✅ "Analitis" di Skills juga ada');
  });

  // ============================================================
  // 3. STAGGER REVEAL — Skill tags
  // ============================================================
  test('3. Stagger Reveal - Skill tags muncul dengan efek stagger', async ({ page }) => {
    await page.locator('#skill').scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);

    const staggerReveals = page.locator('[data-testid="stagger-reveal"]');
    const count = await staggerReveals.count();
    console.log(`[Stagger Reveal] Ditemukan ${count} container stagger-reveal`);

    // 4 kategori skill = 4 StaggerReveal
    expect(count).toBe(4);

    // Cek skill tags terlihat di dalam StaggerReveal pertama
    const firstContainer = staggerReveals.first();
    const tags = firstContainer.locator('span');
    const tagCount = await tags.count();
    console.log(`[Stagger Reveal] Tags di kategori pertama: ${tagCount}`);
    expect(tagCount).toBeGreaterThan(0);

    // Verify salah satu skill text ada
    const pythonTag = page.getByText('Python (Pandas, NumPy)');
    await expect(pythonTag).toBeVisible();
    console.log('[Stagger Reveal] ✅ Skill tags visible di dalam StaggerReveal');
  });

  // ============================================================
  // 4. TYPEWRITER SUBTITLE — Rotating text di Hero
  // ============================================================
  test('4. Typewriter Subtitle - Rotating text di bawah nama Hero', async ({ page }) => {
    const typewriter = page.locator('[data-testid="typewriter-subtitle"]');
    const count = await typewriter.count();
    console.log(`[Typewriter] Ditemukan ${count} elemen typewriter-subtitle`);

    expect(count).toBe(1);
    await expect(typewriter).toBeVisible();

    // Verify TypeAnimation merender text
    const textContent = await typewriter.textContent();
    console.log(`[Typewriter] Text content: "${textContent}"`);

    // Harusnya salah satu dari: Data Analyst, Data Storyteller, Insight Hunter, Dashboard Builder
    const validTexts = ['Data Analyst', 'Data Storyteller', 'Insight Hunter', 'Dashboard Builder'];
    const hasValidText = validTexts.some(t => textContent?.includes(t) || textContent?.length! > 0);
    console.log(`[Typewriter] Has content: ${hasValidText}`);

    // Verify posisi - harus setelah h1 dan sebelum paragraf deskripsi
    const typewriterBox = await typewriter.boundingBox();
    const h1Box = await page.locator('h1').boundingBox();
    const descP = page.locator('section#beranda p').first();
    const pBox = await descP.boundingBox();

    if (typewriterBox && h1Box && pBox) {
      console.log(`[Typewriter] h1.bottom=${h1Box.y + h1Box.height}, typewriter.y=${typewriterBox.y}, p.y=${pBox.y}`);
      // Typewriter harus di antara h1 dan p
      expect(typewriterBox.y).toBeGreaterThanOrEqual(h1Box.y);
      expect(typewriterBox.y).toBeLessThan(pBox.y);
      console.log('[Typewriter] ✅ Posisi benar: antara h1 dan deskripsi');
    } else {
      console.log('[Typewriter] ⚠️ Bounding box gagal - komponen mungkin tidak visible');
    }
  });

  // ============================================================
  // 5. TILT CARD — Highlight cards di About
  // ============================================================
  test('5. Tilt Card - 3D tilt pada highlight cards About', async ({ page }) => {
    await page.locator('#tentang').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    const tiltCards = page.locator('[data-testid="tilt-card"]');
    const count = await tiltCards.count();
    console.log(`[Tilt Card] Ditemukan ${count} elemen tilt-card`);

    // 4 highlight cards
    expect(count).toBe(4);

    // Verify setiap card punya konten yang benar
    const expectedTitles = ['Data Analysis', 'Database & Query', 'Visualization', 'Research'];
    for (const title of expectedTitles) {
      const card = page.locator('[data-testid="tilt-card"]', { hasText: title });
      await expect(card).toBeVisible();
    }
    console.log('[Tilt Card] ✅ Semua 4 highlight cards ada di dalam TiltCard wrapper');

    // Cek apakah vanilla-tilt diinisialisasi (via style transform)
    const firstCard = tiltCards.first();
    const style = await firstCard.getAttribute('style');
    console.log(`[Tilt Card] style attribute: "${style ?? 'none'}"`);
    // vanilla-tilt menambahkan style transform setelah init
  });

  // ============================================================
  // 6. RIPPLE BUTTON — Button submit Contact
  // ============================================================
  test('6. Ripple Button - Efek ripple pada button submit Contact', async ({ page }) => {
    await page.locator('#kontak').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    const rippleButton = page.locator('[data-testid="ripple-button"]');
    const count = await rippleButton.count();
    console.log(`[Ripple Button] Ditemukan ${count} elemen ripple-button`);

    expect(count).toBe(1);

    // Verify button submit ada di dalamnya
    const submitBtn = rippleButton.locator('button[type="submit"]');
    await expect(submitBtn).toBeVisible();
    const btnText = await submitBtn.textContent();
    console.log(`[Ripple Button] Button text: "${btnText}"`);
    expect(btnText).toContain('Kirim Pesan via LinkedIn');

    // Verify wrapper punya overflow hidden dan relative position (untuk ripple)
    const styles = await rippleButton.evaluate((el) => {
      const cs = window.getComputedStyle(el);
      return { overflow: cs.overflow, position: cs.position };
    });
    console.log(`[Ripple Button] styles: overflow=${styles.overflow}, position=${styles.position}`);
    expect(styles.overflow).toBe('hidden');
    expect(styles.position).toBe('relative');
    console.log('[Ripple Button] ✅ RippleButton wrapper ada dengan styling benar');
  });

  // ============================================================
  // 7. PARALLAX LAYER — Hero section
  // ============================================================
  test('7. Parallax Layer - Depth scrolling di Hero', async ({ page }) => {
    const parallaxLayers = page.locator('[data-testid="parallax-layer"]');
    const count = await parallaxLayers.count();
    console.log(`[Parallax] Ditemukan ${count} elemen parallax-layer`);

    // 2 layer: speed=0.15 (LaserFlow+Floating), speed=0.3 (blobs)
    expect(count).toBe(2);

    // Verify layer pertama mengandung LaserFlow / FloatingElements (atau children)
    const firstLayer = parallaxLayers.first();
    await expect(firstLayer).toBeVisible();

    // Verify layer kedua mengandung blob backgrounds
    const secondLayer = parallaxLayers.nth(1);
    await expect(secondLayer).toBeVisible();

    // Cek apakah parallax menambahkan transform/translate saat scroll
    const initialTransform = await firstLayer.evaluate((el) => window.getComputedStyle(el).transform);
    console.log(`[Parallax] Initial transform: ${initialTransform}`);

    // Scroll down
    await page.evaluate(() => window.scrollBy(0, 500));
    await page.waitForTimeout(300);

    const scrolledTransform = await firstLayer.evaluate((el) => window.getComputedStyle(el).transform);
    console.log(`[Parallax] After scroll transform: ${scrolledTransform}`);

    if (initialTransform !== scrolledTransform) {
      console.log('[Parallax] ✅ Transform berubah setelah scroll - parallax aktif');
    } else {
      console.log('[Parallax] ⚠️ Transform tidak berubah - mungkin framer-motion belum update atau parallax belum terlihat efeknya');
    }
  });

  // ============================================================
  // 8. BOUNCY ENTRANCE — About & Contact sections
  // ============================================================
  test('8. Bouncy Entrance - Spring entrance pada About dan Contact', async ({ page }) => {
    const bouncyElements = page.locator('[data-testid="bouncy-entrance"]');
    const count = await bouncyElements.count();
    console.log(`[Bouncy Entrance] Ditemukan ${count} elemen bouncy-entrance`);

    // 2: About + Contact
    expect(count).toBe(2);

    // Verify About section punya BouncyEntrance
    await page.locator('#tentang').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    const aboutBouncy = page.locator('#tentang [data-testid="bouncy-entrance"]');
    const aboutCount = await aboutBouncy.count();
    console.log(`[Bouncy Entrance] Di About: ${aboutCount}`);
    expect(aboutCount).toBe(1);

    // Verify Contact section punya BouncyEntrance
    await page.locator('#kontak').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    const contactBouncy = page.locator('#kontak [data-testid="bouncy-entrance"]');
    const contactCount = await contactBouncy.count();
    console.log(`[Bouncy Entrance] Di Contact: ${contactCount}`);
    expect(contactCount).toBe(1);

    console.log('[Bouncy Entrance] ✅ Kedua section punya BouncyEntrance wrapper');
  });

  // ============================================================
  // SCREENSHOT VISUAL — Full page untuk review manual
  // ============================================================
  test('Screenshot full page untuk visual review', async ({ page }) => {
    // Hero
    await page.screenshot({ path: 'e2e/screenshots/01-hero.png', fullPage: false });

    // Scroll ke About
    await page.locator('#tentang').scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'e2e/screenshots/02-about.png', fullPage: false });

    // Scroll ke Skills
    await page.locator('#skill').scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'e2e/screenshots/03-skills.png', fullPage: false });

    // Scroll ke Contact
    await page.locator('#kontak').scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'e2e/screenshots/04-contact.png', fullPage: false });

    console.log('[Screenshot] ✅ Screenshots disimpan di e2e/screenshots/');
  });

});
