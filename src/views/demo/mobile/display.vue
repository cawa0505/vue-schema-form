<template>
  <ae-layout class="demo-wrapper">
    <ae-layout-content>
      <v-schema-form class="demo-form"
                     :editable="false"
                     platform="mobile"
                     :schema="definition"
                     :props="props"
                     :value="value"></v-schema-form>
    </ae-layout-content>
  </ae-layout>
</template>
<script lang="tsx">
  import Base from '@/views/demo/base';
  import Component from 'vue-class-component';

  @Component({
    name: 'DesktopEdit'
  })
  export default class DesktopEdit extends Base {
  }
</script>
