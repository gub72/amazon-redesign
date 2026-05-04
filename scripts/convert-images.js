const { execSync } = require('child_process');
const path = require('path');

const conversions = [
  // bannerMain
  { input: 'public/assets/bannerMain/imagem1.jpg', output: 'public/assets/bannerMain/imagem1.webp', width: 1200 },
  { input: 'public/assets/bannerMain/imagem2.jpg', output: 'public/assets/bannerMain/imagem2.webp', width: 1200 },
  { input: 'public/assets/bannerMain/imagem3.jpg', output: 'public/assets/bannerMain/imagem3.webp', width: 1200 },
  // shelfBanner
  { input: 'public/assets/shelfBanner/shelfBanner_1.png', output: 'public/assets/shelfBanner/shelfBanner_1.webp', width: 1000 },
  { input: 'public/assets/shelfBanner/shelfBanner_casa_e_decoracao.png', output: 'public/assets/shelfBanner/shelfBanner_casa_e_decoracao.webp', width: 900 },
  { input: 'public/assets/shelfBanner/shelfBanner_moda_1.png', output: 'public/assets/shelfBanner/shelfBanner_moda_1.webp', width: 500 },
  { input: 'public/assets/shelfBanner/shelfBanner_moda_2.png', output: 'public/assets/shelfBanner/shelfBanner_moda_2.webp', width: 500 },
  { input: 'public/assets/shelfBanner/shelfBanner_A1.png', output: 'public/assets/shelfBanner/shelfBanner_A1.webp', width: 350 },
  { input: 'public/assets/shelfBanner/shelfBanner_A2.png', output: 'public/assets/shelfBanner/shelfBanner_A2.webp', width: 350 },
  { input: 'public/assets/shelfBanner/shelfBanner_A3.png', output: 'public/assets/shelfBanner/shelfBanner_A3.webp', width: 350 },
  // bannerCategory
  { input: 'public/assets/bannerCategory/banner_category_1.png', output: 'public/assets/bannerCategory/banner_category_1.webp', width: 200 },
  { input: 'public/assets/bannerCategory/banner_category_2.png', output: 'public/assets/bannerCategory/banner_category_2.webp', width: 200 },
  { input: 'public/assets/bannerCategory/banner_category_3.png', output: 'public/assets/bannerCategory/banner_category_3.webp', width: 200 },
  { input: 'public/assets/bannerCategory/banner_category_4.png', output: 'public/assets/bannerCategory/banner_category_4.webp', width: 200 },
  { input: 'public/assets/bannerCategory/banner_category_5.png', output: 'public/assets/bannerCategory/banner_category_5.webp', width: 200 },
  { input: 'public/assets/bannerCategory/banner_category_6.png', output: 'public/assets/bannerCategory/banner_category_6.webp', width: 200 },
  { input: 'public/assets/bannerCategory/banner_category_7.png', output: 'public/assets/bannerCategory/banner_category_7.webp', width: 200 },
];

conversions.forEach(({ input, output, width }) => {
  try {
    const cmd = `npx -y sharp-cli --input "${input}" --output "${output}" resize ${width} -- --quality 80`;
    console.log(`Converting: ${input} -> ${output} (w=${width})`);
    execSync(cmd, { stdio: 'inherit', cwd: process.cwd() });
    console.log(`  ✓ Done`);
  } catch (e) {
    console.error(`  ✗ Error converting ${input}: ${e.message}`);
  }
});

console.log('\nAll conversions complete!');
