export function showFormat(showSetting, mapping) {
  var setting = [];
  for (let row of showSetting) {
    let cols = row.split("|");
    let rowSetting = [];
    for (let col of cols) {
      let fields = col.split(",");
      let name = "blank";
      if (mapping[fields[0]] != undefined) {
        name = mapping[fields[0]];
      }
      // rowSetting.push({
      //   name: name,
      //   data: fields[0],
      //   flex: fields[1]
      // });
      var field = {
        name: name,
        data: fields[0],
        flex: fields[1]
      };
      if (fields.length >= 3) {
        if (fields[2] != '') {
          field.type = fields[2];
        }
      }
      rowSetting.push(field);
    }
    setting.push(rowSetting);
  }
  return setting;
}

export function formFormatJson(formSetting, mapping) {
  formSetting.forEach(row => {
    row.forEach(setting => {
      let name = "blank";
      if (mapping[setting.data] != undefined) {
        name = mapping[setting.data];
      }
      setting.name = name;
    });
  });
  return formSetting;
}

export function formFormat(formSetting, mapping) {
  var setting = [];
  for (let row of formSetting) {
    let cols = row.split("|");
    let rowSetting = [];
    for (let col of cols) {
      let fields = col.split(",");
      let name = "blank";
      if (mapping[fields[0]] != undefined) {
        name = mapping[fields[0]];
      }
      var field = {
        name: name,
        data: fields[0],
        flex: fields[1]
      };
      if (fields.length >= 3) {
        if (fields[2] != '') {
          field.type = fields[2];
        }
      }
      if (fields.length >= 4) {
        if (fields[3] != '') {
          if (['dataSelect', 'dataSelectMulti', 'dataSelectInput', 'dataSelectMultiInput', 'dictSelect', 'dictSelectMulti', 'dictSelectInput', 'dictSelectMultiInput', 'dictRadio', 'autoComplete'].indexOf(fields[2]) >= 0) {
            field.option = fields[3];
          }
        }
      }
      // if(fields.length>=5){
      //   if(fields[4]!=''){
      //     if(['dataSelect','dataSelectMulti','dataSelectInput','dataSelectMultiInput','dictSelect','dictSelectMulti','dictSelectInput','dictSelectMultiInput','dictRadio'].indexOf(fields[2])>=0){
      //       field.option = fields[3];
      //     }
      //   }
      //}
      rowSetting.push(field);
    }
    setting.push(rowSetting);
  }
  return setting;
}

export function dataFormat(mapping, customData) {
  let data = {};
  for (let key in mapping) {
    let keySplits = key.split(".");
    let subData = data;
    keySplits.forEach((keySplit, index) => {
      if (index < keySplits.length - 1) {
        if (!subData[keySplit]) {
          subData[keySplit] = {};
        }
        subData = subData[keySplit];
      } else {
        subData[keySplit] = '';
      }
    });
  }
  if (customData != undefined) {
    Object.assign(data, customData);
  }
  return data;
}

export function tableFormat(tableSetting, mapping) {
  var setting = [];
  var hasLink = {};
  if (tableSetting.links) {
    for (let linkField of tableSetting.links) {
      hasLink[linkField] = true;
    }
  }
  for (let field of tableSetting.fields) {
    var fieldSetting = {};
    fieldSetting.data = field;
    var name = "";
    if (mapping[field] != undefined) {
      name = mapping[field];
    }
    fieldSetting.name = name;
    if (hasLink[field]) {
      fieldSetting.hasLink = true;
    }
    setting.push(fieldSetting);
  }
  return setting;
}

export function editableTableFormatJson(tableSetting, mapping) {
  //hasLink
  tableSetting.forEach(obj => {
    let name = "#";
    if (mapping[obj.field] != undefined) {
      name = mapping[obj.field];
    }
    obj.headerName = name;
  });
  return tableSetting;
}
