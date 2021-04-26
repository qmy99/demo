
import {message} from 'antd'
export function downloadFun(res) {
  res.blob().then(blob => {
    if(blob.type=="application/json"){
      var reader = new FileReader()
      reader.onload = e => {if(JSON.parse(e.target.result).status==201){
        //版本管理-授权书单报错提示
        message.error("此文件不存在")
      }else if(JSON.parse(e.target.result).status==210){
        //本地资源管理导出报错提示
        message.error("资源大于5个G，请使用打包到服务器功能")
      }}
      reader.readAsText(blob)
      return 
    }
    var filename = res.headers.get('Content-Disposition');
    if(!filename){
      return
    }
    filename=filename.substring(filename.indexOf("=")+1,filename.length);
    if (window.navigator.msSaveOrOpenBlob) {
      navigator.msSaveBlob(blob, filename);
    }else {
      var a = document.createElement('a');
      var url = window.URL.createObjectURL(blob);   // 获取 blob 本地文件连接 (blob 为纯二进制对象，不能够直接保存到磁盘上)
      a.href = url;
      a.download = decodeURI(filename)
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      // setTimeout(function(){document.body.removeChild(a)},1000)
    }
  })
}
