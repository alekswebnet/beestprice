<template lang="pug">
.container.mx-auto.px-3(class="md:px-6")
  .flex.mt-10.flex.w-full.h-full.items-center.justify-center.flex-col(class="md:flex-row md:mt-20")
    h1.text-2xl.w-full.mb-6(class="max-w-[520px] md:text-3xl")
      | The best place to find your treasure, but only you know how... 
      | Don't waste your time, just start 
      a.text-lightblue.underline(href="/" @click.prevent="focusSearch") searching now!
    img(width="450" src="/img/undraw_treasure_of-9-i.svg")
</template>

<script setup>
const focusSearch = () => document.querySelector('[name=search]').focus()
</script>

