#!/bin/bash
cat src/features/Event/Pages/EventDetailPage.tsx \
| sed -e 's/className="flex items-start gap-4"/className="flex items-start gap-3 sm:gap-4"/g' \
| sed -e 's/className="flex gap-4 sm:gap-8 overflow-x-auto no-scrollbar border-b border-white\/10 mb-8 relative"/className="flex gap-4 sm:gap-8 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] border-b border-white\/10 mb-6 sm:mb-8 relative px-1"/g' \
| sed -e 's/className="mt-10 lg:mt-16 w-full max-w-7xl mx-auto py-16 sm:py-24"/className="mt-8 lg:mt-16 w-full max-w-7xl mx-auto py-12 sm:py-24"/g' \
| sed -e 's/className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start"/className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start"/g' \
| sed -e 's/className="lg:col-span-8 flex flex-col pb-24 min-h-\[600px\]"/className="lg:col-span-8 flex flex-col pb-16 min-h-[400px] sm:min-h-[600px]"/g' \
> src/features/Event/Pages/EventDetailPage.tmp
mv src/features/Event/Pages/EventDetailPage.tmp src/features/Event/Pages/EventDetailPage.tsx
