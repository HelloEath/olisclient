<template>
  <div>
    <el-upload
      action="http://60.12.117.42:8088/resources/upload"
      ref='upload'
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-progress="handleAvatarSuccess"
      :before-upload='beforeUpload'
      :on-remove="handleRemove">
      <i class="el-icon-plus"></i>
    </el-upload>    
  </div>
</template>
<script>
  
</script>
