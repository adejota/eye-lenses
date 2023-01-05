<template>
  <component :is="name" v-bind="$props" />
</template>

<script>
import GitHub from './GitHub.vue'
import Logout from './Logout.vue'
import ArrowLeft from './ArrowLeft.vue'
import ArrowRight from './ArrowRight.vue'
import Trash from './Trash.vue'
import AdjustmentsHorizontal from './AdjustmentsHorizontal.vue'

export default {
  components: {
    GitHub,
    Logout,
    ArrowLeft,
    ArrowRight,
    Trash,
    AdjustmentsHorizontal
  },

  props: {
    name: { type: String, required: true }
  }
}
</script>
