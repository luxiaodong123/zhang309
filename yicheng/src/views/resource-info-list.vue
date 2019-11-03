<!--  -->
<template>
  <div class="u-dtcz-body">
    <div class="u-item"
         v-for="(item, index) in linkArr"
         :key="index">
      <template v-if="item.total == 1">
        <div class="u-prod"
             @click="goTo(item)">
          <p class="name">{{item.name}}</p>
          <span class="arrow"></span>
        </div>
      </template>
      <template v-else>
        <div class="u-prod"
             @click="ctrlDown(item)">
          <p class="name">{{item.name}}</p>
          <span class="arrow"
                :class="[item.isDown ? 'down' : '']"></span>
        </div>
        <template v-if="item.isDown">
          <div class="u-link"
               v-for="(link, idx) in item.linkArr"
               :key="idx"
               @click="goTo(link)">
            <p class="name">{{link.name}}</p>
            <span class="arrow"></span>
          </div>
        </template>
      </template>
    </div>
  </div>
</template>

<script>
import controlStorage from '@js/storage'
export default {
  data() {
    return {
      linkArr: [],
      resourceType: ''
    };
  },

  components: {},

  computed: {
  },

  created() {
    let resourceInfo = controlStorage('resourceInfo');
    this.resourceType = resourceInfo.resourceType;
    this.linkArr = [...resourceInfo.linkArr];
    switch (this.resourceType) {
      case 'act':
        document.title = '电投操作'
        break;
      case 'sale':
        document.title = '销售加油站'
        break;
      case 'broker':
        document.title = '保险经纪'
        break;
      case 'prod':
        document.title = '保险产品'
        break;
      default:
        break;
    }
  },

  mounted() {
  },

  methods: {
    goTo(item) {
      window.location.href = item.link;
    },
    ctrlDown(item) {
      item.isDown = !item.isDown;
    }
  }
}

</script>
<style lang='less' scoped>
.u-dtcz-body {
  width: 100%;
  min-height: 100%;
  background-color: #25293f;
  .u-item {
    background-color: #fff;
    margin-bottom: 10px;
  }
  .u-prod {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 15px;
    .name {
      max-width: 75%;
      font-family: PingFangSC-Regular;
      font-size: 16px;
      color: #333;
      line-height: 20px;
    }
    .arrow {
      width: 6px;
      height: 6px;
      margin-left: 5px;
      border-top: 1px solid #666;
      border-right: 1px solid #666;
      transform: rotate(45deg);
      transition: transform linear 300ms;
      &.down {
        transform: rotate(135deg);
      }
    }
  }
  .u-link {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 25px;
    .name {
      max-width: 75%;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #666;
      line-height: 20px;
    }
    .arrow {
      width: 6px;
      height: 6px;
      margin-left: 5px;
      border-top: 1px solid #666;
      border-right: 1px solid #666;
      transform: rotate(45deg);
    }
  }
}
</style>