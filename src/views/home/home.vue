<template>
    <div class="welcome-index">
      <home-index-entry></home-index-entry>
    </div>
</template>
<script>
import homeIndexEntry from './home_index_entry'

export default{
    name:"welcomeIndex",
    components:{
        homeIndexEntry
    },
    data () {
        return {
            
        }
    },
    mounted() {
      },
    methods: {
  	}
}
</script>
<style lang="scss" scoped>
	.welcome-index {
		width:100%;
    background: #fff;
    padding: 10px;
	}
</style>
