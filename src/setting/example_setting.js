const mapping = {
  textInput: "文本输入",
  "select.data": "数据单选",
  "select.dataMulti": "数据多选",
  "select.dataInput": "数据单选可输",
  "select.dataMultiInput": "数据多选可输",
  "select.dict": "字典单选",
  "select.dictMulti": "字典多选",
  "select.dictInput": "字典单选可输",
  "select.dictMultiInput": "字典多选可输",
  "select.normal": "普通单选",
  "select.normalMulti": "普通多选",
  "select.normalInput": "普通单选可输",
  "select.normalMultiInput": "普通多选可输",
  "radio.dict": "字典单选",
  "radio.normal": "普通单选",
  "aaaComplete": "自动完成",
  "date": "日期",
  "textarea": "文本区域",
  "check.single": "勾选(T/F)",
  "check.dict": "字典勾选",
  "check.normal": "普通勾选",
  "dist": "地区"
};
const form = [
  "textInput,4|dist,8,district",
  "select.data,3,dataSelect,user|select.dataMulti,3,dataSelectMulti,user|select.dataInput,3,dataSelectInput,user|select.dataMultiInput,3,dataSelectMultiInput,user",
  "select.dict,3,dictSelect,nationality|select.dictMulti,3,dictSelectMulti,nationality|select.dictInput,3,dictSelectInput,nationality|select.dictMultiInput,3,dictSelectMultiInput,nationality",
  "select.normal,3,select|select.normalMulti,3,selectMulti|select.normalInput,3,selectInput|select.normalMultiInput,3,selectMultiInput",
  "radio.normal,4,radio|radio.dict,4,dictRadio,certificateType|date,4,date",
  "aaaComplete,4,autoComplete,test",
  "textarea,12,textarea"
];
import {formFormat} from "./setting_func"
export const formSetting = {
  form: formFormat(form, mapping),
};
