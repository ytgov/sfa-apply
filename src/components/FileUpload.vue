<template>
  <v-container grid-list-md text-xs-center fill-height>
    <v-layout row wrap align-left>
      <v-flex xs9>
        <v-text-field 
          v-model="fileName" 
          name="file"
          placeholder="Select file"
          append-icon="attach_file"
          @click="selectFile" />

        <input ref="file" class="hide-input" type="file" accept=".doc, .docx, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, .pdf" @change="fileSelected">
        
        <v-btn
          class="upload-button"
          color="primary"
          @click="upload_file">
          Upload
          <v-icon right color="white">
            cloud_upload
          </v-icon>
        </v-btn>

        <a @click="$router.go(-1)" class="cancel">Cancel</a>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

// https://www.begueradj.com/file-upload-from-a-nuxt.js-client-to-an-adonisjs-restful-api-server-using-axios/

export default {
  name: 'FileUpload',
  props: ["resource"],
  data: () =>({
    file: '',
    fileName: ''
  }),
  methods: {
    selectFile() {
      this.file = this.$refs.file.click()
    },
    fileSelected(e) {
      this.$emit('input', e.target.files[0])
      this.file = this.$refs.file.files[0]
      this.fileName = this.file.name
    },
    async upload_file() {
      let formData = new FormData()
      formData.append('file',  this.file)
      
      /*
      let url = 'http://127.0.0.1:3333/upload'
      let config = {
      headers: {
              'content-type': 'multipart/form-data'
      }
      }
      await this.$axios({
        method: 'post',
        url: url,
        data:  formData,
        config: config
      })
      */
    }
  }
}
</script>

<style scoped>
.hide-input {
    display: none;
}
*{
    text-transform: none !important;
}
.upload-button {
    border-radius: 50px;
    color: white;
}

.cancel {
  margin-lefT:  2rem;
}
</style>