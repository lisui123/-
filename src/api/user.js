import request from "@/utils/request";

export const login = (data) => {
  return request({
    method: "POST",
    url: "/v1_0/authorizations",
    data,
  });
};
// 获取验证码的接口
export const getSend = (mobile) => {
  return request({
    method: "GET",
    url: `/v1_0/sms/codes/${mobile}`,
  });
};
