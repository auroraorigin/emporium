let ajaxTimes = 0;

export const request = (params) => {
    ajaxTimes++;
    wx.showLoading({
        title: "加载中",
        mask: true,
    });
    const baseUrl = "https://api.zbztb.cn/api/public/v1";
    return new Promise((resolve, reject) => {
        wx.request({
            ...params,
            url: baseUrl + params.url,
            success: (result) => {
                resolve(result);
            },
            fali: (err) => {
                reject(err);
            },
            complete: () => {
                ajaxTimes--;
                if (ajaxTimes === 0)
                    wx.hideLoading();
            }
        });
    })
}