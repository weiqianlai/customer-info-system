function checkPhone(phone_no) { //号码有问题返回true，号码无问题返回false
  var phonetel = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
  return !phonetel.test(phone_no);
}

function checkName(name) { //姓名有问题返回true，姓名无问题返回false
  var namepd = /^[\u4E00-\u9FA5A-Za-z]+$/;
  return !namepd.test(name);
}

function checkAge(age) {
  var aged = /^(?:[1-9][0-9]?|1[01][0-9]|120)$/;
  return !aged.test(age);
}

module.exports = {
  checkPhone: checkPhone,
  checkName: checkName,
  checkAge: checkAge
}