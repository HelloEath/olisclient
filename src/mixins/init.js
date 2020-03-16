import { mapActions } from 'vuex'
import { setStore, isStore, getStore } from '@/common/utils'
export default {
  created() {
    this.fetchData();
  },
  methods: {
    ...mapActions([
      'getMenus',
      'getCurrentUser',
      'getSystemParams',
    ]),
    fetchData(){
      //一些需要初次访问拿取的初始化数据
      this.getCurrentUser();
      this.getMenus();
     // this.getRegions();
      this.getSystemParams();
      //this.getYears();
    }
  }
}
