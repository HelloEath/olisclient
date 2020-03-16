<template>
    <div class="search-bar" @keyup.enter="search">
        <el-row class="search-bar">
            <slot name="searchForm"></slot>
        </el-row>
        <el-row class="button-bar">
          <el-button 
              type="primary" 
              size="small" 
              class="button-item"
              v-if="elItemLength > 3"
              @click="toggle">
              {{showMore?'收起':'更多'}}
              <i 
                :class="showMore?'el-icon-arrow-up':'el-icon-arrow-down'" 
                class="el-icon--right">
              </i>
          </el-button>
          <el-button
              type="primary" 
              size="small"
              class="button-item"
              v-if="searchType != 'noSearch'"
              @click="reset">
              重置<i class="el-icon-refresh el-icon--right"></i>
          </el-button>
          <el-button
              type="primary" 
              size="small" 
              class="button-item"
              v-if="searchType != 'noSearch'"
              @click="search">
              查询<i class="el-icon-search el-icon--right"></i>
          </el-button>
          <el-button
              type="primary" 
              size="small" 
              class="button-item"
              v-if="searchType != 'noSearch' && needDel"
              @click="del">
              删除<i class="el-icon-delete el-icon--right"></i>
          </el-button>
        </el-row>
        <el-row class="button-bar fun">
          <slot name="funBtn"></slot>
        </el-row>
    </div>
</template>
<script>
    export default {
    name: 'search-bar',
    props: {
      searchType: {
        type: String,
        default: 'search'
      },
      needDel:{
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        showMore: false,
        elItemLength: ''
      }
    },
    mounted() {
      this.elItemLength = document.getElementsByClassName('el-form-item').length
    },
    methods: {
        toggle() {
            this.showMore = !this.showMore;
            this.$emit('toggle', this.showMore);
        },
        reset() {
            this.$emit('reset');
        },
        search() {
            this.$emit('search');
        },
        del() {
            this.$emit('del');
        }
    }
}
</script>