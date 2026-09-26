// Central demo-data boundary for the authenticated workspace.
// Replace this module with API adapters when backend endpoints are ready; the UI
// intentionally does not embed placeholder records in its components.

export const connectedChannels = [
  { id: 'instagram', name: 'Instagram', handle: '@adcraft.studio', connected: true, color: 'pink', detail: 'Posts, stories and reels' },
  { id: 'facebook', name: 'Facebook', handle: 'Adcraft Studio', connected: true, color: 'blue', detail: 'Page, feed and reels' },
  { id: 'tiktok', name: 'TikTok', handle: '@adcraft', connected: true, color: 'dark', detail: 'Short-form video' },
  { id: 'linkedin', name: 'LinkedIn', handle: 'Adcraft', connected: false, color: 'sky', detail: 'Company Page and profile' },
]

export const metaConnection = {
  connected: true,
  userName: 'Alex Morgan',
  businessName: 'Adcraft Studio',
  connectedAt: 'Sep 12, 2026',
  expiresAt: 'Nov 11, 2026',
  leadDelivery: true,
  account: { id: 'act_240983120', name: 'Adcraft Growth', currency: 'USD', status: 'Ready for ads' },
  page: { id: 'page_83413', name: 'Adcraft Studio' },
}

export const contentVariants = [
  { id: 'variant-1', angle: 'Energy in motion', theme: 'MOVE / WITH PURPOSE', caption: 'The best ideas rarely arrive while standing still. Here is your reminder to make the first move, learn in public, and build momentum one brave step at a time.', hashtags: ['BuildInPublic', 'CreativeMomentum', 'Adcraft'], palette: 'lime' },
  { id: 'variant-2', angle: 'Quiet confidence', theme: 'LESS / BUT BETTER', caption: 'Less noise. More intention. We are building campaigns that feel considered, human, and impossible to scroll past.', hashtags: ['BrandDesign', 'MarketingIdeas', 'MadeWithAdcraft'], palette: 'blue' },
  { id: 'variant-3', angle: 'Behind the work', theme: 'IDEAS / IN PROGRESS', caption: 'A small look behind the curtain: rough ideas, honest iteration, and the tiny decisions that turn a first draft into work worth sharing.', hashtags: ['BehindTheScenes', 'CreativeProcess', 'SocialContent'], palette: 'orange' },
]

export const contentRecords = [
  { id: 1, title: 'Friday founder note', caption: 'Three lessons from a week of building in public.', status: 'scheduled', format: 'Post', platforms: ['Instagram', 'LinkedIn'], date: '2026-09-28', time: '6:00 PM', palette: 'pink', source: 'AI' },
  { id: 2, title: 'Move with purpose', caption: 'The best ideas rarely arrive while standing still.', status: 'published', format: 'Reel', platforms: ['Instagram', 'TikTok'], date: '2026-09-24', time: '12:30 PM', palette: 'lime', source: 'AI' },
  { id: 3, title: 'Behind the blend', caption: 'What goes into a better morning, from bean to first sip.', status: 'scheduled', format: 'Reel', platforms: ['TikTok'], date: '2026-09-30', time: '8:30 PM', palette: 'orange', source: 'AI' },
  { id: 4, title: 'Autumn product edit', caption: 'The pieces we keep reaching for as the weather turns.', status: 'draft', format: 'Carousel', platforms: ['Instagram', 'Facebook'], date: null, time: null, palette: 'blue', source: 'Manual' },
  { id: 5, title: 'Customer spotlight', caption: 'Meet the team who turned one clear idea into a growing community.', status: 'published', format: 'Post', platforms: ['Facebook', 'LinkedIn'], date: '2026-09-21', time: '10:00 AM', palette: 'violet', source: 'AI' },
  { id: 6, title: 'Weekend offer', caption: 'A little something for the people who have been with us since day one.', status: 'failed', format: 'Story', platforms: ['Instagram'], date: '2026-09-20', time: '5:30 PM', palette: 'red', source: 'Manual' },
]

export const calendarContent = [
  ...contentRecords.filter((item) => item.date),
  { id: 7, title: 'Quick tip carousel', status: 'scheduled', format: 'Carousel', platforms: ['Instagram'], date: '2026-10-02', time: '11:00 AM', palette: 'blue' },
  { id: 8, title: 'Monthly recap', status: 'scheduled', format: 'Post', platforms: ['LinkedIn'], date: '2026-10-05', time: '9:00 AM', palette: 'violet' },
]

export const campaigns = [
  { id: 'cmp-1048', name: 'Summer Movement', objective: 'Leads', status: 'active', delivery: 'Healthy', spend: 1240.32, impressions: 80412, clicks: 2871, leads: 148, cpl: 8.38, ctr: 3.57, budget: 45, updated: '18 min ago', palette: 'lime' },
  { id: 'cmp-1047', name: 'Cold Brew Launch', objective: 'Leads', status: 'learning', delivery: 'Learning', spend: 876.1, impressions: 58104, clicks: 1742, leads: 91, cpl: 9.63, ctr: 3, budget: 38, updated: '1 hr ago', palette: 'orange' },
  { id: 'cmp-1039', name: 'The Fall Edit', objective: 'Awareness', status: 'active', delivery: 'Healthy', spend: 522.44, impressions: 43180, clicks: 1080, leads: 64, cpl: 8.16, ctr: 2.5, budget: 30, updated: '3 hrs ago', palette: 'blue' },
  { id: 'cmp-1028', name: 'Daily Dew Retargeting', objective: 'Sales', status: 'paused', delivery: 'Paused', spend: 202.18, impressions: 16204, clicks: 412, leads: 24, cpl: 8.42, ctr: 2.54, budget: 20, updated: 'Yesterday', palette: 'pink' },
  { id: 'cmp-1012', name: 'Studio Consultation', objective: 'Leads', status: 'completed', delivery: 'Completed', spend: 684.7, impressions: 49311, clicks: 1392, leads: 72, cpl: 9.51, ctr: 2.82, budget: 35, updated: 'Sep 18', palette: 'violet' },
]

export const leadRecords = [
  { id: 'lead-301', name: 'Maya Thompson', email: 'maya@example.com', phone: '+1 415 555 0139', campaign: 'Summer Movement', status: 'new', received: '12 min ago', source: 'Instagram Feed', timeline: 'Within 30 days' },
  { id: 'lead-300', name: 'Noah Williams', email: 'noah@example.com', phone: '+1 646 555 0192', campaign: 'Summer Movement', status: 'contacted', received: '48 min ago', source: 'Facebook Feed', timeline: 'This quarter' },
  { id: 'lead-299', name: 'Sophia Garcia', email: 'sophia@example.com', phone: '+1 312 555 0108', campaign: 'Cold Brew Launch', status: 'qualified', received: '2 hrs ago', source: 'Instagram Story', timeline: 'Immediately' },
  { id: 'lead-298', name: 'Ethan Chen', email: 'ethan@example.com', phone: '+1 206 555 0171', campaign: 'The Fall Edit', status: 'new', received: '4 hrs ago', source: 'Facebook Feed', timeline: 'Just researching' },
  { id: 'lead-297', name: 'Olivia Brown', email: 'olivia@example.com', phone: '+1 917 555 0156', campaign: 'Summer Movement', status: 'closed', received: 'Yesterday', source: 'Instagram Feed', timeline: 'Within 30 days' },
  { id: 'lead-296', name: 'Liam Davis', email: 'liam@example.com', phone: '+1 303 555 0114', campaign: 'Studio Consultation', status: 'qualified', received: 'Yesterday', source: 'Facebook Feed', timeline: 'This quarter' },
]

export const adCopyVariants = [
  { id: 'copy-1', angle: 'Benefit-led', headline: 'Move with purpose this summer', primary: 'Made for mornings that turn into adventures. Meet the lightweight collection designed to move with you.', cta: 'SIGN_UP', selected: true },
  { id: 'copy-2', angle: 'Social proof', headline: 'The collection everyone is moving in', primary: 'Join thousands choosing lighter layers, considered details, and all-day comfort. Your next favorite fit is here.', cta: 'LEARN_MORE', selected: true },
  { id: 'copy-3', angle: 'Curiosity', headline: 'What if comfort looked this good?', primary: 'We rebuilt the essentials around how your day actually moves. See what changed in the new Summer Movement edit.', cta: 'SHOP_NOW', selected: false },
]

export const adCreativeVariants = [
  { id: 'creative-1', name: 'Movement study', kind: 'AI styled', palette: 'lime', selected: true, theme: 'MOVE / WITH PURPOSE' },
  { id: 'creative-2', name: 'Editorial product', kind: 'Brand asset', palette: 'blue', selected: true, theme: 'LIGHT / BY DESIGN' },
  { id: 'creative-3', name: 'Warm lifestyle', kind: 'AI styled', palette: 'orange', selected: false, theme: 'MADE / FOR MORE' },
]

export const optimizationRecommendations = [
  { id: 'opt-1', type: 'budget', title: 'Scale Summer Movement by 12%', body: 'Cost per lead is 18% below target with stable delivery over the last seven days.', impact: '+19–27 leads', confidence: 'High', selected: true },
  { id: 'opt-2', type: 'pause', title: 'Pause underperforming Story ad', body: 'This creative spent $84 with a cost per lead 2.4× above the ad set average.', impact: 'Save ~$126/mo', confidence: 'High', selected: true },
  { id: 'opt-3', type: 'creative', title: 'Refresh Cold Brew creative', body: 'Frequency reached 3.8 and click-through rate declined for five consecutive days.', impact: 'Reduce fatigue', confidence: 'Medium', selected: false },
  { id: 'opt-4', type: 'audience', title: 'Broaden the Fall Edit audience', body: 'The current audience is nearing saturation while adjacent interests show lower CPM.', impact: 'Reach +41K', confidence: 'Medium', selected: false },
]

export const optimizationHistory = [
  { id: 1, action: 'Budget increased 10%', target: 'Summer Movement', by: 'Adcraft automation', date: 'Sep 25, 2:10 AM', undone: false },
  { id: 2, action: 'Ad paused', target: 'Cold Brew · Story 02', by: 'Alex Morgan', date: 'Sep 23, 4:42 PM', undone: false },
  { id: 3, action: 'Placement removed', target: 'The Fall Edit · Audience 01', by: 'Adcraft automation', date: 'Sep 22, 2:10 AM', undone: true },
]

export const assetLibrary = [
  { id: 'asset-1', name: 'Movement study', folder: 'Summer launch', kind: 'Generated', palette: 'lime', theme: 'MOVE / WITH PURPOSE' },
  { id: 'asset-2', name: 'Light by design', folder: 'Summer launch', kind: 'Generated', palette: 'blue', theme: 'LIGHT / BY DESIGN' },
  { id: 'asset-3', name: 'Morning ritual', folder: 'Cold brew', kind: 'Uploaded', palette: 'orange', theme: 'START / FRESH' },
  { id: 'asset-4', name: 'Daily dew', folder: 'Skincare', kind: 'Generated', palette: 'pink', theme: 'GOOD / SKIN DAYS' },
  { id: 'asset-5', name: 'Autumn objects', folder: 'Fall edit', kind: 'Generated', palette: 'violet', theme: 'LESS / BUT BETTER' },
  { id: 'asset-6', name: 'Founder portrait', folder: 'Brand', kind: 'Uploaded', palette: 'mono', theme: 'BUILD / IN PUBLIC' },
]

export const campaignTemplates = [
  { id: 'template-1', name: 'Local lead engine', description: 'High-intent local audience, qualifying lead form, and two proof-led ad angles.', uses: 7, copies: 3, images: 2, budget: 35 },
  { id: 'template-2', name: 'Product launch sprint', description: 'Fourteen-day launch plan with warm retargeting and creative fatigue checks.', uses: 4, copies: 4, images: 3, budget: 50 },
  { id: 'template-3', name: 'Consultation bookings', description: 'Service-led campaign with timeline and budget qualifying questions.', uses: 11, copies: 2, images: 2, budget: 30 },
]

export const overviewMetrics = [
  { label: 'Ad spend', value: '$2,840', delta: '+12.4%', icon: 'wallet', tone: 'lime' },
  { label: 'Impressions', value: '184.2K', delta: '+18.2%', icon: 'eye', tone: 'blue' },
  { label: 'New leads', value: '327', delta: '+24.1%', icon: 'users', tone: 'pink' },
  { label: 'Content published', value: '42', delta: '+8 this month', icon: 'send', tone: 'orange' },
]

const clone = (value) => JSON.parse(JSON.stringify(value))
const delay = (ms) => new Promise((resolve) => window.setTimeout(resolve, ms))

// Async method signatures mirror the eventual network layer.
export const dashboardMockService = {
  async generateContent() { await delay(1450); return clone(contentVariants) },
  async rewriteCaption(caption, tone) { await delay(650); return `${caption.replace(/[.!]?$/, '')}. Written with a ${tone.toLowerCase()} point of view.` },
  async createCampaignPlan() { await delay(1800); return { name: 'Summer Movement · Lead Campaign', copies: clone(adCopyVariants), creatives: clone(adCreativeVariants) } },
  async launchCampaign() { await delay(1600); return { campaignId: '120209884132', adSetId: '120209884177', leadFormId: '8042199302', ads: 4 } },
  async applyOptimizations(ids) { await delay(700); return { applied: ids } },
  async save() { await delay(350); return { ok: true } },
}
