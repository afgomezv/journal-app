<template>
  <div
    class="entry-container mb-3 p-2 pointer"
    @click="$router.push({ name: 'entry', params: { id: 10 } })"
  >
    <div class="entry-file d-flex">
      <span class="text-success fs-5 fw-bold">16</span>
      <span class="mx-1 fs-5">Mayo</span>
      <span class="mx-2 fw-light">2022, lunes</span>
    </div>
    <div class="entry-description">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium nobis
      ullam assumenda eaque debitis pariatur quo autem, accusamus officiis dicta
      odio et omnis ea voluptatibus laborum necessitatibus dolor explicabo
      delectus!
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style  lang='scss' scoped>
.entry-container {
  border-bottom: 1px solid #2c3e50;
  transition: 0.2 all ease-in;

  &:hover {
    background-color: lighten($color: grey, $amount: 45);
    transition: 0.2 all ease-in;
  }

  .entry-description {
    font-size: 12px;
  }
}
</style>