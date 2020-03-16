import { server } from "@/common/ajax.js";
import {mapActions} from "vuex";

export const download = {
  created() {},
  methods: {
    ...mapActions(["downloadEtcData"]),

    download(data) {
      if (!data) {
        return;
      }
      let url = data;
      let link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      link.setAttribute('download', this.uploadFileName)
      document.body.appendChild(link)
      link.click();
    },

    uploadFileLoad(data, fileName) {
      let codes = [];
      data.attachments.forEach(val=>{
        let item = val.uploadFile.fileCode.toString();
        codes.push(item);
      });
      data.adConfiguration.forEach(val=>{
        val.uploadFiles.forEach(val2=>{
          let item = val2.fileCode.toString();
          codes.push(item);
        })
      });
      if (codes.length) {
        this.download(`${server}common/downloadFiles?codes=${codes}&name=${fileName}`);
      }
    },

    downloadExcel(start, end) {
      this.download(`${server}QR-code-poster/exportEtcData?startDate=${start}&endDate=${end}`);
    }
  }
}
