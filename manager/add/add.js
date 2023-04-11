Vue.component('add', {
    template: '#add-template',
    data() {
      return {
        show: false,
        content: ''
      }
    },
    methods: {
      openAdd() {
        this.show = true
      },
      closeAdd() {
        this.show = false
        this.$emit('close')
      },
      confirm() {
        this.$emit('confirm', this.content)
        this.closeAdd()
      }
    },
    mounted() {
      this.$parent.$on('showAdd', this.showAdd)
    },
    beforeDestroy() {
      this.$parent.$off('showAdd', this.showAdd)
    }
  })
  