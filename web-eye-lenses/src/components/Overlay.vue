<template>
  <div v-if="showOverlay"
    @click="$emit('handleShowOverlay', false)"
    class="absolute top-0 right-0 bottom-0 left-0 bg-full-black opacity-70 z-50 flex items-end justify-center"
  >
    <div class="bg-mid-black py-8 px-4 w-full rounded-t-xl">
      <button
        @click="$emit('handleShowOverlay', false)"
        class="block w-full border text-primary py-2 px-4 rounded"
      >
        Cancelar
      </button>

      <button v-for="btn in buttons" :key="btn.name"
        @click="$emit('handleCbFunction', btn.callback)"
        class="block w-full py-2 px-4 border rounded mt-6"
        :class="btn.loading ? 'cursor-not-allowed text-low-black border border-low-black' : `text-${btn.color} border-${btn.color}`"
        :disabled="btn.loading"
      >
        {{ btn.loading ? btn.loadingText : btn.text }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Overlay',

  props: {
    showOverlay: { type: Boolean, required: true },
    showCancel: { type: Boolean, required: true },
    buttons: { type: Array, required: true }
  }
}
</script>

