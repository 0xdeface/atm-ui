<template>
  <div class="home">
    <Docs/>
  </div>
</template>

<script>
// @ is an alias to /src
import Docs from '@/components/Docs.vue'

export default {
  name: 'Home',
  components: {
    Docs
  }
}
</script>
