<template lang="pug">
a(
  role="button"
  class=`bg-orange-500 
    tracking-wide 
    text-white 
    sm:font-semibold
    rounded 
    md:border-b-2
    border-orange-600 
    hover:border-orange-500 
    hover:bg-orange-600 
    hover:text-white 
    shadow-md 
    py-2 px-6 
    inline-flex 
    items-center
    justify-center`
)
  slot
</template>