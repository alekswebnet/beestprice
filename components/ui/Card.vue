<template lang="pug">
.flex.bg-white.p-3.rounded-lg.shadow-md(class="hover:shadow-xl md:p-6")
  .mr-3.flex.items-center.justify-center(class="w-[100px] mh-[100px] md:hidden")
    slot(name="thumbnail")
  .flex-1.flex.flex-col
    h2.font-bold.mb-3(class="md:mb-5")
      slot(name="title")
    .pb-5.hidden(class="md:block")
      slot(name="thumbnail")
    .mb-5.hidden(class="md:block")
      .mb-1.text-gray-500 Relevation: {{ Math.round(($attrs.rating || 0) * 100) }}%
      .bg-gray-400.w-full.h-3.rounded-lg.overflow-hidden
        .bg-darkblue.h-full.rounded-lg.shadow-md(:style="{ width: `${Math.round(($attrs.rating || 0) * 100)}%` }")
    .flex.items-center.flex-1
      h3.text-2xl.text-lightblue.mr-auto(class="md:text-3xl")
        slot(name="price")
        span &nbsp;₴
      slot(name="store")
</template>