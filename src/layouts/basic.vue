<template>
  <header>
    <h1>Header</h1>
  </header>
  <main>
    <router-view></router-view>
  </main>
  <footer>
    <h1>Footer</h1>
  </footer>
</template>

<style scoped>
header {
  border-bottom: 1px solid skyblue;
}
footer {
  border-top: 1px solid skyblue;
}
</style>
